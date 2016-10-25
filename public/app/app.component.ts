

import { Component } from '@angular/core';
@Component({
  selector: 'kyg-app',
  styles: [`
    .active { color:#000 !important; }
    .navbar { margin-bottom: 50px; }
  `],
  templateUrl: 'views/app.html',
})
export class AppComponent { 
  message="Message from component";
}
