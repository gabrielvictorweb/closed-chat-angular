import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButton } from './button';
import { ListChats } from '../usecases/list-chats';
import { ChatState } from '../states/chat.state';

@Component({
  selector: 'chat-nav',
  template: `
    <nav class="w-64 h-screen bg-dark-bg text-white p-4 border-r border-gray-700 flex flex-col">
      <div class="flex-1 flex justify-center">
        <ng-container *ngIf="chats$ | async as chats">
          <div class="text-center" *ngIf="chats.length === 0">
            <p class="text-gray-400 mb-4">You don't have any conversations yet</p>
            <app-button [label]="'Create New Chat'" [variant]="'default'" />
          </div>
          <div class="w-full" *ngIf="chats.length > 0">
            <app-button [label]="'Create New Chat'" [variant]="'default'" />

            <hr class="my-4 border-gray-700" />

            <div
              *ngFor="let chat of chats"
              class="px-3 py-2 rounded hover:bg-gray-700 transition cursor-pointer mb-2"
              (click)="select(chat.id)"
            >
              {{ chat.createdAt | date: 'short' }}
            </div>
          </div>
        </ng-container>
      </div>
    </nav>
  `,
  standalone: true,
  imports: [CommonModule, AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatNav {
  private readonly listChats = inject(ListChats);
  private readonly chatState = inject(ChatState);

  chats$ = this.listChats.execute();

  select(chatId: string) {
    this.chatState.selectChat(chatId);
  }
}
