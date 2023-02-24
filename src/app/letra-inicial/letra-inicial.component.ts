import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioSemSenhaDTO } from '../DTO/UsuarioSemSenhaDTO';
import { UsuarioService } from '../service/usuario.service';
import { AjustadorDeDatas } from '../Utils/AjustadorDeDatas';

@Component({
  selector: 'app-letra-inicial',
  templateUrl: './letra-inicial.component.html',
  styleUrls: ['./letra-inicial.component.css']
})
export class LetraInicialComponent implements OnInit {

  caracter: string = ''
  usuarios: Array<UsuarioSemSenhaDTO> = []

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(parametros => {
      if (parametros['caracter']) {
        this.caracter = parametros['caracter']
        this.recebeUsuarioPelaInicial()
      } else {
        this.caracter = prompt('Digite o caracter')
        this.router.navigate([`inicial/${this.caracter}`])
      }
    })
  }

  recebeUsuarioPelaInicial = () => {
    this.usuarioService.buscaUsuarioPelaInicial(this.caracter.charAt(0)).subscribe((usuarios: Array<UsuarioSemSenhaDTO>) => {
      usuarios.forEach((usuario) => {
        this.ajustarDatas(usuario)
      })
      this.usuarios = usuarios
    })
  }

  excluirUsuario = (id: any) => {
    this.usuarioService.excluirUsuario(id).subscribe(
      success => this.ngOnInit(),
      error => alert("Item não excluído" + error)
    )
  }

  editarUsuario = (id: any) => {
    this.router.navigate([`cadastro/${id}`])
  }

  ajustarDatas = (usuario: any) => {
    usuario.dataDeNascimento = AjustadorDeDatas.ajustaData(usuario.dataDeNascimento)
    usuario.dataDeCriacao = AjustadorDeDatas.ajustaDataEHora(usuario.dataDeCriacao)
    usuario.dataDeAtualizacao = AjustadorDeDatas.ajustaDataEHora(usuario.dataDeAtualizacao)
  }
}
