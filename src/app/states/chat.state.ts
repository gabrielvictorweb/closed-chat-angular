import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatState {
  private selectedChatSubject = new BehaviorSubject<string | null>(null);

  selectedChat$ = this.selectedChatSubject.asObservable();

  selectChat(chatId: string) {
    this.selectedChatSubject.next(chatId);
  }
}
