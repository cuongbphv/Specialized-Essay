import { Component } from '@angular/core';

import { TranslateService } from './shared/services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public translate: TranslateService){
    console.log(translate.data);
  }

  setLang(lang: string) {
    this.translate.use(lang).then(() => {});
  }

  public ngOnInit(){

  }
}
