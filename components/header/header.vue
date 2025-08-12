<script setup>
const store = useAutStore()
const router = useRouter()
const routed = useRoute()
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
            score:userScore.data,
            live:userScore.live
        })
    } catch (error) {
        console.log(error)
    }
})
function goToRevard(){
    if(routed.path == '/reward'){
        router.push("/")
    }else{
        router.push("/reward")
    }

}

</script>
<template>
<header class="header">
    <div>
    <div class="revard items-center flex bg-[white] rounded-2xl p-1" @click="goToRevard()">
        <Icon v-if="routed.path == '/reward'" name="fluent-color:question-circle-32" class="rewardIcon" size="28px" />
        <Icon v-else name="noto:trophy" class="rewardIcon" size="28px" />
    </div>
    </div>
    <div class="items-center flex mr-[10px]">
        <div class="wrapper"></div>
        <div class="score pr-[20px]">
            <div class="score__field"><Icon name="subway:hurt-3" style="color:red" class="score__icon" size="16px"/> <span> {{ userInfo.user.live }}</span></div>
             <div class="score__field"><Icon name="el:star-alt" style="color:#FACC15" class="score__icon" size="16px"/> <span> {{ userInfo.user.score }}</span></div>
        </div>
        <div class="avatar"><NuxtImg
            src="/ava.png"
            alt="avatar"
            width="33px"
            height="33px"/>
    </div>
    <div class="login">
        <div class="login__name">
            {{ userInfo.user.name }}
        </div>
        <div class="login__logout pl-[5px] pt-[7px]" @click=logout()>
            <Icon name="uil:exit" style="color: #FACC15" class="login__logout--icon"  size="20px" />
        </div>
    </div>
    </div>

</header>
</template>

<style lang="scss" scoped>
.header{
    margin-bottom: 5px;
    position: relative;
    padding:20px 10px;
    @include font($playFair,500,20px,30px,$gold);
    @include flex;
    justify-content: space-between;
    background: linear-gradient(135deg, #2b2c4d 0%, #0F1021 100%);
    border-radius: 20px;
    border:2px rgba(39, 39, 150, 0.395) solid;
    text-transform: uppercase;
    
    @include media($mobile){
        padding: 10px;
        font-size: 18px;
    }

    &::after{
        content: "";
        position: absolute;
        top: 4px;
        left: 5px;
        right: 5px;
        bottom: 4px;
        border-radius: 20px;
        border: 1px solid $gold; 
        pointer-events: none;
    }
}
.wrapper{
    margin-right: 15px;
    width:1px;
    height: 40px;
    border-radius:5px;
    background: $lighBlue;
}
.revard{
    margin-left:10px;
    border:0.5px gold solid;
    cursor:pointer;
    background: $lighBlue;
    .rewardIcon{
        @include media($mobile){
        height: 24px;
        width:24px;
    }
    } 
}
.score{
    @include font($RobotoSlab,500,20px,20px,$gold);
    @include flex;
    column-gap:10px;
    @include media($mobile){
        padding-right: 10px;
        @include fontsize(13px,13px);
        flex-direction: column;
        row-gap: 3px;
        align-items: flex-start;
        
    }
    &__icon{
        @include media($mobile){
            width:13px;
            height: 13px;
        }
    }
    & span{
        max-height: 16px;
    }
}
.login{
    @include flex;
    &__logout{
         cursor:pointer;
        &--icon{
            @include media($mobile){
            width:17px;
            height: 17px;
         }
        }

    }
    @include media($mobile){
        font-size:15px;

    }
}
.avatar{
    background: $lighBlue;
    border-radius: 20px;
    padding: 2px 3px 3px 3px;
    margin-right: 5px;
    @include media($mobile){
        height: 30px;
        width: 30px;
    }
}
</style>