import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  quizList$!: Observable<any[]>;
  
  constructor() {
    const quizCollection = collection(this.firestore, "Quiz");
    this.quizList$ = collectionData(quizCollection);
  }

  newDoc(data: {}){
    addDoc(collection(this.firestore, "Quiz"), data);
  }


}
