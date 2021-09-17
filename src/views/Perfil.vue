<template>
<div>
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header card-header-success">
                    <h4 class="card-title">Meus Dados</h4>
                    <p class="card-category"></p>
                </div>
                <div class="card-body">
                    <form v-on:submit.prevent="register">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Nome Completo</label>
                                    <input type="text" v-model="dados.name" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Email</label>
                                    <input type="email" v-model="dados.email" class="form-control">
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success pull-right">Atualizar</button>
                        <div class="clearfix"></div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card card-profile">
                <div class="card-avatar">
                    <a href="javascript:;">
                        <img class="img" src="/assets/img/faces/marc.jpg" />
                    </a>
                </div>
                <div class="card-body">
                    <h6 class="card-category text-gray">{{ dados.nome_sector }}</h6>
                    <h4 class="card-title">{{ dados.name }}</h4>
                    <p class="card-description">
                        Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                    </p>
                    <a href="javascript:;" class="btn btn-primary btn-round">Follow</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import * as perfilservice from "../services/user_service";

export default {

    data() {
        return {
            dados: {},

        }
    },

    mounted() {
        this.loadmeuperfil();
    },

    methods: {
        loadmeuperfil: async function () {
            try {
                const response = await perfilservice.meuPerfil();
                this.dados = response.data;
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>
