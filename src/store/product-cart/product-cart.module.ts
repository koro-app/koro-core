import { ProductCartEffects } from './product-cart.effects';
import { ProductCartService } from './product-cart.service';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
  ],
  imports: [
    EffectsModule.forFeature([ProductCartEffects])
  ],
  providers: [
      ProductCartService,
  ]
})
export class ProductCartStoreModule {}
