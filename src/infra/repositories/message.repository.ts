import { Inject, Injectable, PLATFORM_ID, isDevMode } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MessageGateway } from '../../app/gateways/message.gateway';
import { Message } from '../../domain/entity/message.entity';
import { Observable, of } from 'rxjs';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class MessageRepository implements MessageGateway {
  private readonly SENDER_IDS = {
    user: 'a1b2c3d4-e5f6-4a5b-9c8d-7e6f5a4b3c2d',
    other: 'z9y8x7w6-v5u4-3b2a-1c0d-9e8f7a6b5c4d',
  };

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  private shouldUseMocks(): boolean {
    return isDevMode() || isPlatformServer(this.platformId);
  }

  private generateMockMessages(chatId: string): Message[] {
    const senderIds = Object.values(this.SENDER_IDS);
    return Array.from({ length: 10 }, (_, index) => ({
      id: faker.string.uuid(),
      chatId,
      senderId: senderIds[index % 2],
      content: faker.lorem.sentence({ min: 5, max: 15 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }));
  }

  getMessagesByChat(chatId: string): Observable<Message[]> {
    if (this.shouldUseMocks()) {
      return of(this.generateMockMessages(chatId));
    }

    return this.httpClient.get<Message[]>(`/chats/${chatId}/messages`);
  }

  getCurrentUserId(): string {
    return this.SENDER_IDS.user;
  }
}
