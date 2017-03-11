import { Component, OnInit } from '@angular/core';

import { MenuEntryObject } from './components/side-menu/components/menu-entry/menu-entry.object'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  menuEntries: MenuEntryObject[] = new Array();

  ngOnInit()
  {
    this.menuEntries.push(new MenuEntryObject('Température', 0, true));
    this.menuEntries.push(new MenuEntryObject('Adicité', 1, false));
    this.menuEntries.push(new MenuEntryObject('Taux d\'alcool', 2, false));
    this.menuEntries.push(new MenuEntryObject('Taux de sucre', 3, false));
  }

  getActiveElement(): number
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
}
