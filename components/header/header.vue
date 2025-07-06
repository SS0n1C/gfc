<script setup>
const store = useAutStore()
const router = useRouter()
const userInfo = useAutStore()
const loader = useLoading()
const logout = async () => {
    loader.set(true)
    if(store.user.name !== "user"){
        await account.deleteSession("current")
        console.log("exit")
        await router.push("/login")
        store.clear()
    }
    loader.set(false)
}
onMounted(async() =>{
    try {
        const user = await account.get()
        const userScore = await getUserData(user)
        store.set({
            score:userScore.data
        })
    } catch (error) {
        console.log(error)
    }
})
function goToRevard(){
    router.push("/reward")
}

</script>
<template>
<header class="header justify-between items-center flex bg-[#243c5a]">
    <div>
    <div class="revard items-center flex bg-[white] rounded-2xl p-1" @click="goToRevard()">
        <Icon name="noto:trophy" size="28px" />
    </div>
    </div>
    <div class="items-center flex mr-[10px]">
        <div class="score pr-[20px]">{{ userInfo.user.score }}</div>
        <div class="avatar"><NuxtImg
            src="/ava.png"
            alt="avatar"
            width="35px"
            height="30px"/>
    </div>
    <div class="login">
        <div class="login__name">
            {{ userInfo.user.name }}
        </div>
        <div class="login__logout pl-[5px]" @click=logout()>
            <Icon name="uil:exit" style="color: white" size="16px" />
        </div>
    </div>
    </div>

</header>
</template>

<style lang="scss">
.header{
    padding:20px 10px;
    @include font($Lucky,500,20px,20px,white);
    
}
.revard{
    margin-left:10px;
    border:1.5px gold solid;
    cursor:pointer;
}
.login{
    @include flex;
    &__logout{
         cursor:pointer;
    }
}
.avatar{
    background-color: white;
    border-radius: 50%;
    padding: 1px;
    margin-right: 5px;
}
</style>