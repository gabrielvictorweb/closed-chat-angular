import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChatInput } from '../components/chat-input';
import { ChatContent } from '../components/chat-content';
import { ChatNav } from '../components/chat-nav';

@Component({
  selector: 'chat-page',
  template: `
    <div class="h-screen w-full bg-dark-bg flex">
      <chat-nav />

      <main class="flex-1 p-4 flex flex-col justify-between">
        <div class="flex-1 h-full w-full text-white flex items-center justify-center">
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
