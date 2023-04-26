import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CommunityAddUserReqDto {
  @ApiProperty({ required: true })
  @IsNumber()
  readonly userLoginInfoId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  readonly communityId: number;
}
