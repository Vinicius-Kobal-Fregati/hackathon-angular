import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioSemSenhaDTO } from '../DTO/UsuarioSemSenhaDTO';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: number
  usuarios: Array<UsuarioSemSenhaDTO> = []
  first = 0;
  rows = 10;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(parametros => {
      if (parametros['id']) {
        this.id = parametros['id']
        this.receberUsuario()
      }
      else {
        this.receberTodosUsuarios()
      }
    })
  }

  receberTodosUsuarios = () => {
    this.usuarioService.listarTodos().subscribe((users) => {
      this.usuarios = users
    })
  }

  receberUsuario = () => {
    this.usuarioService.receberUsuario(this.id).subscribe((usuario) => {
      this.usuarios.push(usuario)
    })
  }

  excluirUsuario = (id: any) => {
    this.usuarioService.excluirUsuario(id).subscribe(
      success => this.ngOnInit(),
      error => alert("Item não excluído" + error)
    )
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.usuarios ? this.first === (this.usuarios.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.usuarios ? this.first === 0 : true;
  }
}
