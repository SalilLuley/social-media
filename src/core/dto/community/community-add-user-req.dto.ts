import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { CommunityRoleEnum } from 'src/core/common/enum/community-role.enum';

export class CommunityAddUserReqDto {
  @ApiProperty({ required: true })
  @IsNumber()
  readonly userLoginInfoId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  readonly communityId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsEnum(CommunityRoleEnum)
  readonly role: number;
}
