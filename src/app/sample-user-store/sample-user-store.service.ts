import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

/**
 * SampleUser のインターフェースです。
 */
export interface SampleUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

/**
 * SampleUserStoreService です。
 */
@Injectable({
  providedIn: 'root'
})
export class SampleUserStoreService {

  private subject$: BehaviorSubject<SampleUser[]> = new BehaviorSubject<SampleUser[]>([]);

  constructor() { }

  public set set(users: SampleUser[]) {
    this.subject$.next(users);
  }

  public get data$() {
    return this.subject$.asObservable();
  }
}
