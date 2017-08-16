import { Http } from '@angular/http';
import { App, Platform } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { IDoznConfig } from './utils';
export declare class DoznService {
    http: Http;
    app: App;
    platform: Platform;
    currentViewName: string;
    eventSession: string;
    doznEvents: Subject<{}>;
    constructor(config: IDoznConfig, http: Http, app: App, platform: Platform);
    private prepareEvtData(event);
}
