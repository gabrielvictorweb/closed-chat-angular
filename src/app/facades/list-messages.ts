import { inject, Injectable } from '@angular/core';
import { ChatState } from '../states/chat.state';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ListMessages } from '../usecases/list-messages';

@Injectable({
  providedIn: 'root',
})
export class ListMessagesFacade {
  private chatState = inject(ChatState);
  private listMessages = inject(ListMessages);

  messages$ = this.chatState.selectedChat$.pipe(
    filter((id) => !!id),
    switchMap((id) => this.listMessages.execute(id!)),
  );
}
