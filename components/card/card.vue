<script setup>
  const getUser = await account.get()
  const useUserData = await getUserData(getUser)
  const useQuizData = getQuizData() 
  const getAllCard = computed(()=> generateCardData(useQuizData))
  const CARD_DATA = getAllCard.value

    CARD_DATA.map(allQArr =>{
      allQArr.quiz.map(questItem =>{
        questItem.alreadyUse = useUserData.questID.includes(questItem.id)
      })
    })
</script>

<template>
<div class="cardSection flex justify-around items-center bg-[white] min-h-screen rounded-t-[20px]">
  <div class="card flex  items-center flex-col"  
    v-for="card in CARD_DATA"
    :key="card.name">
    <div class="card__title">{{ card.name }}</div>
    <div class="card__question flex  items-center justify-between flex-col min-h-full"
    v-for="question in card.quiz"
    :key="question.slug">
      <div class="card__question--item" :class="{'itemAlreadyUse': question.alreadyUse}"><NuxtLink :to="question.link">{{ question.price }}</NuxtLink></div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.card{
  background-color: red;
  min-height: 250px;
  min-width: 25%;
  border-radius: 10px;
  padding: 15px 0;

  &__title{
    padding-top:10px;
    @include font($RobotoSlab,500,18px,20px,black);
    text-transform:uppercase;
  }

  &__question{
    flex: 1 0 auto;
    margin:15px 0;
    min-width: 80%;
    row-gap: 5px;

    .itemAlreadyUse{
      background-color: darkgrey;
      pointer-events: none; 
    }
    &--item{
      background-color: white;
      width:100%;
      height: 30px;
      @include flex;
      border-radius: 5px;
      @include font($Lucky,200,13px,16px,black);

      & a{
        @include flex;
        min-width:100%;
      }

      &:hover{
        background-color: green;
      }
    }
  }
}
</style>