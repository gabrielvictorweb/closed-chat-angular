import { Inject, Injectable } from '@angular/core';
import { ChatGateway } from '../gateways/chat.gateway';
import { Chat } from '../../domain/entity/chat.entity';
import { CHATS_GATEWAY } from '../tokens';
import { Observable } from 'rxjs/internal/Observable';
import { shareReplay, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListChats {
  private chats$: Observable<Chat[]>;

  constructor(@Inject(CHATS_GATEWAY) private chatGateway: ChatGateway) {
    this.chats$ = this.chatGateway
      .getAll()
      .pipe(startWith([]), shareReplay({ bufferSize: 1, refCount: true }));
  }

  execute(): Observable<Chat[]> {
    return this.chats$;
  }
}
