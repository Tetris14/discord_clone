import { Module } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "discord_clon",
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    AuthModule,
    MessageModule
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
