import { InjectionToken } from '@angular/core';
import { ViewController, Navbar } from 'ionic-angular';
import { DoznService } from './dozn.service';
export interface IDoznConfig {
    projectKey: string;
}
export declare let DOZN_CONFIG: InjectionToken<IDoznConfig>;
export declare function getNavBarInstance(viewCtrl: ViewController): Navbar;
export declare function decorateNavbarBackButtonClick(navbar: Navbar, doznService: DoznService): void;
