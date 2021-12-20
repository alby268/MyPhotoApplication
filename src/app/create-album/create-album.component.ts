import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { FileService } from '../file.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {

  albumTitle: string | undefined;

  constructor(private fileService: FileService,private albumService:AlbumService) { }

  ngOnInit(): void {
  }

  createAlbum(event:any){

    console.log("file:",event.target.files[0]);
    this.fileService.uploadFile(event.target.files[0]).subscribe(
      fileResponse => {
        console.log("File response from service:", fileResponse)
        if (fileResponse==true){

          var fileName = event.target.files[0].name;
          this.saveAlbum(fileName);

        }
      }
    )
  }


  saveAlbum(fileName:string){

    this.albumService.saveAlbum(this.albumTitle,fileName)


  }
}
