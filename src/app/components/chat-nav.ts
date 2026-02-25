import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButton } from './button';
import { ListChats } from '../usecases/list-chats';
import { ChatState } from '../states/chat.state';
import { ListMessagesFacade } from '../facades/list-messages';

@Component({
  selector: 'chat-nav',
  standalone: true,
  imports: [CommonModule, AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="w-64 h-screen bg-dark-bg text-white p-4 border-r border-gray-700 flex flex-col">
      <div class="flex-1 flex justify-center">
        @if (chats$ | async; as chats) {
          @if (chats.length === 0) {
            <div class="text-center">
              <p class="text-gray-400 mb-4">You don't have any conversations yet</p>
              <app-button label="Create New Chat" variant="default" />
            </div>
          } @else {
            <div class="w-full">
              <app-button label="Create New Chat" variant="default" />

              <hr class="my-4 border-gray-700" />

              @for (chat of chats; track chat.id) {
                <div
                  class="px-3 py-2 rounded hover:bg-gray-700 transition cursor-pointer mb-2"
                  (click)="select(chat.id)"
                >
                  @for (user of chat.users; track user.id) {
                    @if (user.id !== currentUserId) {
                      <p>{{ user.name }}</p>
                    }
                  }

                  @if (chat.lastMessage) {
                    <p class="text-sm text-gray-400 truncate">{{ chat.lastMessage.content }}</p>
                  }

                  <small class="text-gray-400">
                    {{ chat.createdAt | date: 'short' }}
                  </small>
                </div>
              }
            </div>
          }
        }
      </div>
    </nav>
  `,
})
export class ChatNav {
  private readonly listChats = inject(ListChats);
  private readonly chatState = inject(ChatState);
  private readonly messageFacade = inject(ListMessagesFacade);

  readonly chats$ = this.listChats.execute();

  readonly currentUserId = this.messageFacade.currentUserId$;

  select(chatId: string) {
    this.chatState.selectChat(chatId);
  }
}
