<template>
    <v-app>
        <navegador></navegador>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import navegador from './components/navegador';
import {mapState,mapMutations} from 'vuex' ;

export default {
    name: 'App',
    computed:{
        ...mapState(['nombreSesion'])
    },
    components: {
        navegador
    },

    data: () => ({
        //
    }),
};
</script>
