import {Component, OnInit} from '@angular/core';
import {TranslateService, GooglePieChartService, UserService, ProfilesService} from '../../core/services';

import {PieChartConfig, Profile, User} from '../../core/models';
import {Pattern} from '../../shared/constant';

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

  currentProfile: Profile = {
    userId: '',
    userProfileId: '',
    lastName: '',
    firstName: '',
    avatar: '',
    company: '',
    position: '',
    description: '',
    githubLink: '',
    websiteLink: '',
  };

  profileMode: number = 1; // 1 info, 2 update

  namePattern: any = Pattern.NAME_PATTERN;

  constructor(
    public translate: TranslateService,
    private pieChartService: GooglePieChartService,
    private userService:UserService,
    private profileService: ProfilesService) {}

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
        this.profileService.get(userData.userId)
          .subscribe(userProfile => {
            this.currentProfile = userProfile;
          });
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
    console.log('profile ', this.currentUser);
  }

  forwardToUpdate(){
    this.profileMode = 2;
  }

  updateProfile(){

    this.profileService.update(this.currentProfile)
      .subscribe(userProfile => {
        this.currentProfile = userProfile;
        console.log("Profile Updated");
        this.profileMode = 1;
      })

  }

}
