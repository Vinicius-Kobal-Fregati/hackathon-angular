import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../service/usuario.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})

export class EmailsComponent implements OnInit {

  emails: Array<string> = []
  cities2: string[];

  constructor(private usuarioService: UsuarioService) { 
    this.cities2 = [
      'New York',
      'Rome',
      'London',
      'Istanbul',
      'Paris']
  }

  ngOnInit(): void {
    this.buscarEmails()
  }

  buscarEmails = () => {
    this.usuarioService.buscarProvedoresEmail().subscribe((emailsRecebidos: Array<string>) => {
      this.emails = emailsRecebidos
    })
  }
}
