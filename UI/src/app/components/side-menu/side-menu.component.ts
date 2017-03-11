import { Component, Input, OnInit } from '@angular/core';

import { MenuEntryObject } from './components/menu-entry/menu-entry.object'

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit
{
  menuHeader: string = 'Paramètres';

  @Input()
  menuEntries: MenuEntryObject[];

  onSelect(entry: MenuEntryObject)
  {
    for(let tempEntry of this.menuEntries)
    {
      tempEntry.deselect();
    }

    entry.select();
  }

  ngOnInit()
  {
    
  }
}