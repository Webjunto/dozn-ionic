import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { DOZN_CONFIG } from './utils';
import { DoznService } from './dozn.service';
import { DoznApp } from './dozn-root.component';
var DoznModule = (function () {
    function DoznModule() {
    }
    DoznModule.forRoot = function (doznConfig) {
        return {
            ngModule: DoznModule,
            providers: [
                { provide: DOZN_CONFIG, useValue: doznConfig },
                DoznService
            ],
        };
    };
    return DoznModule;
}());
export { DoznModule };
DoznModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    IonicModule,
                ],
                declarations: [
                    DoznApp,
                ],
                exports: [
                    DoznApp,
                ],
            },] },
];
/** @nocollapse */
DoznModule.ctorParameters = function () { return []; };
//# sourceMappingURL=dozn.module.js.map