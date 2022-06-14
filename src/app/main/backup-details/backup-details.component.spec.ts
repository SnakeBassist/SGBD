import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupDetailsComponent } from './backup-details.component';

describe('BackupDetailsComponent', () => {
  let component: BackupDetailsComponent;
  let fixture: ComponentFixture<BackupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackupDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
