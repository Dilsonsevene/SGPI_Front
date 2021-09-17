<template>
<div class="row">
    <div class="col-lg-12 col-md-12">
        <div class="card">
            <div class="card-header card-header-success">
                <h4 class="card-title ">Actividades do DRD</h4>
                <p class="card-category">Aqui e onde podemos ver actividades marcadas</p>
            </div>
            <div class="card-body">

                <div class="row">
                    <div class="col-lg-3 col-md-1  mr-left">
                        <div class="form-group">
                            <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#equipamentoNovo">Adicionar Actividade</button>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-10 ml-auto mr-rigth">
                        <div class="form-group">
                            <form>
                                <input type="text" placeholder="Pesquisar" v-model="actividadeData.pesquisar" v-on:keyup="pesquisarEquipamento" class="form-control" />
                            </form>
                        </div>
                    </div>
                </div>

                <div class="tab-content">
                    <div class="tab-pane active" id="profile">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Titulo</th>
                                    <th>descricao</th>
                                    <th>data_inicio</th>
                                    <th>data_termino</th>
                                    <th>sector</th>
                                    <th>Estado</th>
                                    <th>Accoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(actividade, index) in actividades.data" :key="actividade.id_actividade">
                                    <td>{{index+1}}</td>
                                    <td>{{actividade.titulo}}</td>
                                    <td>{{actividade.descricao}}</td>
                                    <td>{{actividade.data_inicio}}</td>
                                    <td>{{actividade.data_termino}}</td>
                                    <td>{{actividade.nome_sector}}</td>
                                    <td>{{actividade.estado}}</td>
                                    <td class="td-actions text-right">
                                        <button type="button" rel="tooltip" class="btn btn-success" v-on:click="visualizarActividade(actividadeData.id_actividade)" data-toggle="modal" data-target="#signupModal" title="Detalhes">
                                            <i class="material-icons">edit</i>
                                        </button>
                                        <button type="button" rel="tooltip" title="Remover" class="btn btn-danger">
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
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title card-title">Registar Actividade</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="material-icons">clear</i>
                    </button>
                </div>
                <div class="modal-body">
                    <form v-on:submit.prevent="createActividade">
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="inputPassword4">Titulo da Actividade</label>
                                <input type="text" v-model="actividadeData.titulo" class="form-control">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="inputPassword4">Descricao da actividade</label>
                                <textarea v-model="actividadeData.descricao" class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="inputPassword4">Sector / Departamento</label>
                                <select v-model="actividadeData.sector_id" class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
                                    <option v-for="(sector, index) in sectores.data" :value="sector.id_sector" :key="index">
                                        {{ sector.nome_sector}}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputPassword4">Data Inicio</label>
                                <input v-model="actividadeData.data_inicio" type="date" class="form-control" id="inputPassword4" placeholder="">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputPassword4">Data Termino</label>
                                <input v-model="actividadeData.data_termino" type="date" class="form-control" id="inputPassword4" placeholder="">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
                            <button type="submit" class="btn btn-success">Salvar Dados</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

</div>
</template>

<script>
//import * as equipamentoService from "../services/equipamento_service";
import * as sectorService from "../services/sector_service";
import * as actividadeService from "../services/actividade_service";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

export default {
    name: "actividades",
    data() {
        return {
            sectores: {},
            actividades: {},
            actividadeData: {
                id_actividade: '',
                descricao: '',
                data_inicio: '',
                data_termino: '',
                sector_id: '',
                pesquisar: '',
                titulo: '',
                status: '',
            },
            moreExists: false,
            nextPage: 0,
            errors: {},
        };
    },

    mounted() {
        this.loadSectores();
        this.loadActividades();
    },

    methods: {

        apagarCampos() {
            this.actividadeData = {
                id_actividade: '',
                descricao: '',
                data_inicio: '',
                data_termino: '',
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

        loadActividades: async function () {
            try {
                const response = await actividadeService.loadActividades();
                this.actividades = response.data;
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },

        pesquisarEquipamento: async function () {
            /* try {
                  const response = await equipamentoService.pesquisarEquipamento(this.equipamentoData.pesquisar);
                  this.equipamentos = response.data;
                  console.log(response.data);
              } catch (error) {
                  this.flashMessage.error({
                      message: "Some error occurred, Please refresh!",
                      time: 5000,
                  });
              }
              console.log(this.equipamentoData.pesquisar)*/

        },

        createActividade: async function () {

            let formData = new FormData();
            formData.append('descricao', this.actividadeData.descricao);
            formData.append('data_inicio', this.actividadeData.data_inicio);
            formData.append('data_termino', this.actividadeData.data_termino);
            formData.append('sector_id', this.actividadeData.sector_id);
            formData.append('titulo', this.actividadeData.titulo);
            try {
                const response = await actividadeService.createActividade(formData);
                console.log(response.data);
                this.flashMessage.success({
                    message: 'Actividade registada',
                    time: 5000
                });

                this.loadActividades();
                this.apagarCampos();
            } catch (error) {
                switch (error.response.status) {
                    case 422:
                        this.errors = error.response.data.errors;
                        break;
                    default:
                        this.flashMessage.error({
                            message: 'Ocorreu algum problema, tente novamente!',
                            time: 5000
                        });
                        break;
                }
            }
        },

        visualizarActividade: async function (id) {

            const response = await actividadeService.visualizarActividade(id);
            this.actividadeData = response.data;
            console.log(response.data);
        },

        deleteEquipamento: async function () {
        },
    },
};
</script>
