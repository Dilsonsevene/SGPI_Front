import {http, httpFile} from "./http_service";

export function loadSectores() {
    return http().get('/user/sectores');
}

export function createSector(data){
    return httpFile().post('/user/sectores',data);
}

export function deleteSector(id) {
    return http().delete(`user/sectores/${id}`);
}

export function contagem(){
    return http().get(`/user/sectorcontagem`)
}  

export function loadSector(){
    return http().get(`/sector`)
}


