<script setup>
import { useRoute } from 'vue-router';
import { CARD_DATA } from '~/components/card/card.data';
const route = useRoute()
const cardData = Object.values(CARD_DATA);
const slug = route.params.slug
let itemText = {}
const item = cardData.find(category =>
  itemText = category.quiz.find(item => item.slug == slug)
);
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
      <div>{{ itemText.text }}</div>
    </div>
  </div>
  <div v-else>
    <h2>EROR</h2>
  </div>
</section>
</NuxtLayout>
</template>


<style>

</style>