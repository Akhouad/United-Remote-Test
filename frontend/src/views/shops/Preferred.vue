<template>
    <div class="container">
        <div class="row" v-if="shops.length > 0">
            <div class="col-md-3" v-for="(shop, index) in shops" :key="index">
                <ShopCard :shop="shop" :preferred="true" @remove="remove" />
            </div>
        </div>
        <div v-if="shops.length == 0">You have not liked any shop yet.</div>
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
            this.$store.dispatch('get_preferred')
                .then(data => this.shops = data.data)
                .catch(err => console.error(err))
        },
        remove(value){
            let data = {
                shop_id: value.id
            }
            this.$store.dispatch('remove_preferred', data)
                .then(() => this.index())
                .catch(err => console.error(err))
        }
    }
}
</script>

<style lang='scss'>
</style>