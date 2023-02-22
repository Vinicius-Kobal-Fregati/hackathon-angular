import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UsuarioSemSenhaDTO } from '../DTO/UsuarioSemSenhaDTO';

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
}
