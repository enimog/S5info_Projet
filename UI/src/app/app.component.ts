import { Component, OnInit } from '@angular/core';

import { RequestManagerService } from './components/service/request-manager.service';

import { MenuEntryObject } from './components/side-menu/components/menu-entry/menu-entry.object';
import { Fermentation } from './components/side-menu/components/menu-controls/fermentation.object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    RequestManagerService
  ]
})
export class AppComponent implements OnInit
{
  menuEntries: MenuEntryObject[];
  fermentationList: Fermentation[];

  constructor(private requestManagerService: RequestManagerService) {}

  ngOnInit()
  {
    this.getMenuEntries()
    this.getFermentationList();
  }

  getMenuEntries()
  {
    this.menuEntries = new Array();

    this.menuEntries.push(new MenuEntryObject('Information', 10, false));
    this.menuEntries.push(new MenuEntryObject('Température', 0, true));
    this.menuEntries.push(new MenuEntryObject('Adicité', 1, false));
    this.menuEntries.push(new MenuEntryObject('Taux d\'alcool', 2, false));
    this.menuEntries.push(new MenuEntryObject('Taux de sucre', 3, false));   
  }

  getFermentationList()
  {
    this.fermentationList = new Array();

    this.requestManagerService.getUnits().subscribe(
      data => {
        for(let unit of data['units'])
        {
          let newFermentation = new Fermentation(unit, false);
          //if(newFermentation.isActive())
          //{
          this.fermentationList.push(newFermentation);
          //}
        }
      },
      err => console.error(err),
      () => null
    );
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

  getActiveFermentation(): Fermentation
  {
    for(let tempFermentation of this.fermentationList)
    {
      if(tempFermentation.isSelected())
      {
        return tempFermentation;
      }
    }

    return null;
  }
}
