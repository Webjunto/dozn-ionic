import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

import { DoznService } from '../dozn.service';

@Component({
  selector: 'dozn-modal',
  templateUrl: 'modal.component.html'
})
export class DoznModal {
  features;
  flows;

  constructor(
    private doznService: DoznService,
    private _af: AngularFirestore,
    public viewCtrl: ViewController
  ) {
    this.features = this._af.collection('features').snapshotChanges().map(features => {
      return features.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });

    this.flows = this._af.collection('flows').snapshotChanges().map(flows => {
      return flows.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  onSubmit(form) {
    if (this.doznService && form) {
      this.doznService.startSession(form.form.controls.accessCode.value, form.form.controls.feature.value, form.form.controls.flow.value);
      this.viewCtrl.dismiss();
    }
  }
}
