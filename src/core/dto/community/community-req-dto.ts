import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommunityReqDto {
  @ApiProperty({ required: true })
  @IsString()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly desc: string;
}
