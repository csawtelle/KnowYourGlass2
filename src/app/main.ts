import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { ReviewService } from './review.service';
import { AuthService } from './auth.service';
import 'rxjs/Rx';
import './css/main.css';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule, [AuthService, ReviewService]);
