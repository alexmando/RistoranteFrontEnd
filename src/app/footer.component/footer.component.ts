import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone : false,
  template: `
    <footer>
  <div class="footer-content">
    <div class="footer-section">
      <h3>Ristorante Mandolito</h3>
      <p>Via montesanto, 123</p>
      <p>87100 Cosenza, Italia</p>
    </div>
    
    <div class="footer-section">
      <h3>Orari</h3>
      <p>Lun-Sab: 12:00 - 15:00, 19:00 - 23:00</p>
      <p>Domenica: 19:00 - 23:00</p>
    </div>
    
    <div class="footer-section">
      <h3>Contatti</h3>
      <p><i class="fas fa-phone"></i> +39 333 7719171</p>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p>&copy; 2025 Ristorante Mandolito. Tutti i diritti riservati.</p>
    <div class="social-icons">
      <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
    </div>
  </div>
</footer>
  `
})
export class FooterComponent {}
