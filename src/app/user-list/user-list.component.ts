import { AuthService } from './../services/auth.service';
import { UserModel } from './../models/user.model';
import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: UserModel[];
  user: firebase.User;
  constructor(
    private chatService: ChatService,
    private authSerive: AuthService
  ) {
    this.authSerive.authUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.chatService.getUsers().subscribe((users) => {
      this.users = users.filter((user) => user.email != this.user.email);
      console.log(this.users);
    });
  }
}
