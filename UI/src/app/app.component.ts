import { Component, OnInit } from '@angular/core';

import { MenuEntryObject } from './components/side-menu/components/menu-entry/menu-entry.object';
import { Fermentation } from './components/side-menu/components/menu-controls/fermentation.object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  menuEntries: MenuEntryObject[] = new Array();
  fermentationList: Fermentation[] = new Array();

  ngOnInit()
  {
    this.getMenuEntries()
    this.getFermentationList();
  }

  getMenuEntries()
  {
    this.menuEntries.push(new MenuEntryObject('Température', 0, true));
    this.menuEntries.push(new MenuEntryObject('Adicité', 1, false));
    this.menuEntries.push(new MenuEntryObject('Taux d\'alcool', 2, false));
    this.menuEntries.push(new MenuEntryObject('Taux de sucre', 3, false));
  }

  getFermentationList()
  {
    // TODO - GET fermentation list from API

    this.fermentationList.push(new Fermentation('Fermentation no.1', false));
    this.fermentationList.push(new Fermentation('Fermentation no.2', false));
    this.fermentationList.push(new Fermentation('Fermentation no.3', false));
    this.fermentationList.push(new Fermentation('Fermentation no.4', false));
  }

  getActiveMenuEntry(): number
  {
    for(let tempEntry of this.menuEntries)
    {
      if(tempEntry.isSelected())
      {
        return tempEntry.getValue();
      }
    }

    return -1;
  }

  getActiveFermentationId(): string
  {
    for(let tempFermentation of this.fermentationList)
    {
      if(tempFermentation.isSelected())
      {
        return tempFermentation.getId();
      }
    }

    return null;
  }
}
