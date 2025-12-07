<script setup>
const {data} = await useFetch("/gfc/api/avatarPicker")
const user = await account.get()
const userData = await getUserData(user)
console.log(data)
 
</script>
<template>
<div class="mainFrame">
        <div class="item"><NuxtImg :src="userData.avatar"></NuxtImg></div>
        <div class="item" v-for="avaData in data">
            <img :src="'data:image/svg+xml;utf8,' + encodeURIComponent(avaData)" />
        </div>
        <div class="close"><Icon name="solar:close-square-broken" style="color:red"></Icon></div>
</div>
</template>
<style lang="scss">
.mainFrame{
    @include flex;
    flex-wrap: wrap;
    gap:10px;
    padding: 10px;
    position: relative;
    padding: 20px 10px 0 0;
    .item{
        width: 110px;
        height: 110px;
        border:4px red double;
        &:first-child{
            border:4px blueviolet double;
        }
    }
    .close{
        position: absolute;
        top:5px;
        right: 5px;
    }
}

</style>