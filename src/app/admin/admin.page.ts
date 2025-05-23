import { Component, input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import * as excel from 'xlsx';
import { FirebaseService } from '../service/firebase.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage implements OnInit {
  name: string = "";
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor(public firestore: FirebaseService, private alertController: AlertController) { }
  ngOnInit() {
    
  }


  async aux(e: any){
    await this.showInputNameAlert(e);
    console.log("here");

  }

  async readExcel(e: any){
    this.firestore.quizList$.forEach(
      (data) => {
        console.log(data);
      }
    )
    const reader = new FileReader();
    const file = e.target.files[0];
    let json = {};
    
    reader.onload = (event) => {
      console.log("hello");
      const data = reader.result;
      let workBook = excel.read(data, { type: 'binary' });
      
      let jsonData = workBook.SheetNames.reduce((initial: any, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = excel.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      json = jsonData;
      const dataString = JSON.stringify(jsonData);
      console.log(jsonData);
      this.addData(this.convertToValidJson(jsonData));
    }
    reader.readAsBinaryString(file);
    console.log(json);
    let inputData = document.getElementById("input") as HTMLInputElement;
    inputData.value = "";
  }

  async showInputNameAlert(e: any){
    const alert = await this.alertController.create({
      message: "Ingrese el nombre del archivo",
      inputs: [{
        name: "Nombre",
        placeholder: "Nombre",
        id: "Nombre",
        type: "text",
        label: "Nombre"
      }],
      buttons: [
        {
          text: "ok",
          handler: async (data) => {
            this.name = await data.Nombre;
            this.readExcel(e);
          }
        }
      ]
    })
    await alert.present();
  }

  convertToValidJson(json: any){
    let jsonValid = {"Nombre" : this.name, "preguntas": {}};
    let preguntasJson = [];
    for(let iter = 0; iter < json.Sheet1.length; iter = iter + 1){
      let array = {"Descripcion": json.Sheet1[iter].descripcion,"preguntas": [json.Sheet1[iter].opcionA, json.Sheet1[iter].OpcionB, json.Sheet1[iter].OpcionC, json.Sheet1[iter].OpcionD], "correcta": json.Sheet1[iter].Correcta}
      preguntasJson.push(array);
    }
    console.log(jsonValid);
    jsonValid.preguntas = preguntasJson
    return jsonValid;
  }

  addData(json: any){
    this.firestore.newDoc(json, "Quiz");
  }
}
