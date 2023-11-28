import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Collection {
  collectionSymbolization: string,
  title: string,
  itemId: string
}

@Component({
  selector: 'app-get-collection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './get-collection.component.html',
  styleUrl: './get-collection.component.scss'
})
export class GetCollectionComponent {

  collectionNumber: string = "";
  
   collections: Collection[] = [{
    collectionSymbolization: "4567",
    title: "3 phtographs of Yehuda Hershkowitz(the grandfather of the submitter, Miriam Arensti) and his family.",
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

}