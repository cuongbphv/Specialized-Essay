import { Component } from '@angular/core';
import { TranslateService, GooglePieChartService} from '../../core/services';

import {PieChartConfig} from '../../core/models';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  data: any[];
  config: PieChartConfig;
  elementId: string;

  constructor(
    private tranSlateService: TranslateService,
    private pieChartService: GooglePieChartService) {}

  public ngOnInit() {
    $(document).ready(function(){


      $(function () {
        $("[data-toggle='tooltip']").tooltip();
      });


      $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
      });

    });

    this.data = [['Post', 'Posts per Tag'],
      ['Javascript', 2],
      ['NodeJS',  4],
      ['Spring', 10],
      ['AI', 7]];

    this.config = new PieChartConfig(null, 0.7, 'none', 'none');
    this.elementId = 'myPieChart';

    this.pieChartService.BuildPieChart(this.elementId, this.data, this.config);

  }
}
