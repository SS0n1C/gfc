<script setup>
const user = await account.get()
const useUserData = await  getUserData(user)
const router = useRouter()
const store = useAutStore()
const getRewardList = await allReward()
onMounted(async()=>{
  try {
    if(user){
      store.set(user)
    }
  } catch (error) {
    router.push("/login")
  }
})
async function buyReward(rewardScore,rewardID){
    let conf = confirm("are you sure?")
    if(conf){
        if(useUserData.data>=rewardScore){
        const userScore = useUserData.data - rewardScore
        const oldUserRewID = useUserData.rewardID
        const newUserRewID = [...oldUserRewID,rewardID]
        await changeUserData(useUserData,undefined,String(userScore),newUserRewID)
        alert("congrat")
        console.log(useUserData)
        window.location.reload()
    } else {
        alert("you are too poore")
    }
    }

}

</script>

<template>
    <div class="flex rewardSection p-8 gap-y-[20px] flex-col items-center min-h-screen rounded-t-[20px]">
        <div>
            <h2>choose your reward</h2>
        </div>
        <div class="rewardField flex flex-wrap  justify-around items-stretch gap-[20px] min-w-full ">
            <div class="rewardCard grow" v-for="rewardItem in getRewardList"
            :key="rewardItem.$id">
                <div class="rewardCard__title">{{rewardItem.name}}</div>
                <div class="rewardCard__img"><NuxtImg
                    src="/lorem.png"
                    alt="your reward"
                    width="150px"
                    height="150px"/>
                </div>
                <div class="rewardCard__discript grow">{{ rewardItem.discript }}</div>
                <div class="rewardCard__price" v-if="!useUserData.rewardID.find(e=>e == rewardItem.$id )" @click="buyReward(rewardItem.price,rewardItem.$id)"><button type="button">{{rewardItem.price}}</button></div>
                <div class="rewardCard__buyed" v-else>already have</div>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
.rewardSection{
    background: $backBLue;
    position:relative;
    border:2px rgba(39, 39, 150, 0.395) solid;
    &::after{
    content:"";
    position: absolute;
    border:1px $gold solid;
    top:7px;
    left:7px;
    right: 7px;
    bottom:7px;
    border-radius: 20px;
    pointer-events: none;
  }
  & h2{
    @include font($playFair,700,28px,32px,$gold);
    letter-spacing: 2px;
    text-transform: capitalize;
    text-align: center;

    @include media($mobile){
        @include fontsize(20px,24px);
    }
  }
}
.rewardCard{
    @include flex;
    @include font($playFair,500,20px,28px,$gold);
    flex-direction: column;
    border: 2px $gold solid;
    padding: 10px 20px;
    border-radius: 10px;
    row-gap:20px;
    width:48%;
    max-width: 270px;
    &:nth-of-type(odd){
        border: 2px $blue solid;
    }
    @include media($mobile){
        padding:10px 10px;
        @include fontsize(15px,17px);
    }

    &__price{
        width: 70%;
        button{
            border:1px $gold solid;
            font-family: $serif;
            font-weight: 700;
            box-shadow: 5px 4px 4px black;
            text-shadow: 3px 3px 3px $brown;
            padding:5px 10px;
            width: 100%;
            height: 100%;
            background:#008000;
            border-radius: 10px;
            position: relative;
            &::after{
                position:absolute;
                content:" ";
                border:1px $gold solid;
                top:2px;
                left:2px;
                right: 2px;
                bottom:2px;
                border-radius: 10px;
                pointer-events: none;
            }
            @include media($mobile){
                font-size:15px;
            }
        }
    }
    &__buyed{
        text-shadow: 3px 3px 3px $brown;
        padding:5px 10px;
        width:70%;
        background:$lighBlue;
        border-radius: 10px;
        text-align:center;
        border:1px $gold solid;
        box-shadow: 2px 2px 2px $gold;
        text-transform: uppercase;
        font-size: 16px;

        @include media($mobile){
            padding: 5px;
            font-size:14px;
        }
    }
}
</style>