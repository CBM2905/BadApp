import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import {ItemReorderEventDetail, OverlayEventDetail} from '@ionic/core/components';
import { FirebaseService } from '../service/firebase.service';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
 
  constructor(public firestore: FirebaseService) {
    
  }

  ngOnInit() {
  }

  

  

  

  
}
