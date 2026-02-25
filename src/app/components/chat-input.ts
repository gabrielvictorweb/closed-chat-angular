import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'chat-input',
  template: `
    <form class="w-full mt-4 flex gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        class="flex-1 border p-2 rounded bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      />
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white rounded p-2 flex items-center justify-center transition"
        aria-label="Send message"
      >
        <mat-icon>send</mat-icon>
      </button>
    </form>
  `,
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInput {}
