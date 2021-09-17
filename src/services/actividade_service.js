import {http, httpFile} from "./http_service";

export function loadActividades() {
    return http().get('/user/actividades');
}


export function createActividade(data){
    return httpFile().post('/user/criaractividade',data);
}

export function visualizarActividade(id){
    return http().get(`/user/actividade/${id}`)
}

export function cancelarProblema(id){
    return http().delete(`/user/cancelarproblema/${id}`)
}

export function resolverProblema(id,data){
    return http().post(`/user/resolverproblema/${id}`,data)
}

export function contagem(){
    return http().get(`/user/actividadecontagem`)
}
