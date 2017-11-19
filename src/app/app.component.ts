import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './services/api.service';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  title = 'app';
  embedUrl = '';
  searchQuery = '';
  frameUrl: SafeResourceUrl;
  selectedSource = '';
  status = 'Please enter an url to embed';
  loadedVideos = [];

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {
  }

  private onVideoSearch(event) {
    if ((!event || event.keyCode === 13) && this.searchQuery.length > 2) {
      this.apiService.searchYT(this.searchQuery).subscribe(data => {
        if (data.items.length) {
          console.log(data);
          this.loadedVideos = data.items;
        }else {
          this.displayError('AN ERROR OCCURED');
        }
      });
    }
  }

  private onEmbed(event) {
    if ((!event || event.keyCode === 13) && this.selectedSource) {
      const data = this.apiService.parse(this.embedUrl, this.selectedSource);
      if (data === null) {
        this.displayError('Please enter a valid URL');
      }else if (data instanceof Observable) {
        data.subscribe(resp => {
          this.embed(resp.thumbnail_url);
        });
      }else {
        this.embed(data);
      }
    }
  }

  private displayError(msg) {
    this.searchQuery = '';
    this.embedUrl = '';
    this.frameUrl = '';
    this.status = msg;
  }

  private play(id) {
    this.embed('https://www.youtube.com/embed/' + id);
  }

  private embed(url) {
    console.log(url);
    this.frameUrl = this.safeUrl(url);
  }

  private safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
