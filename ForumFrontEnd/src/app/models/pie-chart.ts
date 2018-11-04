export class PieChartConfig {
  title: string;
  pieHole: number;
  legend: string;
  pieSliceText: string;

  constructor(title: string, pieHole: number, legend: string, pieSliceText:string) {
    this.title = title;
    this.pieHole = pieHole;
    this.legend = legend;
    this.pieSliceText = pieSliceText;
  }
}
