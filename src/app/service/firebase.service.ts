import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, setDoc, doc, updateDoc, query, orderBy, limit} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  quizList$!: Observable<any[]>;
  ranking$!: Observable<any[]>;
  
  constructor() {
    const quizCollection = collection(this.firestore, "Quiz");
    const usersCollection = collection(this.firestore, "Users");
    let queryRanking = query(usersCollection, orderBy('puntuacion', 'desc'), limit(4));
    this.quizList$ = collectionData(quizCollection);
    this.ranking$ = collectionData(queryRanking);
  }

  newDoc(data: {}, collectionName: string){
    addDoc(collection(this.firestore, collectionName), data);
  }

  
  newDocSetId(data: {}, collectionName: string, id: string){
    setDoc(doc(this.firestore, collectionName, id), data);
  }

  updatePuntuacion(id: any, data: {}){
    let refDoc = doc(this.firestore, "Users", id);
    updateDoc(refDoc, data);
  }


}
