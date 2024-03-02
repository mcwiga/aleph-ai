import { Injectable, Renderer2 } from '@angular/core';
import { Theme } from '../theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  public isDarkTheme = false;
  constructor(private readonly renderer2: Renderer2) {
    if(sessionStorage.getItem('theme') == Theme.Dark){
      this.toggleTheme()
    }
  }

  public toggleTheme(): void {
    if (document.body.classList.contains(Theme.Dark)) {
      sessionStorage.setItem('theme', Theme.Dark)
      this.renderer2.removeClass(document.body, Theme.Dark);
      this.isDarkTheme = true;
    } else {
      this.renderer2.addClass(document.body, Theme.Dark);
      sessionStorage.setItem('theme', Theme.Light)
      this.isDarkTheme = false;

    }
  }
}
