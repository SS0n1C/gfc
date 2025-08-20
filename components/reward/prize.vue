<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'
const user = await account.get()
const useUserData = await  getUserData(user)
const router = useRouter()
const store = useAutStore()
const getRewardList = await allReward()
let changeVisualNet = ref(true)
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
    let conf = confirm("Ти впевненна?")
    if(conf){
        if(+useUserData.data >= +rewardScore){
        const userScore = useUserData.data - rewardScore
        const oldUserRewID = useUserData.rewardID
        const newUserRewID = [...oldUserRewID,rewardID]
        await changeUserData(useUserData,undefined,String(userScore),newUserRewID)
        alert("Поздоровляю!!!")
        router.push("/")
    } else {
        alert("Не вистачає котобалів :(")
    }
    }

}
function changeVisual(){
    changeVisualNet.value = !changeVisualNet.value
}
watchEffect(changeVisualNet)

</script>

<template>
    <div class="flex overflow-hidden rewardSection p-8 gap-y-[20px] flex-col items-center min-h-screen rounded-t-[20px]">
        <div>
            <h2>choose your reward</h2>
        </div>
        <div class="flex w-full justify-end pr-[10px]">
            <Icon v-if="changeVisualNet" name="fluent:slide-link-20-regular" style="color:#999999" size="25px" @click="changeVisual()"/>
            <Icon v-else name="fluent:slide-text-20-filled" style="color:#999999" size="25px" @click="changeVisual()"/>
        </div>
        <transition name="fade-slide" mode="out-in">
        <div v-if="changeVisualNet" class="rewardField flex flex-wrap items-center justify-around gap-[20px] ">
            <div class="rewardCard" v-for="rewardItem in getRewardList"
            :key="rewardItem.$id">
                <div class="rewardCard__title">{{rewardItem.name}}</div>
                <div class="rewardCard__img"><NuxtImg
                    :src="rewardItem.image"
                    alt="your reward"
                    width="150px"
                    height="150px"/>
                </div>
                <div class="rewardCard__discript ">{{ rewardItem.discript }}</div>
                <div class="rewardCard__price" v-if="!useUserData.rewardID.find(e=>e == rewardItem.$id )" @click="buyReward(rewardItem.price,rewardItem.$id)"><button type="button">{{rewardItem.price}}</button></div>
                <div class="rewardCard__buyed" v-else>already have</div>
            </div>
        </div>
  <Swiper
    effect="cards"
    grab-cursor
    :modules="[EffectCards]"
    class="mySwiper items-stretch"
    v-else
  >
    <SwiperSlide  v-for="rewardItem in getRewardList"
            :key="rewardItem.$id"
            class="rewardCard min-h-[100px] ">
                      <div class="rewardCard__title">{{rewardItem.name}}</div>
                <div class="rewardCard__img"><NuxtImg
                    :src="rewardItem.image"
                    alt="your reward"
                    width="150px"
                    height="150px"/>
                </div>
                <div class="rewardCard__discript grow">{{ rewardItem.discript }}</div>
                <div class="rewardCard__price" v-if="!useUserData.rewardID.find(e=>e == rewardItem.$id )" @click="buyReward(rewardItem.price,rewardItem.$id)"><button type="button">{{rewardItem.price}}</button></div>
                <div class="rewardCard__buyed" v-else>already have</div>
    </SwiperSlide>
  </Swiper>
  </transition>
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
.rewardField{
  transition: all 0.4s ease;
}
.rewardCard{
    @include flex;
    @include font($playFair,500,20px,28px,$gold);
    background:linear-gradient(165deg,rgba(72, 61, 120, 0.93) 0%, rgba(44, 122, 150, 1) 50%, rgba(39, 25, 79, 0.93) 100%);
    flex-direction: column;
    flex-grow: 1;
    border: 2px $gold solid;
    padding: 10px 20px;
    border-radius: 10px;
    row-gap:20px;
    min-width:48%;
    max-width: 270px;
    max-height: fit-content;
    text-align:center;
    box-shadow: 2px 2px 10px 1px #FACC15;
    text-shadow: 3px 3px 4px $brown;
    &:nth-of-type(odd){
        border: 2px $blue solid;
        background: linear-gradient(193deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(16, 154, 181, 1) 100%);

    }
    @include media($mobile){
        padding:10px 10px;
        @include fontsize(15px,17px);
    }
    &__img{
      width:80%;
      height: 40%;

      & img{
        width:100%;
        height: 100%;
        border-radius: 10px
      }
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
            width:80%;
        }
    }
}
.swiper {
   display: flex;
    width: 300px;
    max-height: 100vh;
      @include font($playFair,500,20px,28px,$gold);
      min-height: 400px; 
  @include media($mobile){
    width:75%;
    @include fontsize(15px, 18px);
  }
}

.swiper-slide {
   display: flex;
  flex-direction: column;
  align-items:center;
  height: auto;
  border-radius: 18px;
  @include font($playFair,500,20px,28px,$gold);
  background: $backBLue;
  min-width:100%;
  max-height:none;
  @include media($mobile){
    @include fontsize(15px,18px);
  }
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
</style>