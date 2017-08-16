var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Inject, ComponentFactoryResolver, ElementRef, Renderer } from '@angular/core';
import { IonicApp, Config, Platform, App } from 'ionic-angular';
import { AppRootToken } from 'ionic-angular/components/app/app-root';
import { DoznService } from './dozn.service';
import * as utils from './utils';
var DoznApp = (function (_super) {
    __extends(DoznApp, _super);
    function DoznApp(_userCmp, _cfr, elementRef, renderer, config, _plt, app, doznService) {
        var _this = _super.call(this, _userCmp, _cfr, elementRef, renderer, config, _plt, app) || this;
        _this.doznService = doznService;
        app.viewDidEnter
            .subscribe(function (viewCtrl) {
            var navbar = utils.getNavBarInstance(viewCtrl);
            if (navbar) {
                utils.decorateNavbarBackButtonClick(navbar, doznService);
            }
        });
        renderer.listenGlobal('document', 'click', function (event) {
            doznService.doznEvents.next(event);
        });
        renderer.listenGlobal('document', 'input', function (event) {
            doznService.doznEvents.next(event);
        });
        return _this;
    }
    DoznApp.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    return DoznApp;
}(IonicApp));
export { DoznApp };
DoznApp.decorators = [
    { type: Component, args: [{
                selector: 'ion-app',
                template: '<div #viewport app-viewport></div>' +
                    '<div #modalPortal overlay-portal></div>' +
                    '<div #overlayPortal overlay-portal></div>' +
                    '<div #loadingPortal class="loading-portal" overlay-portal></div>' +
                    '<div #toastPortal class="toast-portal" [overlay-portal]="10000"></div>' +
                    '<div class="click-block"></div>'
            },] },
];
/** @nocollapse */
DoznApp.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [AppRootToken,] },] },
    { type: ComponentFactoryResolver, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: Config, },
    { type: Platform, },
    { type: App, },
    { type: DoznService, },
]; };
//# sourceMappingURL=dozn-root.component.js.map