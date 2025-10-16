<script  setup>

</script>

<template>
  <div class="userStats">
    <div class="round">
      <div class="round__insaid">100%</div>
    </div>
    <div class="stats">
      <div class="stats__item"><span>100</span></div>
      <div class="stats__item"><span>30</span></div>
      <div class="stats__item"><span>40</span></div>
      <div class="stats__item"><span>w:50%</span></div>
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
    #203139 0% 80%, 
    #ddd 40% 100%,);
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