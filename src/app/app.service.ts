import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private translate: TranslateService) {}

  init() {
    this.translate.addLangs(['en', 'de', 'lv']);

    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      this.translate.use(browserLang.match(/en|de|lv/) ? browserLang : 'en');
    }
  }
}