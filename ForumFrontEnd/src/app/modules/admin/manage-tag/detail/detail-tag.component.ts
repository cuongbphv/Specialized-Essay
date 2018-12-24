import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TagService} from '../../../../core/services';
import {CustomToastrService} from '../../../../core/services/custom-toastr.service';

@Component({
  selector: 'admin-detail-tag',
  templateUrl: './detail-tag.component.html',
  styleUrls: ['../../../../app.component.scss','./detail-tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailTagComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    private toastrService: CustomToastrService
  ) { }

  tagId : any = {};
  tag: any = {};

  ngOnInit() {


    this.tagId = this.route.snapshot.params['id'];

    this.getTagDetail();

  }

  getTagDetail(){
    this.tagService.getTagInfomation(this.tagId)
      .subscribe(data => {

        console.log(data);

        this.tag.tagId = data[0];
        this.tag.tagName = data[1];
        this.tag.description = data[2];
        this.tag.createDate = data[3];
      })
  }

  deleteTag(){
    this.tagService.deleteTag(this.tagId)
      .subscribe(data => {
        if(data === "Deleted"){
          this.toastrService.showSuccessToastr("Deleted");
        }
      })
  }

  updateTag(){
    this.tagService.updateTag(this.tag)
      .subscribe(data => {
        if(data === "Updated"){
            this.toastrService.showSuccessToastr("Updated");
        }
      })
  }



}
