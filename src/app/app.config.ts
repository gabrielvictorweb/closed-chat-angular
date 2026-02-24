import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CHATS_GATEWAY, MESSAGES_GATEWAY } from './tokens';
import { ChatRepository } from '../infra/repositories/chat.repository';
import { MessageRepository } from '../infra/repositories/message.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {
      provide: CHATS_GATEWAY,
      useClass: ChatRepository,
    },
    {
      provide: MESSAGES_GATEWAY,
      useClass: MessageRepository,
    },
  ],
};
