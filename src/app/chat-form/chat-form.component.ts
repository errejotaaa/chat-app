import { ActivatedRoute } from '@angular/router';
import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css'],
})
export class ChatFormComponent implements OnInit {
  message: string;
  receiverId: string;
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.receiverId = p.id;
    });
  }

  handleSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.send();
      this.message = '';
    }
  }

  send() {
    this.chatService.sendMessage(this.message, this.receiverId);
  }
}
