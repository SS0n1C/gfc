<script setup>
const {data} = await useFetch("/gfc/api/avatarPicker")
const user = await account.get()
const userData = await getUserData(user)
const props = defineProps({ closeModal: Boolean })
const emit = defineEmits(['update:closeModal'])

async function choicenewAvatar(avaData){
    let conf = confirm("Ти впевнена?")
    if(conf){
        const newAva = await addAvatartoBucket(avaData)
        await changeUserAvatar(userData.$id,newAva)
    } else{
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
        border:4px red double;
        &:hover{
            border-color: blue;
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