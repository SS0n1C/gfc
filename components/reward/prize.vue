<script setup>
const user = await account.get()
const router = useRouter()
const store = useAutStore()
onMounted(async()=>{
    console.log(user)
    allReward()
  try {
    if(user){
      store.set(user)
    }
  } catch (error) {
    router.push("/login")
  }
})


</script>

<template>
    <div class="flex justify-around items-center bg-[white] min-h-screen rounded-t-[20px]">
        <div class="rewardField">
            <div class="rewardCard">
                <div class="rewardCard__title">some good</div>
                <div class="rewardCard__img"><NuxtImg
                    src="/lorem.png"
                    alt="your reward"
                    width="150px"
                    height="150px"/>
                </div>
                <div class="rewardCard__price"><button type="button">1000</button></div>
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
}
</style>