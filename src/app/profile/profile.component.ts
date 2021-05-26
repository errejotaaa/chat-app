import { AuthService } from './../services/auth.service';
import { UserModel } from './../models/user.model';
import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  displayName: string;
  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chatService.getUser().subscribe((user) => {
      this.displayName = user.displayName;
    });
  }

  onSaveChanges() {
    this.authService.setUserDisplayName(this.displayName);
    alert('Display Name Chaged Succesfully');
  }
}
