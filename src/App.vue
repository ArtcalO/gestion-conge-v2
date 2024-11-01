<template>
  <LoginView v-if="$store.state.user==null"></LoginView>
  <router-view v-else></router-view>
</template>

<script>
import LoginView from './views/auth/LoginView.vue';
export default {
  watch:{
    "$store.state.user":{
      handler(newVal){
        if(newVal)
          localStorage.setItem("user", JSON.stringify(newVal))
      }
    }
  },
  data(){
    return{
      
    }
  },
  mounted(){
    let user = JSON.parse(localStorage.getItem("user"))
    if(user)
      this.$store.state.user = user
  },
  components:{
    LoginView,
  }
}
</script>

<style>

</style>