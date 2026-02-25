import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMessagesFacade } from '../facades/list-messages';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'chat-content',
  template: `
    <div class="h-full w-full text-white flex items-center justify-center">
      <ng-container *ngIf="messages$ | async as messages; else noChat">
        <div #scrollContainer class="w-full h-full overflow-y-auto p-4 scroll-smooth">
          <div
            *ngFor="let message of messages"
            [ngClass]="
              message.senderId === currentUserId
                ? 'flex justify-end rounded-br-0'
                : 'rounded-bl-0 flex justify-start'
            "
            class="mb-2"
          >
            <div
              [ngClass]="message.senderId === currentUserId ? 'rounded-br-none' : 'rounded-bl-none'"
              class="p-4 bg-gray-800 rounded-2xl max-w-xs"
            >
              {{ message.content }}
            </div>
          </div>
        </div>
      </ng-container>

      <ng-template #noChat>
        <div class="text-center">
          <p class="text-gray-400">No chat selected</p>
          <p class="text-gray-500 text-sm mt-2">Select or create a conversation to get started</p>
        </div>
      </ng-template>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatContent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  private messageFacade = inject(ListMessagesFacade);
  private destroy$ = new Subject<void>();

  messages$ = this.messageFacade.messages$;
  currentUserId = this.messageFacade.currentUserId$;

  ngOnInit() {
    this.messages$.pipe(takeUntil(this.destroy$)).subscribe(() => {
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

  private scrollToBottom() {
    if (this.scrollContainer) {
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }
}
