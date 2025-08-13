<script setup>
</script>

<template>
  <div class="wrapper">
      <div class="conteiner flex flex-col min-h-screen pt-[5px]">
      <Header/>
      <slot class="grow"/>
      <Footer/>
      </div>
</div>
</template>
<style lang="scss">
.conteiner{
  @include conteiner(1200px);
  min-height: 100vh;
}
.wrapper{
  background: $deepBlue;
}

</style>