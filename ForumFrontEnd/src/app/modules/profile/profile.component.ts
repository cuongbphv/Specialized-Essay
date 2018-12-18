import {Component, OnInit} from '@angular/core';
import {TranslateService, GooglePieChartService, UserService} from '../../core/services';

import {PieChartConfig, User} from '../../core/models';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{

  data: any[];
  config: PieChartConfig;
  elementId: string;

  currentUser: User;

  constructor(
    private tranSlateService: TranslateService,
    private pieChartService: GooglePieChartService,
    private userService:UserService) {}

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

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    this.data = [['Post', 'Posts per Tag'],
      ['Javascript', 2],
      ['NodeJS',  4],
      ['Spring', 10],
      ['AI', 7]];

    this.config = new PieChartConfig(null, 0.7, 'none', 'none');
    this.elementId = 'myPieChart';

    this.pieChartService.BuildPieChart(this.elementId, this.data, this.config);

  }

  hihi(){
    console.log('profile ', this.currentUser.userId);
  }


}
