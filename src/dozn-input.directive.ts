import { HostListener, Directive } from '@angular/core';

import { DoznService } from './dozn.service';

@Directive({ selector: 'ion-input, ion-searchbar, ion-textarea, input, textarea' })
export class DoznInputDirective {
  constructor(
    public doznService: DoznService
  ) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    this.doznService.doznEvents.next(event);
  }
}
