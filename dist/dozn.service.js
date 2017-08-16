import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { App, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { DOZN_CONFIG } from './utils';
var API_URL = 'https://doznapi.herokuapp.com/api';
var DoznService = (function () {
    function DoznService(config, http, app, platform) {
        var _this = this;
        this.http = http;
        this.app = app;
        this.platform = platform;
        this.doznEvents = new Subject();
        app.viewDidEnter.subscribe(function (viewCtrl) {
            _this.currentViewName = viewCtrl.name;
        });
        var newEventSession = {
            project: config.projectKey,
        };
        this.http.post(API_URL + "/EventSessions", newEventSession)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.eventSession = data.id;
        });
        this.doznEvents.asObservable()
            .distinctUntilChanged()
            .switchMap(function (event) {
            var payload = _this.prepareEvtData(event);
            // Save to Backend
            return _this.http.post(API_URL + "/Events", payload);
        })
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            console.log('saved event:', data);
        });
    }
    DoznService.prototype.prepareEvtData = function (event) {
        var actualPath = [];
        var path = event.path.reverse();
        path.splice(0, 6);
        path.forEach(function (el) {
            var className = '';
            // Remove .activated class from buttons
            if (el.nodeName.toLowerCase() === 'button') {
                className = className.replace('.activated', '');
            }
            actualPath.push(el.nodeName.toLowerCase() + className);
        });
        var cssSelectorPath = actualPath.join(' > ');
        // Find index of this specific target element, because selector can match multiples.
        var allElements = document.querySelectorAll(cssSelectorPath);
        var nodeListIndex = 0;
        var elementHtml;
        var elementInnerText;
        for (var len = allElements.length; nodeListIndex < len; nodeListIndex++) {
            var el = allElements.item(nodeListIndex);
            if (el === event.target) {
                try {
                    elementHtml = el.outerHTML;
                    elementInnerText = el.innerText;
                }
                catch (error) {
                    console.error('error in html conversion', error);
                }
                break;
            }
        }
        var doznEvent = {
            eventSession: this.eventSession,
            type: event.type,
            page: this.currentViewName,
            cssSelectorPath: cssSelectorPath,
            nodeListIndex: nodeListIndex,
            elementHtml: elementHtml,
            elementInnerText: elementInnerText,
        };
        if (event.type === 'input') {
            doznEvent.fieldType = event.target.type;
            doznEvent.fieldValue = event.target.value;
        }
        return doznEvent;
    };
    return DoznService;
}());
export { DoznService };
DoznService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DoznService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOZN_CONFIG,] },] },
    { type: Http, },
    { type: App, },
    { type: Platform, },
]; };
//# sourceMappingURL=dozn.service.js.map