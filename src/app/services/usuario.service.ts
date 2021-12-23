import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { UsuarioModel } from "../models/usuario.model";
import { map } from 'rxjs/operators';

@Injectable()
export class UsuarioServicio{
    usuariosColeccion: AngularFirestoreCollection<UsuarioModel>;
    usuarioDoc: AngularFirestoreDocument<UsuarioModel>;
    usuarios:Observable<UsuarioModel[]>
    usuario: Observable<UsuarioModel>
    
    constructor(private db: AngularFirestore){
        this.usuariosColeccion=db.collection('Usuarios',ref => ref.orderBy('Tipo','asc'));
    }
    getUsuarios(): Observable<UsuarioModel[]>{
        //Obtener Usuarios
        this.usuarios= this.usuariosColeccion.snapshotChanges().pipe(
            map(cambios =>{
                return cambios.map(accion =>{
                    const datos = accion.payload.doc.data() as UsuarioModel;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.usuarios;
    }
}