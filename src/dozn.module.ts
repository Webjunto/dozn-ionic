import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { IonicModule } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { DoznService } from './dozn.service';
import { DoznApp } from './dozn-root.component';
import { DoznModal } from './modal/modal.component';
import { environment } from './environment';

@NgModule({
  imports: [
    IonicModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [
    DoznApp,
    DoznModal
  ],
  exports: [
    DoznApp,
  ],
  entryComponents: [
    DoznApp,
    DoznModal
  ]
})
export class DoznModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DoznModule,
      providers: [
        DoznService,
        Device
      ]
    };
  }
}
