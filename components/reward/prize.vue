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

</script>

<template>
    <div class="flex justify-around items-center bg-[white] min-h-screen rounded-t-[20px]">
        <div class="rewardField flex justify-around items-center gap-x-[20px] min-w-full ">
            <div class="rewardCard" v-for="rewardItem in getRewardList"
            :key="rewardItem.$id">
                <div class="rewardCard__title">{{rewardItem.name}}</div>
                <div class="rewardCard__img"><NuxtImg
                    src="/lorem.png"
                    alt="your reward"
                    width="150px"
                    height="150px"/>
                </div>
                <div class="rewardCard__discript">{{ rewardItem.discript }}</div>
                <div class="rewardCard__price" v-if="!useUserData.rewardID.find(e=>e == rewardItem.$id )" @click="buyReward(rewardItem.price,rewardItem.$id)"><button type="button">{{rewardItem.price}}</button></div>
                <div class="rewardCard__buyed" v-else>already have</div>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
.rewardCard{
    @include flex;
    flex-direction: column;
    border: 2px black solid;
    padding: 10px 20px;
    border-radius: 10px;
    row-gap: 15px;
    font-size: 20px;

    &__price{
        width: 100%;
        height: 100%;
        button{
            width: 100%;
            height: 100%;
            background-color: green;
            border-radius: 10px;
            &:hover{
                background-color: blue;
            }
        }
    }
    &__buyed{
        min-width:100%;
        background-color: blue;
    }
}
</style>