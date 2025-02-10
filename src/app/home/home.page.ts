import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  email: string = "";
  password: string = "";
  validateData() {
    if(this.email == "envrioment" && this.password=="1234"){
      console.log("here");
      this.homePageRedirection();
    }
    else if(this.email=="" && this.password==""){
      console.log("not here");
      this.showAlert("Porfavor ingrese algun dato");
    }
    else{
      this.showAlert("datos invalidos");  
    }
  }

  homePageRedirection(){
    this.navCtrl.navigateRoot('tabs')
  }
  constructor(public navCtrl: NavController, public alrtCtrl: AlertController) {}
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
