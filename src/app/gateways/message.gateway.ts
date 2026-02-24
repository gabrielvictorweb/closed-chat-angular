import { Observable } from 'rxjs/internal/Observable';
import { Message } from '../../domain/entity/message.entity';

export interface MessageGateway {
  getMessagesByChat(chatId: string): Observable<Message[]>;
}
