import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { UsuarioCriacaoDTO } from '../DTO/UsuarioCriacaoDTO';
import { UsuarioService } from '../service/usuario.service';
import { Encriptor } from '../Utils/Encriptor';
import { AjustadorDeDatas } from '../Utils/AjustadorDeDatas';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService]
})
export class CadastroComponent implements OnInit {

  id: any 
  usuario: UsuarioCriacaoDTO = new UsuarioCriacaoDTO()
  textoBotao: string = 'Salvar'
  iconeBotao: string = 'pi pi-save'

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: MessageService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']) {
        this.id = parametros['id']
        this.textoBotao = 'Editar'
        this.iconeBotao = 'pi pi-user-edit'
        this.usuarioService.receberUsuario(this.id).subscribe(usuario => {
          usuario.dataDeNascimento = AjustadorDeDatas.ajustaData(usuario.dataDeNascimento)
          this.usuario = usuario
        })
      }
    })
  }

  salvar = () => {
    this.usuario.senha = Encriptor.encriptografaSenha(this.usuario.senha)
    if (this.id > 0) {
      this.editar()
    } else {
      this.usuarioService.adicionarUsuario(this.usuario).subscribe({
        complete: () => {
          this.router.navigate(['home'])
        },
        error: (error: HttpErrorResponse) => {
          this.usuario.senha = Encriptor.descriptografaSenha(this.usuario.senha)
          this.addSingle("Erro ao salvar", error.error)
        }
      })
    }
  }

  editar = () => {
    this.usuarioService.editarUsuario(this.usuario).subscribe({
      complete: () => {
        this.router.navigate(['home'])
      },
      error: (error: HttpErrorResponse) => {
        this.usuario.senha = Encriptor.descriptografaSenha(this.usuario.senha)
        this.addSingle('Erro ao editar', error.error)
      }
    })
  }

  addSingle(summary: string, detail: string) {
    this.message.add({key: 'mensagemDeErro', severity:'error', summary:summary, detail:detail});
  }
}