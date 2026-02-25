import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatGateway } from '../../app/gateways/chat.gateway';
import { Chat } from '../../domain/entity/chat.entity';
import { Observable, of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { MessageRepository } from './message.repository';

@Injectable({
  providedIn: 'root',
})
export class ChatRepository implements ChatGateway {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly messageRepository: MessageRepository,
  ) {}

  private generateMockChats(): Chat[] {
    const currentUserId = this.messageRepository.getCurrentUserId();
    return Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      users: [
        {
          id: currentUserId,
          name: faker.person.fullName(),
        },
        {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
        },
      ],
      lastMessage: {
        id: faker.string.uuid(),
        chatId: faker.string.uuid(),
        senderId: currentUserId,
        content: faker.lorem.sentence({ min: 5, max: 15 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    }));
  }

  getAll(): Observable<Chat[]> {
    if (isDevMode()) {
      return of(this.generateMockChats());
    }

    return this.httpClient.get<Chat[]>('/chats');
  }
}
