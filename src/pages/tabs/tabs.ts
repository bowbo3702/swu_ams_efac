import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ProfilePage} from '../profile/profile';
import {MenuPage} from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MenuPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
