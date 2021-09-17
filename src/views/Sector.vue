<template>
<div class="row">
    <div class="col-lg-12 col-md-12">
        <div class="card">
            <div class="card-header card-header-tabs card-header-success">
                <div class="nav-tabs-navigation">
                    <div class="nav-tabs-wrapper">
                        <span class="nav-tabs-title">Tasks:</span>
                        <ul class="nav nav-tabs" data-tabs="tabs">
                            <li class="nav-item">
                                <a class="nav-link active" ref="lista" href="#profile" data-toggle="tab">
                                    <i class="material-icons">bug_report</i> Visualizar Sectores
                                    <div class="ripple-container"></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#messages" data-toggle="tab">
                                    <i class="material-icons">code</i> Cadastrar Sectores
                                    <div class="ripple-container"></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    <div class="tab-pane active" id="profile">
                        <table class="table table-hover">
                            <thead class="">
                                <th>#</th>
                                <th>Nome Sector</th>
                                <th>Edificio</th>
                                <th>Acoes</th>
                            </thead>
                            <tbody>
                                <tr v-for="(sector, index) in sectores.data" :key="sector.id">
                                    <td>{{index+1}}</td>
                                    <td>{{sector.nome_sector}}</td>
                                    <td>{{sector.edificio}}</td>
                                    <td class="td-actions text-right">
                                        <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                            <i class="material-icons">edit</i>
                                        </button>
                                        <button type="button" v-on:click="deleteSector(sector)" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                            <i class="material-icons">close</i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane" id="messages">
                        <form v-on:submit.prevent="createSector">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="bmd-label-floating">Nome Departamento / Sector</label>
                                        <input type="text" class="form-control" v-model="sectorData.nome_sector" id="nome_sector">
                                        <div class="invalid-feedback" v-if="errors.nome_sector">{{errors.nome_sector[0]}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="bmd-label-floating">Edificio</label>
                                        <select v-model="sectorData.edificio" class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
                                            <option>Sede</option>
                                            <option>Edificio 2</option>
                                        </select>
                                        <div class="invalid-feedback" v-if="errors.edificio">{{errors.edificio[0]}}</div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-success pull-right">Salvar dados</button>
                            <div class="clearfix"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import * as sectorService from "../services/sector_service";

export default {
    name: "sectores",
    data() {
        return {
            sectores: {},
            sectorData: {
                id_sector: '',
                nome_sector: '',
                edificio: ''
            },
            moreExists: false,
            nextPage: 0,
            errors: {},
        };
    },

    mounted() {
        this.loadSectores();
    },

    methods: {
        loadSectores: async function () {
            try {
                const response = await sectorService.loadSectores();
                this.sectores = response.data;
                console.log(response.data);

                if (response.data.current_page < response.data.last_page) {
                    this.moreExists = true;
                    this.nextPage = response.data.current_page + 1;
                } else {
                    this.moreExists = false;
                }
            } catch (error) {
                this.flashMessage.error({
                    message: "Some error occurred, Please refresh!",
                    time: 5000,
                });
            }
        },

        createSector: async function () {
            let formData = new FormData();
            formData.append('nome_sector', this.sectorData.nome_sector);
            formData.append('edificio', this.sectorData.edificio);

            try {
                const response = await sectorService.createSector(formData);
                console.log(response.data);
                this.flashMessage.success({
                    message: 'Category stored successfully!',
                    time: 5000
                });
                this.sectorData = {
                    nome_sector: '',
                    edificio: '',
                };
                this.loadSectores();
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

        deleteSector: async function (sector) {
            if (!window.confirm(`Are you sure you want to delete ${sector.nome_sector}`)) {
                return;
            }

            try {
                await sectorService.deleteSector(sector.id_sector);

                this.sectores = this.sectores.filter(obj => {
                    return obj.id_sector != sector.id_sector;
                });

                this.flashMessage.success({
                    message: 'Category deleted successfully!',
                    time: 5000
                });
                this.loadSectores();
            } catch (error) {
                this.flashMessage.success({
                    message: 'delected',
                    time: 5000
                });
                this.loadSectores();
            }
        },

        showlista() {
            this.$refs.lista.show();
        },
    },
};
</script>
