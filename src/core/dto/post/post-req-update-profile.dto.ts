import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { PostReqDto } from './post-req-dto';

export class UpdatePostReqDTO extends PostReqDto {
  @ApiProperty({ required: true })
  @IsNumber()
  readonly id: number;
}
