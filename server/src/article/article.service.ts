import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';

import { ArticleEntity } from 'src/entities/article.entity';
import { UserEntity } from 'src/entities/user.entity';
import { TagEntity } from 'src/entities/tag.entity';
import {
  CreateArticleDTO,
  UpdateArticleDTO,
  FindFeedQuery,
  ArticleResponse,
} from 'src/models/article.models';
import { Role } from 'src/models/user.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(TagEntity) private tagRepo: Repository<TagEntity>,
  ) {}

  private async upsertTags(tagList: string[]): Promise<void> {
    const foundTags = await this.tagRepo.find({
      where: tagList.map(t => ({ tag: t })),
    });
    const newTags = tagList.filter(t => !foundTags.map(t => t.tag).includes(t));
    await Promise.all(
      this.tagRepo.create(newTags.map(t => ({ tag: t }))).map(t => t.save()),
    );
  }

  async findAll(
    user: UserEntity,
    limit = '5',
    page = '0',
    searchTerm = null,
  ): Promise<{ articles: ArticleResponse[]; total: number }> {
    const options: FindManyOptions<ArticleResponse> = {
      order: {
        createdAt: 'DESC',
      },
      skip: parseInt(limit) * parseInt(page),
      take: parseInt(limit),
      where: !!searchTerm
        ? [
            {
              title: Like(`%${searchTerm}%`),
            },
            {
              body: Like(`%${searchTerm}%`),
            },
          ]
        : [],
    };

    const [articles, total] = await this.articleRepo.findAndCount(options);

    return {
      articles: articles.map(article => article.toArticle(user)),
      total,
    };
  }

  async findFeed(
    user: UserEntity,
    query: FindFeedQuery,
  ): Promise<ArticleResponse[]> {
    const { followee } = await this.userRepo.findOne({
      where: { id: user.id },
      relations: ['followee'],
    });
    const findOptions = {
      ...query,
      where: followee.map(follow => ({ author: follow.id })),
    };
    return (await this.articleRepo.find(findOptions)).map(article =>
      article.toArticle(user),
    );
  }

  findBySlug(slug: string): Promise<ArticleEntity> {
    return this.articleRepo.findOne({
      where: { slug },
      relations: ['comments'],
    });
  }

  private ensureUserRole(user: UserEntity): boolean {
    return user.role === Role.Admin;
  }

  private ensureOwnership(user: UserEntity, article: ArticleEntity): boolean {
    return article.author.id === user.id;
  }

  async createArticle(
    user: UserEntity,
    file: Express.Multer.File,
    data: CreateArticleDTO,
  ): Promise<ArticleResponse> {
    const article = this.articleRepo.create(data);
    article.image = file.filename;
    article.author = user;
    await this.upsertTags([data.tagList]);
    const { slug } = await article.save();
    return (await this.articleRepo.findOne({ slug })).toArticle(user);
  }

  async updateArticle(
    slug: string,
    user: UserEntity,
    file: Express.Multer.File,
    data: UpdateArticleDTO,
  ): Promise<ArticleResponse> {
    const article = await this.findBySlug(slug);
    if (!this.ensureOwnership(user, article) && !this.ensureUserRole(user)) {
      throw new UnauthorizedException();
    }

    const articleData: UpdateArticleDTO = {
      title: data.title,
      description: data.description,
      body: data.body,
      image: file?.filename ?? article.image,
      tagList: data.tagList,
    };
    await this.articleRepo.update({ slug }, articleData);
    return article.toArticle(user);
  }

  async deleteArticle(
    slug: string,
    user: UserEntity,
  ): Promise<ArticleResponse> {
    const article = await this.findBySlug(slug);
    if (!this.ensureOwnership(user, article) && !this.ensureUserRole(user)) {
      throw new UnauthorizedException();
    }
    await this.articleRepo.remove(article);
    return article.toArticle(user);
  }

  async favoriteArticle(
    slug: string,
    user: UserEntity,
  ): Promise<ArticleResponse> {
    const article = await this.findBySlug(slug);
    article.favoritedBy.push(user);
    await article.save();
    return (await this.findBySlug(slug)).toArticle(user);
  }

  async unfavoriteArticle(
    slug: string,
    user: UserEntity,
  ): Promise<ArticleResponse> {
    const article = await this.findBySlug(slug);
    article.favoritedBy = article.favoritedBy.filter(fav => fav.id !== user.id);
    await article.save();
    return (await this.findBySlug(slug)).toArticle(user);
  }
}
