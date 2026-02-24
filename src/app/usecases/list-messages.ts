import { Inject, Injectable } from '@angular/core';
import { MessageGateway } from '../gateways/message.gateway';
import { MESSAGES_GATEWAY } from '../tokens';
import { Observable } from 'rxjs';
import { Message } from '../../domain/entity/message.entity';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListMessages {
  private cache = new Map<string, Observable<Message[]>>();

  constructor(@Inject(MESSAGES_GATEWAY) private messageGateway: MessageGateway) {}

  execute(chatId: string): Observable<Message[]> {
    if (!this.cache.has(chatId)) {
      const messages$ = this.messageGateway
        .getMessagesByChat(chatId)
        .pipe(shareReplay({ bufferSize: 1, refCount: true }));
      this.cache.set(chatId, messages$);
    }

    return this.cache.get(chatId)!;
  }

  clearCache(chatId?: string): void {
    if (chatId) {
      this.cache.delete(chatId);
    } else {
      this.cache.clear();
    }
  }
}
