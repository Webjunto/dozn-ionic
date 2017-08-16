import { ComponentFactoryResolver, ElementRef, Renderer } from '@angular/core';
import { IonicApp, Config, Platform, App } from 'ionic-angular';
import { DoznService } from './dozn.service';
export declare class DoznApp extends IonicApp {
    private doznService;
    constructor(_userCmp: any, _cfr: ComponentFactoryResolver, elementRef: ElementRef, renderer: Renderer, config: Config, _plt: Platform, app: App, doznService: DoznService);
    ngOnInit(): void;
}
