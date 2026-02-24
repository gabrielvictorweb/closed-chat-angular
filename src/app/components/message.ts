import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../domain/entity/message.entity';

@Component({
  selector: 'app-message',
  template: `
    <div class="mb-2 p-3 bg-gray-800 rounded hover:bg-gray-750 transition">
      <p class="text-gray-400 text-xs mb-1">User</p>
      <p class="text-white text-sm">{{ message().content }}</p>
      <p class="text-gray-500 text-xs mt-1">
        {{ message().createdAt | date: 'shortTime' : '' : 'pt-BR' }}
      </p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  message = input.required<Message>();
}
