import { InjectionToken } from '@angular/core';
import { ChatGateway } from '../gateways/chat.gateway';
import { MessageGateway } from '../gateways/message.gateway';

export const CHATS_GATEWAY = new InjectionToken<ChatGateway>('CHATS_GATEWAY');
export const MESSAGES_GATEWAY = new InjectionToken<MessageGateway>('MESSAGES_GATEWAY');
