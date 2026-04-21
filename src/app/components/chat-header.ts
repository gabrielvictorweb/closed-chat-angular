import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ChatState } from '../states/chat.state';
import { ListChats } from '../usecases/list-chats';
import { ListMessagesFacade } from '../facades/list-messages';

@Component({
  selector: 'chat-header',
  template: `
    @if (selectedChat$ | async; as chat) {
      <header class="flex items-center gap-3 px-4 py-2.5 bg-[#202c33] border-b border-[#2a3942]">
        <div class="w-10 h-10 bg-[#6b7280] flex items-center justify-center shrink-0">
          <mat-icon class="text-[#d1d5db] text-xl">person</mat-icon>
        </div>

        <div class="flex-1 min-w-0">
          <h2 class="text-[#e9edef] text-base font-normal leading-tight truncate">
            {{ chat.name }}
          </h2>
          <p class="text-[#8696a0] text-xs leading-tight truncate">
            {{ chat.status }}
          </p>
        </div>

        <div class="flex items-center gap-1">
          <button
            class="w-10 h-10 flex items-center justify-center text-[#aebac1] hover:bg-[#2a3942] transition-colors"
          >
            <mat-icon>search</mat-icon>
          </button>
          <button
            class="w-10 h-10 flex items-center justify-center text-[#aebac1] hover:bg-[#2a3942] transition-colors"
          >
            <mat-icon>more_vert</mat-icon>
          </button>
        </div>
      </header>
    } @else {
      <header class="flex items-center px-4 py-2.5 bg-[#202c33] border-b border-[#2a3942]">
        <p class="text-[#8696a0] text-sm">Selecione uma conversa</p>
      </header>
    }
  `,
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeader {
  private chatState = inject(ChatState);
  private listChats = inject(ListChats);
  private messageFacade = inject(ListMessagesFacade);

  private currentUserId = this.messageFacade.currentUserId$;

  selectedChat$ = combineLatest([this.chatState.selectedChat$, this.listChats.execute()]).pipe(
    map(([selectedId, chats]) => {
      if (!selectedId) return null;

      const chat = chats.find((c) => c.id === selectedId);
      if (!chat) return null;

      const otherUser = chat.users.find((u) => u.id !== this.currentUserId);

      return {
        name: otherUser?.name ?? 'Usuário desconhecido',
        status: 'online',
        usersCount: chat.users.length,
      };
    }),
  );
}
