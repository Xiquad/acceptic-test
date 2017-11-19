import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  API_KEY = 'AIzaSyCxqFnp29qT7f3a0CpFjVUF-W_8YtJAbQc';
  dataBase: Object;
  constructor(private http: HttpClient) {
    const self = this;
    this.dataBase = {
      youtube: {
        embed: 'https://www.youtube.com/embed/',
        parser: function(url) {
          let id = '';
          url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
          if (url[2] !== undefined) {
            id = url[2].split(/[^0-9a-z_\-]/i);
            id = id[0];
          }else {
            id = null;
          }
          return id !== null ? this.embed + id : null;
        }
      },
      instagram: {
        embed: 'https://api.instagram.com/oembed?url=',
        parser: function(url): Observable<any> {
          const reg = url.split(/\/p\//);
          if(reg[1]){
            return self.http.get(this.embed + url);
          }else {
            return null;
          }
        }
      }
    };
  }

  public searchYT(query): Observable<any> {
    return this.http.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
          key: this.API_KEY,
          type: 'video',
          maxResults: '5',
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,' +
                  'items/snippet/thumbnails/default,items/snippet/channelTitle',
          q: query
      }
    });
  }

  public parse(sourceurl, source) {
    return this.dataBase[source].parser(sourceurl);
  }

}
