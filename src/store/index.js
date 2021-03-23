import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
state: {
    API_URL:'https://sistemagestionpilonesbackend.herokuapp.com/api',
    nombreSesion : '',
    idPresentacion : '',
    idUsuario : '',
    mostrarBoton : '',
},
mutations: {
    asignarNombreSesion(state,nombre){
        state.nombreSesion = nombre
    },
    asignarIdPresentacion(state,data){
        state.idPresentacion = data
    },
    asignarIdUsuario(state,data){
        state.idUsuario = data
    },
    asignarMostrarBoton(state,data){
        state.mostrarBoton = data
    },

},
actions: {
},
modules: {
}
})
