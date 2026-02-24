import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMessagesFacade } from '../facades/list-messages';
import { MessageComponent } from './message';

@Component({
  selector: 'chat-content',
  template: `
    <div class="h-full w-full text-white flex items-center justify-center">
      <ng-container *ngIf="messages$ | async as messages; else noChat">
        <div class="w-full h-full overflow-y-auto p-4">
          <app-message *ngFor="let message of messages" [message]="message" />
        </div>
      </ng-container>

      <ng-template #noChat>
        <div class="text-center">
          <p class="text-gray-400">No chat selected</p>
          <p class="text-gray-500 text-sm mt-2">Select or create a conversation to get started</p>
        </div>
      </ng-template>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatContent {
  private messageFacade = inject(ListMessagesFacade);

  messages$ = this.messageFacade.messages$;
}
