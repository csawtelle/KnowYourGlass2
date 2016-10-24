import { Component } from '@angular/core';
@Component({
  selector: 'kyg-app',
  styles: [`
    .active { color:#000 !important; }
  `],
  templateUrl: 'views/app.component.html',
})
export class AppComponent { 
  message="Message from component";
}
