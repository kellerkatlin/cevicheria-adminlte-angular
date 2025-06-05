import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoDialogComponent } from './insumo-dialog.component';

describe('InsumoDialogComponent', () => {
  let component: InsumoDialogComponent;
  let fixture: ComponentFixture<InsumoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsumoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsumoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
