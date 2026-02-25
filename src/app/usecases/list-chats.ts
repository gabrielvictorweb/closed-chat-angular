import { Inject, Injectable } from '@angular/core';
import { ChatGateway } from '../gateways/chat.gateway';
import { Chat } from '../../domain/entity/chat.entity';
import { CHATS_GATEWAY } from '../tokens';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListChats {
  constructor(@Inject(CHATS_GATEWAY) private chatGateway: ChatGateway) {}

  execute(): Observable<Chat[]> {
    return this.chatGateway.getAll().pipe(startWith([]));
  }
}
