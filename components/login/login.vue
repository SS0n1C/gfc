<script setup>
const userLogin = ref("")
const userPassword = ref("")
const autStore =  useAutStore()
const router = useRouter()
const useloader = useLoading()

const login = async() =>{
useloader.set(true)
try{
    await account.createEmailPasswordSession(userLogin.value,userPassword.value)
    const response = await account.get()
    if(response){
        autStore.set({
            email:response.email,
            password:response.password,
            name:response.name,
        })
        const userData = await getUserData(response)
        if(userData === null){
           await createUserData(response)
        }
    }
    userLogin.value = "",
    userPassword.value = "",
    await router.push("/")
}
catch(e){
alert(e)
}
finally{
    useloader.set(false)
}
}

onMounted(async() =>{
    try{
        const user = await account.get()
        if(user){
            router.push("/")
        }
    }  catch (err) {
    }  finally{
    }

})

</script>

<template>
  <section class="login flex justify-center items-center flex-col">
        <div class="formSection flex  items-center flex-col bg-[#243c5a]">
            <div class="forSection--h mb-[50px] mt-[20px] text-[24px] font-mono font-bold">
                LOGIN
            </div>
            <div class="formSection--input">
                <input type="email"
                placeholder="login"
                v-model="userLogin">
            </div>
            <div class="formSection--input">
                <input type="password"
                placeholder="password"
                v-model="userPassword">
            </div>
            <div class="formSection--button w-[140px] h-[40px] mt-4 bg-pink-500">
                <button @click="login">enter</button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.login{
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;

}
.formSection{
    width: 70%;
    max-width: 600px;
    height: 300px; 
    border-radius: 20px;

    & input{
        border-radius: 20px;
        padding: 5px 10px;
        border: 3px blue solid;
        background-color: aqua;
    }
    & input:focus{
        background-color: white;
        outline: none;
        box-shadow: none;
        border-color: inherit;
    }
    &--input{
        margin:10px;
    }
    &--button{
        border-radius: 10px;
    }
    & button{
        width: 100%;
        height: 100%;
    }
}
</style>