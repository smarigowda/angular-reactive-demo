import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
// import { fromEvent } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements OnInit {
  weather = '';
  searchInput = new FormControl('');
  numbers: Observable<number> = interval(1000).pipe(take(10));
  private baseWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private urlSuffix = '&units=metric&appid=9a2a36f6759aaf58e682c8471ee07256';
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(switchMap((city) => this.getWeather(city)))
      .subscribe(
        (result) => {
          this.weather = `Current Temperature: ${result['main'].temp} Celcius,
          Humidity: ${result['main'].humidity} %`;
          console.log(result);
        },
        (error) => console.log(`Error: can not get weather: ${error}`)
      );
  }
  getWeather(city: string) {
    return this.http.get(this.baseWeatherURL + city + this.urlSuffix).pipe(
      catchError((err) => {
        if (err.status === 404) {
          console.log(`City ${city} not found`);
          return EMPTY;
        }
      })
    );
  }
}
