<template>
<div class="row">

    <div class="col-lg-12 col-md-12">
        <div class="card">
            <div class="card-header card-header-success">
                <h4 class="card-title ">Lista de Usuarios</h4>
                <p class="card-category">Aqui e onde podemos ver cada usuario e seus respectivos detalhes</p>
            </div>
            <div class="card-body">

                <div class="row">
                    <div class="col-lg-3 col-md-1  mr-left">
                        <div class="form-group">
                            <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#equipamentoNovo">Adicionar Usuarios</button>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-10 ml-auto mr-rigth">
                        <div class="form-group">
                            <form>
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
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Sector</th>
                                    <th>Permissao</th>
                                    <th>Accoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(usuario, index) in usuarios.data" :key="usuario.id">
                                    <td>{{index+1}}</td>
                                    <td>{{usuario.name}}</td>
                                    <td>{{usuario.email}}</td>
                                    <td>{{usuario.nome_sector}}</td>
                                    <td>{{usuario.role}}</td>
                                    <td class="td-actions text-right">
                                        <button type="button" rel="tooltip" class="btn btn-success" v-on:click="editUsuario(usuario.id)" data-toggle="modal" data-target="#atualizar" title="Detalhes">
                                            <i class="material-icons">edit</i>
                                        </button>
                                        <button type="button" v-on:click="deleteUser(usuario)" rel="tooltip" title="Remover" class="btn btn-danger">
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

    <div class="modal fade bd-example-modal-sm" id="atualizar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Username</label>
                                    <input type="text" class="form-control" v-model="usuarioData.name">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Fist Name</label>
                                    <input type="text" class="form-control" v-model="usuarioData.email">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Permissao</label>
                                    <select v-model="usuarioData.role" class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
                                        <option value="administrator">Administrador</option>
                                        <option value="gestor">Gestor</option>
                                        <option value="normal">Normal</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" v-on:click="atualizarDados()" class="btn btn-primary"> Atualizar</button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import * as usuarios from '../services/user_service';

export default {

    data() {
        return {
            usuarios: {},
            usuarioData: {
                id: '',
                name: '',
                email: '',
                password: '',
                role: '',
            },
            moreExists: false,
            nextPage: 0,
            errors: {},
        };
    },

    mounted() {
        this.loadUsers();
    },

    methods: {
        loadUsers: async function () {
            try {
                const response = await usuarios.loadUsers();
                this.usuarios = response.data;
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
        editUsuario: async function (id) {
            const response = await usuarios.showUser(id);
            this.usuarioData = response.data;
            console.log(response.data);
        },

        atualizarDados: async function () {

            try {

                let formData = new FormData();
                formData.append('role', this.usuarioData.role);

                const response = await usuarios.permissao(this.usuarioData.id,formData);
                console.log(response.data);

                this.flashMessage.success({
                    message: 'Usuario Atualizado!',
                    time: 5000
                });
                this.loadUsers();
            } catch (error) {
                console.log(error)
               /* this.flashMessage.success({
                    message: 'Problema Cancelado!',
                    time: 5000
                });*/
                this.loadUsers();
            }
        },
    },
}
</script>
