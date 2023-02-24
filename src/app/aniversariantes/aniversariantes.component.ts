import { Component, OnInit } from '@angular/core';
import { UsuarioSemSenhaDTO } from '../DTO/UsuarioSemSenhaDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  styleUrls: ['./aniversariantes.component.css']
})
export class AniversariantesComponent implements OnInit {

  id: any
  usuarios: Array<UsuarioSemSenhaDTO> = []

  constructor(private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']) {
        this.id = parametros['id']
        this.buscarAniversariantes()
      }
    })
  }

  buscarAniversariantes = () => {
    this.usuarioService.buscarAniversariantes(this.id).subscribe((usuarios: Array<UsuarioSemSenhaDTO>) => {
      if (usuarios.length > 0) {
        usuarios.forEach((usuario) => {
          let dataCriacao = usuario.dataDeCriacao
          usuario.dataDeCriacao = new Date(dataCriacao[0], dataCriacao[1] - 1, dataCriacao[2], dataCriacao[3], dataCriacao[4])
        })
        this.usuarios = usuarios
      } else {
        alert("Nenhum aniversariante encontrado")
      }
    })
  }

  editarUsuario = (id: any) => {
    this.router.navigate([`cadastro/${id}`])
  }

  excluirUsuario = (id: any) => {
    this.usuarioService.excluirUsuario(id).subscribe(
      success => this.ngOnInit(),
      error => alert("Item não excluído" + error)
    )
  }
}
