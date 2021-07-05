import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SampleUser, SampleUserStoreService } from "./sample-user-store/sample-user-store.service";
import SpyObj = jasmine.SpyObj;
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BehaviorSubject, of } from "rxjs";

describe('AppComponent', () => {
  let mockService: SpyObj<SampleUserStoreService>;
  let controller: HttpTestingController;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<SampleUserStoreService>([], ["data$", "set"]);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: SampleUserStoreService, useValue: mockService }
      ]
    }).compileComponents();
    controller = TestBed.inject(HttpTestingController)
  });

  it('初期化出来ること。', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('データが取得出来ること。', () => {
    // Arrange
    const users = [{
      id: 1,
      name: "name001",
      email: "email001@test.com",
      phone: "001-001-001",
    }] as SampleUser[];
    const subject = new BehaviorSubject<SampleUser[]>(users);

    // @ts-ignore
    Object.getOwnPropertyDescriptor(mockService, "data$").get.and.returnValue(subject.asObservable());
    const fixture = TestBed.createComponent(AppComponent);

    // Act
    fixture.detectChanges();

    // Assert
    const pre = fixture.nativeElement.querySelector('pre');
    const result = JSON.parse(pre.textContent) as SampleUser[];
    expect(result).toEqual(users);
  });
});
