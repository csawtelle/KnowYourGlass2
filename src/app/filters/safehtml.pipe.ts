import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe {
  constructor(private sanitizer:DomSanitizer){}

  transform(style: any) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}
