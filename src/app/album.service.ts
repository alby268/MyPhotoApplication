import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Album } from './Album';

@Injectable({
  providedIn: 'root'

  
})
export class AlbumService {

  constructor(private http:HttpClient,private router:Router) { }

  getAllAlbums(){

    
    var headers = this.getHeaders();
    
    console.log("Calling getallalbums method with header",headers);

    
    return this.http.get("http://3.144.147.185:8080/api/albums",{headers});
  
  }

  getPhotos(albumId:string|null|undefined){

    var headers = this.getHeaders();
    
    console.log("Calling getallalbums method with header",headers);

    
    return this.http.get("http://3.144.147.185:8080/api/photos/find?id="+albumId,{headers});

  }


  getAlbum(albumId:string|null|undefined){

    var headers = this.getHeaders();
    
    console.log("Calling getalbum method with header",headers);

    
    return this.http.get("http://3.144.147.185:8080/api/albums/find?id="+albumId,{headers});

  }

  saveAlbum(albumTitle:string|undefined,fileName:string){


    var album: Album = {
      coverPhotoUrl: "http://3.144.147.185:8080/api/files/view?key=" + fileName,
      createdBy: "",
      dateCreated: "",
      name: "",
      id: undefined,
    };

    var headers = this.getHeaders();

    return this.http.post("http://3.144.147.185:8080/api/albums",album,{headers})
    .subscribe(albumData=> {

      console.log("album saved:",albumData);
      var album :Album = <Album>(albumData);
      var albumId = <string>album.id;

      // var idd = albumId.toHexString();



      // console.log("albumIdddd",idd)

      this.router.navigate(['albums/',albumId])


      

    })

  }


  updateAlbumCover(album:Album){


    var headers = this.getHeaders();

    return this.http.put("http://3.144.147.185:8080/api/albums",album,{headers})
    .subscribe(albumData=> {

      console.log("album saved:",albumData);
      var album :Album = <Album>(albumData);
      var albumId = album.id;

      this.router.navigate(['albums/',albumId])


      

    })

  }





  

  getHeaders(){

    

    var headers  = {

    'idToken': localStorage.getItem('userIdToken') || '{}'

    };

    return headers;
  }
}
