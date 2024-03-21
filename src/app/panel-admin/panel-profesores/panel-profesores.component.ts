import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from 'src/app/service/profesores/profesores.service';

@Component({
  selector: 'app-panel-profesores',
  templateUrl: './panel-profesores.component.html',
  styleUrls: ['./panel-profesores.component.css']
})
export class PanelProfesoresComponent {

  constructor(private profesoresService: ProfesoresService) { }

  ngOnInit(): void {
    this.obtenerProfesoresPage();
  }

  paginaActual: number = 0;
  totalPaginas: number = 0;
  paginas: number[] = [];

  profesor: {
    email: string;
    password: string;
    nombre: string;
  } = { email: '', password: '', nombre: '' };

  profesorSeleccionado: any;
  profesoresActivos: boolean = true;
  profesores: any[] = [];

  obtenerProfesoresPage(pagina: number = 0, esActivo: boolean = true) {
    this.profesoresService.getProfesoresPage(pagina, esActivo).subscribe((data: any) => {
      this.paginaActual = data.number;
      this.totalPaginas = data.totalPages;
      this.profesores = data.content;
      this.generarPaginas();
    });
    this.profesoresActivos = esActivo;
  }

  generarPaginas() {
    this.paginas = [];
    for (let i = 0; i < this.totalPaginas; i++) {
      this.paginas.push(i);
    }
  }

  cambiarPagina(pagina: number, esActivo: boolean = true): void {
    this.obtenerProfesoresPage(pagina, esActivo);
  }

  registrarProfesor() {
    this.profesoresService.registrar(this.profesor.email, this.profesor.password, this.profesor.nombre).subscribe((data: any) => {
      this.obtenerProfesoresPage(this.paginaActual);
    });
    this.profesor = { email: '', password: '', nombre: '' };
    this.closeCreateModal();
  }

  eliminarProfesor(){
    this.profesoresService.eliminar(this.profesorSeleccionado.id).subscribe((data: any) => {
      this.obtenerProfesoresPage(this.paginaActual);
    });
    this.closeDeleteModal();
  }

  modificarProfesor(){
    this.profesoresService.modificar(this.profesorSeleccionado).subscribe((data: any) => {
      this.obtenerProfesoresPage(this.paginaActual);
    });
    this.closeEditModal();
  }

  activarProfesor(profID: number){
    this.profesoresService.activar(profID).subscribe((data: any) => {
      this.obtenerProfesoresPage(this.paginaActual);
    });
  }

  public isCreateModalOpen: boolean = false;
  public isDeleteModalOpen: boolean = false;
  public isEditModalOpen: boolean = false;

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  openDeleteModal(prof: any) {
    this.isDeleteModalOpen = true;
    this.profesorSeleccionado = prof;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.profesorSeleccionado = null;
  }

  openEditModal(prof: any) {
    this.isEditModalOpen = true;
    this.profesorSeleccionado = prof;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.profesorSeleccionado = null;
  }

}
