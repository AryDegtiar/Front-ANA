import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {

  historialCompras: any;

  mostrarHistorial: boolean = false;

  listCompras: any;

  constructor() {}

  ngOnInit(): void {
  }


}
