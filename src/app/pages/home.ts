import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppButton } from '../components/button';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h1>Welcome to Closed Chat</h1>
      <app-button [label]="'Click Me'" />
    </div>
  `,
  styles: [
    `
      .home-container {
        padding: 2rem;
        text-align: center;
      }
    `,
  ],
  standalone: true,
  imports: [AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
