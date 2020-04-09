import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
// import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements AfterViewInit {
  // title = 'dom-events-to-observables';
  searchInput = new FormControl('');
  ngAfterViewInit() {
    this.searchInput.valueChanges.pipe(debounceTime(500)).subscribe(stock => this.getStockQuoteFromServer(stock));
  }
  getStockQuoteFromServer(stock: string) {
    console.log('--- stock symbol entered is ---');
    console.log(stock);
    console.log(`The price of ${stock} is ${(100 * Math.random()).toFixed(4)}`);
  }
}
