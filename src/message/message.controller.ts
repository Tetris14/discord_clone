import { Public } from "src/shared/public.decorator";
import { MessageService } from "./message.service";
import { Controller, Post, Body, Get, Param } from "@nestjs/common";

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Public()
  @Post('send')
  async sendMessage(@Body() body) {
    return this.messageService.sendMessage(body.senderId, body.receiverId, body.content);
  }

  @Public()
  @Get(':userId/:otherUserId')
  async getMessages(@Param('userId') userId: string, @Param('otherUserId') otherUserId: string) {
    return this.messageService.getMessages(userId, otherUserId);
  }
}