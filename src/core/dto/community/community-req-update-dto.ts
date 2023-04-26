import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CommunityReqDto } from './community-req-dto';

export class UpdateCommunityReqDto extends CommunityReqDto {
  @ApiProperty({ required: false })
  @IsNumber()
  readonly id: number;
}
