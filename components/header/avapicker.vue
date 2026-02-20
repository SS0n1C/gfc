<script setup>
const {data} = await useFetch("/gfc/api/avatarPicker")
const store = useAutStore()
const user = await account.get()
const userData = await getUserData(user)
const props = defineProps({ closeModal: Boolean })
const emit = defineEmits(['update:closeModal'])

async function choicenewAvatar(avaData){
    if(confirm("Tи впевнена?")){
        const newAva = await addAvatartoBucket(avaData)
        const updatedUser = await changeUserAvatar(userData.$id, newAva)
        store.set({
            avatar:updatedUser.avatar,
        })
        emit('update:closeModal', !props.closeModal)
    } 
}

</script>
<template>
<div class="mainFrame">
        <div class="item"><NuxtImg :src="userData.avatar"></NuxtImg></div>
        <div class="item" 
        @click="choicenewAvatar(avaData)"
        v-for="avaData in data">
            <img :src="'data:image/svg+xml;utf8,' + encodeURIComponent(avaData)" />
        </div>
        <div class="close" @click="emit('update:closeModal', !props.closeModal)"><Icon name="solar:close-square-broken" style="color:red"></Icon></div>
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
    cursor: auto;
    .item{
        width: 110px;
        height: 110px;
        border:3px red double;
        border-radius: 10px;
        &:hover{
            border-color: blue;
            background-color: white;
        }
        &:first-child{
            border:4px blueviolet double;
            pointer-events: none;
        }
        cursor: pointer;

    }
    .close{
        position: absolute;
        top:5px;
        right: 5px;
        cursor: pointer;
    }
}

</style>