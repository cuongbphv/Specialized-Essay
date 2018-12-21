import {Component, OnInit} from '@angular/core';
import {TranslateService} from '../../../../core/services';
import {User} from '../../../../core/models';


declare var $: any;

@Component({
  selector: 'tag-detail',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})

export class TagListComponent implements OnInit{

  currentUser: User;


  constructor(
    public translate: TranslateService
  ) {}

  public ngOnInit() {

    $(document).ready(function(){



    });



  }


}
