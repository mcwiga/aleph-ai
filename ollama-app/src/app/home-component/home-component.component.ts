import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ThemingService } from '../shared/service/theming.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OllamaService } from '../shared/service/ollama.service';
import { Subject, skip, tap } from 'rxjs';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    AvatarComponent,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  providers: [ThemingService, OllamaService],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss',
})
export class HomeComponentComponent {
  public isChatbotOpen = false;
  public options: FormGroup;

  public text = '';

  public alephResponse: string | undefined;

  private isLoading = new Subject();
  public isLoading$ = this.isLoading.asObservable();

  public constructor(
    private readonly themingService: ThemingService,
    private readonly fb: FormBuilder,
    private readonly ollamaService: OllamaService
  ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    this.options = new FormGroup({
      chatBox: new FormControl('', Validators.required),
      modelType: new FormControl('mistral'),
    });

    this.options
      .get('modelType')
      ?.valueChanges.subscribe((modelType: string) =>
        this.ollamaService.setModelType(modelType)
      );
  }

  public toggleTheme(): void {
    this.themingService.toggleTheme();
  }

  public onSubmitPropmt(): void {
    if (!this.options.invalid) {
      this.isChatbotOpen = false;
      this.isLoading.next(true);
      this.getOllamaRes(this.options.get('chatBox')?.value);
    }
  }

  private getOllamaRes(prompt?: string): void {
    prompt
      ? this.ollamaService
          .getOllamaResponse(prompt)
          .pipe(
            tap({
              next: (response) => {
                console.log(response);
                this.alephResponse = response;
                this.isLoading.next(false);
              },
              error: (error) => {
                console.log('Error calling ollama', error);
              },
            })
          )
          .subscribe()
      : null;
  }

  public resetState(): void {
    this.alephResponse = undefined;
    this.isChatbotOpen = true;
  }

  public toggleChatBotOpen(): void {
    this.isChatbotOpen = !this.isChatbotOpen;
    this.alephResponse = undefined;
  }
}
