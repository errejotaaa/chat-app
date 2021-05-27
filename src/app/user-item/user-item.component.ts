import { UserModel } from './../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { FirebaseOperationCases } from '@angular/fire/database/interfaces';
import firebase from 'firebase/app';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  @Input() user: UserModel;
  constructor() {}

  ngOnInit(): void {}
}
