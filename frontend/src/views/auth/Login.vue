<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <form @submit.prevent="submit()">
                    <div class="alert alert-primary" role="alert" v-if="error != null">
                        {{ error.message }}
                    </div>
                    <div class="alert alert-primary" role="alert" v-if="$store.state.interceptors != null">
                        {{ $store.state.interceptors.message }}
                    </div>

                    <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                    
                    <input type="email" class="form-control mb-2" placeholder="Email address" v-model="user.email" autofocus>
                    <input type="password" class="form-control" placeholder="Password" v-model="user.password">
                    
                    <button class="btn btn-lg btn-primary btn-block mt-2" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            error: null,
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        validate_form(){
            this.error = null

            if( this.user.email.trim() == '' || this.user.password.trim() == '' ){
                this.error = { message: 'Please fill all the fields' }
                return false
            }

            if( !this.validate_email(this.user.email) ){
                this.error = { message: 'Please use a valid email' }
                return false
            }
            return true
        },
        submit(){
            if( !this.validate_form() ) return
            
            this.$store.dispatch('auth', { action: 'login', user: this.user })
                .then(data => {
                    this.$store.state.user = data.data.user
                    window.localStorage.setItem('user', JSON.stringify(data.data.user))

                    this.$store.state.token = data.data.token
                    window.localStorage.setItem('token', data.data.token)

                    this.$router.push({ name: 'shops' })
                })
                .catch(err => {
                    this.error = { message: 'Something wrong happened, please try again.' }
                    console.error(err)
                })
        },
        validate_email(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    },
    beforeDestroy () {
        this.$store.state.interceptors = null
    }
}
</script>

<style lang='scss'>
</style>