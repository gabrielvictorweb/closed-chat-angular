import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageGateway } from '../../app/gateways/message.gateway';
import { Message } from '../../domain/entity/message.entity';
import { Observable, of } from 'rxjs';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class MessageRepository implements MessageGateway {
  constructor(private readonly httpClient: HttpClient) {}

  private generateMockMessages(chatId: string): Message[] {
    return Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      chatId,
      content: faker.lorem.sentence({ min: 5, max: 15 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }));
  }

  getMessagesByChat(chatId: string): Observable<Message[]> {
    if (isDevMode()) {
      return of(this.generateMockMessages(chatId));
    }

    return this.httpClient.get<Message[]>(`/chats/${chatId}/messages`);
  }
}
