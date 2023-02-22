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
}
