import { inject, Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  constructor() { }

  async Loggin(email: string, password: string){
    let dataReturn = 0;
    await signInWithEmailAndPassword(this.auth, email, password).then(
      (data) => {
        dataReturn = 1;
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
      }
    ).catch(
      (error) => {
        dataReturn = 0;
      }
    )
    return dataReturn;
  }
}

