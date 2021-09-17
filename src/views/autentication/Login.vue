<template>
<div>
    <div class="row justify-content-center">

        <div class="col-md-3">
            <div class="card">
                <div class="card-header">
                    <div class="text center">
                        <img src="../../assets/novologo.png" class="rounded mx-auto d-block" alt="...">
                    </div>
                    <h4 class="text center">
                        Sistema de Gestão do Parque Informático (MCTES)
                    </h4>
                    
                </div>

                <div class="card-body">
                    <form v-on:submit.prevent="login">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" v-model="user.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Senha</label>
                            <input type="password" v-model="user.password" class="form-control" id="exampleInputPassword1" placeholder="">
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" value="" v-model="user.remember_me">
                                Remember me
                                <span class="form-check-sign">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>
                        <button type="submit" class="btn btn-success">Autenticar</button>
                        <div class="row justify-content-center">
                            <router-link to="/resgister" class="nav-link" exact>
                                <p>Registar uma conta</p>
                            </router-link>
                            <router-link to="/recuperar" class="nav-link" exact>
                                <p>Esqueci a Senha</p>
                            </router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import * as auth from '../../services/auth_service';

export default {
    name: "login",
    data() {
        return {
            user: {
                email: '',
                password: '',
                remember_me: false,
            },
            errors: {}
        }
    },

    methods: {
        login: async function () {

            try {
                const response = await auth.login(this.user);
                console.log(response.data);
                auth.setToken(response.data);
                this.$router.push('/home')
                this.flashMessage.success({
                    message: 'Login com sucesso!',
                    time: 5000
                });

            } catch (error) {
                console.log('' + error);
                switch (error.response.status) {
                    case 422:
                        this.errors = error.response.data.errors;
                        this.flashMessage.error({
                            message: 'Email ou Password Incorecta Tente Novamente',
                            time: 5000
                        });
                        break;
                    case 401:
                        this.errors = error.response.data.errors;
                        break;
                    case 500:
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
    }
}
</script>
