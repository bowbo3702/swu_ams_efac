import { Component } from '@angular/core';
import { NavController, NavParams , AlertController, ToastController } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { TouchID } from '@ionic-native/touch-id';
import { Platform } from 'ionic-angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
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
  isAvailable:boolean;
  touchIdIsAvailable:boolean;
  sModeFinger:string;
  constructor(public navCtrl: NavController, public navParams: NavParams
  , public toast: ToastController
  , public finger :FingerprintAIO
  , public alert: AlertController
  , public platform: Platform
  , public touchId :TouchID
  , private androidFingerprintAuth: AndroidFingerprintAuth
) {
    this.isAvailable=false;
    console.log(this.platform.platforms.name);
    if (this.platform.is('ios')) {
     if(this.CheckTuchID()){
       this.sModeFinger = "ios";
       this.isAvailable=true;
     }
     
    }
    else   if (this.platform.is('android')) {
      if(this.CheckFingerAndroid()){
        this.sModeFinger = "android";
        this.isAvailable=true;
      }
    }
    else if(this.CheckFingerAIO()){
      this.sModeFinger = this.platform.platforms.name;
    }
    //check can user fingerprint
    if( this.isAvailable)
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
  CheckFingerAIO(): boolean{
    console.log('check');
    let result = false;
    this.finger.isAvailable().then(result =>{
      console.log(result);
      result =  true;
    }).catch(err => {
      console.log(err);
      result =  false;
    });
    return result;
  }
  CallFingerPrintAIO(){
    console.log('show');
    this.finger.show({
     clientId: "Fingerprint-Demo"
    }).then(result => {
          console.log(result);
        }).catch(err => {
          console.log(err);
        });
  }
  CheckTuchID():boolean
  {
    let result = false;
      this.touchId.isAvailable()
    .then(
      res => {console.log('TouchID is available!');result=true;},
      err => {console.error('TouchID is not available', err);result =false;}
    );
    return result
  }
  CallTuchID(){
    this.touchId.isAvailable()
    .then(
      res => {
        // console.log('TouchID is available!')
        // this.presentToastCtrl('TouchID is available!', 4000, 'top'); 
        this.touchId.verifyFingerprint('Scan your TouchID ')
          .then(
            res => {
              // console.log('Ok', res);
              // this.presentToast('OK:' + res);
              //this.navCtrl.push(MenuPage);
            },
            err => {
              console.error('Error:', err);
              this.presentToast('Error:' + err);
            }
          )
          .catch((error: any) => {
            this.presentToast(error);
            console.log('err: ', error);
          });

      },
      err => {
        console.error('TouchID is not available', err)
        this.presentToast('TouchID is not available ' + err);
      }
    )
    .catch((error: any) => {
      this.presentToast(error);
      console.log('err: ', error);
    });

  }
  CheckFingerAndroid():boolean
  {
    let result = false;
    this.androidFingerprintAuth.isAvailable().then((res)=> {
      // it is available
      result = res.isAvailable;
  }).catch(error => console.error(error));
   return result;
  }
  CallFingerPrintAndroid(){

  }
  presentToast(sMsg) {
    let toast = this.toast.create({
      message: sMsg,
      duration: 3000,
      position: 'buttom'
    });
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
    toast.present();
  }
}
