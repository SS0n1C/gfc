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
</template>
<style lang="scss">
  .userStats{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .round{
    @include flex;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(
    #203139 0% var(--progress),
    #ddd var(--progress) 100%,);
    border: 2px blueviolet solid;

    &__insaid{
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background-color: blue;
    @include flex;
    }
  }
  .stats{
    @include flex;
    &__item{
      @include flex;
      @include font($playFair,400,20px,35px,$white);
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