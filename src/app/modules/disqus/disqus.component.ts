import { Component, Input, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Renderer, ChangeDetectionStrategy } from '@angular/core';
import { WindowService } from './window.service';

@Component({
  selector: 'disqus',
  template: '<div id="disqus_thread"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DisqusComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() identifier: string;
  @Input() shortname: string;
  @Input() url: string;
  @Input() categoryId: string;
  @Input() lang: string;
  @Input() title: string;

  /** Remove DISQUS script on destroy
   *  This is useful to let DISQUS change its theme according if the page background color changed.
   */
  @Input() removeOnDestroy: boolean;

  _window: any;
  _disqus: any;
  _disqus_config: any;
  reset: any = 0;

  constructor(private el: ElementRef,
    private renderer: Renderer,
    windowRef: WindowService) {
    this._window = windowRef.nativeWindow;
  }

  ngAfterViewInit() {
    this.addDisqusScript();
  }

  ngAfterViewChecked() {
    if(!this.reset) {
      if (this._window.DISQUS) {
        let _self = this;
        this._window.DISQUS.reset({ 
          reload: true,
          config: function () {
            this.page.url = "http://christophersawtelle.com/review/test3test3test"; //this.validateUrl(_self.url);
            this.page.identifier = "testtest3"; //_self.identifier;
            this.page.category_id = ""; //_self.categoryId;
            this.language = "en"; //_self.lang;
            this.page.title = "BestTitle3"; //_self.title;
          }
        });
        console.log("this window disqus after");
        console.log(this._window.DISQUS);
        this.reset = 1;
      }
    }
  }
  /**
   * Add disqus script to the document.
   */
  addDisqusScript() {
    let script = this.renderer.createElement(this.el.nativeElement, 'script');
    script.src = `//${this.shortname}.disqus.com/embed.js`;
    script.async = true;
    script.type = 'text/javascript';
    script.setAttribute('data-timestamp', new Date().getTime().toString());
  }

  /**
   * Get disqus config
   */
  getConfig() {
    return function () {
      this.page.url = this.validateUrl(this.url);
      this.page.identifier = this.identifier;
      this.page.category_id = this.categoryId;
      this.language = this.lang;
			this.page.title = this.title;
      
    };
  }

  validateUrl(url: string) {
    /** If URL is specified then validate it, otherwise use window URL */
    if (url) {
      let r = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

      if (r.test(url)) {
        return url;
      } else {
        console.warn('[Disqus]: Invalid URL, fallback to Window URL');
      }
    }
    /** fallback to "Window" URL, or to "Global" in universal */
    return (this._window) ? this._window.location.href : (<any>global).url || '';
  }

  ngOnDestroy() {
  }

}
