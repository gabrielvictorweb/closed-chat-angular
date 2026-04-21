import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChatInput } from '../components/chat-input';
import { ChatContent } from '../components/chat-content';
import { ChatNav } from '../components/chat-nav';
import { ChatHeader } from '../components/chat-header';

@Component({
  selector: 'chat-page',
  template: `
    <div class="h-screen w-full bg-dark-bg flex">
      <chat-nav />

      <main class="flex-1 flex flex-col">
        <chat-header />

        <div class="flex-1 overflow-auto min-h-0">
          <chat-content />
        </div>

        <chat-input />
      </main>
    </div>
  `,
  standalone: true,
  imports: [ChatInput, ChatContent, ChatNav, ChatHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage {}
