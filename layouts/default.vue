<script setup>
</script>

<template>
  <div class="wrapper">
    <div class="bg-[#243c5a] min-h-screen">
      <div class="conteiner">
      <Header/>
      <slot/>
      </div>
    </div>
</div>
</template>
<style lang="scss">
.conteiner{
  @include conteiner(1200px);
}

</style>