<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <form @submit.prevent="submit()">
                    <div class="alert alert-primary" role="alert" v-if="error != null">
                        {{ error.message }}
                    </div>
                    <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                    
                    <input type="email" class="form-control mb-2" placeholder="Email address" v-model="user.email">
                    <input type="password" class="form-control mb-2" placeholder="Password" v-model="user.password">
                    <input type="password" class="form-control" placeholder="Confirm Password" v-model="confirm_password">
                    
                    <button class="btn btn-lg btn-primary btn-block mt-2" type="submit">Sign up</button>
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
            confirm_password: '', // I didn't add it inside user object because I will not send it as a parameter
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        validate_form(){
            this.error = null

            if( this.user.email.trim() == '' || this.user.password.trim() == '' || this.confirm_password.trim() == '' ){
                this.error = { message: 'Please fill all the fields' }
                return false
            }

            if( !this.validate_email(this.user.email) ){
                this.error = { message: 'Please use a valid email' }
                return false
            }

            if( this.confirm_password != this.user.password ){
                this.error = { message: 'Passwords don\'t match' }
                return false
            }

            if( this.user.password.length < 8 ){
                this.error = { message: 'Password length must be longer than 8 character' }
                return false
            }
            return true
        },
        submit(){
            // do nothing when form is not valid, just show the error
            if( !this.validate_form() ) return

            // call actions.auth method in store.js
            this.$store.dispatch('auth', { action: 'register', user: this.user })
                .then(data => {
                    this.$router.push({ name: 'login' })
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
    }
}
</script>

<style lang='scss'>
</style>