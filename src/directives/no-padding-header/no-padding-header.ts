import { Directive, ElementRef, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the NoPaddingHeaderDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[no-padding-header]'// Attribute selector
})
export class NoPaddingHeaderDirective {
  constructor(
    public element: ElementRef,
    public renderer: Renderer,
    public platform: Platform
  ) {
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')){
        if(this.platform.version().num < 5){
          this.renderer.setElementStyle(this.element.nativeElement, 'padding-top', '0');
          this.renderer.setElementStyle(this.element.nativeElement, 'top', '0');
        }
      }
    }else{
      this.renderer.setElementStyle(this.element.nativeElement, 'padding-top', '0');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', '0');
    }
  }

}
