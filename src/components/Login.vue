<template>
    <v-container grid-list-md  >
        <v-layout row grap class="justify-center" >
            <v-flex md6  >
                <v-card class="mb-3 pa-3 " outlined  >
                    <h1>Iniciar Sesion</h1>
                    <v-form @submit.prevent="enviarData"   >
                        <v-text-field prepend-inner-icon="fas fa-user" label="Usuario" v-model="user" color="warning"></v-text-field>
                        <!-- <v-text-field prepend-inner-icon="fas fa-lock" label="Contraseña" v-model="password" ></v-text-field> -->
                        <v-text-field
                            prepend-inner-icon="fas fa-lock"
                            :append-icon="show3 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                            :rules="[rules.required, rules.min]"
                            :type="show3 ? 'text' : 'password'"
                            name="input-10-2"
                            label="Contraseña"
                            color="warning"
                            class="input-group--focused"
                            v-model="password"
                            @click:append="show3 = !show3"
                        ></v-text-field>
                        <v-btn type="submit" color="warning" @click="snackbar = !snackbar" block>Iniciar Sesion</v-btn>
                    </v-form>
                </v-card>
                <!-- <v-card class="mb-3 pa-3 " outlined  >
                    <v-card-text>
                        <p>Eres Nuevo ? Registrate</p>
                        <router-link Color="Blue" :to="{name:'Registro'}" >Registrate</router-link>
                    </v-card-text>
                    
                </v-card> -->
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
    name: 'Login',
    computed:{
        ...mapState(['idUsuario','nombreSesion','mostrarBoton'])
    },
    data() {
        return {
            snackbar : false,
            text : '',
            usuario : '',
            usuario2 : '',
            user : '',
            password : '',
            url : '',
            url2 : '',
            show3 : false,
            // password: 'Password',
            rules: {
                required: value => !!value || 'Completa todos los campos',
                min: v => v.length >= 8 || 'Minimo 8 caracteres',
                // emailMatch: () => (`The email and password you entered don't match`),
            },
        }
    },
    methods: {
        ...mapMutations(['asignarIdPresentacion','asignarIdUsuario','asignarNombreSesion','asignarMostrarBoton']),
        async enviarData(){
            if(this.user==='' || this.password===''){
                this.snackbar = true ;
                this.text = 'Completa Correctamente Todos los Campos'
            }else{
                this.url = 'http://127.0.0.1:8000/api/loginAdmin?user='+this.user+'&password='+this.password
                this.url2 = 'http://127.0.0.1:8000/api/loginUsuarios?user='+this.user+'&password='+this.password
                const respuesta = await axios.get(this.url)
                const respuesta2 = await axios.get(this.url2)
                this.usuario = respuesta.data
                this.usuario2 = respuesta2.data
                // console.log(this.usuario[0])
                // console.log(this.usuario2[0])

                if( this.usuario == "" ){
                    this.text = 'Datos Incorrectos'
                    this.snackbar = true ;
                }else{
                    if (this.usuario[0]['id_roles'] == 1  ) {
                        this.asignarMostrarBoton('true')
                        this.asignarNombreSesion(this.usuario[0]['nombres_admin_users'])
                        // console.log(this.nombreSesion)
                        this.text = 'Bienvenid@'
                        this.snackbar = true ;
                        this.$router.push('/principal') 
                        return this.usuario
                    }
                }

                if( this.usuario2 == "" ){
                    this.text = 'Datos Incorrectos'
                    this.snackbar = true ;
                }else{
                    if (this.usuario2[0]['id_roles'] == 2  ) {
                        this.asignarMostrarBoton('')
                        this.asignarNombreSesion(this.usuario2[0]['titular_usuarios'])
                        this.asignarIdUsuario(this.usuario2[0]['id_usuarios'])
                        // console.log(this.nombreSesion)
                        this.text = 'Bienvenid@'
                        this.snackbar = true ;
                        this.$router.push('/editar') 
                        return this.usuario
                    }
                }
            }
        },
        sesion(){
            if (this.nombreSesion == '' || this.nombreSesion == null || this.nombreSesion == "") {
                console.log('LOGIN')
            }else{
                this.$router.push('/principal') 
            }
        }
    },
    created(){
        this.sesion()
    }
    
}
</script>