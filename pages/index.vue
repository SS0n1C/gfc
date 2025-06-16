<script setup>
const useLoader = useLoading()
const store = useAutStore()
const router = useRouter()
const useQuizData = getQuizData() 

onMounted(async()=>{
  getAllQuestion(useQuizData)
  const cardData = computed(() => {
  const grouped = {}

  useQuizData.quiz.forEach((item, index) => {
    const category = item.category?.toLowerCase() || 'unknown'

    if (!grouped[category]) {
      grouped[category] = []
    }

    const groupIndex = grouped[category].length + 1

    grouped[category].push({
      price: Number(item.price),
      quest: String(item.quest),
      link: `/${groupIndex}.${index + 1}`,
      slug: `${groupIndex}.${index + 1}`
    })
  })

  // Перетворюємо об'єкт в масив
  return Object.entries(grouped).map(([name, quiz]) => ({
    name,
    quiz
  }))
})
console.log(cardData.value)
  try {
    const user = await account.get()
    if(user){
      store.set(user)
    }
  } catch (error) {
    router.push("/login")
  } finally {
    useLoader.set(false)
  }
})
</script>

<template>
  <loader v-if="useLoader.isLoad"/>
  <NuxtLayout v-else>
    <card/>
  </NuxtLayout>
</template>



<style>

</style>