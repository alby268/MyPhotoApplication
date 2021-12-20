import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'Profile Page Title'

  imageUrl = 'https://www.slashfilm.com/img/gallery/movies-like-interstellar-that-are-definitely-worth-watching/intro-1625174566.webp'

  viewCount = 0;

  name = "Albin";

  list =["item1","item2","item3"];

  user : User | undefined ;

  
  constructor(private userService:UserService) { }

  ngOnInit(): void {

    this.userService.getCurrentUserProfile().subscribe(

      userProfile=>{

        this.user = <User>userProfile;
        console.log("Got user profilee",this.user);

        

      }
    )
  }

  incrementCount(){

    this.viewCount++;

  }

}
