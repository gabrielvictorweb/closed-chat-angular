import { Routes } from '@angular/router';
import { HomePage } from './pages/home';
import { ChatPage } from './pages/chat';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'chat',
    component: ChatPage,
  },
];
