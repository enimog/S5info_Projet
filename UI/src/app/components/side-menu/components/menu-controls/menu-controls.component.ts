import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RequestManagerService } from '../../../service/request-manager.service';

import { Fermentation } from './fermentation.object';
import { Recipe } from './recipe.object';

@Component({
  selector: 'menu-controls',
  templateUrl: './menu-controls.component.html',
  styleUrls: ['./menu-controls.component.css'],
  providers: [
    RequestManagerService
  ]
})
export class MenuControlsComponent implements OnInit
{
  @Input()
  fermentationList: Fermentation[] = new Array();

  @Output('selectedFermentation')
  selectedFermentationChanged: EventEmitter<number> = new EventEmitter<number>();
  selectedFermentation: number = -1;

  newRecipeName: string = "";
  newRecipeDescription: string = "";
  newRecipeTemperature: number = 0.0;
  newRecipePH: number = 0.0;
  newRecipeAlcohol: number = 0.0;
  newRecipeSugar: number = 0.0;

  newFermentationName: string = "";
  newFermentationDescription: string = "";
  newFermentationRecipeId: number = -1;
  newFermentationLocation: string = "";

  recipes: Recipe[];

  constructor(private requestManagerService: RequestManagerService) {}

  ngOnInit()
  {
    (<HTMLSelectElement> document.getElementById('fermentation-select')).onchange = (event) => {
      this.selectedFermentation = +(<HTMLSelectElement> event.target).value;
      this.selectedFermentationChanged.emit(this.selectedFermentation);
    };

    (<HTMLSelectElement> document.getElementById('new-fermentation-recipe-input')).onchange = (event) => {
      this.newFermentationRecipeId = +(<HTMLSelectElement> event.target).value;
    };

    this.getRecipes();
  }

  getRecipes(): void
  {
    this.recipes = new Array();

    this.requestManagerService.getRecipes().subscribe(
      data => {
        for(let recipe of data['recipes'])
        {
          this.recipes.push(new Recipe(recipe));
        }
      },
      err => console.error(err),
      () => null
    );
  }

  onNewRecipe(): void
  {
    // TODO - Validation and JSON object
    let data = {
      "name": this.newRecipeName,
      "description": this.newRecipeDescription,
      "target_temperature": this.newRecipeTemperature,
      "target_ph": this.newRecipePH,
      "target_alcohol": this.newRecipeAlcohol,
      "target_sugar": this.newRecipeSugar
    };

    this.requestManagerService.postNewRecipe(data).subscribe(
      data => { /* TODO - Push new recipe in list*/ },
      err => console.error(err),
      () => null
    );
  }

  onNewFermentation(): void
  {
    // TODO - Validation and JSON object

    let data = {
      "name": this.newFermentationName,
      "recipe_id": this.newFermentationRecipeId,
      "description": this.newFermentationDescription,
      "start_date": new Date().getMilliseconds(),
      "is_active": true,
      "location": this.newFermentationLocation
    };

    this.requestManagerService.postNewUnit(data).subscribe(
      data => { /* TODO - Push new fermentation in list*/ },
      err => console.error(err),
      () => null
    );
  }

  onEnd(): void
  {
    let data = {"unit_id": this.fermentationList[this.selectedFermentation].getId(), "field": "is_active", "value": false};

    this.requestManagerService.updateUnitParam(data).subscribe(
      data => { console.log(data) },
      err => console.error(err),
      () => null
    );
     
    this.fermentationList.splice(this.selectedFermentation, 1);
    this.selectedFermentation = -1;
    this.selectedFermentationChanged.emit(this.selectedFermentation);
  }
}