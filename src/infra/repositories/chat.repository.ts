import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatGateway } from '../../app/gateways/chat.gateway';
import { Chat } from '../../domain/entity/chat.entity';
import { Observable, of } from 'rxjs';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class ChatRepository implements ChatGateway {
  constructor(private readonly httpClient: HttpClient) {}

  private generateMockChats(): Chat[] {
    return Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }));
  }

  getAll(): Observable<Chat[]> {
    if (isDevMode()) {
      return of(this.generateMockChats());
    }

    return this.httpClient.get<Chat[]>('/chats');
  }
}
