import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-message-tools',
  template: `
    <div class="message-tools">
      <!-- Copy Button -->
      <button mat-icon-button matTooltip="Copiar texto" (click)="onCopy()" class="tool-button">
        <mat-icon>content_copy</mat-icon>
      </button>

      <!-- Emoji Reaction Button -->
      <button
        mat-icon-button
        [matMenuTriggerFor]="emojiMenu"
        matTooltip="Reagir com emoji"
        class="tool-button"
      >
        <mat-icon>add_reaction</mat-icon>
      </button>

      <!-- Emoji Menu -->
      <mat-menu #emojiMenu="matMenu" class="emoji-menu">
        <button
          mat-menu-item
          *ngFor="let emoji of emojis"
          (click)="onReaction(emoji)"
          class="emoji-item"
        >
          <span class="emoji">{{ emoji }}</span>
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .message-tools {
        display: flex;
        gap: 4px;
        align-items: center;
        background-color: rgba(31, 41, 55, 0.95);
        padding: 4px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }

      .tool-button {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(55, 65, 81, 0.8);
        border-radius: 6px;
        transition: all 0.2s ease;
      }

      .tool-button:hover {
        background-color: rgba(75, 85, 99, 1);
        transform: scale(1.05);
      }

      .tool-button mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: rgba(229, 231, 235, 0.9);
      }

      :host ::ng-deep .emoji-menu .mat-mdc-menu-content {
        padding: 8px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        background-color: rgb(31, 41, 55);
      }

      .emoji-item {
        min-width: auto !important;
        padding: 8px !important;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: background-color 0.2s ease;
      }

      .emoji-item:hover {
        background-color: rgba(75, 85, 99, 0.8);
      }

      .emoji {
        font-size: 24px;
        line-height: 1;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageToolsComponent {
  copyText = output<void>();
  reaction = output<string>();

  emojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '🔥'];

  onCopy() {
    this.copyText.emit();
  }

  onReaction(emoji: string) {
    this.reaction.emit(emoji);
  }
}
