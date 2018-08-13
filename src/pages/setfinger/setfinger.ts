import { Component } from '@angular/core';
import { NavController, NavParams , AlertController } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

/**
 * Generated class for the SetfingerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setfinger',
  templateUrl: 'setfinger.html',
})
export class SetfingerPage {
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public finger :FingerprintAIO
  , public alert: AlertController
) {
    if( this.CheckFingerCanUse()){

    }
    else
    {
        //แจ้งเตือนกรณี login not success
        let alert = this.alert.create({
          message: 'อุปกรณ์ไม่รองรับ',
          buttons: [
            {
              text: 'ตกลง',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SetfingerPage');
  }
  CheckFingerCanUse(){
    console.log('check');
    this.finger.isAvailable().then(result =>{
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }
  CallFingerPrint(){
    console.log('show');
    this.finger.show({
     clientId: "Fingerprint-Demo"
    }).then(result => {
          console.log(result);
        }).catch(err => {
          console.log(err);
        });
  }
}
