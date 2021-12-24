import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioServicio } from 'src/app/services/usuario.service';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: UsuarioModel[];
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  constructor(private usuarioServicio: UsuarioServicio) { }

  ngOnInit(): void {
    this.usuarioServicio.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      }
    )
  } 
}
