<template>
        <v-container grid-list-md >
            <v-layout row grap >
                <v-flex xs12 sm12 >
                    <h1>Hola editar usuario {{this.idUsuario}}</h1>
                    <v-card elevation="5" outlined shaped >
                        <v-card-title class="mt-1">{{this.titular}} - {{this.dni}} - {{this.vivienda}}  </v-card-title> 
                        <v-card-title>Pilon {{this.pilon}} - {{this.sexo}} - {{this.pass}}</v-card-title>
                        <v-card-actions class="ml-2" >
                            <v-btn @click="dialog = !dialog" depressed elevation="5" outlined plain raised rounded color="info" v-if="dataMostrarBoton">Nuevo</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-simple-table class="mt-3">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left"> Mes </th>
                                        <th class="text-left"> Año </th>
                                        <th class="text-left"> Estado de Pago </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in datos" :key="item.id_cuentas"  >
                                        <td>{{ item.nombre_mes }}</td>
                                        <td>{{ item.descripcion_ano }}</td>
                                        <td>{{ item.estado_pago_cuentas }}</td>
                                    </tr>
                                </tbody>
                            </template>
                    </v-simple-table>
                </v-flex>
            </v-layout>
            <v-dialog persistent v-model="dialog" width="500">
                <v-card>
                    <v-card-title>Nuevo Registro</v-card-title>
                    <v-card-text></v-card-text>
                    <v-combobox width="100" :items='meses' v-model="selectMes"  label="Selecciona el mes" 
                    clearable dense hide-selected outlined small-chips solo >
                    </v-combobox>
                    <v-combobox width="100" :items='anos' v-model="selectAno"  label="Selecciona el año" 
                    clearable dense hide-selected outlined small-chips solo >
                    </v-combobox>
                    <v-combobox width="100" :items='pilones' v-model="selectPilon"  label="Selecciona el Pilon" 
                    clearable dense hide-selected outlined small-chips solo >
                    </v-combobox>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn @click="EnviarData()" color="success">Cerrar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
</template>

<script>
import axios from 'axios' 
import {mapState,mapMutations} from 'vuex' ;

export default {
    name: 'EditarUsuario',
    computed:{
        ...mapState(['idUsuario','mostrarBoton','nombreSesion','API_URL']),
    },
    data() {
        return {
            datos : [],
            data1 : [],
            data2 : [],
            data3 : [],
            meses : [],
            anos : [],
            pilones : [],
            titular :'',
            dni:'',
            vivienda:'',
            pilon :'',
            sexo:'',
            pass:'',
            dialog: false,
            selectMes: '',
            selectAno: '',
            selectPilon: '',
            id_user_data:'',
            dataMostrarBoton: false ,
        }
    },
    methods:{
        
        async ObtenerData(){
            const respuesta = await axios.get(API_URL+'/mostrarCuenta?id_usuarios_cuentas='+this.idUsuario)
            this.datos = respuesta.data

            this.datos.forEach(element => {
                this.id_user_data = element['id_usuarios']
                this.titular = element['titular_usuarios']
                this.dni = element['dni_usuarios']
                this.vivienda = element['vivienda_usuarios']
                this.pilon = element['numero_pilon']
                this.sexo = element['sexo_usuarios']
                this.pass = element['password_usuarios']
            });
            // console.log(this.datos)
            return this.datos
        },
        async ObtenerMeses(){
            const respuesta1 = await axios.get(API_URL+'/mostrarMeses')
            this.data1 = respuesta1.data
            this.data1.forEach(element => {
                this.meses.push(element['nombre_mes'])
            });
            // console.log(this.meses)
            return this.meses
        },
        async ObtenerAnos(){
            
            const respuesta2 = await axios.get(API_URL+'/mostrarAnos')
            this.data2 = respuesta2.data
            this.data2.forEach(element => {
                this.anos.push(element['descripcion_ano'])
            });
            // console.log(this.anos)
            return this.anos
        },
        async ObtenerPilones(){
            
            const respuesta3 = await axios.get(API_URL+'/mostrarPilones')
            this.data3 = respuesta3.data
            this.data3.forEach(element => {
                this.pilones.push(element['numero_pilon'])
            });
            // console.log(this.pilones)
            return this.pilones
        },

        EnviarData(e){
            let id_mes = ''
            let id_ano = ''
            let id_pilon = ''
            let id_user = this.id_user_data
            let data_estado = 'Cancelado'

            if (this.selectMes == "" || this.selectMes == null ) {
                id_mes = ''
            }else{
                const indexMes = this.data1.find(elemento => elemento.nombre_mes == this.selectMes)
                id_mes = indexMes['id_mes']
            }

            if (this.selectAno == "" || this.selectAno == null ) {
                id_ano = ''
            }else{
                const indexAno = this.data2.find(elemento => elemento.descripcion_ano == this.selectAno)
                id_ano = indexAno['id_ano']
            }

            if (this.selectPilon == "" || this.selectPilon == null ) {
                id_pilon = ''
            }else{
                const indexPilon = this.data3.find(elemento => elemento.numero_pilon == this.selectPilon)
                id_pilon = indexPilon['id_pilon']
            }
            // console.log(id_mes)
            // console.log(id_ano)
            // console.log(id_pilon)
            // console.log(id_user)
            // console.log(data_estado)

            if (id_mes==''||id_ano==''||id_pilon==''||id_user==''||data_estado=='') {
                console.log('Completa todos los campos')
            }else{
                let config = {headers : {"Content-type" : "application/x-www-form-urlencoded"}}
                let data = 'ano='+ id_ano+'&mes='+id_mes+'&pilon='+id_pilon+'&user='+id_user+'&estado='+data_estado;
                this.axios.post(API_URL+'/NuevoRegistroCuentas',data,config).then((response) => {
                    if(response.status=200){
                        console.log(response.data)
                        // location.reload()
                        // this.$router.go(0)
                    }else{
                        console.log(response)
                    }
                })
            }
            this.dialog = !this.dialog
        },
        boton(){
            if (this.mostrarBoton === 'true'){
                this.dataMostrarBoton = true
            }else{
                this.dataMostrarBoton = false
            }
        },
        sesion(){
            if (this.nombreSesion == '' || this.nombreSesion == null || this.nombreSesion == "") {
                this.$router.push('/') 
            }
        }
    },
    created(){
        this.ObtenerData()
        this.ObtenerMeses()
        this.ObtenerAnos()
        this.ObtenerPilones()
        this.boton()
        this.sesion()
    },
    
    
}
</script>