import { NgModule } from '@angular/core';
import { DisqusComponent } from './disqus/disqus.component';
import { WindowService } from "./disqus/window.service";
@NgModule({
  declarations: [DisqusComponent],
  providers: [WindowService],
  exports: [DisqusComponent]
})
export class DisqusModule{}
export { DisqusComponent }
