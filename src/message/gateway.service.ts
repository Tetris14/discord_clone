import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { MessageService } from './message.service';
  
  @WebSocketGateway({ cors: true })
  export class ChatGateway {
    @WebSocketServer() server: Server;
  
    constructor(private messageService: MessageService) {}
  
    @SubscribeMessage('sendMessage')
    async handleMessage(
      @MessageBody() data: { senderId: string; receiverId: string; content: string },
      @ConnectedSocket() client: Socket,
    ) {
      const message = await this.messageService.sendMessage(data.senderId, data.receiverId, data.content);
  
      // Emit message to both sender and receiver
      this.server.to(data.senderId).emit('newMessage', message);
      this.server.to(data.receiverId).emit('newMessage', message);
    }
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  }
  