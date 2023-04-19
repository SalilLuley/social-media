import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostReqDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly parentId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly metaTitle: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly summary: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly published: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
