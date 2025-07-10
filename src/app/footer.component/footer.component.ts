import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone : false,
  template: `
    <footer class="mt-5 py-3 bg-light text-center">
      <div class="container">
        <span class="text-muted">© 2023 Ristorante App</span>
      </div>
    </footer>
  `
})
export class FooterComponent {}
