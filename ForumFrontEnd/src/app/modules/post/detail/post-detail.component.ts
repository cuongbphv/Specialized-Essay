import {Component, OnInit} from '@angular/core';

import {ArticleService, TranslateService} from '../../../core/services';
import {ActivatedRoute} from '@angular/router';
import marked from 'marked';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit{

  article: any = {};

  headingTag: any = [];

  constructor(
    public translate: TranslateService,
    public articleService: ArticleService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleService.getDetailPost(params['id']).subscribe(
        data => {
          data.content = this.preRenderMarkdown(data.content);
           this.article = data;
        }
      );
    });
  }

  preRenderMarkdown(content: string) {
    let htmlTag = marked(content, { sanitize: true, tables: true }).split("\n");
    for(let i = 0; i < htmlTag.length; i++) {
      if(htmlTag[i].includes("</h1>") || htmlTag[i].includes("</h2>")
        || htmlTag[i].includes("</h3>") || htmlTag[i].includes("</h4>")
        || htmlTag[i].includes("</h5>") || htmlTag[i].includes("</h6>")) {
        this.headingTag.push({
          id : window.location.href + "#" + htmlTag[i].substring(8, htmlTag[i].indexOf(">") - 1),
          base: htmlTag[i].substring(htmlTag[i].indexOf(">") + 1, htmlTag[i].lastIndexOf("<"))
        });
      }
    }
    console.log(this.headingTag);
    return marked(content, { sanitize: true, tables: true });
  }
}
