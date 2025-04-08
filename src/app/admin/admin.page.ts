import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import * as excel from 'xlsx';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage implements OnInit {
  name: string = "";
  constructor(public firestore: FirebaseService) { }
  ngOnInit() {
    
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
    this.firestore.newDoc(json);
  }
}
