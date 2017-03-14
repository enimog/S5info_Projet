import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

var w: any;
var d: any;

@Component({
  selector: 'control-view',
  templateUrl: './control-view.component.html',
  styleUrls: ['./control-view.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ControlViewComponent implements OnInit, OnChanges
{
  @Input()
  value: number;

  @Input()
  fermentationId: number;

  temperature: number = 39.2;
  ph: number = 6.3;
  alcohol: number = 9.2;
  sugar: number = 3.1;

  chart: any;
  apiReady: boolean;

  
  constructor()
  {
    w = window;
    d = document;
    
    this.apiReady = false;
  }


  onTemperatureChange()
  {
    // TODO - POST new data to API

    console.log(this.temperature);
  }

  onPHChange()
  {
    // TODO - POST new data to API

    console.log(this.ph);
  }

  onAlcoholChange()
  {
    // TODO - POST new data to API

    console.log(this.alcohol);
  }

  onSugarChange()
  {
    // TODO - POST new data to API
    
    console.log(this.sugar);
  }

  getEmptyData(): any
  {
    // Create the data table.
    let dataArray = [
      ['Aucune donnée', 'Aucune donnée'],
      ['0',  0],
      ['100',  0]
    ];

    return w.google.visualization.arrayToDataTable(dataArray);
  }

  getTemperatureData(): any
  {
    // TODO - GET data from API

    // Create the data table.
    let dataArray = [
      ['Time', 'Température (°C)'],
      ['0',  (Math.random()*200.0)],
      ['30',  (Math.random()*200.0)],
      ['60',  (Math.random()*200.0)],
      ['90',  (Math.random()*200.0)],
      ['120',  (Math.random()*200.0)],
      ['150',  (Math.random()*200.0)],
      ['180',  (Math.random()*200.0)]
    ];

    return w.google.visualization.arrayToDataTable(dataArray);
  }

  getPHData(): any
  {
    // TODO - GET data from API

    // Create the data table.
    let dataArray = [
      ['Time', 'Acidité (PH)'],
      ['0',  (Math.random()*1000.0)],
      ['30',  (Math.random()*1000.0)],
      ['60',  (Math.random()*1000.0)],
      ['90',  (Math.random()*1000.0)],
      ['120',  (Math.random()*1000.0)],
      ['150',  (Math.random()*1000.0)],
      ['180',  (Math.random()*1000.0)],
      ['210',  (Math.random()*1000.0)],
      ['240',  (Math.random()*1000.0)],
      ['270',  (Math.random()*1000.0)],
      ['300',  (Math.random()*1000.0)],
      ['330',  (Math.random()*1000.0)],
      ['360',  (Math.random()*1000.0)]
    ];

    return w.google.visualization.arrayToDataTable(dataArray);
  }

  getAlcoholData(): any
  {
    // TODO - GET data from API

    // Create the data table.
    let dataArray = [
      ['Time', 'Taux d\'alcool (%)'],
      ['0',  (Math.random()*10.0)],
      ['30',  (Math.random()*10.0)],
      ['60',  (Math.random()*10.0)],
      ['90',  (Math.random()*10.0)],
      ['120',  (Math.random()*10.0)]
    ];

    return w.google.visualization.arrayToDataTable(dataArray);
  }

  getSugarData(): any
  {
    // TODO - GET data from API

    // Create the data table.
    let dataArray = [
      ['Time', 'Taux de sucre (mg/L)'],
      ['0',  (Math.random()*50.0)],
      ['30',  (Math.random()*50.0)],
      ['60',  (Math.random()*50.0)],
      ['90',  (Math.random()*50.0)],
      ['120',  (Math.random()*50.0)],
      ['150',  (Math.random()*50.0)],
      ['180',  (Math.random()*50.0)],
      ['210',  (Math.random()*50.0)],
      ['240',  (Math.random()*50.0)],
      ['270',  (Math.random()*50.0)],
      ['300',  (Math.random()*50.0)],
      ['330',  (Math.random()*50.0)],
      ['360',  (Math.random()*50.0)],
      ['390',  (Math.random()*50.0)],
      ['420',  (Math.random()*50.0)],
      ['450',  (Math.random()*50.0)]
    ];

    return w.google.visualization.arrayToDataTable(dataArray);
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
    if(this.fermentationId == null)
    {
      data = this.getEmptyData();
      options = this.getOptions('Aucune donnée');
    }
    else if(this.value == 0)
    {
      data = this.getTemperatureData();
      options = this.getOptions('Température');
    }
    else if(this.value == 1)
    {
      data = this.getPHData();
      options = this.getOptions('Acidité');
    }
    else if(this.value == 2)
    {
      data = this.getAlcoholData();
      options = this.getOptions('Taux d\'alcool');
    }
    else if(this.value == 3)
    {
      data = this.getSugarData();
      options = this.getOptions('Taux de sucre');
    }

    // Instantiate and draw our chart, passing in some options.
    
    this.chart.draw(data, options);
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
    else if(changes['fermentationId'] && this.apiReady)
    {
      this.drawChart();
    }
  }
}