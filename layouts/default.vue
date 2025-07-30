<script setup>
</script>

<template>
  <div class="wrapper">
    <div>
      <div class="conteiner flex flex-col min-h-screen pt-[5px]">
      <Header/>
      <slot class="grow"/>
      </div>
    </div>
</div>
</template>
<style lang="scss">
.conteiner{
  @include conteiner(1200px);
}
.wrapper{
  background: $deepBlue;
}

</style>