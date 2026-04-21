import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../domain/entity/message.entity';
import { MessageToolsComponent } from './message-tools';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div class="flex my-4" [ngClass]="isOwn() ? 'justify-end' : 'justify-start'">
      <div class="max-w-[min(40%,32rem)] min-w-20 relative group">
        <div
          class="relative px-2 pt-1.5 pb-2 rounded-lg shadow-sm"
          [ngClass]="isOwn() ? 'bg-[#005c4b] rounded-tr-none' : 'bg-[#1f2937] rounded-tl-none'"
        >
          @if (isOwn()) {
            <span
              class="absolute top-0 -right-2 w-0 h-0 border-l-8 border-l-[#005c4b] border-b-8 border-b-transparent"
            ></span>
          } @else {
            <span
              class="absolute top-0 -left-2 w-0 h-0 border-r-8 border-r-[#1f2937] border-b-8 border-b-transparent"
            ></span>
          }

          @if (!isOwn()) {
            <span class="text-[#53bdeb] text-[0.6875rem] font-medium leading-none">
              {{ message().senderId | slice: 0 : 8 }}
            </span>
          }

          <p
            class="text-[#e9edef] text-[0.875rem] leading-[1.35] whitespace-pre-wrap wrap-break-word"
          >
            {{ message().content }}
            <span class="inline-block w-18"></span>
          </p>

          <span
            class="absolute bottom-1.5 right-2 text-[0.6875rem] leading-none"
            [ngClass]="isOwn() ? 'text-white/60' : 'text-white/45'"
          >
            {{ message().createdAt | date: 'HH:mm' }}
          </span>
        </div>

        <div
          class="absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10"
          [ngClass]="isOwn() ? '-left-20' : '-right-20'"
        >
          <app-message-tools (copyText)="handleCopy()" (reaction)="handleReaction($event)" />
        </div>
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

  isOwn(): boolean {
    return this.message().senderId === this.currentUserId();
  }

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
