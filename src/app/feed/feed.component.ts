import { Observable } from 'rxjs';
import { ChatMessageModel } from './../models/chat-message.model';
import { ChatService } from './../services/chat.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<ChatMessageModel[]>;
  receiverId: string;
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.receiverId = p.id;
      this.feed = this.chatService.getMessages(this.receiverId);
    });
  }

  ngOnChanges() {
    this.feed = this.chatService.getMessages(this.receiverId);
  }
}
