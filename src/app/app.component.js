var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserProvider } from './../providers/user/user';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemProvider } from '../providers/item/item';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, app, userProvider, itemProvider) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.app = app;
        this.userProvider = userProvider;
        this.itemProvider = itemProvider;
        this.rootPage = TabsPage;
        this.colorPrimary = "#000000";
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Trang chủ', name: 'HomePage', index: 0 },
            { title: 'Nhóm sản phẩm', name: 'ItemCollectionPage', index: 1 },
            { title: 'Giỏ hàng', name: 'ItemCartPage', index: 2 },
            { title: 'Tài khoản', name: 'MePage', index: 3 },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // this.statusBar.overlaysWebView(true);
            // this.itemProvider.getConfig()
            // .subscribe((data:any) => {
            //   this.colorPrimary = data.home.color.primary;
            //   this.statusBar.backgroundColorByHexString(this.colorPrimary);
            // });
            if (_this.platform.is('ios') || _this.platform.is('windows')) {
                _this.statusBar.styleBlackTranslucent();
                _this.statusBar.overlaysWebView(false);
                _this.statusBar.backgroundColorByName('transparent');
            }
            else {
                _this.statusBar.backgroundColorByHexString("#33000000");
                _this.statusBar.overlaysWebView(true);
            }
            // this.statusBar.backgroundColorByHexString('#000');
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        // this.nav.setRoot(page.component);
        var params = {};
        // the nav component was found using @ViewChild(Nav)
        // setRoot on the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            params = { tabIndex: page.index };
            // console.log('this page',page)
        }
        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menu
        if (this.nav.getActiveChildNavs().length && page.index != undefined) {
            this.nav.getActiveChildNavs()[0].select(page.index);
        }
        else {
            console.log('set root with page.namae', page.name);
            // Set the root of the nav with params if it's a tab index
            this.nav.setRoot(page.name, params).catch(function (err) {
                console.log("Didn't set nav root: " + err);
            });
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            App,
            UserProvider,
            ItemProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map