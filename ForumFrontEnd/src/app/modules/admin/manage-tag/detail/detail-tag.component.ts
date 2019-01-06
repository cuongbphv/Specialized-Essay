import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TagService} from '../../../../core/services';
import {CustomToastrService} from '../../../../core/services/custom-toastr.service';
import {ConfirmationDialogService} from '../../confirmation-dialog/confirmation-dialog.service';

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
    private toastrService: CustomToastrService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  tagId : any = {};
  tag: any = {};

  ngOnInit() {


    this.tagId = this.route.snapshot.params['id'];

    this.getTagDetail();

  }

  getTagDetail(){
    this.tagService.getTagInfo(this.tagId)
      .subscribe(data => {

        this.tag = data;
      })
  }

  public openDeleteConfirmationDialog() {
    this.confirmationDialogService.confirm('Confirm Deletion', 'Do you really want to delete this tag?')
      .then((confirmed) => confirmed && this.deleteTag())
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteTag(){
    this.tagService.deleteTag(this.tagId)
      .subscribe(data => {
        if(data === "Deleted"){
          this.toastrService.showSuccessToastr("Deleted");
          this.router.navigateByUrl("/admin/tag/list");
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

  reactiveTag(){
    this.tag.status = 1;
    this.updateTag();
  }



}
