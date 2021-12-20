import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

  albumId: string | undefined |null;




  constructor(private route:ActivatedRoute,private fileService: FileService,private photoService:PhotoService) { }

  ngOnInit(): void {




    this.route.paramMap.subscribe(params=> {




    
      this.albumId= params.get('albumId');
      console.log('Got album Id:',this.albumId);
 
   });
  }


  uploadPicture(event:any){

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

    this.photoService.savePhoto(this.albumId,fileName)


  }

}
