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
      <auto-complete (create)="onCreate($event)" (autocompleteSelected)="onSelect($event)" [project]="project" label="SELECT USER" type="userProfiles"></auto-complete>
      <auto-complete (create)="onCreate($event)" (autocompleteSelected)="onSelect($event)" [project]="project" label="SELECT FEATURE" type="features"></auto-complete>
      <auto-complete (create)="onCreate($event)" (autocompleteSelected)="onSelect($event)" [project]="project" label="SELECT FLOW" type="flows"></auto-complete>
      <div class="submit-button">
        <button type="submit" (click)="onSubmit()">Begin Session</button>
      </div>
    </form>
  </ion-content>
`
})
export class DoznModalComponent {
  project;
  data = {
    userProfiles: '',
    features: '',
    flows: ''
  };

  constructor(
    private _viewCtrl: ViewController,
    private _dozn: DoznService
  ) {
    this.project = this._dozn.projectName;
  }

  onSelect(event) {
    this.data[event.type] = event.item.id;
  }

  onCreate(event) {
    if (event.type === 'features') {
      this._dozn.createFeature(name);
    } else if (event.type === 'flows') {
      this._dozn.createFlow(name, this.data.features);
    } else {
      return;
    }
  }

  onSubmit() {
    if (this.data.userProfiles && this.data.features && this.data.flows) {
      this._dozn.startSession(this.data.userProfiles, this.data.features,  this.data.flows);
      this._viewCtrl.dismiss();
    }
  }
}
