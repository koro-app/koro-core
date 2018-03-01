import { SeenProductEffects } from './seen-product.effects';
import { SeenProductService } from './seen-product.service';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
  ],
  imports: [
    EffectsModule.forFeature([SeenProductEffects])
  ],
  providers: [
        SeenProductService,
  ]
})
export class SeenProductStoreModule {}
