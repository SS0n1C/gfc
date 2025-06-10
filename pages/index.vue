<script setup>
const useLoader = useLoading()
const store = useAutStore()
const router = useRouter()

onMounted(async()=>{
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