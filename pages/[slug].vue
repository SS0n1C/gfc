<script setup>
const router = useRouter()
const response = await account.get()

onMounted(async()=>{
  try {
    if(response){
    }
  } catch (error) {
    router.push("/login")
  }
})
</script>
<template>
<NuxtLayout>
  <SlugPage/>
</NuxtLayout>
</template>


<style lang="scss">

</style>