import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { ReviewService } from './review.service';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule, [ReviewService]);
