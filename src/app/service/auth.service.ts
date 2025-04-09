import { inject, Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseService } from './firebase.service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth = inject(Auth);
  constructor(private firestore: FirebaseService) { }

  async Loggin(email: string, password: string){
    let dataReturn = 0;
    await signInWithEmailAndPassword(this.auth, email, password).then(
      (data) => {
        if(data.user.email == "admin@gmail.com"){
          dataReturn = 2;
        }
        else{
          dataReturn = 1
        }
      }
    ).catch(
      (error) => dataReturn = 0    
    )
    return dataReturn;
  }

  async createUser(email: string, password: string){
    let dataReturn = 0;
    await createUserWithEmailAndPassword(this.auth, email, password).then(
      (data) => {
        dataReturn = 1;
        this.firestore.newDocSetId({"email": data.user.email, "puntuacion": 0}, "Users", data.user.uid);
      }
    ).catch(
      (error) => {
        dataReturn = 0;
      }
    )
    return dataReturn;
  }

  getCurrentUserId(){
    return this.auth.currentUser?.uid;
  }
}

