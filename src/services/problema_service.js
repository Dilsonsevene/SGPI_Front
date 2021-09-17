import {http, httpFile} from "./http_service";

export function loadProblemas() {
    return http().get('/user/problemas');
}

export function loadMeu_Problema() {
    return http().get('/user/meu_problema');
}


export function createProblema(data){
    return httpFile().post('/user/criarproblema',data);
}

export function visualizarProblema(id){
    return http().get(`/user/visualizarproblema/${id}`)
}

export function cancelarProblema(id){
    return http().delete(`/user/cancelarproblema/${id}`)
}

export function resolverProblema(id){
    return http().post(`/user/resolverproblema/${id}`)
}

export function contagem(){
    return http().get(`/user/problemacontagem`)
}

/*
export function pesquisarEquipamento(pesquisar){
    return http().get(`user/pesquisarequipamento/${pesquisar}`)
}

export function editEquipamento(id){
    return http().get(`user/showeq/${id}`);
}

export function deleteEquipamento(id) {
    return http().delete(`user/equipamentos/${id}`);
}

export function loadequip_tipo(id) {
    return http().get(`equipamentos/${id}`);
}*/