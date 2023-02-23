import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioSemSenhaDTO } from '../DTO/UsuarioSemSenhaDTO';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-letra-inicial',
  templateUrl: './letra-inicial.component.html',
  styleUrls: ['./letra-inicial.component.css']
})
export class LetraInicialComponent implements OnInit {

  caracter: string = ''
  usuarios: Array<UsuarioSemSenhaDTO> = []

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parametros => {
      if (parametros['caracter']) {
        this.caracter = parametros['caracter']
        this.recebeUsuarioPelaInicial()
      }
    })
  }

  recebeUsuarioPelaInicial = () => {
    this.usuarioService.buscaUsuarioPelaInicial(this.caracter.charAt(0)).subscribe((usuarios: Array<UsuarioSemSenhaDTO>) => {
      usuarios.forEach((usuario) => {
        let dataCriacao = usuario.dataDeCriacao
        usuario.dataDeCriacao = new Date(dataCriacao[0], dataCriacao[1] - 1, dataCriacao[2], dataCriacao[3], dataCriacao[4])
      })
      this.usuarios = usuarios
    })
  }
}
