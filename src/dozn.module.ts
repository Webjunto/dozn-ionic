import { IonicModule } from 'ionic-angular';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { DOZN_CONFIG, IDoznConfig } from './utils';
import { DoznService } from './dozn.service';
import { DoznApp } from './dozn-root.component';

@NgModule({
  imports: [
    IonicModule,
  ],
  declarations: [
    DoznApp,
  ],
  exports: [
    DoznApp,
  ],
})
export class DoznModule {
  static forRoot(doznConfig: IDoznConfig): ModuleWithProviders {
    return {
      ngModule: DoznModule,
      providers: [
        { provide: DOZN_CONFIG, useValue: doznConfig },
        DoznService
      ],
    };
  }
}
