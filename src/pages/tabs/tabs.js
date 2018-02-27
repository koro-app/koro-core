var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Store } from '@ngrx/store';
import { UserProvider } from './../../providers/user/user';
import { Tabs, NavController, IonicPage, NavParams } from 'ionic-angular';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Events } from 'ionic-angular';
var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, navParams, events, cd, userProvider, store) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.cd = cd;
        this.userProvider = userProvider;
        this.store = store;
        this.tab1Root = 'HomePage';
        this.tab2Root = 'ItemListCollectionPage';
        this.tab3Root = 'ItemCartPage';
        this.tab4Root = 'MePage';
        this.selectedIndex = 0;
        this.selectedIndex = navParams.data.tabIndex || 0;
        this.events.subscribe('selectTabs', function (select) {
            _this.tabRef.select(select);
            console.log('someone select to tab', select);
            cd.detectChanges();
        });
        this.getProductNumber();
    }
    TabsPage.prototype.tabChange = function (event) {
        // if (event.id == "t0-3") {
        //   this.userProvider.checkUser().then(user =>{
        //     if (user) this.userProvider.inAppAccount()
        //     else this.userProvider.inAppLogin();
        //   })
        // }
    };
    TabsPage.prototype.getProductNumber = function () {
        // this.productNumber = this.store.select('cart','ids')
        // .map(ids => ids.length)
        this.productNumber = this.store.select('cart', 'ids')
            .map(function (ids) { return ids.length; });
        // .do(data => console.log('data',data))
    };
    __decorate([
        ViewChild('myTabs'),
        __metadata("design:type", Tabs)
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        IonicPage(),
        Component({
            templateUrl: 'tabs.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Events,
            ChangeDetectorRef,
            UserProvider,
            Store])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.js.map