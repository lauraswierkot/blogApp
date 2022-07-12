import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ArticleEntity } from 'src/entities/article.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ProfileResponse } from './user.model';

export class CreateCommentDTO {
  @IsString()
  @ApiProperty()
  body: string;
}

export class CreateCommentBody {
  @ApiProperty()
  comment: CreateCommentDTO;
}

export class UpdateCommentDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  body: string;
}

export class UpdateCommentBody {
  @ApiProperty()
  comment: UpdateCommentDTO;
}

export class CommentResponse {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  body: string;
  author: ProfileResponse | UserEntity;
  article: ArticleEntity;
}
