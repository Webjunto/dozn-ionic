import { InjectionToken } from '@angular/core';
import { ViewController, Navbar } from 'ionic-angular';
import { DoznService } from './dozn.service';

export interface IDoznConfig {
  apiKey: string;
}

export let DOZN_CONFIG = new InjectionToken<IDoznConfig>('dozn.config');

export function getNavBarInstance(viewCtrl: ViewController): Navbar {
  let navBarInstance = null;

  const keys = Object.keys(viewCtrl);
  for (let i = 0, len = keys.length; i < len; i++) {
    const prop: any = (<any>viewCtrl)[keys[i]];
    if (prop instanceof Navbar) {
      navBarInstance = prop;
      break;
    }
  }

  return navBarInstance;
}


export function decorateNavbarBackButtonClick(navbar: Navbar, doznService: DoznService) {
  const originalBackButtonClickFn = navbar.backButtonClick;

  const decoratedFn = (event: UIEvent) => {
    doznService.doznEvents.next(event);
    originalBackButtonClickFn.bind(navbar, event)();
  }

  navbar.backButtonClick = decoratedFn;
}
