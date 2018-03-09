import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { DoznService } from '../dozn.service';
import { DoznIonic } from '../models/models';

@Component({
  selector: 'dozn-modal',
  template: `
  <ion-content>
    <h1>Welcome to</h1>
    <h2>Dozn</h2>
    <form>
      <auto-complete (create)="onCreate($event)" (autocompleteSelected)="onSelect($event)" label="SELECT USER" type="user"></auto-complete>
      <auto-complete (create)="onCreate($event)" (autocompleteSelected)="onSelect($event)" label="SELECT FEATURE" type="feature"></auto-complete>
      <auto-complete (create)="onCreate($event)" (autocompleteSelected)="onSelect($event)" label="SELECT FLOW" type="flow"></auto-complete>
      <div class="submit-button">
        <button type="submit" [disabled]="isDisabledBeginSession()" (click)="onSubmit()">Begin Session</button>
      </div>
    </form>
  </ion-content>
`,
  styles: [
    `ion-content {
      background: #6c1d91; /* Old browsers */
      background: -moz-linear-gradient(top, #6c1d91 36%, #76588c 86%, #845496 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top, #6c1d91 36%,#76588c 86%,#845496 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, #6c1d91 36%,#76588c 86%,#845496 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }`,
    `h1, h2, h4 {
      display: flex;
      justify-content: center;
      font-family: Arial, Helvetica, sans-serif;
      color: #fff;
    }`,
    `form {
      font-family: Arial, Helvetica, sans-serif;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
    }`,
    `form .submit-button {
      margin-top: 50px;
      display: flex;
      justify-content: center;
    }`,
    `form .submit-button button {
      padding-left: 50px;
      padding-right: 50px;
      padding-top: 10px;
      padding-bottom: 10px;
      border: none;
      border-radius: 16px;
      font-size: 14px;
      color: #fff;
      background-color: #ff9933;
    }`
  ]
})
export class DoznModalComponent {
  sessionData: DoznIonic.SessionOptions = {
    user: '',
    feature: '',
    flow: ''
  };

  constructor(
    private _viewCtrl: ViewController,
    private _dozn: DoznService
  ) { }

  onSelect(event: DoznIonic.SelectOption) {
    this.sessionData[event.type] = event.name;
  }

  async onCreate(event: DoznIonic.CreateOption) {
    if (event.type === 'feature') {
      const feature = await this._dozn.createFeature(event.name).toPromise();
      this.sessionData[event.type] = feature.text();
    } else if (event.type === 'flow') {
      const flow = await this._dozn.createFlow(event.name, this.sessionData.feature).toPromise();
      this.sessionData[event.type] = flow.text();
    } else {
      return;
    }
  }

  isDisabledBeginSession() {
    if(this.sessionData.feature === '' || this.sessionData.flow === '' || this.sessionData.user === '') {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.sessionData.user && this.sessionData.feature && this.sessionData.flow) {
      this._dozn.startSession(this.sessionData.user, this.sessionData.feature, this.sessionData.flow);
      this._viewCtrl.dismiss();
    }
  }
}
