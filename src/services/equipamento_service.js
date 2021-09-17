import {http, httpFile} from "./http_service";

export function loadEquipamentos() {
    return http().get('/user/equipamentos');
}

export function createEquipamento(data){
    return httpFile().post('/user/equipamentos',data);
}

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
}

export function contagem(){
    return http().get(`/user/equipamentocontagem`)
}

export function alocado(id){
    return http().get(`/user/alocado/${id}`)
}