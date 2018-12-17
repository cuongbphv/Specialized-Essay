import {Component, OnInit} from '@angular/core';

import { TranslateService } from '../../../core/services';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit {

  content: any = {};

  ngOnInit() {
    // let es = document.querySelectorAll('.input-categories');
    // for (let i = 0; i < es.length; i++) {
    //   es[i]._list = es[i].querySelector('ul');
    //   es[i]._input = es[i].querySelector('input');
    //   es[i]._input._icategories = es[i];
    //   es[i].onkeydown = function(e){
    //     var e = event || e;
    //     if(e.keyCode == 13) {
    //       var c = e.target._icategories;
    //       var li = document.createElement('li');
    //       li.innerHTML = c._input.value;
    //       c._list.appendChild(li);
    //       c._input.value = '';
    //       e.preventDefault();
    //     }
    //   }
    // }
  }

  constructor(
    public translate: TranslateService
  ) {}

  preRenderFunc(content: string) {
    return content.replace(/something/g, 'new value'); // must return a string
  }

}
