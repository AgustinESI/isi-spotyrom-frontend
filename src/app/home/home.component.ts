import { Component } from '@angular/core';
import { ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { debounceTime, finalize, map, switchMap, tap } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Song } from '../song.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import User from '../interfaces/user.interfaces';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public isLoading = false;
  public src: string | undefined;
  public data$: any;
  private _token: string = '';
  public song: Song = new Song();
  public loadinfo: boolean | undefined = undefined;
  public logedUser!: User;

  constructor(private spotifyService: SpotifyService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.spotifyService.authorization_spotify().subscribe(
      (data) => {
        this._token = data.access_token;
      },
      (error) => {
        alert('Error:' + error.error.message);
        console.log(error);
      }
    );

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.logedUser = JSON.parse(storedUser);
      console.log(this.logedUser);
    }

  }

  search(value: any): any {
    this.song = new Song();
    this.isLoading = true;
    this.data$ = this.spotifyService.search_track_spotify({ q: value }, this._token)
      .pipe(
        map(({ tracks }) => tracks.items),
        finalize(() => this.isLoading = false)
      )
    //console.log(this.data$)
  }


  handleCardClick(item: any) {
    // Handle the click event here, 'item' contains the data of the clicked card
    console.log('Card clicked:', item);
    this.song = new Song();
    this.song.audio = item.preview_url;
    this.song.parental = item.explicit;
    this.loadinfo = false;

    for (let i = 0; i < item.artists.length; i++) {
      var artist = item.artists[i];
      this.song.artists.push(artist.name)
    }

    this.spotifyService.get_song_lyrics(item.name, item.artists[0].name).subscribe(
      (data) => {
        //let replaced = data.lyrics.replace(/\n/g, "<br>");
        let parts = data.lyrics.split('\n');
        var lyrics = parts.slice(1).join('\n');

        this.song.lyrics = lyrics;

      },
      (error) => {
        this.song.lyrics = "No se ha encontrado letra.";
      }
    );


    this.spotifyService.search_genius(item.name, item.artists[0].name).subscribe(
      (data: any) => {
        this.song.id = data.response.hits[0].result.id;
        this.spotifyService.search_song_genius(data.response.hits[0].result.id).subscribe(
          (response: any) => {
            //console.log("response", response);
            this.song.album_name = response.response.song.full_title;
            this.song.date = response.response.song.album.release_date_for_display;
          },
          (error) => {
            alert('Error:' + error.error);
          }
        );

      },
      (error) => {
        alert('Error:' + error.error);
      }
    );


    this.spotifyService.search_song_youtube(item.name + " " + item.artists[0].name).subscribe(
      (data: any) => {
        var url = 'https://www.youtube.com/embed/' + data.items[0].id.videoId;
        this.song.youtube = url;
        this.song.youtube_name = data.items[0].snippet.title;
      },
      (error) => {

      }
    );


    this.spotifyService.generate_qr_code(item.external_urls.spotify).subscribe(
      (data: any) => {
        //console.log('IMAGE', data);
        this.song.qr = data.result.qr;
      },
      (error) => {
        console.log(error);
      }
    );

    this.loadinfo = true;

    /*
    setTimeout(() => {
      this.loadinfo = true;
    }, 3000);
    */
  }

  get_sanitizedYouTubeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
