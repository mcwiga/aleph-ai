import { Injectable, Renderer2 } from '@angular/core';
import { Theme } from '../theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  constructor(private readonly renderer2: Renderer2) {}

  public toggleTheme(): void {
    if (document.body.classList.contains(Theme.Dark)) {
      this.renderer2.removeClass(document.body, Theme.Dark);
    } else {
      this.renderer2.addClass(document.body, Theme.Dark);
    }
  }
}
