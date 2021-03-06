import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { ReviewService } from './review.service';
import { AuthService } from './auth.service';
import 'rxjs/Rx';
import './css/main.css';
import './css/home.css';
import './css/mobile_view.css';
import './css/navbar.css';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule, [AuthService, ReviewService]);
