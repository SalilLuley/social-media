import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserFriendsResDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly sourceId?: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly targetId?: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly status?: number;
}
