import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  items: string[] = ["here the name0", "here the other name1", "here other other name2"];
  itemCopy: string[] = [...this.items];
  itemsAux : string[] = [];
  lengthItems: number = 3;
  alertButtons = ['Agregar'];
  a= "";
  public alertInputs = [
    {
      name: 'nombre',
      placeholder: 'Name',
    },
    
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];
  constructor(private alrtCtrl: AlertController) { }

  findIndex(value: any){
    return this.items.indexOf(value);
  }

  deleteByIndex(index: number){
    this.items.splice(index,1);
  }

  showData2(){
    let dataDelete: any[] = [];
    let data = this.a;
    this.items = [...this.itemCopy];
    let index = this.items.indexOf(data);
    console.log(this.items);
    if(index != -1){
      this.items.forEach((value) =>{
        console.log("value is equ: " + value); 
        if(value!=data){
          this.itemsAux.push(value);
          dataDelete.push(value);
        }
      });
      console.log(dataDelete);
      dataDelete.forEach((value) => {
        let indexDelete = this.findIndex(value)
        this.deleteByIndex(indexDelete);
      });
    }
    else if (this.a != ""){
      this.itemsAux = [...this.items];
      this.items.splice(0 ,this.items.length);
    }

    /*
    console.log(this.a);
    let aa = this.a;
    let index = this.items.indexOf(aa);
    if(index != -1){
      this.itemsAux.push(aa);
      this.items.splice(index,1);
    }
    else{
      this.itemsAux.forEach((value) =>{
        if(this.searhValue(value) != -1){
          this.items.push(value);  
        }
      })
    }
      */
  }

  
  ngOnInit() {
    //this.generateItems();
  }

  async showAlert(){
    const alert = this.alrtCtrl.create({
      inputs: [
        {
          name: 'nombreObject',
          placeholder: 'Ingrese un nombre',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'ok',
          role: 'submit',
          handler: data => {
            console.log(data.nombreObject);
            this.items.push(data.nombreObject);
            this.itemCopy = [...this.items];
            this.lengthItems = this.lengthItems + 1;
          }
        }
      ]
    });
    (await alert).present();
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }


  searchByName(){
    console.log("searching");
  }

}
