import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Platform } from 'ionic-angular';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//--------------------------------- Import Pages --------------------------------------------
import { MeetingListPage } from '../meeting-list/meeting-list';
import { SetfingerPage } from '../setfinger/setfinger';
import { HomePage } from '../home/home';
import { SettingPage} from '../setting/setting';
//import { MyprofilePage } from '../myprofile/myprofile';
import { TabsPage } from '../tabs/tabs';
import { QrcodePage } from '../qrcode/qrcode';
//--------------------------------- Providers --------------------------------------------------
import { ApiProvider } from '../../providers/api/api';
import { UserloginProvider } from '../../providers/userlogin/userlogin';

//--------------------------------- Models ---------------------------------------------------
import { UserAccount } from '../../models/UserAccount';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  QR_DATA: string;
  UserAccountData: UserAccount;
  isLogin: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public toast: ToastController
    , public popup: AlertController
    , public loading: LoadingController
    , public platform: Platform
    , public api: ApiProvider
    , public usrProvider: UserloginProvider
    , private qr_Scanner: QRScanner
    , private iBrowser: InAppBrowser
    //, private barcodeScanner: BarcodeScanner
    ){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.usrProvider.isLogged().then((val: boolean) => {
      this.isLogin = val;

      if (this.isLogin) {
        this.usrProvider.getUserAccountFromLocalStorage().then((usr: UserAccount) => {
          this.UserAccountData = usr;
        });

      }
    });
  }
  presentToast(sMsg, nDuration, sPosition) {
    let toast = this.toast.create({
      message: sMsg,
      duration: nDuration,
      position: sPosition
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }
  GotoPage(mode) {
    switch (mode) {
      case "SCHEDULE":
        this.navCtrl.push(TabsPage);
        break;
      case "OMM":
        this.navCtrl.push(MeetingListPage);
        break;
      case "HOME":
        //this.navCtrl.push(MyprofilePage);
        break;
      case "LOGBOOK":
        //web softthai
        ///LogBook_Bypass.aspx?str=sUserCode&L 
        this.openUrl(this.api.getLOG_Url() + 'LogBook_Bypass.aspx?str=' + this.UserAccountData.sUserID + '_L', '_blank');
        // this.navCtrl.push(MeetingListPage);
        break;
      case "ASSESSMENT":
        ///LogBook_Bypass.aspx?str=sUserCode&A
        this.openUrl(this.api.getASS_Url() + 'LogBook_Bypass.aspx?str=' + this.UserAccountData.sUserID + '_A', '_blank');
        // this.navCtrl.push(MeetingListPage);
        break;
      case "QR":
        this.navCtrl.push(QrcodePage);
        break;
      case "SETTING":
         this.navCtrl.push(SettingPage);
        break;
      default:
        break;
    }
  }
  openUrl(_url, _target) {

    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(_url, _target, 'clearsessioncache=yes,clearcache=yes');

    });
  }
  GotoFingerPrintPage() {
    this.navCtrl.push(SetfingerPage);
  }
  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  CallScaner() {
    // this.barcodeScanner.scan({
    //   preferFrontCamera: false
    //   , showFlipCameraButton: false
    //   , showTorchButton: false
    //   , torchOn: false
    //   , disableAnimations: false
    //   , disableSuccessBeep: false
    //   // , prompt: "Do you want to next?"
    //   // , orientation: "portrait" 1000
    //   , resultDisplayDuration: 0
    // }).then(barcodeData => {

    //   this.QR_DATA = barcodeData.text;
    //   if (barcodeData.text != "") {

    //     if (this.QR_DATA.startsWith("http://") || this.QR_DATA.startsWith("https://")) {

    //       this.openUrl(barcodeData.text, '_blank');
    //     } else {
    //       this.presentToastCtrl('QR Code Content is not protocol:' + this.QR_DATA, 6000, 'buttom');
    //     }
    //   }
    // });
  }
}
