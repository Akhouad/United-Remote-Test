<template>
    <div class="shop-card">
        <div class="shop-title">{{ shop.title }}</div>
        <div class="shop-image">
            <img :src="shop.image" :alt="shop.title">
        </div>
        <div v-if="!preferred">
            <button class="btn btn-danger mr-2" @click="$emit('react', { action: 'dislike', id: shop.id })">Dislike</button>
            <button class="btn btn-success" @click="$emit('react', { action: 'like', id: shop.id })">Like</button>
        </div>
        <div v-if="preferred">
            <button class="btn btn-danger" @click="$emit('remove', { action: 'remove', id: shop.id })">Remove</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['shop', 'preferred']
}
</script>

<style lang='scss'>
.shop-card{
    padding: 10px;
    border-radius: 4px;
    border: solid 1px rgba(#000, .1);
    margin-bottom: 30px;

    .shop-title{ padding: 0 0 10px; }
    .shop-image{ margin-bottom: 10px; }
}
</style>