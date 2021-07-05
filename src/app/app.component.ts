import { Component, OnInit } from '@angular/core';
import { SampleUser, SampleUserStoreService } from "./sample-user-store/sample-user-store.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public users$: Observable<Array<SampleUser>>;

  constructor(private http :HttpClient, private service: SampleUserStoreService) {
    this.users$ = service.data$;
  }

  ngOnInit(): void {
    this.fetch().subscribe();
  }

  onButtonClick(): void {
    this.fetch().subscribe();
  }

  /**
   * データを取得します。
   * @private
   */
  private fetch(): Observable<Array<SampleUser>> {
    return this.http
      .get<Array<SampleUser>>('https://jsonplaceholder.typicode.com/users')
      .pipe(tap(x => this.service.set = x.filter(u => u.id > Math.floor( Math.random() * 10))));
  }

}
