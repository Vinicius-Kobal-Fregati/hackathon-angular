import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UsuarioSemSenhaDTO } from '../DTO/UsuarioSemSenhaDTO';
import { UsuarioCriacaoDTO } from '../DTO/UsuarioCriacaoDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = `${environment.API}/usuarios`
  constructor(private $http: HttpClient) { }

  listarTodos() {
    return this.$http.get<UsuarioSemSenhaDTO[]>(`${this.API}`)
  }

  receberUsuario(id: any) {
    return this.$http.get<UsuarioSemSenhaDTO>(`${this.API}/${id}`)
  }

  excluirUsuario(id: any) {
    return this.$http.delete(`${this.API}/${id}`)
  }

  adicionarUsuario(usuario: UsuarioCriacaoDTO) {
    return this.$http.post(this.API, usuario)
  }

  editarUsuario(usuario: UsuarioCriacaoDTO) {
    return this.$http.put(`${this.API}/${usuario.id}`, usuario)
  }

  buscarAniversariantes(id: any) {
    return this.$http.get(`${this.API}/aniversariantes/${id}`)
  }

  buscarProvedoresEmail() {
    return this.$http.get(`${this.API}/emails`)
  }
}
