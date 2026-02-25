import { inject, Injectable } from '@angular/core';
import { ChatState } from '../states/chat.state';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ListMessages } from '../usecases/list-messages';
import { MessageRepository } from '../../infra/repositories/message.repository';

@Injectable({
  providedIn: 'root',
})
export class ListMessagesFacade {
  private chatState = inject(ChatState);
  private listMessages = inject(ListMessages);
  private messageRepository = inject(MessageRepository);

  messages$ = this.chatState.selectedChat$.pipe(
    filter((id) => !!id),
    switchMap((id) => this.listMessages.execute(id!)),
  );

  currentUserId$ = this.messageRepository.getCurrentUserId();
}
