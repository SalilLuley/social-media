import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../base-dto/base.dto';

export class CommunityResDto extends BaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  readonly id?: number;

  @ApiProperty({ required: true })
  @IsString()
  readonly title?: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly desc?: string;
}
