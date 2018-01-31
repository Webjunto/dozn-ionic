import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { DoznService } from '../dozn.service';

@Component({
  selector: 'dozn-modal',
  template: `
  <ion-content>
    <h1>Welcome to</h1>
    <h2>Dozn</h2>
    <h4>Intro text</h4>
    <form>
      <auto-complete (create)="onCreate($event)" (autocompleteSelected)="onSelect($event)" label="SELECT USER" type="companyUsers"></auto-complete>
      <auto-complete (create)="onCreate($event)" (autocompleteSelected)="onSelect($event)" label="SELECT FEATURE" type="features"></auto-complete>
      <auto-complete (create)="onCreate($event)" (autocompleteSelected)="onSelect($event)" label="SELECT FLOW" type="flows"></auto-complete>
      <div class="submit-button">
        <button type="submit" (click)="onSubmit()">Begin Session</button>
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
  data = {
    userProfiles: '',
    features: '',
    flows: ''
  };

  constructor(
    private _viewCtrl: ViewController,
    private _dozn: DoznService
  ) { }

  onSelect(event) {
    this.data[event.type] = event.item.id;
  }

  onCreate(event) {
    if (event.type === 'features') {
      this._dozn.createFeature(event.name);
    } else if (event.type === 'flows') {
      this._dozn.createFlow(event.name, this.data.features);
    } else {
      return;
    }
  }

  onSubmit() {
    if (this.data.userProfiles && this.data.features && this.data.flows) {
      this._dozn.startSession(this.data.userProfiles, this.data.features, this.data.flows);
      this._viewCtrl.dismiss();
    }
  }
}
