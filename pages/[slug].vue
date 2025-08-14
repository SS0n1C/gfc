<script setup>
const scratch = ref(null)
const router = useRouter()
const route = useRoute()
const store = useAutStore()

const response = await account.get()
const useUserData = await getUserData(response)
const useQuizData = getQuizData()
const awaitQuestionBD = await getAllQuestion(useQuizData)

const getAllCard = computed(()=> generateCardData(useQuizData))
const CARD_DATA = getAllCard.value
const cardData = Object.values(CARD_DATA);
const slug = route.params.slug
let itemText = {}
const item = cardData.find(category =>
  itemText = category.quiz.find(item => item.slug == slug)
);
async function right(){
  try{
    const oldUseQId = useUserData.questID
    const oldUserData = useUserData.data
    const userQuestID = [...oldUseQId,itemText.id]
    const userScore = String(Number(oldUserData) + Number(itemText.price))
    await changeUserData(useUserData,userQuestID,userScore)
  }
  finally{
    await router.push("/")
  }
}
async function wrong(){
  try{
    const oldUserQId = useUserData.questID
    const userQuestID = [...oldUserQId,itemText.id]
    await changeUserData(useUserData,userQuestID)
  } finally {
    await router.push("/")
  }
}
function reveal() {
  scratch.value?.revealAll()
}
onMounted(async()=>{
  try {
    if(response){
    }
  } catch (error) {
    router.push("/login")
  }
})
</script>
<template>
<NuxtLayout>
  <section class="flex justify-around grow rounded-t-[20px] p-8">
  <div class="min-w-full flex flex-col gap-y-[15px]">
    <div class="questOption flex justify-around">
      <div>{{ item.name }}</div>
      <div>{{ itemText.price }}</div>
    </div>
    <div class="questText min-w-[200px] flex justify-center items-center grow">
      <div>{{ itemText.quest }}</div>
    </div>
    <div class="flex justify-center items-center grow">
      <uiScratch 
          ref="scratch" 
          :width="200" 
          :height="60" 
          :threshold="80" 
          @completed="reveal">
      <div class="flex justify-center items-center grow text-center">{{itemText.answer}}</div>
    </uiScratch>
    </div>
    <div class="flex justify-center items-center">
      <button type="button" class="btn" @click="right()"><Icon class="btnIcon" name="icon-park-solid:correct" style="color:green" size="20px"/>Yes</button>
      <button type="button" class="btn" @click="wrong()"><Icon class="btnIcon" name="icomoon-free:cross" style="color:red" size="20px"/>No</button>
    </div>
  </div>
</section>
</NuxtLayout>
</template>


<style lang="scss" scoped>
section{
    position:relative;
    background:$backBLue;
    border:2px rgba(39, 39, 150, 0.395) solid;
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
.questOption{
  @include font($RobotoSlab,500,24px,28px,$gold);
  text-transform: capitalize;

  &>div{
    border-bottom:1px $gold solid;
  }
}
.questText{
  padding: 10px 15px;
  align-self: center;
  @include font($playFair,700,20px,28px,$gold);
  letter-spacing: 1px;
  text-align: center;
  background: $lighBlue;
  width: 85%;
  border-radius: 10px;
  border:2px rgba(39, 39, 150, 0.395) solid;
  position:relative;
        &::after{
        content: "";
        position: absolute;
        top: 2px;
        left: 3px;
        right: 3px;
        bottom: 2px;
        border-radius: 10px;
        border: 1px solid $gold; 
        pointer-events: none;
    }
  @include media($mobile){
    @include fontsize(16px,18px)
  }
} 
.btn{
  background-blend-mode: overlay;
  filter:brightness(1.1) contrast(1.2);
  position:relative;
  text-shadow: 2px 2px 3px $brown;
  border:2px rgba(39, 39, 150, 0.395) solid;
  padding: 10px 20px;
  background: $slickGold;
  box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  color: #1a1a1a;
  @include font($playFair,400,16px,16px,black);

  &:last-of-type{
    border:1px $gold solid;
    background:$lighBlue;
    margin-left: 30px;
    box-shadow: 0 4px 10px rgba(0, 42, 255, 0.3);
  }
}
.btnIcon{
  position:absolute;
  top: -7px;
  left: -5px;
}
.cratchCard{
  @include media($mobile){
    width:100px;
  }
}
</style>