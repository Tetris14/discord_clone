import { Module } from "@nestjs/common";
import { ChatGateway } from './gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  controllers: [MessageController],
  providers: [MessageService, ChatGateway],
  exports: [MessageService]
})
export class MessageModule {}
