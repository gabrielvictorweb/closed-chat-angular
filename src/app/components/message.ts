import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../domain/entity/message.entity';
import { MessageToolsComponent } from './message-tools';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div
      class="flex py-8"
      [ngClass]="message().senderId !== currentUserId() ? 'justify-start' : 'justify-end'"
    >
      <div
        class="mb-2 p-3 rounded-md max-w-[80%]"
        [ngClass]="
          message().senderId !== currentUserId()
            ? 'bg-gray-800 rounded-bl-none'
            : 'bg-blue-600 rounded-br-none'
        "
      >
        <h1 class="text-gray-400 text-xs mb-1">
          {{ message().senderId !== currentUserId() ? 'Other User' : 'You' }}
        </h1>

        <p class="text-white text-sm">{{ message().content }}</p>
        <p class="text-gray-500 text-xs mt-1">
          {{ message().createdAt | date: 'shortTime' }}
        </p>

        <app-message-tools (copyText)="handleCopy()" (reaction)="handleReaction($event)" />
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MessageToolsComponent, MatSnackBarModule],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MessageComponent {
  message = input.required<Message>();
  currentUserId = input<string>();

  private snackBar = inject(MatSnackBar);

  handleCopy() {
    const content = this.message().content;
    navigator.clipboard
      .writeText(content)
      .then(() => {
        this.snackBar.open('Texto copiado!', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success'],
        });
      })
      .catch((err) => {
        this.snackBar.open('Erro ao copiar texto', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });
  }

  handleReaction(emoji: string) {
    console.log('Reação com emoji:', emoji);
    this.snackBar.open(`Você reagiu com ${emoji}`, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
    // Aqui você pode implementar a lógica para salvar a reação no backend
  }
}
