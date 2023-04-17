import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserLoginInfo {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;
}

export const UserLoginInfoSchema = SchemaFactory.createForClass(UserLoginInfo);
