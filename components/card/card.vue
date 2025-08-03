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
<div class="cardSection flex flex-wrap pt-[50px] p-[20px] gap-[15px] justify-around items-center rounded-t-[20px]">
  <div class="card flex grow items-center flex-col"  
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
.cardSection{
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
.card{
  background:$lighBlue;
  // min-height: 250px;
  width: min(47%, 200px);
  max-width: 300px;
  border-radius: 10px;
  padding: 15px 0;
  position:relative;
  border:1px rgba(0, 0, 255, 0.341) solid;

  @include media($mobile){
    padding: 10px;
  }


    &::after{
    content:"";
    position: absolute;
    border:1px $gold solid;
    top:3px;
    left:3px;
    right: 3px;
    bottom:3px;
    border-radius: 10px;
    pointer-events: none;
  }

  &__title{
    padding-top:10px;
    @include font($playFair,700,18px,20px,$gold);
    text-transform:uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 3px $brown;
    max-width: 100%;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

   @include media($mobile){
    font-size: 15px;
   }
  }

  &__question{
    flex: 1 0 auto;
    margin:15px 0;
    min-width: 80%;
    row-gap: 5px;

    .itemAlreadyUse{
      background:$lighBlue;
      pointer-events: none; 
      border:1px $gold solid;
      box-shadow:none;
      filter: blur(0.7px);
    }
    &--item{
      background: $slickGold;
      width:100%;
      height: 30px;
      @include flex;
      border-radius: 5px;
      @include font($RobotoSlab,500,15px,16px,black);
      text-shadow: 1px 1px 2px $brown;
      border:1px rgba(0, 0, 255, 0.341)  solid;
      box-shadow: 5px 5px 7px 3px rgba(0,0,0,0.72);
      background-blend-mode: overlay;
      filter:brightness(1.1) contrast(1.2);

      & a{
        @include flex;
        min-width:100%;
      }

      &:hover{
        background:wheat;
      }
    }
  }
}
</style>