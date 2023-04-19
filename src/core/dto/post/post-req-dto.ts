import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostReqDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly parentId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly metaTitle: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly slug: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly summary: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly published: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly content: string;
}
