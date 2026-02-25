export class Message {
  id: string;
  chatId: string;
  content: string;
  senderId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    chatId: string,
    content: string,
    senderId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.chatId = chatId;
    this.content = content;
    this.senderId = senderId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
