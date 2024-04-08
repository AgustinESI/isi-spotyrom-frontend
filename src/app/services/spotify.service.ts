import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { spotify_environment, lyrics_enviroment, genius_enviroment, youtube_enviroment, qr_enviroment } from '../../enviorements/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private headerCustom!: HttpHeaders;

  constructor(private httpClient: HttpClient) {
  }

  authorization_spotify(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams()
      .set('grant_type', `${spotify_environment.grant_type}`)
      .set('client_id', `${spotify_environment.client_id}`)
      .set('client_secret', `${spotify_environment.client_secret}`);

    return this.httpClient.post(
      `${spotify_environment.url_auth}`,
      null, { headers: headers, params: params, withCredentials: true }
    );
  }

  search_track_spotify({ q }: TrackModel, token: string): Observable<any> {
    this.headerCustom = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpClient.get(`${spotify_environment.url_search}?q=${q}&type=track&limit=5`,
      { headers: this.headerCustom });
  }

  get_song_lyrics(song_name: string, artist_name: string): Observable<any> {
    return this.httpClient.get(`${lyrics_enviroment.url_search}` + artist_name + "/" + song_name);
  }

  search_genius(song_name: string, artist_name: string) {
    const token = `Bearer ${genius_enviroment.access_token}`;
    const headers = new HttpHeaders().set('Authorization', token);

    return this.httpClient.get(`${genius_enviroment.url_search}` + "?q=" + song_name + " " + artist_name,
      { headers: headers, withCredentials: true });
  }

  search_song_genius(id: string) {
    const token = `Bearer ${genius_enviroment.access_token}`;
    const headers = new HttpHeaders().set('Authorization', token);

    return this.httpClient.get(`${genius_enviroment.url_search_song}` + id,
      { headers: headers, withCredentials: true });
  }

  search_song_youtube(q: string) {
    const key = `${youtube_enviroment.key}`;
    const params = new HttpParams()
      .set('key', key)
      .set('type', 'video')
      .set('q', q)
      .set('part', 'snippet');

    return this.httpClient.get(youtube_enviroment.url_search,
      { params: params });
  }

  generate_qr_code(q: string) {
    const url = "https://white.qrd.by/api/short?secretkey=61f2027768be9ae6adb52da232944e38&url=";
    const params = new HttpParams()
      .set('size', '150x150')
      .set('data', q);

    return this.httpClient.get(url + q);
  }

}

export class TrackModel {
  q!: string;
}