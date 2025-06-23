<script setup>
import { useRoute } from 'vue-router';
const useQuizData = getQuizData() 
const response = await account.get()
const useUserData = await getUserData(response)
const getAllCard = computed(()=> generateCardData(useQuizData))
const CARD_DATA = getAllCard.value
const route = useRoute()
const cardData = Object.values(CARD_DATA);
const slug = route.params.slug
let itemText = {}
const item = cardData.find(category =>
  itemText = category.quiz.find(item => item.slug == slug)
);
function right(){
  useUserData.questID.push(itemText.id)
  console.log(useUserData)
}
</script>
<template>
<NuxtLayout>
  <section class="flex justify-around bg-[white] min-h-screen rounded-t-[20px] p-8">
  <div v-if="item" class="min-w-full flex flex-col">
    <div class="flex justify-around">
      <div>{{ item.name }}</div>
      <div>{{ itemText.price }}</div>
    </div>
    <div class="flex justify-center items-center grow">
      <div>{{ itemText.quest }}</div>
    </div>
    <div class="flex justify-center items-center">
      <button type="button" class="btn" @click="right()">Yes</button>
      <button type="button" class="btn" @click="wrong()">No</button>
    </div>
  </div>
  <div v-else>
    <h2>EROR</h2>
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