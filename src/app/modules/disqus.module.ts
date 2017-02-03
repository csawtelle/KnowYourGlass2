import {NgModule} from '@angular/core';
import {DisqusComponent} from './disqus/disqus.component';
import {WindowService} from "./disqus/window.service";
import { DisqusService } from './disqus/disqus.service';

@NgModule({
  declarations: [DisqusComponent],
  providers: [WindowService, DisqusService],
  exports: [DisqusComponent]
})
export class DisqusModule{}
export {DisqusComponent}
