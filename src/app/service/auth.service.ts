import { inject, Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword } from '@angular/fire/auth';
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
  
 

}

