import { TabsPageModule } from './../pages/tabs/tabs.module';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, InjectionToken } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemProvider } from '../providers/item/item';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductCartStoreModule } from '../store/product-cart/product-cart.module';
import { reducers, getInitialState } from '../store/root.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserProvider } from '../providers/user/user';
import { SeenProductStoreModule } from '../store/seen-product/seen-product.module';
import { DirectivesModule } from '../directives/directives.module';

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<any>>('Registered Reducers');
// WORKAROUND HERE 
Object.assign(REDUCERS_TOKEN, reducers)
// WORKAROUND HERE 


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DirectivesModule,
    IonicModule.forRoot(MyApp,{
      // Tabs config
      // tabsHideOnSubPages: true,
      backButtonText: '',
      backButtonIcon: "md-arrow-back",
      platforms: {
        ios: {
          // statusbarPadding: false,
          // menuType: 'overlay'
        }
      }
    }),
    HttpClientModule,
    ProductCartStoreModule,
    SeenProductStoreModule,
    TabsPageModule,
    StoreModule.forRoot(
      REDUCERS_TOKEN,
      {initialState: getInitialState}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25 
    }),
    EffectsModule.forRoot([]),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ItemProvider,
    { provide: REDUCERS_TOKEN, useValue: reducers },
    UserProvider,
  ]
})
export class AppModule {}
