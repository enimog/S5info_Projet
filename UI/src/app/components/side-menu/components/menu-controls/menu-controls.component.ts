import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Fermentation } from './fermentation.object';

@Component({
  selector: 'menu-controls',
  templateUrl: './menu-controls.component.html',
  styleUrls: ['./menu-controls.component.css']
})
export class MenuControlsComponent implements OnInit
{
  @Input()
  fermentationList: Fermentation[] = new Array();

  @Output('selectedFermentation')
  selectedFermentationChanged: EventEmitter<number> = new EventEmitter<number>();

  selectedFermentation: number = -1;

  newRecipeDescription: string = "";
  newRecipeTemperature: number = 41.0;
  newRecipePH: number = 6.7;
  newRecipeAlcohol: number = 5.5;
  newRecipeSugar: number = 10.0;

  newFermentationDescription: string = "";
  newFermentationLocation: string = "";

  ngOnInit()
  {
    (<HTMLSelectElement> document.getElementById('fermentation-select')).onchange = (event) => {
      this.selectedFermentation = +(<HTMLSelectElement> event.target).value;
      this.selectedFermentationChanged.emit(this.selectedFermentation);
    };
  }

  getRecipes(): string[]
  {
    // TODO - GET recipes from API

    let recipes: string[] = Array();

    recipes.push('Bonne bière de Nick');
    recipes.push('Bière blonde');
    recipes.push('Vin rouge fruité');
    recipes.push('Vin rouge classique');
    recipes.push('Vin blanc aux agrumes');
    recipes.push('Alcool de pissenlit');
    recipes.push('Porto italien sucré');

    return recipes;
  }

  onNewRecipe(): void
  {
    // TODO - POST new recipe to API
    // TODO - Validation and JSON object

    console.log('New Recipe');
  }

  onNewFermentation(): void
  {
    // TODO - POST new fermentation to API
    // TODO - Validation and JSON object

    console.log('New Fermentation');
  }

  onEnd(): void
  {
    // TODO - POST active = false to API for active fermentation

    this.fermentationList.splice(this.selectedFermentation, 1);
    this.selectedFermentation = -1;
    this.selectedFermentationChanged.emit(this.selectedFermentation);
  }
}