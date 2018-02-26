var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TabsPageModule } from './../pages/tabs/tabs.module';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, InjectionToken } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemProvider } from '../providers/item/item';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductCartStoreModule } from '../store/product-cart/product-cart.module';
import { reducers, getInitialState } from '../store/root.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserProvider } from '../providers/user/user';
export var REDUCERS_TOKEN = new InjectionToken('Registered Reducers');
// WORKAROUND HERE 
Object.assign(REDUCERS_TOKEN, reducers);
// WORKAROUND HERE 
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp, {
                    // Tabs config
                    tabsHideOnSubPages: true,
                }),
                HttpClientModule,
                ProductCartStoreModule,
                TabsPageModule,
                StoreModule.forRoot(REDUCERS_TOKEN, { initialState: getInitialState }),
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
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                ItemProvider,
                { provide: REDUCERS_TOKEN, useValue: reducers },
                HTTP,
                UserProvider,
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map