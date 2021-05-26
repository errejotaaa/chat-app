import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
  animations: [
    trigger('slideState', [
      state('closed', style({ transform: 'translateX(0)' })),
      state('open', style({ transform: 'translateX(1000px)' })),
      transition('closed => open', animate(300)),
      transition('open => closed', animate(300)),
    ]),
  ],
})
export class ChatRoomComponent implements OnInit {
  state = 'closed';
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.toggle.subscribe((t) => {
      this.state = t ? 'open' : 'closed';
    });
  }
}
