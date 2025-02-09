import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  name: string = "";

  validateData() {
    if(this.name == "envrioment"){
      console.log("here");
      this.homePageRedirection();
    }
    else{
      console.log("not here");
    }
  }

  homePageRedirection(){
    this.navCtrl.navigateRoot('tabs')
  }
  constructor(public navCtrl: NavController) {}

}
