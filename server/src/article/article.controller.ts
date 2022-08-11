import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { Observable, of } from 'rxjs';
import { join } from 'path';

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

import { User } from 'src/auth/user.decorator';
import { OptionalAuthGuard } from 'src/auth/optional-auth.gaurd';
import {
  CreateCommentDTO,
  CommentResponse,
  CreateCommentBody,
  UpdateCommentBody,
  UpdateCommentDTO,
} from 'src/models/comment.models';
import { UserEntity } from 'src/entities/user.entity';
import {
  CreateArticleDTO,
  UpdateArticleDTO,
  FindFeedQuery,
  ArticleResponse,
  CreateArticleBody,
  UpdateArticleBody,
} from 'src/models/article.models';
import { CommentsService } from './comments.service';
import { ArticleService } from './article.service';
import { ResponseObject } from 'src/models/response.model';
import { AuthService } from 'src/auth/auth.service';

export const storage = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('articles')
export class ArticleController {
  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private commentService: CommentsService,
  ) {}

  @ApiOkResponse({ description: 'List all articles' })
  @Get()
  @UseGuards(new OptionalAuthGuard())
  async findAll(
    @User() user: UserEntity,
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('searchTerm') searchTerm: string,
  ): Promise<ResponseObject<'articles', ArticleResponse[]>> {
    const articles = await this.articleService.findAll(
      user,
      limit,
      page,
      searchTerm,
    );
    return articles;
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'List all articles of users feed' })
  @ApiUnauthorizedResponse()
  @Get('/feed')
  @UseGuards(AuthGuard())
  async findFeed(
    @User() user: UserEntity,
    @Query() query: FindFeedQuery,
  ): Promise<
    ResponseObject<'articles', ArticleResponse[]> &
      ResponseObject<'articlesCount', number>
  > {
    const articles = await this.articleService.findFeed(user, query);
    return { articles, articlesCount: articles.length };
  }

  @ApiOkResponse({ description: 'Article with slug :slug' })
  @Get('/:slug')
  @UseGuards(new OptionalAuthGuard())
  async findBySlug(
    @Param('slug') slug: string,
    @User() user: UserEntity,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.findBySlug(slug);
    return { article: article.toArticle(user) };
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Create article' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: CreateArticleBody })
  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard())
  async createArticle(
    @User() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateArticleDTO,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.createArticle(user, file, data);
    return { article };
  }

  @ApiOkResponse({ description: 'Article image' })
  @Get('image/:imagename')
  findProfileImage(
    @Param('imagename') imagename: string,
    @Res() res,
  ): Observable<string> {
    return of(res.sendFile(join(process.cwd(), 'uploads/images/' + imagename)));
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update article' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: UpdateArticleBody })
  @Put('/:slug')
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard())
  async updateArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateArticleDTO,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.updateArticle(
      slug,
      user,
      file,
      data,
    );
    return { article };
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete article' })
  @ApiUnauthorizedResponse()
  @Delete('/:slug')
  @UseGuards(AuthGuard())
  async deleteArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.deleteArticle(slug, user);
    return { article };
  }

  @ApiOkResponse({ description: 'List article comments' })
  @Get('/:slug/comments')
  async findComments(
    @Param('slug') slug: string,
  ): Promise<ResponseObject<'article', any>> {
    const article = await this.commentService.findByArticleSlug(slug);
    return { article };
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Create new comment' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: CreateCommentBody })
  @Post('/:slug/comments')
  @UseGuards(AuthGuard())
  async createComment(
    @User() user: UserEntity,
    @Param('slug') slug: string,
    @Body('comment', ValidationPipe) data: CreateCommentDTO,
  ): Promise<ResponseObject<'comment', CommentResponse>> {
    const articleData = await this.articleService.findBySlug(slug);
    const comment = await this.commentService.createComment(
      user,
      articleData,
      data,
    );
    return { comment };
  }

  @ApiCreatedResponse({ description: 'Create new comment by anonymous' })
  @ApiBody({ type: CreateCommentBody })
  @Post('/:slug/commentsByA')
  async createCommentByAnonymous(
    @Param('slug') slug: string,
    @Body('comment', ValidationPipe) data: CreateCommentDTO,
  ): Promise<ResponseObject<'comment', CommentResponse>> {
    const username = 'Anonymous author';
    const user = await this.authService.findUserByUsername(username);
    const articleData = await this.articleService.findBySlug(slug);
    const comment = await this.commentService.createComment(
      user,
      articleData,
      data,
    );
    return { comment };
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update comment' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: UpdateCommentBody })
  @Put('/:slug/comments/:id')
  @UseGuards(AuthGuard())
  async updateComment(
    @Param('id') id: number,
    @User() user: UserEntity,
    @Body('comment', ValidationPipe) data: UpdateCommentDTO,
  ): Promise<ResponseObject<'comment', CommentResponse>> {
    const comment = await this.commentService.updateComment(id, user, data);
    return { comment };
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete comment' })
  @ApiUnauthorizedResponse()
  @Delete('/:slug/comments/:id')
  @UseGuards(AuthGuard())
  async deleteComment(
    @User() user: UserEntity,
    @Param('id') id: number,
  ): Promise<ResponseObject<'comment', CommentResponse>> {
    const comment = await this.commentService.deleteComment(user, id);
    return { comment };
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Favorite article' })
  @ApiUnauthorizedResponse()
  @Post('/:slug/favorite')
  @UseGuards(AuthGuard())
  async favoriteArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.favoriteArticle(slug, user);
    return { article };
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Unfavorite article' })
  @ApiUnauthorizedResponse()
  @Delete('/:slug/favorite')
  @UseGuards(AuthGuard())
  async unfavoriteArticle(
    @Param('slug') slug: string,
    @User() user: UserEntity,
  ): Promise<ResponseObject<'article', ArticleResponse>> {
    const article = await this.articleService.unfavoriteArticle(slug, user);
    return { article };
  }
}
