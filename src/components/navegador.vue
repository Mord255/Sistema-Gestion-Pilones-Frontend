<template>
    
    <v-app-bar app color="secondary" dark :key="estadoLogout"  >
        
        <v-tabs class="m-5" >
            <h1 class="mt-2 ml-3">{{this.nombreSesion}}</h1>
            <!-- <v-tab><router-link class="white--text" :to="{name:'Principal'}" >Home</router-link></v-tab> -->
            <!-- <v-tab><router-link class="white--text" :to="{name:'Principal'}" >Cliente</router-link></v-tab> -->
            <v-spacer></v-spacer>
            
            <!-- <v-tab v-if="estadoLogin" >  
                <router-link class="white--text" :to="{name:'Login'}" >
                    <v-btn class="mx-2" fab dark small color="white" outlined >
                        <v-icon dark> fas fa-user</v-icon>
                    </v-btn>
                </router-link>
            </v-tab> -->

            <v-tab v-if="estadoLogout" >  
                <v-btn @click="navegacion" class="mx-2" fab dark small color="white" outlined >
                    <v-icon dark>fas fa-sign-out-alt</v-icon>
                </v-btn>
            </v-tab>
        </v-tabs>
        
    </v-app-bar>
    
</template>

<script>
import axios from 'axios'
import {mapState,mapMutations} from 'vuex' ;

export default {
    name: 'navegador',
    computed:{
        ...mapState(['nombreSesion'])
    },
    data() {
        return {
            // estadoLogin : false,
            estadoLogout : false ,
        }
    },
    methods: {
        ...mapMutations(['asignarIdPresentacion','asignarIdUsuario','asignarNombreSesion','asignarMostrarBoton']),
        navegacion(){
            this.asignarNombreSesion('')
            this.$router.push('/')
        },
        sesiondata(){
            
            if ( this.nombreSesion == '' || this.nombreSesion == null ) {
                this.estadoLogout = false
            }else{
                // location.reload()
                this.estadoLogout = true
                
            }
        }
        
    },
    updated() {
        this.sesiondata()
    },
}
</script>