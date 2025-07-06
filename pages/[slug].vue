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
      store.set(response)
    }
  } catch (error) {
    router.push("/login")
  }
})
</script>
<template>
<NuxtLayout>
  <section class="flex justify-around bg-[white] min-h-screen rounded-t-[20px] p-8">
  <div class="min-w-full flex flex-col">
    <div class="flex justify-around">
      <div>{{ item.name }}</div>
      <div>{{ itemText.price }}</div>
    </div>
    <div class="flex justify-center items-center grow">
      <div>{{ itemText.quest }}</div>
    </div>
    <div class="flex justify-center items-center grow">
      <uiScratch 
          ref="scratch" 
          :width="200" 
          :height="60" 
          :threshold="80" 
          @completed="reveal">
      <div class="flex justify-center items-center grow">lorem</div>
    </uiScratch>
    </div>
    <div class="flex justify-center items-center">
      <button type="button" class="btn" @click="right()">Yes</button>
      <button type="button" class="btn" @click="wrong()">No</button>
    </div>
  </div>
</section>
</NuxtLayout>
</template>


<style lang="scss" scoped>
.btn{
  padding: 10px 20px;
  border:1px black solid;
  border-radius: 5px;
  background-color: green;

  &:last-of-type{
    background-color: red;
    margin-left: 30px;
  }
}
</style>