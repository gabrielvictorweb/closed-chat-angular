import { ChatUser } from './chat-user.entity';
import { Message } from './message.entity';

export class Chat {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public users: ChatUser[] = [];
  public lastMessage?: Message;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    users: ChatUser[] = [],
    lastMessage?: Message,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.users = users;
    this.lastMessage = lastMessage;
  }
}
