import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { IonicModule } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { DoznService } from './dozn.service';
import { DoznApp } from './dozn-root.component';
import { DoznModalComponent } from './modal/modal.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DOZN_CONFIG, IDoznConfig } from './utils';

import { FilterPipe } from './autocomplete/filter-pipe';

@NgModule({
  imports: [
    IonicModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    DoznApp,
    DoznModalComponent,
    AutocompleteComponent,
    FilterPipe
  ],
  exports: [
    DoznApp,
  ],
  entryComponents: [
    DoznApp,
    DoznModalComponent,
    AutocompleteComponent
  ]
})
export class DoznModule {
  static forRoot(doznConfig: IDoznConfig): ModuleWithProviders {
    return {
      ngModule: DoznModule,
      providers: [
        { provide: DOZN_CONFIG, useValue: doznConfig },
        DoznService,
        Device
      ]
    };
  }
}
