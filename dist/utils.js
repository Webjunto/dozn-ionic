import { InjectionToken } from '@angular/core';
import { Navbar } from 'ionic-angular';
export var DOZN_CONFIG = new InjectionToken('dozn.config');
export function getNavBarInstance(viewCtrl) {
    var navBarInstance = null;
    var keys = Object.keys(viewCtrl);
    for (var i = 0, len = keys.length; i < len; i++) {
        var prop = viewCtrl[keys[i]];
        if (prop instanceof Navbar) {
            navBarInstance = prop;
            break;
        }
    }
    return navBarInstance;
}
export function decorateNavbarBackButtonClick(navbar, doznService) {
    var originalBackButtonClickFn = navbar.backButtonClick;
    var decoratedFn = function (event) {
        doznService.doznEvents.next(event);
        originalBackButtonClickFn.bind(navbar, event)();
    };
    navbar.backButtonClick = decoratedFn;
}
//# sourceMappingURL=utils.js.map