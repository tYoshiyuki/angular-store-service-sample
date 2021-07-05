import { TestBed } from '@angular/core/testing';

import { SampleUser, SampleUserStoreService } from './sample-user-store.service';
import { of } from "rxjs";

describe('SampleUserStoreService', () => {
  let service: SampleUserStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleUserStoreService);
  });

  it('初期化出来ること。', () => {
    expect(service).toBeTruthy();
  });

  it('データの登録、取得が出来ること。', () => {
    // Arrange
    const users = [{
      id: 1,
      name: "name001",
      email: "email001@test.com",
      phone: "001-001-001",
    }] as SampleUser[];
    service.set = users;

    // Act
    let result: SampleUser[] = [];
    service.data$.subscribe(x => result = x);

    // Assert
    expect(result).toEqual(users);
  });

});
