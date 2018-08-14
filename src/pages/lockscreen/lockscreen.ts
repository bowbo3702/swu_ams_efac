import { Component } from '@angular/core';
import { NavController, NavParams , AlertController, ToastController } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { TouchID } from '@ionic-native/touch-id';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';

import { TabsPage } from '../tabs/tabs';
import { UserAccount } from '../../models/UserAccount';
/**
 * Generated class for the LockscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lockscreen',
  templateUrl: 'lockscreen.html',
})
export class LockscreenPage {
  UserAccountData: UserAccount;
  sPIN: string;
  sPIN1: string;
  sPIN2: string;
  sPIN3: string;
  sPIN4: string;
  sPIN5: string;
  sPIN6: string;
  isShowBtnBackSpace: boolean;
  isTouchIdAvailable: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public toast: ToastController
    , public storage: Storage
  , public alert: AlertController
  , public platform: Platform
  , public touchId :TouchID 
   , public finger :FingerprintAIO
  , private androidFingerprintAuth: AndroidFingerprintAuth
  ) {
    this.sPIN = "";
    this.sPIN1 = "";
    this.sPIN2 = "";
    this.sPIN3 = "";
    this.sPIN4 = "";
    this.sPIN5 = "";
    this.sPIN6 = "";
    this.isShowBtnBackSpace = false;
    this.isTouchIdAvailable = false;
    this.platform.ready().then(() => {
      touchId.isAvailable().then(
        res => this.isTouchIdAvailable = true,
        err => this.isTouchIdAvailable = false
      );          
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockscreenPage');
  }
  private startTouchID () {
    this.touchId.verifyFingerprint('Fingerprints are Awesome')
      .then(
        res => this.navCtrl.setRoot(TabsPage),
        err =>{ console.error('Error', err);this.presentToast("ลายนิ้วมือไม่ถูกต้อง");}
      );
  }
  private startFingerAIO(){
    this.androidFingerprintAuth.isAvailable()
    .then((result)=> {
      if(result.isAvailable){
        // it is available
        this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
          .then(result => {
             if (result.withFingerprint) {
                 console.log('Successfully encrypted credentials.');
                 console.log('Encrypted credentials: ' + result.token);
             } else if (result.withBackup) {
               console.log('Successfully authenticated with backup password!');
               this.presentToast("Successfully authenticated");
             } 
             else 
             {
               console.log('Didn\'t authenticate!');
               this.presentToast("Failed authenticated");
            }
          })
          .catch(error => {
             if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
               console.log('Fingerprint authentication cancelled');
             } 
             else console.error(error)
          });
  
      } else {
        // fingerprint auth isn't available
        this.presentToast("fingerprint auth isn\'t available");
      }
    })
    .catch(error => console.error(error));
  }
  AddNumber(sNumber: string): void {
    let nIndex = this.sPIN.length;
    if (nIndex <= 4) {
      if (nIndex == 0) {
        this.sPIN1 = sNumber;
        this.sPIN2 = "";
        this.sPIN3 = "";
        this.sPIN4 = "";
        this.sPIN5 = "";
        this.sPIN6 = "";
      }
      else if (nIndex == 1) {
        this.sPIN2 = sNumber;
        this.sPIN3 = "";
        this.sPIN4 = "";
        this.sPIN5 = "";
        this.sPIN6 = "";
      }
      else if (nIndex == 2) {
        this.sPIN3 = sNumber;
        this.sPIN4 = "";
        this.sPIN5 = "";
        this.sPIN6 = "";
      }
      else if (nIndex == 3) {
        this.sPIN4 = sNumber;
        this.sPIN5 = "";
        this.sPIN6 = "";
      }
      else if (nIndex == 4) {
        this.sPIN5 = sNumber;
        this.sPIN6 = "";
      }
      // else if (nIndex == 5) {
      //   this.sPIN6 = sNumber;
      // }
      if(nIndex <= 4)
      {
        this.sPIN = this.sPIN + sNumber;
      }
     
    }
    else {

    }
    this.isShowBtnBackSpace = (this.sPIN.length > 0);
    console.log('isShowBtnBackSpace:' + this.isShowBtnBackSpace);
    console.log('pin:' + this.sPIN);
  }
  DelNumber(): void {
    let nLength = this.sPIN.length;
    console.log('length:' + nLength);
    let nIndex = this.sPIN.length - 1;
    console.log('index:' + nIndex);
    if (nLength > 0) {
      let sPINOld = this.sPIN;
      this.sPIN = sPINOld.substring(0, nLength - 1);
      if (nIndex == 0) {
        this.sPIN1 = "";
      }
      else if (nIndex == 1) {
        this.sPIN2 = "";
      }
      else if (nIndex == 2) {
        this.sPIN3 = "";
      }
      else if (nIndex == 3) {
        this.sPIN4 = "";
      }
      else if (nIndex == 4) {
        this.sPIN5 = "";
      }
    }
    this.isShowBtnBackSpace = (this.sPIN.length > 0);
    console.log('isShowBtnBackSpace:' + this.isShowBtnBackSpace);
    console.log('pin:' + this.sPIN);
  }

  LoginPIN(){
    if (this.sPIN.length == 5) {
      this.storage.get('PIN').then((sPinCode: string) => {
        if(this.sPIN === sPinCode){
          this.navCtrl.setRoot(TabsPage);
        }
        else
        {
          let alert = this.alert.create({ title: "รหัสผ่านไม่ถูกต้อง", buttons: ['ตกลง'] });
          alert.present();
        }
      });
    }
    else {
      //แจ้งเตือนกรณี pin length != 5
      let alert = this.alert.create({ title: "กรุณากรอกรหัสผ่าน 5 หลัก", buttons: ['ตกลง'] });
      alert.present();
    }
  } 
  //show toast
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
