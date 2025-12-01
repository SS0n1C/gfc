<script  setup>
const getAllquest = getQuizData()
const getUser = await account.get()
const usetUserData = await getUserData(getUser)
const useQuest = await getAllQuestion(getAllquest)
const getRewardList = await allReward()
const store = useAutStore()
const router = useRouter()
const rewardArr = getRewardList.filter((e)=>{
  return usetUserData.rewardID.find(el => el == e.$id )
})
let quizLength = getAllquest.quiz.length
let quizUserLength = usetUserData.questID.length
let quizCorresct = usetUserData.correctAnswer
const progress = Math.round(quizUserLength *100 / quizLength)
onMounted(async() =>{
  getUser?store.set(getUser):router.push("/login")
})
</script>

<template>
  <section class="overflow-x-hidden">
  <div class="userStatsSection grow  flex flex-col pt-[50px] p-[20px] gap-[25px]  rounded-t-[20px]">
    <nav class="statsNavigation">
      <div class="statsNavigation__butt">
        <NuxtLink to="/reward">
        <button type="button">
          <Icon class="btnIcon" name="icon-park:left-two" style="color:green" size="25px"/>
          to Rewards</button>
        </NuxtLink>
      </div>
      <div class="statsNavigation__butt">
        <NuxtLink to="/">
        <button type="button">
          <Icon class="btnIconLast" name="icon-park:up-two" style="color:green" size="25px"/>
          to Questions</button>
        </NuxtLink>
      </div>
    </nav>
  <div class="userStats flex-wrap">
    <div class="round"
     :style="{
      '--progress': progress + '%'
    }">
      <div class="round__insaid">{{ Math.round(quizUserLength *100 / quizLength) }} %</div>
      <div class="round__discript">
        <span> % пройдених питань </span>
      </div>
    </div>
    <div class="stats pt-[10px]">
      <div class="stats__item">
        <span>{{ quizLength }} / {{ quizUserLength }}</span>
        <div class="statItem__discripts"><span>Кількість питань</span></div>
      </div>
      <div class="stats__item">
        <span>{{quizCorresct}}</span>
        <div class="statItem__discripts"><span>Правильні відповіді</span></div>
      </div>
      <div class="stats__item">
        <span>{{ quizUserLength - quizCorresct  }}</span>
        <div class="statItem__discripts"><span>Не правильні відповіді</span></div>
      </div>
      <div class="stats__item">
        <span>w:{{quizCorresct=="0"?quizUserLength:Math.round(quizCorresct*100 / quizUserLength) }} %</span>
        <div class="statItem__discripts"><span>% Правильних відповідей</span></div>
      </div>
    </div>
  </div>
  <div class="userReward">
    <div class="userReward__title flex items-center justify-center uppercase">Your rewards</div>
    <div class="userReward__field flex flex-wrap justify-around items-stretch gap-[15px]">
    <div class="userReward__field--item flex grow justify-around items-center h-[180px] rounded-[25px]"
    v-for="rewardList in rewardArr">
      <div class="rewardImg"><NuxtImg :src=rewardList.image></NuxtImg></div>
      <div class="rewadDiscr flex flex-col justify-around  min-h-[100%] ">
        <div class="rewadDiscr__title flex items-center justify-center">{{ rewardList.name }}</div>
        <div class="rewadDiscr__txt grow flex justify-center"><span class="block">{{ rewardList.discript }}</span></div>
      </div>
    </div>   
    </div>
  </div>
  </div>
  </section>
