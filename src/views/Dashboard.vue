<template>
<div class="row">
    <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
            <div class="card-header card-header-warning card-header-icon">
                <div class="card-icon">
                    <i class="material-icons">person</i>
                </div>
                <p class="card-category">Ususarios</p>
                <h3 class="card-title">
                    {{ contagem.usuario }}
                </h3>
            </div>
            <div class="card-footer">
                <div class="stats">
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
                <div class="card-icon">
                    <i class="material-icons">store</i>
                </div>
                <p class="card-category">Sectores</p>
                <h3 class="card-title">{{ contagem.sector }}</h3>
            </div>
            <div class="card-footer">
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
            <div class="card-header card-header-danger card-header-icon">
                <div class="card-icon">
                    <i class="material-icons">info_outline</i>
                </div>
                <p class="card-category">Actividades</p>
                <h3 class="card-title">{{ contagem.actividade }}</h3>
            </div>
            <div class="card-footer">
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
            <div class="card-header card-header-danger card-header-icon">
                <div class="card-icon">
                    <i class="material-icons">info_outline</i>
                </div>
                <p class="card-category">Equipamentos</p>
                <h3 class="card-title">{{ contagem.equipamento }}</h3>
            </div>
            <div class="card-footer">
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
            <div class="card-header card-header-danger card-header-icon">
                <div class="card-icon">
                    <i class="material-icons">info_outline</i>
                </div>
                <p class="card-category">Solicitacoes</p>
                <h3 class="card-title">{{ contagem.problema }}</h3>
            </div>
            <div class="card-footer">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import * as user from '../services/user_service';
import * as sectorService from '../services/sector_service';
import * as equipamentoService from '../services/equipamento_service';
import * as problemaService from '../services/problema_service';
import * as actividadeService from '../services/actividade_service';
import * as usuarioService from '../services/user_service';

export default {


    data() {
        return {
            contagem: {
                actividade:'',
                sector:'',
                equipamento:'',
                problema:'',
                usuario:'',
            },
        };
    },



mounted() {
    this.actividadecontagem();
    this.sectorcontagem();
    this.equipamentocontagem();
    this.problemacontagem();
    this.usercontagem();
},


    methods: {

        actividadecontagem: async function () {
            try {
                const act = await actividadeService.contagem();
                //console.log(act);
                this.contagem.actividade = act.data
            } catch (error) {
                console.log('' + error, error.response.status)
            }
        },

        equipamentocontagem: async function () {
            try {
                const act = await equipamentoService.contagem();
                //console.log(act);
                this.contagem.equipamento = act.data
            } catch (error) {
                console.log('' + error, error.response.status)
            }
        },

        problemacontagem: async function () {
            try {
                const act = await problemaService.contagem();
                //console.log(act);
                this.contagem.problema = act.data
            } catch (error) {
                console.log('' + error, error.response.status)
            }
        },

        sectorcontagem: async function () {
            try {
                const response = await sectorService.contagem();
                console.log(response);
                this.contagem.sector = response.data
            } catch (error) {
                console.log('' + error, error.response.status)
            }
        },
        usercontagem: async function () {
            try {
                const response = await usuarioService.contagem();
                console.log(response);
                this.contagem.usuario = response.data
            } catch (error) {
                console.log('' + error, error.response.status)
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
