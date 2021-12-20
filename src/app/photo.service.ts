import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Album } from './Album';
import { Comment } from './Comment';
import { Photo } from './Photo';


@Injectable({
  providedIn: 'root'
})



export class PhotoService {

  constructor(private http:HttpClient,private router:Router) { }

  makeCoverPhoto(){

    
  }

  getAllPhotos(){

    var headers = this.getHeaders();
    return this.http.get("http://3.144.147.185:8080/api/photos",{headers})
  }


  getPhoto(photoId: string|null){


    var headers = this.getHeaders();
    return this.http.get("http://3.144.147.185:8080/api/photos/findbyid?id="+photoId,{headers});



  }

  getComments(photoId: string|null|undefined){

    var headers = this.getHeaders();

    return this.http.get("http://3.144.147.185:8080/api/comments/findbyphotoid?photoId="+photoId);

  }


  


  savePhoto(albumId:string|undefined|null,fileName:string){


    var photo: Photo = {
      albumId: albumId,
      createdBy: "",
      dateCreated: "",
      photoUrl: "http://3.144.147.185:8080/api/files/view?key=" + fileName,
      id: undefined
    };

    var headers = this.getHeaders();

    return this.http.post("http://3.144.147.185:8080/api/photos",photo,{headers})
    .subscribe(photoData=> {

      console.log("photo saved:",photoData);
      var photo :Photo = <Photo>(photoData);
      var photoId = photo.id;

      this.router.navigate(['albums/',albumId])


      

    })

  }


  saveComment(photoId:string|undefined|null,newComment:string|undefined){


    var comment: Comment = {
      createdBy: "",
      dateCreated: "",
      message: newComment,
      photoId: photoId,
      id: undefined
    };

    var headers = this.getHeaders();

    return this.http.post("http://3.144.147.185:8080/api/comments",comment,{headers})
    

  }



  getHeaders(){

    var headers = {

    'idToken': localStorage.getItem('userIdToken') || '{}'

    };

    return headers;
  }
}