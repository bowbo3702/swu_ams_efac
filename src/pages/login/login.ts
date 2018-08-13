import { Component, animate } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

//import page
// import { LoginSwitchPage } from '../login-switch/login-switch';
// import { LockscreenPage } from '../lockscreen/lockscreen';
 import { SetpinPage } from '../setpin/setpin';
 import {SetfingerPage} from '../setfinger/setfinger';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
//import provider
import { UserloginProvider } from '../../providers/userlogin/userlogin';
//models
import { UserAccount } from '../../models/UserAccount';
import { HomePage } from '../home/home';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  sUsername: string;
  sUsername1: string;
  sPassword: string;
  formLogin: FormGroup;
  txtUsername: FormControl;
  txtPassword: FormControl;
  UserData: UserAccount;
  isLogin: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private formBdr: FormBuilder
    , public toast: ToastController
    , public popup: AlertController
    , public loading: LoadingController
    , public usrProvider: UserloginProvider
    , public platform: Platform
    , public sqlite: SQLite
    , public storage: Storage
    , public finger:FingerprintAIO) {
       //ตรวจสอบความถูกต้องของฟอร์ม เช่น required, minLength
    this.txtUsername = this.formBdr.control('', Validators.required);
    this.txtPassword = this.formBdr.control('', Validators.compose([Validators.required, Validators.minLength(8)]));
    this.formLogin = this.formBdr.group({ 'txtUsername': this.txtUsername, 'txtPassword': this.txtPassword });
    this.usrProvider.CreateTableLogin();

    this.usrProvider.getUserNameFromStorage().then((res: string) => {
      this.sUsername1 = res;
    });
    // this.storage.ready().then(() => { this.storage.set('username', "1234"); });
    this.storage.get('username').then((name) => {
      console.log('Me: Hey, ' + name + '! You have a very nice name.');
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {
    console.log('loginPage ionViewWillEnter')

    //เมื่อเข้าหน้า login ให้ตรวจสอบก่อนว่าเคย login แล้วยัง หากเคยให้ไปยังหน้า Lock screen
    this.usrProvider.isLogin().then((res: boolean) => {
      this.isLogin = res;
      console.log('page-login isLogin:' + this.isLogin);
      if (this.isLogin) {
        this.usrProvider.isLogged().then((val: boolean) => {
          // this.isLogin = val;
          console.log('isLogin check localstronge')
          console.log(val);
          if (val) {
            this.storage.set("IsLogined", true);
            //this.navCtrl.setRoot(LoginSwitchPage);//this.navCtrl.setRoot(LockscreenPage);
            return false;
          } else { return false; }
        });
      }
      else { return false; }
    });
  }
  ForgotPassword(){
    this.navCtrl.push(ForgotpasswordPage, { }, { animate: false });
  }
  login() {
    //รับข้อมูลจากฟอร์ม
    let sUsername = this.formLogin.controls['txtUsername'].value;
    let sPassword = this.formLogin.controls['txtPassword'].value;
    console.log("sUsername " + sUsername);
    console.log("sPassword " + sPassword);
    if (sUsername != undefined && sUsername != "" && sPassword != ""&& sPassword != undefined) {
      this.usrProvider.login(sUsername, sPassword).then((res: UserAccount) => {
        this.UserData = res;
        if (res != undefined && res.sResult != null) {
          //login success
          console.log("res " + res.sFirstName);
          if (res.sResult == "Success") {
            console.log(this.UserData);
            this.storage.set("IsLogined", true);
            this.storage.get('PIN').then((sPinCode: string) => {
              console.log('login storage.get PIN :' + sPinCode);
            });
              //go to Set PIN
              this.navCtrl.setRoot(SetpinPage);
          }
          else {
            //แจ้งเตือนกรณี login not success
            let alert = this.popup.create({ title: res.sMsg1, buttons: ['ตกลง'] });
            alert.present();
          }
        }
        else {
          this.presentToast("No response.");
        }
      }).catch(error => {
        this.presentToast("Login error." + "=>" + error);
      });
    }
    else {
      if (sUsername == undefined||sUsername == "" )
      {
        //แจ้งเตือนกรณีไม่กรอก username 
        this.presentToast("กรุณากรอก Username");
      }
      else{
         //แจ้งเตือนกรณีไม่กรอก  password
         this.presentToast("กรุณากรอก Password");
      }
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
