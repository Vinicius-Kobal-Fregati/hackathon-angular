import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioCriacaoDTO } from '../DTO/UsuarioCriacaoDTO';

import { UsuarioService } from '../service/usuario.service';
import { Encriptor } from '../Utils/Encriptor';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  id: any 
  usuario: UsuarioCriacaoDTO = new UsuarioCriacaoDTO() 

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  salvar = () => {
    this.usuario.senha = Encriptor.encriptografaSenha(this.usuario.senha)
    this.usuarioService.adicionarUsuario(this.usuario).subscribe({
      complete: () => {
        this.router.navigate(['home'])
      },
      error: () => alert("Erro ao salvar")
    })
  }

}
