import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvvvatarsComponent } from '@ngneat/avvvatars';

@Component({
  selector: 'avatar',
  standalone: true,
  imports: [AvvvatarsComponent, CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Output()
  avatarSelected:EventEmitter<boolean> =new EventEmitter();

  @Input()
  size: number = 80;

  @Input()
  displayText: boolean = true;
}