</template>
<style lang="scss">
.statsNavigation{
  @include flex;
  min-width: 100%;
  justify-content: space-around;

  &__butt{
     @include font($RobotoSlab,600,16px,18px,$white);
    & button{
    position: relative;
    padding: 10px 25px;
    background: $deepBlue;
    border-radius: 10px;
    border:1px $gold solid;
    @include media($mobile){
      padding:5px 10px;
      @include fontsize(14px,16px)
    }
  } 

    .btnIcon{
      right:50%;
      transform:translate(-50%, 50%);
      @include media($mobile){
        top: -11px;
      }
    }
    .btnIconLast{
      position: absolute;
      top:-3px;
      right: 50%;
      transform:translate(50%, -50%);
    }
  }
}
.userStatsSection{
  background: #06012d99;
  filter:brightness(1) contrast(1.1);
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
}
  .userStats{
    display: flex;
    justify-content: space-around;
    align-items: center;
    @include font($RobotoSlab,700,20px,24px,$black);
    min-width: 100%;
    min-height: 100%;
  }
  .round{
    position: relative;
    @include flex;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
    blue 0% var(--progress),
    $gold var(--progress) 100%,);
      text-shadow: 1px 1px 2px $brown;
      border:1px $gold  solid;
      box-shadow: 5px 5px 7px 3px rgba(0,0,0,0.72);
      background-blend-mode: overlay;
      filter:brightness(1.3) contrast(1.2);
    @include media($mobile){
        width: 100px;
        height: 100px;
    }
    &:hover{
      .round__discript{
        display: inline-block;
      }
    }
    &__insaid{
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: $backBLue;
    @include font($playFair,500,28px,32px,$gold);
    @include flex;
    text-shadow: 1px 1px 4px black;
    border: 1px $gold solid;
    @include media($mobile){
        width: 90px;
        height: 90px;
        @include fontsize(18px,20px);
    }
    }
    &__discript{
      display: none;
      position: absolute;
      top:0%;
      @include font($serif,400,18px,20px,$white);
      right:-20%;
      transform:translate(50%, -50%);
      opacity: 0.7;
      @include media($table){
        @include fontsize(15px,16px);
      }
      @include media($mobile){
        @include fontsize(13px,14px);
        right:-30%;
        max-width: 100px;
      }
    }
  }
  .stats{
    @include flex;
    background: $deepBlue;
    border:1px grey solid;
    margin-top: 10px;
    padding: 15px;
    border-radius: 10px;
    text-shadow: 2px 2px 4px black;
    &__item{
      position:relative;
      @include flex;
      @include font($RobotoSlab,400,20px,35px,$white);
      padding:0px 10px;
      border-right: 1px white solid;
      @include media($mobile){
        @include font($RobotoSlab,400,16px,20px,$white);
        padding: 0 5px;
      }
      .statItem__discripts{
      display: none;
      opacity: 0.7;
      min-width:220px;
      position: absolute;
      top:-50px;
      @include font($serif,400,18px,20px,$white);
      @include media($table){
        @include fontsize(15px,16px);
        top:-40px;
      }
      @include media($mobile){
        @include fontsize(13px,14px);
        top:200%;
        left: -20px;
      }
    }
      &:nth-of-type(2){
        color:blue
      }
      &:nth-of-type(3){
        color: red;
        @include media($mobile){
          .statItem__discripts{
          left: -50px;
        }
        }
      }
      &:last-of-type{
        border: none;
        color: $gold;
        @include media($mobile){
          .statItem__discripts{
          left: -100px;
        }
        }
      }
      &:hover{
        .statItem__discripts{
          display: inline-block;
        }
      }
  }
}
  .userReward{
    &__title{
      @include font($playFair,600,24px,28px,$gold);
      margin:30px 0;
    }
    &__field--item{
      background: $deepBlue;
      overflow: hidden;
      min-width: 40%;
      max-width: 500px;
      border:1px grey solid;
    }
  }
.rewardImg {
  width: 40%;
  height: 100%;
  position: relative;
}

.rewardImg img {
  width: 100%;
  height: 100%;
  object-fit: fill;   
  border-radius: 5px;
}
  .rewadDiscr{
    width: 60%;
    text-align: center;
    padding: 10px 10px;
    &__title{
      @include font($playFair,500,20px,24px,$gold);
      margin:10px 0;
      @include media($mobile){
        @include fontsize(14px,16px);
        margin:5px 0;
      }
    }
    &__txt{
      @include font($playFair,400,16px,20px,$white);
      margin:10px 0;
      @include media($mobile){
        @include fontsize(13px,15px);
        margin:5px 0;
      }
    }
  }
</style>