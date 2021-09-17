<template>
<div>

    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header card-header-success">
                    <h4 class="card-title ">Solicitacoes ou Problemas</h4>
                    <p class="card-category">Aqui e onde Podemos ver as Solicitacoes</p>
                </div>
                <div class="card-body">

                    <div class="row">
                        <div class="col-lg-3 col-md-1  mr-left">
                            <div class="form-group">
                                <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#equipamentoNovo">Registar Problema</button>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-10 ml-auto mr-rigth">
                            <div class="form-group">
                                <form>
                                    <input type="text" placeholder="Pesquisar" class="form-control" />
                                </form>
                            </div>
                        </div>

                    </div>

                    <div class="tab-content">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Descricao do Problema</th>
                                    <th>Nome</th>
                                    <th>Sector</th>
                                    <th>Estado</th>
                                    <th>Acoes</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(problema, index) in problemas.data" :key="problema.id_problema">
                                    <td>{{index+1}}</td>
                                    <td>{{problema.descricao}}</td>
                                    <td>{{problema.name}}</td>
                                    <td>{{problema.nome_sector}}</td>
                                    <td class="text-center">{{problema.status_problema}}</td>
                                    <td class="td-actions text-right">
                                        <button type="button" v-on:click="visualizarProblema(problema.id_problema)" data-toggle="modal" data-target="#signupModal" rel="tooltip" title="Detalhes" class="btn btn-success btn-sm">
                                            <i class="material-icons">edit</i>
                                            detalhes
                                        </button>
                                        <button type="button" v-on:click="visualizarProblema(problema.id_problema)" v-if="$store.state.profile.role !=='administrator'" data-toggle="modal" data-target="#exampleModal" rel="tooltip" title="Remover" class="btn btn-danger btn-sm">
                                            <i class="material-icons">close</i>
                                            remover
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

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {{problemaData.name}}: Deseja mesmo Cancelar Esta Solicitacao
                </div>
                <div class="modal-footer">
                    <button type="button" v-on:click="cancelarProblema(problemaData.id_problema)" data-dismiss="modal" class="btn btn-danger">Sim</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="signupModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="card card-signup card-plain">
                    <div class="modal-header">
                        <h5 class="modal-title card-title">Detalhes do Problema</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <i class="material-icons">clear</i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 mr-auto">
                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h6 class="info-title"><b>Descricao do Problema</b></h6>
                                        <p class="description">
                                            {{problemaData.descricao}}
                                        </p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h6 class="info-title"><b>Funcionario</b></h6>
                                        <p class="description">
                                            {{problemaData.name}}
                                        </p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h6 class="info-title"><b>Sector Ou Departamento</b></h6>
                                        <p class="description">
                                            {{problemaData.nome_sector}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 ml-auto">
                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h6 class="info-title"><b>Status</b></h6>
                                        <p class="description">
                                            {{problemaData.status_problema}}
                                        </p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h6 class="info-title"><b>Data</b></h6>
                                        <p class="description">
                                            {{problemaData.created_at}}
                                        </p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="description">
                                        <h6 class="info-title"><b>Sector Ou Departamento</b></h6>
                                        <p class="description">
                                            {{problemaData.nome_sector}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Fechar</button>
                        <button type="button"  data-dismiss="modal" v-if="$store.state.profile.role ==='administrator'" v-on:click="resolverproblema()" class="btn btn-sm btn-success">Resolver</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="equipamentoNovo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Registar Problema</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form v-on:submit.prevent="createProblema">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Descricao do Problema</label>
                                    <textarea v-model="problemaData.descricao" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import * as user from '../services/user_service';
import * as problemaService from '../services/problema_service';

export default {

    data() {
        return {
            problemas: {},
            problemaData: {
                id_problema: '',
                descricao: '',
                status_problema: '',
                user_id: '',
                data: '',
            },
            moreExists: false,
            nextPage: 0,
            errors: {},
        };
    },

    mounted() {
        this.loadProblemas();
        this.loadMeu_Problema();
    },

    methods: {
        loadProblemas: async function () {
            try {
                const response = await problemaService.loadProblemas();
                this.problemas = response.data;
                console.log(response.data);
            } catch (error) {

                console.log(error);
            }
        },
        loadMeu_Problema: async function () {
            try {
                const response = await problemaService.loadMeu_Problema();
                this.problemas = response.data;
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
        createProblema: async function () {
            let formData = new FormData();
            formData.append('descricao', this.problemaData.descricao);
            try {
                const response = await problemaService.createProblema(formData);
                console.log(response.data);
                this.flashMessage.success({
                    message: 'Problema Registado com Sucesso',
                    time: 5000
                });
                this.problemaData = {
                    id_problema: '',
                    descricao: '',
                };
                this.loadProblemas();
                this.loadMeu_Problema();
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

        cancelarProblema: async function (id) {

            try {
                await problemaService.cancelarProblema(id);

                this.flashMessage.success({
                    message: 'Category deleted successfully!',
                    time: 5000
                });
                this.loadProblemas();
                this.loadMeu_Problema();
            } catch (error) {
                this.flashMessage.success({
                    message: 'Problema Cancelado!',
                    time: 5000
                });
                this.loadProblemas();
                this.loadMeu_Problema();
            }
        },

        visualizarProblema: async function (id) {

            const response = await problemaService.visualizarProblema(id);
            this.problemaData = response.data;
            console.log(response.data);
        },

        resolverproblema: async function () {

             try {
                const response = await problemaService.resolverProblema(this.problemaData.id_problema);
                console.log(response.data);

                this.flashMessage.success({
                    message: 'Problema resolvido com Sucesso!',
                    time: 5000
                });
                this.loadProblemas();
                this.loadMeu_Problema();
            } catch (error) {
                this.flashMessage.success({
                    message: 'Problema Cancelado!',
                    time: 5000
                });
                this.loadProblemas();
                this.loadMeu_Problema();
            }
        },

        userScope: async function () {
            try {
                const response = await user.userScope();
                console.log(response);
            } catch (error) {
                console.log('' + error, error.response.status)
            }
        },

        adminScope: async function () {
            try {

                const response = await user.adminScope();
                console.log(response);
            } catch (error) {
                console.log('' + error, error.response.status)
            }
        }
    },
}
</script>
