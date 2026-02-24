import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-input',
  template: `
    <form>
      <input
        type="text"
        placeholder="Type a message..."
        class="border p-2 w-full rounded bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />
    </form>
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInput {}
