<template>
<div>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header card-header-success">
                    <h4 class="card-title">Cadastrar uma Conta</h4>
                    <p class="card-category">Registe uma conta preenchendo o formulario abaixo</p>
                </div>
                <div class="card-body">
                    <form v-on:submit.prevent="register">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Nome Completo</label>
                                    <input type="text" v-model="user.name" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Email</label>
                                    <input type="email" v-model="user.email" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Password</label>
                                    <input type="password" v-model="user.password" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Confirmar Password</label>
                                    <input type="password" v-model="user.password_confirmation" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Sector ou Departamento</label>
                                    <select v-model="user.sector_id" class="form-control selectpicker" data-style="btn btn-link" id="exampleFormControlSelect1">
                                        <option v-for="(sector, index) in sectores.data" :value="sector.id_sector" :key="index">
                                            {{ sector.nome_sector}}
                                        </option>
                                    </select>
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
</template>

<script>
import * as auth from '../../services/auth_service';
import * as sectorService from '../../services/sector_service';

export default {
    name: "Register",
    data() {
        return {
            sectores: {},
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                sector_id: '',
            },
            errors: {}
        }
    },

    mounted() {
        this.loadSectores();
    },

    methods: {

        apagarCampos(){
            this.user.name = '';
            this.user.email = '';
            this.user.password = '';
            this.user.password_confirmation = '';
            this.user.sector_id = '';
        },

        loadSectores: async function () {
            try {
                const response = await sectorService.loadSector();
                this.sectores = response.data;
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },

        register: async function () {
            let formData = new FormData();
            formData.append('name', this.user.name);
            formData.append('email', this.user.email);
            formData.append('sector_id', this.user.sector_id);
            formData.append('password', this.user.password);
            formData.append('password_confirmation', this.user.password_confirmation);

            try {
                const response = await auth.register(formData);
                console.log(response.data);
                this.$router.push('/login')
                this.flashMessage.success({
                    message: 'Conta Registada com Sucesso!',
                    time: 5000
                });
                this.apagarCampos();
            } catch (error) {
                switch (error.response.status) {
                    case 422:
                        this.errors = error.response.data.errors;
                        this.flashMessage.error({
                            message: 'Alguns campos vazios, Please try again!',
                            time: 5000
                        });
                        break;
                    case 500:
                        this.errors = error.response.data.errors;
                        this.flashMessage.error({
                            message: 'Problema com o servidor, Please try again!',
                            time: 5000
                        });
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
    }
}
</script>
