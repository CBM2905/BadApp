import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {
  email: string = "";
  password: string = "";
  constructor(public navController: NavController,public alrtCtrl: AlertController,private auth: AuthService) { }

  ngOnInit() {
  }

  limpiarFormularioYVolver() {
    this.email = "";
    this.password = "";
    this.homePageRedirect();
  }


  async createUser(){
    let res = await this.auth.createUser(this.email, this.password);
    if(res == 1){
      this.homePageRedirect();
    }
    else{
      this.showAlert("bad credential");
    }
  }


  homePageRedirect(){
    this.navController.navigateRoot('home');
  }

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
