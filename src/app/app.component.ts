/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { DbService } from './services/db/db.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppComponent';

  window = window;

  theme = 'dark';
  mobileMode = false;

  constructor(
    public db: DbService,
    public router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    console.log(`[${this.title}#constructor]`);

    this.redirectTo(this.db.get('last_page') || '', this.title);

    this.theme = this.db.get('theme') || 'dark';
    this.toggleTheme(this.theme);

    this.toggleMobileMode();

    this.window.onresize = () => {
      this.toggleMobileMode();
    };

    if (this.db.get('stars') === null) {
      this.db.set('stars', []);
    }
  }

  updateView(from: string) {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges;
  }

  redirectTo(url: any, from: any) {
    console.log(`[${this.title}#redirectTo] ${from} | url`, url);

    this.router.navigateByUrl(`/${url}`);

    this.db.set('last_page', url);
    console.log(`[${this.title}#redirectTo] last_page`, this.db.get('last_page'));

    this.updateView(this.title);
  }

  toggleTheme(theme: any) {
    console.log(`[${this.title}#toggleTheme] theme`, theme);

    this.theme = theme;

    document.body.setAttribute('theme', theme);

    this.updateView(this.title);
  }

  toggleMobileMode() {
    const width = window.innerWidth;
    const condition = width < 900;
    console.log(`[${this.title}#toggleMobileMode] width`, width, condition);

    if (condition) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }

    this.updateView(this.title);
  }

  addStart(event: any) {
    console.log(`[${this.title}#addStart] event`, event);

    const Xpos = event.offsetX;
    console.log(`[${this.title}#addStart] Xpos`, Xpos);

    const Ypos = event.offsetY;
    console.log(`[${this.title}#addStart] Ypos`, Ypos);

    const newStar = document.createElement('button');
    newStar.id = 'star';
    newStar.style.top = Ypos + 'px';
    newStar.style.left = Xpos + 'px';
    newStar.style.position = 'absolute';
    newStar.style.width = '3px';
    newStar.style.height = '3px';
    newStar.style.borderRadius = '50%';
    newStar.style.border = 'none';
    newStar.style.padding = '0';
    newStar.style.margin = '0';
    newStar.style.backgroundColor = 'white';
    newStar.style.boxShadow = '0px 0px 10px 2px white';
    newStar.style.zIndex = '1';

    this.db.get('stars')?.push(newStar);

    const main = document.querySelector('main');
    main?.appendChild(newStar);
  }
}
