import {  http, httpFile } from "./http_service";

export function userScope() {
    return http().get('/user/user-scope');
}

export function adminScope() {
    return http().get('/user/admin-scope');
}

export function loadUsers(){
    return http().get('/user/usuarios');
}

export function permissao(id,data){
    return httpFile.post(`/user/permissao/${id}`,data)
    
}

export function showUser(id){
    return http().get(`/user/showuser/${id}`);
}

export function contagem(){
    return http().get(`/user/usuariocontagem`)
}

export function meuPerfil(){
    return http().get('/user/meuperfil');
}



/*export function loadmeuPerfil(){
    return http.get('');
}

export function atualizarUser(){
    return httpFile.post('');
}*/