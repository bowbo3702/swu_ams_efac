import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SetfingerPage} from '../setfinger/setfinger';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  GoToPage(sPage){
    switch (sPage) {
      case "SetPin":
       // this.navCtrl.push(SetPin);
          break;
      case "SetFinger":
         this.navCtrl.push(SetfingerPage);
         break;
    }
  }
}
