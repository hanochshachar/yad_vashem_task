import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompoComponent } from '../components/compo/compo.component';


interface Pokemon {
  id: number,
  name: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, CompoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'hanoch';
  imgSrc: string = "data:image/jpeg;base64,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"
  favoriteAnimal: string = "Animal"
  pokemonName: string = ""

  handleClick (value: any) {
    console.log(value);
    
  }
  handleChange (event: any) {
    this.pokemonName = event.target.value;
  }

  pokemons: Pokemon[] = [{
    id: 1,
    name: 'pikachu'
  },
  {
    id: 2,
    name: 'kakama'
  }]
}