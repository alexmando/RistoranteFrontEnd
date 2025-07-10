import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioneService } from './prenotazione.service';

describe('PrenotazioneService', () => {
  let component: PrenotazioneService;
  let fixture: ComponentFixture<PrenotazioneService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrenotazioneService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrenotazioneService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
