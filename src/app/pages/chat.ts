import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChatInput } from '../components/chat-input';
import { ChatContent } from '../components/chat-content';
import { ChatNav } from '../components/chat-nav';

@Component({
  selector: 'chat-page',
  template: `
    <div class="h-screen w-full bg-dark-bg flex">
      <chat-nav />

      <main class="flex-1 p-4 pt-0 flex flex-col justify-between">
        <div class="flex-1 overflow-auto min-h-0">
          <chat-content />
        </div>

        <chat-input />
      </main>
    </div>
  `,
  standalone: true,
  imports: [ChatInput, ChatContent, ChatNav],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage {}
