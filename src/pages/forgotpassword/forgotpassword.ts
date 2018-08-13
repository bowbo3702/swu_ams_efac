import { Component } from '@angular/core';
import { NavController, NavParams , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
//page
import {LoginPage} from '../login/login';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  sEmailSWU: string;
  formForgot: FormGroup;
  txtEmailSWU: FormControl;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private formBdr: FormBuilder
    , public toast: ToastController
    , public popup: AlertController) {
      //ตรวจสอบความถูกต้องของฟอร์ม เช่น required, minLength
     this.txtEmailSWU = this.formBdr.control('',[ Validators.required,Validators.email]);
     this.formForgot = this.formBdr.group({ 'txtEmailSWU': this.txtEmailSWU});
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ForgotpasswordPage');
  }
  BackToLogin(){
    this.navCtrl.pop();
  }
  SendEmail(){
    //รับข้อมูลจากฟอร์ม
    let sEmail = this.formForgot.controls['txtEmailSWU'].value;
    if(sEmail!="")
    {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = re.test(sEmail);
      if(result)
      {
        console.log("valid.");
      }
      else{
         //แจ้งเตือนกรณีไม่กรอก
       this.presentToast("รูปแบบ E-mail ไม่ถูกต้อง");
      }
    }
    else
    {
       //แจ้งเตือนกรณีไม่กรอก
       this.presentToast("กรุณากรอก E-mail");
      //  let alert = this.popup.create({ title: "กรุณากรอก E-mail ของคุณ", buttons: ['ตกลง'] });
      //  alert.present();
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
