import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { ReviewService } from './review.service';
import 'rxjs/Rx';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule, [ReviewService]);
