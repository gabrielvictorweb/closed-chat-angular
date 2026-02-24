import { Observable } from 'rxjs/internal/Observable';
import { Chat } from '../../domain/entity/chat.entity';

export interface ChatGateway {
  getAll(): Observable<Chat[]>;
}
