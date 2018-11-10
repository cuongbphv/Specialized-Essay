import {GoogleChartsBaseService} from './google-charts-base.service';
import {Injectable} from '@angular/core';
import {PieChartConfig} from '../models/pie-chart';

declare var google: any;

@Injectable()
export class GooglePieChartService extends GoogleChartsBaseService {

  constructor() {
    super();
  }

  public BuildPieChart(elementId: string, data: any[], config: PieChartConfig): void {
    var chartFunc = () => {
      return new google.visualization.PieChart(document.getElementById(elementId));
    };
    var options = {
      title: config.title,
      pieHole: config.pieHole,
      legend: config.legend,
      pieSliceText: config.pieSliceText,
      animation: {
        startup:true,
        duration: 1000,
        easing: 'out'
      },
      vAxis: {minValue:0, maxValue:1000}
    };

    this.buildChart(data, chartFunc, options);
  }
}
