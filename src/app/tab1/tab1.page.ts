import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { FirebaseService } from '../service/firebase.service';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  constructor(public firestore: FirebaseService, public navCtrl: NavController) {}
  
  ngOnInit() {
    //this.generateItems();
  }

  startQuiz(data: any){
    this.navCtrl.navigateForward('quiz',{state: data})
  }
  
  
}
