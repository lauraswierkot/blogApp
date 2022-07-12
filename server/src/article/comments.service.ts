import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticleEntity } from 'src/entities/article.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { UserEntity } from 'src/entities/user.entity';
import {
  CreateCommentDTO,
  CommentResponse,
  UpdateCommentDTO,
} from 'src/models/comment.models';
import { Role } from 'src/models/user.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private articleRepo: Repository<ArticleEntity>,
  ) {}

  findByArticleSlug(slug: string): Promise<any> {
    return this.articleRepo.find({
      where: { slug },
      relations: ['comments'],
    });
  }

  findById(id: number): Promise<CommentEntity> {
    return this.commentRepo.findOne({ where: { id } });
  }

  private ensureOwnership(user: UserEntity, comment: CommentEntity): boolean {
    return comment.author.id === user.id;
  }

  private ensureUserRole(user: UserEntity): boolean {
    return user.role === Role.Admin;
  }

  async createComment(
    user: UserEntity,
    articleData: ArticleEntity,
    data: CreateCommentDTO,
  ): Promise<CommentResponse> {
    const comment = this.commentRepo.create(data);
    comment.author = user;
    comment.article = articleData;
    await comment.save();
    return comment;
  }

  async updateComment(
    id: number,
    user: UserEntity,
    data: UpdateCommentDTO,
  ): Promise<CommentResponse> {
    const comment = await this.findById(id);
    if (!this.ensureOwnership(user, comment)) {
      throw new UnauthorizedException();
    }
    
    await this.commentRepo.update({ id }, data);
    return comment;
  }

  async deleteComment(user: UserEntity, id: number): Promise<CommentResponse> {
    const comment = await this.commentRepo.findOne({
      where: { id },
    });

    console.log(comment);

    if (this.ensureUserRole) {
      await comment.remove();
      return comment;
    }

    if (!this.ensureOwnership(user, comment)) {
      throw new UnauthorizedException();
    }

    await comment.remove();
    return comment;
  }
}
