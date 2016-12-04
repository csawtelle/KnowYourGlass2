import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'api/upload';

@Component({
  selector: 'file-upload',
  templateUrl: './views/uploader.html',
})
export class UploaderComponent {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
