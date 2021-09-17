<template>
<div class="row">
    <div class="col-lg-12 col-md-12">
        <div class="card">
            <div class="card-header card-header-success">
                <h4 class="card-title ">Equipamentos Informaticos</h4>
                <p class="card-category">Aqui e onde podemos ver cada equipamentos informatico com os seus deltalhes</p>
            </div>
            <div class="card-body">

                <div class="row">
                    <div class="col-lg-3 col-md-1  mr-left">
                        <div class="form-group">
                            <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#equipamentoNovo">Adicionar Equipamentos</button>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-10 ml-auto mr-rigth">
                        <div class="form-group">
                            <form>
                                <input type="text" placeholder="Pesquisar" v-model="equipamentoData.pesquisar" v-on:keyup="pesquisarEquipamento" class="form-control" />
                            </form>
                        </div>
                    </div>
                </div>

                <div class="tab-content">
                    <div class="tab-pane active" id="profile">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>codigo</th>
                                    <th>referencia</th>
                                    <th>estado</th>
                                    <th>tipo</th>
                                    <th>sector</th>
                                    <th class="">Acoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(equipamento, index) in equipamentos.data" :key="equipamento.id_equipamento">
                                    <td>{{index+1}}</td>
                                    <td>{{equipamento.codigo_equipamento}}</td>
                                    <td>{{equipamento.referencia}}</td>
                                    <td>{{equipamento.estado_conputador}}</td>
                                    <td>{{equipamento.nome_tipo}}</td>
                                    <td>{{equipamento.nome_sector}}</td>
                                    <td class="td-actions text-right">
                                        <button type="button" rel="tooltip" class="btn btn-success" v-on:click="editEquipamento(equipamento.id_equipamento)" data-toggle="modal" data-target="#signupModal" title="Detalhes">
                                            <i class="material-icons">edit</i>
                                        </button>
                                        <button type="button" v-on:click="deleteEquipamento(equipamento)" rel="tooltip" title="Remover" class="btn btn-danger">
                                            <i class="material-icons">close</i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="equipamentoNovo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title card-title">Registar Equipamento</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="material-icons">clear</i>
                    </button>
                </div>
                <div class="modal-body">

                    <form v-on:submit.prevent="createEquipamento">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Codigo do Equipamento</label>
                                    <input type="text" class="form-control" v-model="equipamentoData.codigo_equipamento">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Referencia</label>
                                    <input type="text" class="form-control" v-model="equipamentoData.referencia">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Estado do Computador</label>
                                    <select v-model="equipamentoData.estado_conputador" class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
                                        <option>Operacional</option>
                                        <option>Nao Operacional</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Necessario Para o sector</label>
                                    <select v-model="equipamentoData.necessario" class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
                                        <option>Necessario</option>
                                        <option>Nao Necessario</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Sector ou Departamento</label>
                                    <select v-model="equipamentoData.sector_id" class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
                                        <option v-for="(sector, index) in sectores.data" :value="sector.id_sector" :key="index">
                                            {{ sector.nome_sector}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Tipo de Equipamento</label>
                                    <select v-model="equipamentoData.tipo_id" class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
                                        <option value="1">Computador</option>
                                        <option value="2">impressora</option>
                                        <option value="3">Laptop</option>
                                        <option value="4">Outros</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" v-on:click="apagarCampos()" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-success">Salvar</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="signupModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="card card-signup card-plain">
                    <div class="modal-header">
                        <h5 class="modal-title card-title">Detalhes do Equipamento</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <i class="material-icons">clear</i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 mr-auto">
                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h8 class="info-title"><b>Codigo Equipamento</b></h8>
                                        <p class="description">
                                            {{ equipamentoData.codigo_equipamento }}
                                        </p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h8 class="info-title"><b>Referencia</b></h8>
                                        <p class="description">
                                            {{ equipamentoData.referencia }}
                                        </p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h8 class="info-title"><b>Estado</b></h8>
                                        <p class="description">
                                            {{ equipamentoData.estado_conputador}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 ml-auto">
                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h8 class="info-title"><b>Alocado</b></h8>
                                        <p class="description">
                                            {{ equipamentoData.name }}
                                        </p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h8 class="info-title"><b>Tipo de Equipamento</b></h8>
                                        <p class="description">
                                            {{ equipamentoData.nome_tipo }}
                                        </p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h8 class="info-title"><b>Sector Ou Departamento</b></h8>
                                        <p class="description">
                                            {{ equipamentoData.nome_sector }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Fechar</button>
                        <button type="button" v-if="$store.state.profile.role ==='administrator'" ref="lista" href="#profile" data-toggle="tab" class="btn btn-sm btn-success">
                            <i class="material-icons">edit</i>
                            editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import * as equipamentoService from "../services/equipamento_service";
import * as sectorService from "../services/sector_service";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

export default {
    name: "equipamentos",
    data() {
        return {
            tipo: {},
            sectores: {},
            equipamentos: {},
            equip_tipo: {},
            alocadoData:{
                user_id:'',
                equip_id:'',
                descricao:'',
            },
            equipamentoData: {
                id_equipamento: '',
                codigo_equipamento: '',
                referencia: '',
                estado_conputador: '',
                necessario: '',
                sector_id: '',
                tipo_id: '',
                pesquisar: ''
            },
            moreExists: false,
            nextPage: 0,
            errors: {},
        };
    },

    mounted() {
        this.loadSectores();
        this.loadEquipamentos();
    },

    methods: {

        apagarCampos() {
            this.equipamentoData = {
                codigo_equipamento: '',
                referencia: '',
                estado_conputador: '',
                necessario: '',
                sector_id: '',
                tipo_id: '',
            };
        },
        loadSectores: async function () {
            try {
                const response = await sectorService.loadSectores();
                this.sectores = response.data;
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
        loadequip_tipo: async function () {
            try {
                const response = await sectorService.loadSectores();
                this.sectores = response.data;
                console.log(response.data);
            } catch (error) {
                console.log(error);
                /*this.flashMessage.error({
                    message: "Some error occurred, Please refresh!",
                    time: 5000,
                });*/
            }
        },

        loadEquipamentos: async function () {
            try {
                const response = await equipamentoService.loadEquipamentos();
                this.equipamentos = response.data;
                console.log(response.data);

                if (response.data.current_page < response.data.last_page) {
                    this.moreExists = true;
                    this.nextPage = response.data.current_page + 1;
                } else {
                    this.moreExists = false;
                }
            } catch (error) {
                console.log(error);
                /*this.flashMessage.error({
                    message: "Some error occurred, Please refresh!",
                    time: 5000,
                });*/
            }
        },

        pesquisarEquipamento: async function () {
            try {
                const response = await equipamentoService.pesquisarEquipamento(this.equipamentoData.pesquisar);
                this.equipamentos = response.data;
                console.log(response.data);
            } catch (error) {
                this.flashMessage.error({
                    message: "Some error occurred, Please refresh!",
                    time: 5000,
                });
            }
            console.log(this.equipamentoData.pesquisar)

        },

        createEquipamento: async function () {

            //this.apagarCampos();
            let formData = new FormData();
            formData.append('codigo_equipamento', this.equipamentoData.codigo_equipamento);
            formData.append('referencia', this.equipamentoData.referencia);
            formData.append('estado_conputador', this.equipamentoData.estado_conputador);
            formData.append('necessario', this.equipamentoData.necessario);
            formData.append('sector_id', this.equipamentoData.sector_id);
            formData.append('tipo_id', this.equipamentoData.tipo_id);

            try {
                const response = await equipamentoService.createEquipamento(formData);
                console.log(response.data);
                this.flashMessage.success({
                    message: 'Equipamento Salvo com Sucesso',
                    time: 5000
                });
                this.equipamentoData = {
                    codigo_equipamento: '',
                    referencia: '',
                    estado_conputador: '',
                    necessario: '',
                    sector_id: '',
                    tipo_id: '',
                };
                this.loadEquipamentos();
            } catch (error) {
                switch (error.response.status) {
                    case 422:
                        this.errors = error.response.data.errors;
                        break;
                    default:
                        this.flashMessage.error({
                            message: 'Some error occurred, Please try again!',
                            time: 5000
                        });
                        break;
                }
            }
        },

        editEquipamento: async function (id) {

            const response = await equipamentoService.editEquipamento(id);
            

            this.equipamentoData = response.data;
            
            console.log(response.data);
            
        },

        alocadoa: async function (id){
            const response2 = await equipamentoService.alocado(id);
            this.alocadoData = response2.data;
            console.log(response2.data);
        },

        deleteEquipamento: async function (equipamento) {
            if (!window.confirm(`Are you sure you want to delete ${equipamento.referencia}`)) {
                return;
            }

            try {
                await equipamentoService.deleteEquipamento(equipamento.id_equipamento);

                this.equipamentos = this.equipamentos.filter(obj => {
                    return obj.id_equipamento != equipamento.id_equipamento;
                });

                this.flashMessage.success({
                    message: 'Category deleted successfully!',
                    time: 5000
                });
                this.loadEquipamentos();
            } catch (error) {
                this.flashMessage.success({
                    message: 'delected',
                    time: 5000
                });
                this.loadEquipamentos();
            }
        },

        showlista() {
            this.$refs.lista.show();
        },
    },
};
</script>
