import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})

export class EmailsComponent implements OnInit {

  emails: Array<string> = []

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.buscarEmails()
  }

  buscarEmails = () => {
    this.usuarioService.buscarProvedoresEmail().subscribe((emailsRecebidos: Array<string>) => {
      this.emails = emailsRecebidos
    })
  }
}
