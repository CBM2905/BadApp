import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { FirebaseService } from '../service/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  email: string = "";
  password: string = "";
  async validateData() {
    let a = await this.auth.Loggin(this.email, this.password);
    console.log(a)
    if(a == 1){
      this.homePageRedirection();
    }
    else if(a == 2){
      this.adminPageRedirect();
    }
    else{
      this.showAlert("Bad credentials");
    }
  }

  homePageRedirection(){
    this.navCtrl.navigateForward('tabs/tab1');
  }
  registroPageRedirection(){
    this.navCtrl.navigateForward('registro');
  }
  adminPageRedirect(){
    this.navCtrl.navigateForward('admin');
  }
  constructor(public navCtrl: NavController, public alrtCtrl: AlertController, private auth: AuthService, private firestore: FirebaseService) {}
  async showAlert(message: string){
    const alert = this.alrtCtrl.create({
      message: message,
      cssClass: "custom-alert",      
      buttons: [
        {
          text: 'ok',
          role: 'submit',
          handler: (data: any) => {
            console.log(data);
          }
        }
      ]
    });
    (await alert).present();
  }
}
