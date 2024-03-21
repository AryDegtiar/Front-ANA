import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-usuarios',
  templateUrl: './panel-usuarios.component.html',
  styleUrls: ['./panel-usuarios.component.css']
})
export class PanelUsuariosComponent implements OnInit {

  usuarios: any[] = [];
  paginaActual: number = 0;
  totalPaginas: number = 0;
  paginas: number[] = [];
  usuarioSeleccionado: any;
  usuario: {
    email: string;
    password: string;
    nombre: string;
  }  = { email: '', password: '', nombre: '' };
  usuarioActivos: boolean = true;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerUsuariosPage();
  }

  public isModalOpen: boolean = false;
  public isDeleteModalOpen: boolean = false;
  public isEditModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openDeleteModal(usuario: any) {
    this.isDeleteModalOpen = true;
    this.usuarioSeleccionado = usuario;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.usuarioSeleccionado = null;
  }

  openEditModal(usuario: any) {
    this.isEditModalOpen = true;
    this.usuarioSeleccionado = usuario;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.usuarioSeleccionado = null;
  }

  cambiarPagina(pagina: number, esActivo: boolean = true): void {
    this.obtenerUsuariosPage(pagina, esActivo);
    // Aquí puedes llamar a tu servicio para obtener los datos de la nueva página
  }

  generarPaginas() {
    this.paginas = [];
    for (let i = 0; i < this.totalPaginas; i++) {
      this.paginas.push(i);
    }
  }

  registrarUsuario() {
    this.usuarioService.registrar(this.usuario.email, this.usuario.password, this.usuario.nombre).subscribe((data: any) => {
      this.obtenerUsuariosPage(this.paginaActual);
    });
    this.closeModal();
    this.usuario = { email: '', password: '', nombre: '' };
  }

  eliminarUsuario() {
    this.usuarioService.eliminar(this.usuarioSeleccionado.id).subscribe((data: any) => {
      this.obtenerUsuariosPage(this.paginaActual);
    });
    this.closeDeleteModal();
    //this.obtenerUsuariosPage(this.paginaActual);
  }

  modificarUsu(){
    console.log("USUARIO sin MODIFICAR: ", this.usuarioSeleccionado, " id: ", this.usuarioSeleccionado.id);
    this.usuarioService.modificar(this.usuarioSeleccionado).subscribe((data: any) => {
      console.log("USUARIO MODIFICADO: ", data);
      this.obtenerUsuariosPage(this.paginaActual);
    });
    this.closeEditModal();
  }

  editarCompra(){
    this.usuarioService.serCompraSeleccionada(this.usuarioSeleccionado);
    this.router.navigate(['/paneladmin/modificarcompra']);
  }

  activarUsuario(idUsuario: number) {
    this.usuarioService.activarUsuario(idUsuario).subscribe((data: any) => {
      this.obtenerUsuariosPage(this.paginaActual);
    });
  }

  obtenerUsuariosPage(pagina: number = 0, esActivo: boolean = true) {
    this.usuarioService.getusuariosPage(pagina, esActivo).subscribe((data: any) => {
      this.paginaActual = data.number;
      this.totalPaginas = data.totalPages;
      this.usuarios = data.content;
      this.generarPaginas();
    });
    this.usuarioActivos = esActivo;
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

