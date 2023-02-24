import { Component, OnInit } from '@angular/core';
import { UsuarioSemSenhaDTO } from '../DTO/UsuarioSemSenhaDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { AjustadorDeDatas } from '../Utils/AjustadorDeDatas';

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
      } else {
        this.id = prompt('Digite o número do mês de aniversário')
        this.router.navigate([`aniversariantes/${this.id}`])
      }
    })
  }

  buscarAniversariantes = () => {
    this.usuarioService.buscarAniversariantes(this.id).subscribe((usuarios: Array<UsuarioSemSenhaDTO>) => {
      if (usuarios.length > 0) {
        usuarios.forEach((usuario) => {
          this.ajustarDatas(usuario)
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

  ajustarDatas = (usuario: any) => {
    usuario.dataDeNascimento = AjustadorDeDatas.ajustaData(usuario.dataDeNascimento)
    usuario.dataDeCriacao = AjustadorDeDatas.ajustaDataEHora(usuario.dataDeCriacao)
    usuario.dataDeAtualizacao = AjustadorDeDatas.ajustaDataEHora(usuario.dataDeAtualizacao)
  }
}
