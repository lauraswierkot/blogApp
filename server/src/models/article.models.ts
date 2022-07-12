import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

import { ProfileResponse } from './user.model';

export class CreateArticleDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  body: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tagList: string;
}

export class CreateArticleBody {
  @ApiProperty()
  article: CreateArticleDTO;
}

export class UpdateArticleDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  body: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  tagList: string[];
}

export class UpdateArticleBody {
  @ApiProperty()
  article: UpdateArticleDTO;
}

export interface FindFeedQuery {
  limit?: number;
  offset?: number;
  page?: number;
}

export interface FindAllQuery extends FindFeedQuery {
  tag?: string;
  searchTerm?: string;
  title?: string;
  body?: string;
}

export interface ArticleResponse {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  author: ProfileResponse;
}
