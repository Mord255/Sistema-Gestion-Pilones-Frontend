<template>
    <v-container grid-list-md >
        <v-layout row grap >
            <v-flex xs12 sm12 >
                <h1>hola presentacion {{this.idPresentacion}} </h1>
                <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left"> Nombres Completos </th>
                            <th class="text-left"> Lote </th>
                            <th class="text-left"> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in personas" :key="item.id_usuarios" @click="editar(item.id_usuarios)" >
                            <td>{{ item.titular_usuarios }}</td>
                            <td>{{ item.vivienda_usuarios }}</td>
                            <td>
                                <v-btn @click="eliminarUsuario(item.id_usuarios,item.id_pilon)" color="error" small depressed elevation="5" fab icon outlined raised rounded >
                                    <v-icon dark>fas fa-trash</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            </v-flex>
        </v-layout>
        <v-snackbar v-model="snackbar">
            {{ text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = !snackbar" >Close</v-btn>
            </template>
        </v-snackbar>
    </v-container>
    
</template>

<script>
import axios from 'axios' 
import {mapState,mapMutations} from 'vuex' ;


export default {
    name: 'Presentacion',
    data() {
        return {
            personas: [],
            snackbar:'',
            text:'',
        }
    },
    computed:{
        ...mapState(['idPresentacion','idUsuario','nombreSesion','mostrarBoton','API_URL']),
        
    },
    
    methods:{
        ...mapMutations(['asignarIdPresentacion','asignarIdUsuario']),
        async ObtenerData(){
            const respuesta = await axios.get(this.API_URL+'/mostrarUsuarios?id_pilon='+this.idPresentacion)
            this.personas = respuesta.data
            // console.log(this.personas)
            return this.personas
        },
        eliminarUsuario(id_usuarios,id_pilon){
            // console.log(id_usuarios)
            if(id_usuarios == "" || id_usuarios == null || id_pilon == "" || id_pilon == null ){
                this.text = 'Error'
                this.snackbar = true
            }else{
                let config = {headers : {"Content-type" : "application/x-www-form-urlencoded"}}
                let data = 'id_usuarios='+id_usuarios+'&id_pilon='+id_pilon;
                this.axios.post(this.API_URL+'/eliminarUsuario',data,config).then((response) => {
                    if(response.status=200){
                        this.text = 'Usuario Eliminado Exitosamente'
                        this.snackbar = true 
                    }else{
                        this.text = 'Error del Servidor Intentelo de nuevo'
                        this.snackbar = true 
                    }
                })
            }
        },
        editar(id){
            this.asignarIdUsuario(id)
            this.$router.push('/editar') 
            // console.log(id)
        },
        admin(){
            if(this.mostrarBoton != 'true'){
                this.$router.push('/editar')
            }
        },
        sesion(){
            if (this.nombreSesion == '' || this.nombreSesion == null || this.nombreSesion == "") {
                this.$router.push('/') 
            }
        }
        
        
    },
    created(){
        this.admin()
        this.ObtenerData()
        this.sesion()
    },
    
    
}
</script>