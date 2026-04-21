import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMessagesFacade } from '../facades/list-messages';
import { MessageComponent } from './message';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'chat-content',
  template: `
    <div class="h-full w-full text-white flex items-center justify-center">
      @if (messages$ | async; as messages) {
        <div class="w-full h-full overflow-y-auto px-4" #scrollContainer>
          @for (message of messages; track message.id) {
            <app-message [message]="message" [currentUserId]="currentUserId" />
          }
        </div>
      } @else {
        <div class="text-center">
          <p class="text-gray-400">No chat selected</p>
          <p class="text-gray-500 text-sm mt-2">Select or create a conversation to get started</p>
        </div>
      }
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MessageComponent],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChatContent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  private messageFacade = inject(ListMessagesFacade);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();
  private snackBar = inject(MatSnackBar);

  messages$ = this.messageFacade.messages$;
  currentUserId = this.messageFacade.currentUserId$;

  ngOnInit() {
    this.messages$.pipe(takeUntil(this.destroy$)).subscribe((messages) => {
      this.cdr.markForCheck();
      this.scrollToBottom();
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByMessageId(index: number, message: any): string {
    return message.id;
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }

  handleCopy(content: string) {
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
  }
}
