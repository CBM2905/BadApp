import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, NavController} from '@ionic/angular';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: false
})
export class QuizPage implements OnInit {
  list: any;
  constructor(private router: Router, public toast: ToastController, private alrtController: AlertController, private navController: NavController) { 
    if(this.router.getCurrentNavigation()?.extras.state){
      const list = this.router.getCurrentNavigation()?.extras.state;
      this.list = list;
    }
    this.cargarPregunta();
  }

  ngOnInit() {
  }
  preguntaActual: any;
  indicePregunta = 0;
  tiempoRestante = 30;
  intervalo: any;
  puntajeTotal = 0;

  

  cargarPregunta() {
    if (this.indicePregunta < this.list.length) {
      this.preguntaActual = this.list[this.indicePregunta];
      this.tiempoRestante = 30;
      this.iniciarTemporizador();
    } else {
      this.finalizarQuiz();
    }
  }

  iniciarTemporizador() {
    clearInterval(this.intervalo);
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        this.siguientePregunta();
      }
    }, 1000);
  }

  seleccionarRespuesta(respuesta: string) {
    clearInterval(this.intervalo);

    if (respuesta === this.preguntaActual.correcta) {
      this.toastShow("Respuesta Correcta")
      this.puntajeTotal += this.tiempoRestante; // Sumar puntos según el tiempo restante
    } else {
      this.toastShow("Respuesta Incorrecta");
    }

    setTimeout(() => this.siguientePregunta(), 2000);
  }

  siguientePregunta() {
    this.indicePregunta++;
    this.cargarPregunta();
  }

  terminarQuiz() {
    clearInterval(this.intervalo);
    console.log("❌ Quiz terminado por el usuario. Puntaje final:", this.puntajeTotal);
    this.router.navigate(['/resultados', { puntaje: this.puntajeTotal }]);
  }

  finalizarQuiz() {
    clearInterval(this.intervalo);
    this.alertShow("su puntaje fue " + this.puntajeTotal);
  }

  // Función para mezclar las respuestas aleatoriamente
  shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }


  async toastShow(message: string){
    const toast = await this.toast.create({
      message: message,
      duration: 1000,
      position: 'bottom',
      color: 'light'
    })
    toast.present();
  }

  async alertShow(message: string){
    const showAlert = await this.alrtController.create({
      message: message,
      buttons: [
        {
          text: "volver al inicio .",
          handler: () => {
            this.redirectToTab1();
          }
        }
      ]
    })
    showAlert.present();
  }

  redirectToTab1(){
    this.navController.navigateRoot('tab1')
  }


}
