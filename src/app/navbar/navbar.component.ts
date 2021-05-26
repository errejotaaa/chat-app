import { ChatService } from './../services/chat.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userId: string;
  userEmail: string;
  toggle: boolean = false;
  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.authService.authUser().subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        this.userId = user.uid;
      }
    });
  }

  ngOnInit(): void {}

  toggleSlide() {
    this.toggle = !this.toggle;
    this.chatService.toggle.next(this.toggle);
  }

  logout() {
    this.userEmail = null;
    this.userId = null;
    this.authService.logout();
  }
}
