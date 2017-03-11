import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent
{
    @Input()
    header: string;
}