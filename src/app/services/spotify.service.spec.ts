import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpotifyService } from './spotify.service';
import { spotify_environment, lyrics_enviroment, genius_enviroment, youtube_enviroment, qr_enviroment } from '../../enviorements/environment';
import { HttpClient } from '@angular/common/http';

describe('SpotifyService', () => {
  let service: SpotifyService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = {} as HttpClient;
    service = new SpotifyService(httpClient);
  });


  it('should make a POST request to Spotify API for authorization', () => {
    const mockResponse = { access_token: 'mockToken', token_type: 'Bearer' };

    service.authorization_spotify().subscribe((res: any) => {
      expect(res.access_token).toBeTruthy();
      expect(res.token_type).toEqual(mockResponse.token_type);
    });
  });
});
