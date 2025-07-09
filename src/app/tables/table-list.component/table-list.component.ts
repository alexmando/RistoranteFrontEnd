import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-table-list',
  template: `
    <h2>Tavoli Disponibili</h2>
    <ul>
      <li *ngFor="let t of tables">Tavolo {{ t.id }} - {{ t.seats }} posti</li>
    </ul>
  `
})
export class TableListComponent implements OnInit {
  tables: any[] = [];

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.tableService.getAll().subscribe(data => this.tables = data);
  }
}

