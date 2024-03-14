import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';

@Component({
  selector: 'app-panel-articulos-blog',
  templateUrl: './panel-articulos-blog.component.html',
  styleUrls: ['./panel-articulos-blog.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PanelArticulosBlogComponent implements OnInit {

  usuarios: any[] = [];
  paginaActual: number = 0;
  totalPaginas: number = 0;
  paginas: number[] = [];
  usuarioSeleccionado: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioService.getAllusuarios().subscribe((data: any) => {

      console.log("DATA: ", data);

      this.paginaActual = data.number;
      this.totalPaginas = data.totalPages;
      this.usuarios = data.content;

      console.log("PAGINA ACTUAL: ", this.paginaActual);
      console.log("TOTAL PAGINAS: ", this.totalPaginas);

      console.log("LISTA DE USUARIOS: ", this.usuarios);
      console.log("USUARIO 1: ", this.usuarios[0].user);

      // Generar las páginas disponibles
      this.generarPaginas();
    });

    console.log("cantidad de usuarios: ", this.usuarios.length);
  }

  public isModalOpen: boolean = false;
  public isDeleteModalOpen: boolean = false;
  public isEditModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
    console.log('Add Employee Modal opened!');
  }

  closeModal() {
    this.isModalOpen = false;
    console.log('Add Employee Modal closed!');
  }

  openDeleteModal(usuario: any) {
    this.isDeleteModalOpen = true;
    this.usuarioSeleccionado = usuario;
    console.log('Delete Employee Modal opened!');
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.usuarioSeleccionado = null;
    console.log('Delete Employee Modal closed!');
  }

  openEditModal(usuario: any) {
    this.isEditModalOpen = true;
    this.usuarioSeleccionado = usuario;
    console.log('Edit Employee Modal opened!');
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.usuarioSeleccionado = null;
    console.log('Edit Employee Modal closed!');
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    // Aquí puedes llamar a tu servicio para obtener los datos de la nueva página
  }

  generarPaginas() {
    this.paginas = [];
    for (let i = 0; i < this.totalPaginas; i++) {
      this.paginas.push(i);
    }
  }

  // CODIGO REPETIDO EN HISTORIAL DE COMPRAS REVISAR

  convertirComprasRealizadasAHistorialCompras(comprasRealizadas: any[]): any[] {
    let historialCompras: any[] = [];

    for (let compra of comprasRealizadas) {
      let prods = this.obtenerProductos(compra);
      let clases = this.obtenerClases(compra);
      historialCompras.push({
        fecha: compra.fecha,
        precio: compra.precio,
        metodoPago: compra.metodoPago,
        estadoCompra: compra.estado,
        clases: clases,
        productos: prods,
      });
      console.log("historialCompras en el loop: " + JSON.stringify(historialCompras));
    }

    // Ordenar el historial de compras por fecha
    return historialCompras.reverse();;
  }

  obtenerProductos(compra: any) {
    let productos = [];
    for (let producto of compra.productos) {
      // Buscar el producto en el historial de compras por su nombre
      let productoExistenteIndex = productos.findIndex(item => item.producto.nombre === producto.nombre);

      if (productoExistenteIndex !== -1) {
        // Si el producto ya está en el historial de compras, incrementar su cantidad
        productos[productoExistenteIndex].cantidad += 1;
      } else {
        // Si el producto no está en el historial de compras, agregarlo con cantidad 1
        productos.push({
          producto: producto,
          cantidad: 1
        });
      }
    }
    return productos;
  }

  obtenerClases(compra: any) {
    let clases = [];
    for (let clase of compra.clases) {
      // Buscar la clase en el historial de compras por su nombre
      let claseExistenteIndex = clases.findIndex(item => item.clase.clase.nombre === clase.clase.nombre);

      if (claseExistenteIndex !== -1) {
        // Si la clase ya está en el historial de compras, incrementar su cantidad
        clases[claseExistenteIndex].cantidad += 1;
      } else {
        // Si la clase no está en el historial de compras, agregarla con cantidad 1
        clases.push({
          clase: clase,
          cantidad: 1
        });
      }
    }
    return clases;
  }

}
