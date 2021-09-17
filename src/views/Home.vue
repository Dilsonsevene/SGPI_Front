<template>
<div>
    <div class="wrapper ">
        <Sidebar />
        <div class="main-panel">
            <!-- Navbar -->
            <Header />
            <!-- End Navbar -->
            <div class="content">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </div>
            <Footer />
        </div>
        
    </div>
</div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
export default {

    components: {
        Footer,
        Sidebar,
        Header,
    },
}
</script>
