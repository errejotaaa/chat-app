import { AuthService } from './../services/auth.service';
import { ChatMessageModel } from './../models/chat-message.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessageModel;
  userEmail: string;
  username: string;
  messageContent: string;
  timeStamp: Date;
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authUser().subscribe((user) => {
      this.ownEmail = user?.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
    let chatMessage = this.chatMessage;
    this.messageContent = chatMessage.message;
    this.timeStamp = new Date(chatMessage.timeSent);
    this.userEmail = chatMessage.email;
    this.username = chatMessage.username;
  }
}
