import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { DoznService } from '../dozn.service';

@Component({
  selector: 'dozn-modal',
  templateUrl: 'modal.component.html'
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
  ) {}

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
      this._viewCtrl.dismiss();
    }
  }
}
