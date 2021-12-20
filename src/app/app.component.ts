import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(public userService:UserService,
    public messageService:MessageService){

  }
  
  title = 'MyPhotoApplication';

  logout() {

    console.log("user signed out")
  
    this.userService.logout();
  
  }

  clearMessages(){
    this.messageService.clearMessages();
  }
}

