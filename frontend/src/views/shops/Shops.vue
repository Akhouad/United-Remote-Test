<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3" v-for="(shop, index) in shops" :key="index">
                <ShopCard :shop="shop" @react="react" />
            </div>
        </div>
    </div>
</template>

<script>
import ShopCard from '@/components/ShopCard'

export default {
    components: { ShopCard },
    data(){
        return{
            shops: []
        }
    },
    mounted(){
        this.index()
    },
    methods: {
        index(){
            this.$store.dispatch('shops')
                .then(data => this.shops = data.data)
                .catch(err => console.error(err))
        },
        react(value){
            let data = {
                collection: value.action == 'like' ? 'shops' : 'dislikes'
            }

            this.$store.dispatch('react', { id: value.id, data })
                .then(data => this.index())
                .catch(err => console.error(err))
        }
    }
}
</script>

<style lang='scss'>
</style>