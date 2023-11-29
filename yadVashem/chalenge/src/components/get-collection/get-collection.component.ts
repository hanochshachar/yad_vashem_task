import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AddImagesComponent } from '../add-images/add-images.component';
import { HttpClient } from '@angular/common/http';

interface Collection {
  collectionSymbolization: string,
  title: string,
  itemId: string
}

@Component({
  selector: 'app-get-collection',
  standalone: true,
  imports: [CommonModule, FormsModule, AddImagesComponent],
  templateUrl: './get-collection.component.html',
  styleUrl: './get-collection.component.scss'
})
export class GetCollectionComponent {

   collectionNumber: string = "";
  next: boolean = false;
  
   collections: Collection[] = [{
    collectionSymbolization: "4567",
    title: "3 phtographs of Yehuda Hershkowitz and his family.",
    itemId: "9861229"
  }, {
    collectionSymbolization: "4568",
    title: "3 phtographs of Yehuda mushon and his family.",
    itemId: "9861213"
  }, {
    collectionSymbolization: "4569",
    title: "3 phtographs of Yehuda rona and his family.",
    itemId: "9861299"
  }
  ]

  constructor(private http: HttpClient) {}

  onInputChange(){
    const apiUrl = 'https://localhost:7020/api/Collection/getCollection/';

    const data =  this.http.get<any>(`${apiUrl}${{collNum: this.collectionNumber}}`)
    return 
  }

  handleNextClick() {
    
    const relevantItem = this.collections.find((item) => item.collectionSymbolization == this.collectionNumber);
    if (relevantItem !== undefined) {
      this.next = true;  
    } else {
      alert("נא לבחור אוסף!!");
    }
  }
  

}
