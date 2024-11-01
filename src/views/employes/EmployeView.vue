<template>
    <section class="wrapper">
        <div class="separator">
            <!-- <div></div> -->
            <strong>Liste des utilisateur</strong>

            <div class="interaction">
                <div class="search-filter">
                    <div class="search-items">
                        <input
                            type="search"
                            placeholder="Chercher..."
                            v-model="keyword"
                            @keypress.enter="search"
                        />
                    </div>
                </div>
                <div>
                    <button class="btn btn-add"
                        @click="create_employe_shown=!create_employe_shown"
                    >
                        <i class="mdi mdi-plus"></i>
                        Ajouter Employé
                    </button>
                </div>
            </div>
        </div>

        <div class="table-container">
            <div class="table-wrap-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Age</th>
                            <th>Genre</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="employe, i in listeEmployes"
                            :key="employe.id"
                            :class="{'est_en_conge':estEnCOnge(employe)}"
                            >
                            <td>{{i}}</td>
                            <td>{{employe.id}}</td>
                            <td>{{employe.nom}}</td>
                            <td>{{employe.prenom}}</td>
                            <td>{{employe.age}}</td>
                            <td>{{employe.genre}}</td>
                            <td>-</td>
                            <td class="act">
                                <button
                                    class="btn-sm btn-danger"
                                    @click="performDelete(employe, i)"
                                >
                                    <i class="mdi mdi-pencil"></i>
                                    Supprimer
                                </button>

                                <button
                                    class="btn-sm btn-primary"
                                    @click="performModify(employe, i)"
                                >
                                    <i class="mdi mdi-pencil"></i>
                                    Modifier
                                </button>

                                <button
                                    class="btn-sm btn-succes"
                                    v-if="!estEnCOnge(employe)"
                                    @click="performCreateConge(employe, i)"
                                >
                                    <i class="mdi mdi-pencil"></i>
                                    Congé
                                </button>
    
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <CreateEmploye
            v-if="create_employe_shown"
            @createEmited="performCreateEmploye"
            @close="create_employe_shown=false"
            :employe_prop="employe_obj"
            :index_prop="index_obj"
        
        ></CreateEmploye>
        <ConfirmView
            v-if="confirm_shown"
            :employe_prop="employe_obj"
            :index_prop="index_obj"
            @close="confirm_shown=false"
        >
        </ConfirmView>
        <CreateConge
            :employe_prop="employe_obj"
            :index_prop="index_obj"
            @close="create_conge_shown=false"
            v-if="create_conge_shown"
        ></CreateConge>
    </section>
</template>
<script>
import CreateEmploye from '@/components/CreateEmploye.vue';
import ConfirmView from '@/components/ConfirmView.vue';
import CreateConge from '@/components/CreateConge.vue';
import { handleError } from 'vue';
export default {
    data(){
        return{
            listeEmployes:this.$store.state.listeEmployes,
            create_employe_shown:false,
            confirm_shown:false,
            employe_obj : null,
            create_conge_shown : false,
            index_obj:null
        }
    },
    components:{
        CreateEmploye,
        ConfirmView,
        CreateConge
    },
    watch:{
        "$store.state.listeEmployes":{
            handler(newVal){
                if(newVal)
                    localStorage.setItem("listeEmployes", JSON.stringify(newVal))
            },
            deep:true
        }   
    },
    methods:{
        performCreateEmploye(data){
            this.$store.state.listeEmployes.push(data)
            this.create_employe_shown = false
        },
        performDelete(employe, idx){
            this.employe_obj = employe
            this.index_obj = idx
            this.confirm_shown=true
        },
        performModify(employe, idx){
            this.employe_obj = employe
            this.index_obj = idx
            this.create_employe_shown=true
        },
        performCreateConge(employe, idx){
            this.employe_obj = employe
            this.index_obj = idx
            this.create_conge_shown=true
            
        },
        estEnCOnge(employe){
            let today = new Date()
            let debut = new Date(employe.debut_conge)
            let fin = new Date(employe.fin_conge) 
            return today>=debut && today<=fin
        }
    },
    mounted(){
        let listeEmployes = JSON.parse(localStorage.getItem("listeEmployes"))
        console.log(listeEmployes)
        if(listeEmployes)
            this.$store.state.listeEmployes = listeEmployes
        this.listeEmployes = this.$store.state.listeEmployes
    }
}
</script>

<style scoped>
.est_en_conge{
    background-color: aqua;
}
</style>
