import { Component, ChangeDetectionStrategy } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: ` <button>{{ label() }}</button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppButton {
  label = input<string>('');
}
