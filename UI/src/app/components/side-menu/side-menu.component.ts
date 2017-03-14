import { Component, Input, OnInit } from '@angular/core';

import { MenuEntryObject } from './components/menu-entry/menu-entry.object';
import { Fermentation } from './components/menu-controls/fermentation.object';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent
{
  menuHeader: string = 'Paramètres';
  
  @Input()
  menuEntries: MenuEntryObject[];

  @Input()
  fermentationList: Fermentation[] = new Array();

  onSelect(entry: MenuEntryObject)
  {
    for(let tempEntry of this.menuEntries)
    {
      tempEntry.deselect();
    }

    entry.select();
  }

  fermentationChanged(event: number)
  {
    for(let tempFermentation of this.fermentationList)
    {
      tempFermentation.deselect();

      if(this.fermentationList.indexOf(tempFermentation) === event)
      {
        tempFermentation.select();
      }
    }
  }
}