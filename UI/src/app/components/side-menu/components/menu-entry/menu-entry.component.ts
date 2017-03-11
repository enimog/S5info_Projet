import { Component, Input } from '@angular/core';

import { MenuEntryObject } from './menu-entry.object'

@Component({
  selector: 'menu-entry',
  templateUrl: './menu-entry.component.html',
  styleUrls: ['./menu-entry.component.css']
})
export class MenuEntryComponent
{
    @Input()
    entry: MenuEntryObject;
}