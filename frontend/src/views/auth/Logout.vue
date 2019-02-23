<template>
</template>

<script>
export default {
    mounted(){
        this.$store.state.user = null
        this.$store.state.token = ''
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')

        this.$router.push({ name: 'login' })
    }
}
</script>

<style lang='scss'>
</style>