import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptolistComponent } from './cryptolist.component';

describe('CryptolistComponent', () => {
  let component: CryptolistComponent;
  let fixture: ComponentFixture<CryptolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
