<script setup>
const scratch = ref(null)
const router = useRouter()
const route = useRoute()
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
    let addCorrectScore = String(++useUserData.correctAnswer)
    const userQuestID = [...oldUseQId,itemText.id]
    const userScore = String(Number(oldUserData) + Number(itemText.price))
    await changeUserData(useUserData,userQuestID,userScore,undefined,undefined,addCorrectScore)
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
</script>
<template>
  <section class="questSection flex justify-around grow rounded-t-[20px] p-8">
  <div class="min-w-full flex flex-col gap-y-[15px]">
    <div class="questOption flex justify-around">
      <div><h4>{{ item.name }}</h4></div>
      <div><h4>{{ itemText.price }}</h4></div>
    </div>
    <div class="questText min-w-[200px] max-h-[250px] flex justify-center items-center grow">
      <div>{{ itemText.quest }}</div>
    </div>
    <div class="flex justify-center items-center">
      <uiScratch 
          ref="scratch" 
          :width="200" 
          :height="60" 
          :threshold="80" 
          @completed="reveal">
      <div class="flex justify-center items-center grow text-center">{{itemText.answer}}</div>
    </uiScratch>
    </div>
    <div class="flex justify-center items-center mt-[30px]">
      <button type="button" class="btn" @click="right()"><Icon class="btnIcon" name="icon-park-solid:correct" style="color:green" size="20px"/>Yes</button>
      <button type="button" class="btn" @click="wrong()"><Icon class="btnIcon" name="icomoon-free:cross" style="color:red" size="20px"/>No</button>
    </div>
  </div>
</section>
</template>

<style>
/* всі стилі знаходятся в папці assets */


</style>