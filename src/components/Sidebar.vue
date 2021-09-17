<template>
<div class="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
    <!--
        Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

        Tip 2: you can also add an image using data-image tag
    -->
    <div class="logo"><a href="" class="simple-text logo-normal">
            SGPI
        </a></div>
    <div class="sidebar-wrapper">
        <ul class="nav">
            
            <li class="nav-item">
                <router-link to="/home" class="nav-link" exact>
                    <i class="material-icons">dashboard</i>
                    <p>Pagina inicial</p>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link to="/home/solicitacao" class="nav-link" exact>
                    <i class="material-icons">dashboard</i>
                    <p>Solicitacoes</p>
                </router-link>
            </li>

            <li class="nav-item" v-if="$store.state.profile.role ==='administrator'">
                <router-link to="/home/actividades" class="nav-link" exact>
                    <i class="material-icons">dashboard</i>
                    <p>Actividades</p>
                </router-link>
            </li>

            <li class="nav-item"  v-if="$store.state.profile.role ==='administrator'">
                <router-link to="/home/sectores" class="nav-link" exact>
                    <i class="material-icons">person</i>
                    <p>Departamento</p>
                </router-link>
            </li>

            <li class="nav-item "  v-if="$store.state.profile.role ==='administrator'">
                <router-link to="/home/equipamentos" class="nav-link" exact>
                    <i class="material-icons">person</i>
                    <p>Equipamentos</p>
                </router-link>
            </li>

            <li class="nav-item"  v-if="$store.state.profile.role ==='administrator'">
                <router-link to="/home/usuarios" class="nav-link" exact>
                    <i class="material-icons">person</i>
                    <p>Usuarios</p>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/home/perfil" class="nav-link" exact>
                    <i class="material-icons">person</i>
                    <p>Meu Perfil</p>
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>
