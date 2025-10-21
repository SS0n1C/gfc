<script  setup>
const getAllquest = getQuizData()
const getUser = await account.get()
const usetUserData = await getUserData(getUser)
const useQuest = await getAllQuestion(getAllquest)
const store = useAutStore()
const router = useRouter()
let quizLength = getAllquest.quiz.length
let quizUserLength = usetUserData.questID.length
let quizCorresct = usetUserData.correctAnswer
const progress = Math.round(quizUserLength *100 / quizLength)
onMounted(async() =>{
  getUser?store.set(getUser):router.push("/login")
})
</script>

<template>
  <div class="userStatsSection grow  flex flex-col flex-wrap pt-[50px] p-[20px] gap-[15px]  rounded-t-[20px]">
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
  <div class="userStats">
    <div class="round"
     :style="{
      '--progress': progress + '%'
    }">
      <div class="round__insaid">{{ Math.round(quizUserLength *100 / quizLength) }} %</div>
    </div>
    <div class="stats">
      <div class="stats__item"><span>{{ quizLength }} / {{ quizUserLength }}</span></div>
      <div class="stats__item"><span>{{quizCorresct}}</span></div>
      <div class="stats__item"><span>{{ quizUserLength - quizCorresct  }}</span></div>
      <div class="stats__item"><span>w:{{quizCorresct=="0"?quizUserLength:Math.round(quizCorresct*100 / quizUserLength) }} %</span></div>
    </div>
  </div>
  </div>
</template>
<style lang="scss">
.statsNavigation{
  @include flex;
  min-width: 100%;
  column-gap: 40px;

  &__butt button{
    position: relative;
    padding: 10px 25px;
    background:$lighBlue;
    border-radius: 10px;
    border:1px $gold solid;

    .btnIcon{
      right:50%;
      transform:translate(-50%, 50%);
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
    @include flex;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
    rgba(0, 0, 255, 0.341) 0% var(--progress),
    $gold var(--progress) 100%,);
      text-shadow: 1px 1px 2px $brown;
      border:1px white  solid;
      box-shadow: 5px 5px 7px 3px rgba(0,0,0,0.72);
      background-blend-mode: overlay;
      filter:brightness(1.1) contrast(1.2);

    &__insaid{
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: linear-gradient(91deg,rgba(72, 61, 120, 0.93) 0%, rgba(161, 188, 196, 1) 50%, rgba(39, 25, 79, 0.93) 100%);
    @include flex;
    border: 1px white solid;
    }
  }
  .stats{
    @include flex;
    &__item{
      @include flex;
      @include font($RobotoSlab,400,20px,35px,$white);
      padding:0px 10px;
      border-right: 1px white solid;
      &:nth-of-type(2){
        color:blue
      }
      &:nth-of-type(3){
        color: red;
      }
      &:last-of-type{
        border: none;
        color: $gold;
      }
    }
  }
</style>