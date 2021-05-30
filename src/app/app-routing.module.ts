import { Auth2Guard } from './auth2.guard';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { StartChatComponent } from './start-chat/start-chat.component';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [Auth2Guard] },
  { path: 'login', component: LoginComponent, canActivate: [Auth2Guard] },
  {
    path: 'chat',
    component: ChatRoomComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StartChatComponent },
      { path: 'profile', component: ProfileComponent },
      { path: ':id', component: ChatContentComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
