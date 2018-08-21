<template>
    <b-button size="md" @click="logout">Logout</b-button>    
</template>

<script>
export default {

    name: 'logout',
    methods:{
        logout: function(){
            this.$store.dispatch('logout')
            this.$router.push('/');
        }
    }
    
}
</script>

<style>

</style>

