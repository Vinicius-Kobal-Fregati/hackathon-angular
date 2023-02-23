import { Component, OnInit } from '@angular/core';
import { UsuarioSemSenhaDTO } from '../DTO/UsuarioSemSenhaDTO';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  styleUrls: ['./aniversariantes.component.css']
})
export class AniversariantesComponent implements OnInit {

  id: any
  usuarios: Array<UsuarioSemSenhaDTO> = []

  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']) {
        this.id = parametros['id']
        this.buscarAniversariantes()
      }
    })
  }

  buscarAniversariantes = () => {
    this.usuarioService.buscarAniversariantes(this.id).subscribe((usuario: Array<UsuarioSemSenhaDTO>) => {
      if (usuario.length > 0) {
        this.usuarios = usuario
      } else {
        alert("Nenhum aniversariante encontrado")
      }
    })
  }
}
