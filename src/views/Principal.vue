<template>
    <v-container  grid-list-md >
        <v-layout row grap >
            <v-flex xs12 sm12  >
                <!-- <v-row  no-gutters justify="space-between"  > -->
                    <v-card>
                        <v-col v-for="pilon in pilones" :key="pilon.id_pilon" >
                            <v-btn @click="presentacion(pilon.id_pilon)" color="primary" depressed raised rounded elevation="4" outlined x-large >Pilon {{pilon.numero_pilon}}</v-btn>
                        </v-col>
                    </v-card>
                <!-- </v-row> -->
            </v-flex>
        <!-- </v-layout>
        <v-layout row grap > -->
            <v-flex xs12 sm12 justify-center >
                <v-card>
                    <v-btn @click="dialogPilon = !dialogPilon" color="primary" depressed raised rounded elevation="4" outlined x-large >Nuevo Pilon</v-btn>
                    <v-btn @click="dialogUsuario = !dialogUsuario" color="primary" depressed raised rounded elevation="4" outlined x-large >Nuevo Usuario</v-btn>
                    <v-btn @click="dialogAdmin = !dialogAdmin" color="primary" depressed raised rounded elevation="4" outlined x-large >Nuevo Administrador</v-btn>
                </v-card>
                <v-card>
                    <v-btn @click="dialogEliminarPilon = !dialogEliminarPilon" color="primary" depressed raised rounded elevation="4" outlined x-large >Eliminar Pilon</v-btn>
                    <v-btn @click="dialogEliminarAdmin = !dialogEliminarAdmin" color="primary" depressed raised rounded elevation="4" outlined x-large >Eliminar Administrador</v-btn>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog persistent v-model="dialogPilon" width="500" >
            <v-card>
                <v-card-title>Nuevo Pilon</v-card-title>
                <v-card-text>
                    <v-text-field prepend-inner-icon="fas fa-map-marker-alt" label="Ubicacion del Pilon" v-model="ubicacionPilon" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="fas fa-sort-numeric-up-alt" label="Numero del Pilon" v-model="numeroPilon" color="info"></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="nuevoPilon" color="success">Aceptar</v-btn>
                    <v-btn @click="dialogPilon = !dialogPilon" color="error">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent v-model="dialogUsuario" width="500" >
            <v-card>
                <v-card-title>Nuevo Usuario</v-card-title>
                <v-card-text>
                    <v-text-field prepend-inner-icon="fas fa-user" label="Ingresa el Titular" v-model="titular_usuario" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="fas fa-address-card" label="Ingresa el DNI" v-model="dni_usuario" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="fas fa-lock" label="Ingresa la contraseña" v-model="password_usuario" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="fas fa-address-card" label="Ingresa el sexo del titular" v-model="sexo_usuario" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="far fa-user" label="Ingresa la vivienda del titular" v-model="vivienda_usuario" color="info"></v-text-field>
                    <v-select v-model="dataPilon" :items="info_pilon" menu-props="auto" label="Ingresa el numero del Pilon" hide-details prepend-icon="fas fa-hand-holding-water" single-line ></v-select>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="nuevoUsuario" color="success">Aceptar</v-btn>
                    <v-btn @click="dialogUsuario = !dialogUsuario" color="error">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent v-model="dialogAdmin" width="500" >
            <v-card>
                <v-card-title>Nuevo Administrador</v-card-title>
                <v-card-text>
                    <v-text-field prepend-inner-icon="fas fa-user" label="Ingresa los Nombres" v-model="nombre_admin" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="far fa-user" label="Ingresa los apellidos" v-model="apellido_admin" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="fas fa-address-card" label="Ingresa el DNI" v-model="dni_admin" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="fas fa-lock" label="Ingresa la contraseña" v-model="password_admin" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="fas fa-address-card" label="Ingresa el sexo" v-model="sexo_admin" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="far fa-calendar-alt" label="Ingresa la edad" v-model="edad_admin" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="fas fa-briefcase" label="Ingresa el cargo" v-model="cargo_admin" color="info"></v-text-field>
                    <v-text-field prepend-inner-icon="fas fa-home" label="Ingresa la vivienda" v-model="vivienda_admin" color="info"></v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="nuevoAdmin" color="success">Aceptar</v-btn>
                    <v-btn @click="dialogAdmin = !dialogAdmin" color="error">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog persistent v-model="dialogEliminarPilon" width="500" >
            <v-card>
                <v-card-title>Eliminar Pilon</v-card-title>
                <v-card-text>
                    <p>¿Esta Seguro de Eliminar el Pilon Seleccionado?</p>
                    <v-select v-model="dataEliminarPilon" :items="info_pilon" menu-props="auto" label="Ingresa el numero del Pilon" hide-details prepend-icon="fas fa-hand-holding-water" single-line ></v-select>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="EliminarPilon" color="success">Aceptar</v-btn>
                    <v-btn @click="dialogEliminarPilon = !dialogEliminarPilon" color="error">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-dialog persistent v-model="dialogEliminarAdmin" width="500" >
            <v-card>
                <v-card-title>Eliminar Administrador</v-card-title>
                <v-card-text>
                    <p>¿Esta Seguro de Eliminar el Administrador Seleccionado?</p>
                    <v-select v-model="dataEliminarAdministrador" :items="info_admin" menu-props="auto" label="Ingresa el dni del Administrador" hide-details prepend-icon="fas fa-hand-holding-water" single-line ></v-select>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="EliminarAdmin" color="success">Aceptar</v-btn>
                    <v-btn @click="dialogEliminarAdmin = !dialogEliminarAdmin" color="error">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
    name: 'Principal',
    computed:{
        ...mapState(['nombreSesion','mostrarBoton'])
    },
    data() {
        return {
            pilones: [],
            admins: [],
            dialogPilon: false,
            dialogUsuario: false,
            dialogAdmin: false,
            dialogEliminarPilon: false,
            dialogEliminarAdmin: false,
            ubicacionPilon:'',
            numeroPilon:'',
            snackbar:'',
            text:'',
            dataPilon:'',
            info_pilon :[],
            titular_usuario:'',
            dni_usuario:'',
            password_usuario:'',
            sexo_usuario:'',
            vivienda_usuario:'',
            nombre_admin:'',
            apellido_admin:'',
            dni_admin:'',
            password_admin:'',
            sexo_admin:'',
            edad_admin:'',
            cargo_admin:'',
            vivienda_admin:'',
            dataEliminarPilon:'',
            info_admin:[],
            dataEliminarAdministrador :'',
        }
    },
    methods: {
        ...mapMutations(['asignarIdPresentacion']),
        async ObtenerPilones(){
            const respuesta = await axios.get('http://127.0.0.1:8000/api/mostrarPilones')
            this.pilones = respuesta.data
            // console.log(this.pilones)
            this.pilones.forEach(element => {
                this.info_pilon.push(element['numero_pilon'])
            });
            return this.pilones
        },
        async ObtenerAdministradores(){
            const respuesta2 = await axios.get('http://127.0.0.1:8000/api/mostrarAdmins')
            this.admins = respuesta2.data
            // console.log(this.admins)
            this.admins.forEach(element => {
                this.info_admin.push(element['dni_admin_users'])
            });
            return this.admins
        },
        presentacion(id){
            this.asignarIdPresentacion(id)
            this.$router.push('/presentacion') 
            // console.log(id)
        },
        nuevoPilon(){
            if(this.ubicacionPilon == "" || this.ubicacionPilon == null || this.numeroPilon == "" || this.numeroPilon == null ){
                this.snackbar = true ;
                this.text = 'Completa Correctamente Todos los Campos'
            }else{
                let config = {headers : {"Content-type" : "application/x-www-form-urlencoded"}}
                let data = 'ubicacion='+ this.ubicacionPilon+'&numero='+this.numeroPilon;
                this.axios.post('http://127.0.0.1:8000/api/registroPilon',data,config).then((response) => {
                    if(response.status=200){
                        this.snackbar = true ;
                        this.text = 'Pilon Registrado Exitosamente'
                    }else{
                        this.snackbar = true ;
                        this.text = 'Error del Servidor Intentelo de nuevo'
                    }
                })
            }
            this.dialogPilon = !this.dialogPilon
        },
        nuevoUsuario(){
            // console.log(this.titular_usuario)
            // console.log(this.dni_usuario)
            // console.log(this.password_usuario)
            // console.log(this.sexo_usuario)
            // console.log(this.vivienda_usuario)
            // console.log(this.dataPilon)
            var id_pilon = ''

            if (this.dataPilon == "" || this.dataPilon == null ) {
                id_pilon = ''
            }else{
                const indexPilon = this.pilones.find(elemento => elemento.numero_pilon == this.dataPilon)
                id_pilon = indexPilon['id_pilon']
            }
            // console.log(id_pilon)
            if(this.titular_usuario == "" || this.titular_usuario == null || this.dni_usuario == "" || this.dni_usuario == null || this.password_usuario == "" || this.password_usuario == null || this.sexo_usuario == "" || this.sexo_usuario == null || this.vivienda_usuario == "" || this.vivienda_usuario == null || id_pilon == "" || id_pilon == null ){
                this.snackbar = true ;
                this.text = 'Completa Correctamente Todos los Campos'
            }else{
                let config = {headers : {"Content-type" : "application/x-www-form-urlencoded"}}
                let data = 'titular='+ this.titular_usuario+'&dni='+this.dni_usuario+'&password='+this.password_usuario+'&sexo='+this.sexo_usuario+'&vivienda='+this.vivienda_usuario+'&id_pilon='+id_pilon;
                this.axios.post('http://127.0.0.1:8000/api/registroUsuarios',data,config).then((response) => {
                    if(response.status=200){
                        this.snackbar = true ;
                        this.text = 'Usuario Registrado Exitosamente'
                    }else{
                        this.snackbar = true ;
                        this.text = 'Error del Servidor Intentelo de nuevo'
                    }
                })
            }
            this.dialogUsuario = !this.dialogUsuario
        },
        nuevoAdmin(){

            if( this.nombre_admin == "" || this.apellido_admin == "" || this.dni_admin == "" || this.password_admin == "" || this.sexo_admin == "" || this.edad_admin == "" || this.cargo_admin == "" || this.vivienda_admin == "" ){
                this.snackbar = true ;
                this.text = 'Completa Correctamente Todos los Campos'
            }else{
                let config = {headers : {"Content-type" : "application/x-www-form-urlencoded"}}
                let data = 'password='+ this.password_admin+'&dni='+this.dni_admin+'&nombres='+this.nombre_admin+'&apellidos='+this.apellido_admin+'&edad='+this.edad_admin+'&sexo='+this.sexo_admin+'&cargo='+this.cargo_admin+'&vivienda='+this.vivienda_admin;
                this.axios.post('http://127.0.0.1:8000/api/registroAdmin',data,config).then((response) => {
                    if(response.status=200){
                        this.snackbar = true ;
                        this.text = 'Administrador Registrado Exitosamente'
                    }else{
                        this.snackbar = true ;
                        this.text = 'Error del Servidor Intentelo de nuevo'
                    }
                })
            }
            this.dialogAdmin = !this.dialogAdmin
        },
        EliminarPilon(){
            // console.log(this.dataEliminarPilon)
            let eliminar_id_pilon = ''

            if( this.dataEliminarPilon == "" || this.dataEliminarPilon == null ){
                this.snackbar = true ;
                this.text = 'Completa Correctamente Todos los Campos'
            }else{
                this.pilones.forEach(element => {
                    if ( element['numero_pilon'] == this.dataEliminarPilon ) {
                        eliminar_id_pilon = element['id_pilon']
                    }
                });
                let config = {headers : {"Content-type" : "application/x-www-form-urlencoded"}}
                let data = 'id_pilon='+ eliminar_id_pilon;
                this.axios.post('http://127.0.0.1:8000/api/eliminarPilon',data,config).then((response) => {
                    if(response.status=200){
                        this.text = 'Pilon Eliminado Exitosamente'
                        this.snackbar = true ;
                    }else{
                        this.text = 'Error del Servidor Intentelo de nuevo'
                        this.snackbar = true ;
                    }
                })
            }
            this.dialogEliminarPilon = !this.dialogEliminarPilon
        },
        
        EliminarAdmin(){
            console.log(this.dataEliminarAdministrador)
            let eliminar_id_admin_user = ''

            if( this.dataEliminarAdministrador == "" || this.dataEliminarAdministrador == null ){
                this.snackbar = true ;
                this.text = 'Completa Correctamente Todos los Campos'
            }else{
                this.admins.forEach(element => {
                    if ( element['dni_admin_users'] == this.dataEliminarAdministrador ) {
                        eliminar_id_admin_user = element['id_admin_users']
                    }
                });
                let config = {headers : {"Content-type" : "application/x-www-form-urlencoded"}}
                let data = 'id_admin_users='+ eliminar_id_admin_user;
                this.axios.post('http://127.0.0.1:8000/api/eliminarAdmin',data,config).then((response) => {
                    if(response.status=200){
                        this.text = 'Administrador Eliminado Exitosamente'
                        this.snackbar = true ;
                    }else{
                        this.text = 'Error del Servidor Intentelo de nuevo'
                        this.snackbar = true ;
                    }
                })
            }
            this.dialogEliminarAdmin = !this.dialogEliminarAdmin
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
        this.ObtenerPilones()
        this.ObtenerAdministradores()
        this.sesion()
    },
    
}
</script>