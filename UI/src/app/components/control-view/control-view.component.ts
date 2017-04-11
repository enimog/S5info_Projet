import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { RequestManagerService } from '../service/request-manager.service';

import { Fermentation } from '../side-menu/components/menu-controls/fermentation.object';

import dateformat from 'dateformat';

var w: any;
var d: any;

@Component({
  selector: 'control-view',
  templateUrl: './control-view.component.html',
  styleUrls: ['./control-view.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
  providers: [
    RequestManagerService
  ]
})
export class ControlViewComponent implements OnInit, OnChanges
{
  @Input()
  value: number;

  @Input()
  fermentation: Fermentation;

  chart: any;
  apiReady: boolean;

  
  constructor(private requestManagerService: RequestManagerService)
  {
    w = window;
    d = document;
    
    this.apiReady = false;
  }


  onTemperatureChange()
  {
    let data = {"unit_id": this.fermentation.getId(), "field": "temperature", "value": this.fermentation.getTemperature()};
    this.updateFermentationParameter(data);
  }

  onPHChange()
  {
    let data = {"unit_id": this.fermentation.getId(), "field": "ph", "value": this.fermentation.getPH()};
    this.updateFermentationParameter(data);
  }

  onAlcoholChange()
  {
    let data = {"unit_id": this.fermentation.getId(), "field": "alcohol", "value": this.fermentation.getAlcohol()};
  this.updateFermentationParameter(data);
  }

  onSugarChange()
  {
    let data = {"unit_id": this.fermentation.getId(), "field": "sugar", "value": this.fermentation.getSugar()};
    this.updateFermentationParameter(data);
  }

  updateFermentationParameter(data: any)
  {
    this.requestManagerService.updateUnitParam(data).subscribe(
      data => { },
      err => console.error(err),
      () => null
    );
  }

  getStartDate(): string
  {
    return dateformat(new Date(this.fermentation.getStartDate()), 'yy/mm/dd-HH:MM:ss');
  }

  getEmptyData(): any
  {
    // Create the data table.
    let dataArray = [
      ['Aucune donnée', 'Aucune donnée'],
      ['0',  0]
    ];

    return w.google.visualization.arrayToDataTable(dataArray);
  }

  getTemperatureData(): void
  {
    let dataArray: Array<Array<any>> = [
      ['Time', 'Température (°C)']
    ];

    this.requestManagerService.getTemperature(this.fermentation.getId()).subscribe(
      data => {
        if(data['temperature'].length < 1)
        {
          dataArray.push(['0', 0]);
        }

        for(let temperature of data['temperature'])
        {
          dataArray.push([dateformat(new Date(temperature['timestamp']), 'yy/mm/dd-HH:MM:ss'),  temperature['value']]);
        }

        this.chart.draw(w.google.visualization.arrayToDataTable(dataArray), this.getOptions('Température'));
      },
      err => console.error(err),
      () => null
    );
  }

  getPHData(): void
  {
    // Create the data table.
    let dataArray: Array<Array<any>> = [
      ['Time', 'Acidité (PH)']
    ];

    this.requestManagerService.getPH(this.fermentation.getId()).subscribe(
      data => {
        if(data['ph'].length < 1)
        {
          dataArray.push(['0', 0]);
        }


        for(let ph of data['ph'])
        {
          dataArray.push([dateformat(new Date(ph['timestamp']), 'yy/mm/dd-HH:MM:ss'),  ph['value']]);
        }

        this.chart.draw(w.google.visualization.arrayToDataTable(dataArray), this.getOptions('Acidité'));
      },
      err => console.error(err),
      () => null
    );
  }

  getAlcoholData(): void
  {
    // Create the data table.
    let dataArray: Array<Array<any>> = [
      ['Time', 'Taux d\'alcool (%)'],
    ];

    this.requestManagerService.getAlcohol(this.fermentation.getId()).subscribe(
      data => {
        if(data['alcohol'].length < 1)
        {
          dataArray.push(['0', 0]);
        }

        for(let alcohol of data['alcohol'])
        {
          dataArray.push([dateformat(new Date(alcohol['timestamp']), 'yy/mm/dd-HH:MM:ss'),  alcohol['value']]);
        }

        this.chart.draw(w.google.visualization.arrayToDataTable(dataArray), this.getOptions('Taux d\'alcool'));
      },
      err => console.error(err),
      () => null
    );
  }

  getSugarData(): void
  {
    // Create the data table.
    let dataArray: Array<Array<any>> = [
      ['Time', 'Taux de sucre (mg/L)']
    ];

    this.requestManagerService.getSugar(this.fermentation.getId()).subscribe(
      data => {
        if(data['sugar'].length < 1)
        {
          dataArray.push(['0', 0]);
        }

        for(let sugar of data['sugar'])
        {
          dataArray.push([dateformat(new Date(sugar['timestamp']), 'yy/mm/dd-HH:MM:ss'),  sugar['value']]);
        }

        this.chart.draw(w.google.visualization.arrayToDataTable(dataArray), this.getOptions('Taux de sucre'));
      },
      err => console.error(err),
      () => null
    );
  }

  getOptions(chartTitle: string): any
  {
    // Set chart options
    let options = {
      title: chartTitle,
      curveType: 'none',
      legend: { position: 'bottom' },
      backgroundColor: '#BBB'
    };

    return options;
  }

  drawChart()
  {
    let data: any;
    let options: any;

    if(this.fermentation == null)
    {
      data = this.getEmptyData();
      options = this.getOptions('Aucune donnée');
      this.chart.draw(data, options);
    }
    else if(this.value == 0)
    {
      this.getTemperatureData();
    }
    else if(this.value == 1)
    {
      this.getPHData();
    }
    else if(this.value == 2)
    {
      this.getAlcoholData();
    }
    else if(this.value == 3)
    {
      this.getSugarData();
    }
  }

  ngOnInit()
  {
    // Load the Visualization API and the corechart package.
    w.google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    w.google.charts.setOnLoadCallback(() =>{

      this.apiReady = true;

      this.chart = new w.google.visualization.LineChart(d.getElementById('parameter-chart'));
      this.drawChart();

      setInterval(() => {

        this.drawChart();

      }, 5000);

    });
  }

  onResize(event)
  {
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes['value'] && this.apiReady)
    {
      this.drawChart();
    }
    else if(changes['fermentation'] && this.apiReady)
    {
      this.drawChart();
    }
  }
}