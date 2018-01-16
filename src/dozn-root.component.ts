import { Component, Inject, ComponentFactoryResolver, ElementRef, Renderer } from '@angular/core';
import { IonicApp, Config, Platform, App, ViewController, ModalController } from 'ionic-angular';
import { AppRootToken } from 'ionic-angular/components/app/app-root';

import { DoznService } from './dozn.service';
import * as utils from './utils';
import { DoznModal } from './modal/modal.component';

@Component({
  selector: 'ion-app',
  template:
    '<div #viewport app-viewport></div>' +
    '<div #modalPortal overlay-portal></div>' +
    '<div #overlayPortal overlay-portal></div>' +
    '<div #loadingPortal class="loading-portal" overlay-portal></div>' +
    '<div #toastPortal class="toast-portal" [overlay-portal]="10000"></div>' +
    '<div class="click-block"></div>'
})
export class DoznApp extends IonicApp {

  constructor(
    @Inject(AppRootToken) _userCmp: any,
    _cfr: ComponentFactoryResolver,
    elementRef: ElementRef,
    renderer: Renderer,
    config: Config,
    _plt: Platform,
    app: App,
    private doznService: DoznService,
    public modalCtrl: ModalController
  ) {
    super(_userCmp, _cfr, elementRef, renderer, config, _plt, app);

    app.viewDidEnter
      .subscribe((viewCtrl: ViewController) => {
        const navbar = utils.getNavBarInstance(viewCtrl);

        if (navbar) {
          utils.decorateNavbarBackButtonClick(navbar, doznService);
        }
      });

    renderer.listenGlobal('document', 'click', (event: UIEvent) => {
      if (doznService.flowSession) {
        doznService.doznEvents.next(event);
       }
    });

    renderer.listenGlobal('document', 'input', (event: UIEvent) => {
      if (doznService.flowSession) {
        doznService.doznEvents.next(event);
       }
    });
  }

  ngOnInit() {
    super.ngOnInit();
    let doznModal = this.modalCtrl.create(DoznModal);
    doznModal.onDidDismiss(() => {
      this.doznService.currentViewName = 'DoznApp';
    });
    doznModal.present();
  }
}
