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
                                    
                                >
                                    <i class="mdi mdi-pencil"></i>
                                    Ajouter Congé
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
        
        ></CreateEmploye>
    </section>
</template>
<script>
import CreateEmploye from '@/components/CreateEmploye.vue';
import { handleError } from 'vue';
export default {
    data(){
        return{
            listeEmployes:this.$store.state.listeEmployes,
            create_employe_shown:false,
        }
    },
    components:{
        CreateEmploye
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

</style>
