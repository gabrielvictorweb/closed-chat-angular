import { Component, ChangeDetectionStrategy } from '@angular/core';
import { input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  template: `
    <button [ngClass]="getButtonClass()" class="cursor-pointer px-4 py-2 rounded transition">
      {{ label() }}
    </button>
  `,
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButton {
  label = input<string>('');
  variant = input<'default'>('default');

  getButtonClass() {
    const variants: Record<string, string> = {
      default: 'w-full bg-gray-700 hover:bg-gray-600 text-white',
    };
    return variants[this.variant()] || variants['default'];
  }
}
