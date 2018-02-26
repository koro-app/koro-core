var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserProvider } from './../../providers/user/user';
import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
var MePage = /** @class */ (function () {
    function MePage(navCtrl, navParams, userProvider, renderer, loadCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.renderer = renderer;
        this.loadCtrl = loadCtrl;
        this.showUserFrame = false;
        this.fromAccountLink = false;
        this.showLoad();
        this.checkUserLogin();
    }
    MePage.prototype.showLoad = function () {
        this.loader = this.loadCtrl.create({ content: 'Vui lòng đợi...' });
        this.loader.present();
    };
    MePage.prototype.checkUserLogin = function () {
        var _this = this;
        if (this.userProvider.user != null)
            this.checkLogic(this.userProvider.user);
        else
            this.userProvider.checkUser().then(function (user) { return _this.checkLogic(user); });
    };
    MePage.prototype.checkLogic = function (user) {
        if (user) {
            // go to account page
            this.showUserFrame = true;
            this.fromAccountLink = true;
        }
        else {
            // go to login page
            this.showUserFrame = false;
            this.fromAccountLink = false;
        }
    };
    MePage.prototype.accountLoad = function (event, iframe) {
        var location = iframe.contentWindow.location.href;
        switch (location) {
            // Direct access to Account Page
            case 'https://suplo-food.myharavan.com/account':
                this.userProvider.userState(true);
                this.frame(iframe);
                break;
            // // Direct access to Login Page
            // case 'https://suplo-food.myharavan.com/account/login':
            //   this.frame(iframe)
            //   break;
            // // redirected from Account Page
            // case 'https://suplo-food.myharavan.com/account/logout':
            //   this.frame(iframe)
            //   break;
            // redirect link, from account page, Force reload loginFrame
            case 'https://suplo-food.myharavan.com/':
                this.userProvider.userState(false);
                if (iframe)
                    this.renderer.setStyle(iframe, 'display', 'none');
                this.renderer.setAttribute(iframe, 'src', 'https://suplo-food.myharavan.com/account/login');
                break;
            default:
                this.frame(iframe);
                break;
        }
    };
    MePage.prototype.frame = function (iframe) {
        var doc = iframe.contentWindow.document || iframe.contentDocument;
        var login = doc.querySelector('input[value="Đăng nhập"]');
        var logout = doc.getElementById('customer_logout_link');
        var username = doc.getElementsByClassName('h5')[0];
        if (logout && username) {
            this.userProvider.saveUsername(username.innerHTML);
            //creating logout html element
            username.parentNode.insertBefore(logout, username.nextSibling);
            this.enableLoadingEventFrom(logout, iframe);
        }
        else {
            var loginBox = doc.getElementById('CustomerEmail');
            if (loginBox)
                loginBox.focus();
            this.enableLoadingEventFrom(login, iframe);
        }
        this.hiddenWebElement(doc);
    };
    MePage.prototype.enableLoadingEventFrom = function (element, iframe) {
        var _this = this;
        if (element) {
            var elementListener_1 = this.renderer.listen(element, 'click', function (event) {
                elementListener_1();
                _this.loader = _this.loadCtrl.create({
                    content: 'Vui lòng đợi...'
                });
                _this.loader.present();
                if (iframe)
                    _this.renderer.setStyle(iframe, 'display', 'none');
            });
        }
        // then show iframe
        if (iframe)
            this.renderer.setStyle(iframe, 'display', 'block');
        this.loader.dismissAll();
    };
    MePage.prototype.hiddenWebElement = function (doc) {
        if (doc) {
            this.renderer.setStyle(doc.getElementById('tai-khoan'), 'padding-bottom', '80px');
            this.renderer.setStyle(doc.getElementById('tai-khoan'), 'padding-top', '1px');
            this.renderer.setStyle(doc.getElementById('breadcrumb-wrapper'), 'display', 'none');
            this.renderer.setStyle(doc.getElementById('header'), 'display', 'none');
            this.renderer.setStyle(doc.getElementById('footer'), 'display', 'none');
            this.renderer.setStyle(doc.getElementById('mobile-bottom-navigation'), 'display', 'none');
            this.renderer.setStyle(doc.getElementById('back-to-top'), 'display', 'none');
        }
    };
    MePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-me',
            templateUrl: 'me.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            UserProvider,
            Renderer2,
            LoadingController])
    ], MePage);
    return MePage;
}());
export { MePage };
//# sourceMappingURL=me.js.map