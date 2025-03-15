import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  jwt: string;

  @Exclude()
  password: string;
  
  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}
