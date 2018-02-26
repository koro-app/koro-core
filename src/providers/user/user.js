var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var UserProvider = /** @class */ (function () {
    function UserProvider(http, platform, storage) {
        this.http = http;
        this.platform = platform;
        this.storage = storage;
        this.user = null;
        this.checkUser();
    }
    UserProvider.prototype.checkUser = function () {
        var _this = this;
        return this.storage.ready().then(function () {
            return _this.storage.get('user').then(function (user) {
                if (user) {
                    _this.user = true;
                    console.log('from memory: user logged');
                    return user;
                }
                else {
                    _this.user = false;
                    console.log('from memory: user not login yet!');
                    return false;
                }
            });
        });
    };
    UserProvider.prototype.userState = function (state) {
        this.user = state;
        this.storage.set('user', this.user);
    };
    UserProvider.prototype.saveUsername = function (username) {
        this.storage.set('username', username);
    };
    UserProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            Platform,
            Storage])
    ], UserProvider);
    return UserProvider;
}());
export { UserProvider };
//# sourceMappingURL=user.js.map