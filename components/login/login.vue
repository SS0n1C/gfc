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
            <div class="formSection--logo">
                <div><Icon name="fluent:brain-circuit-20-filled" style="color: #FACC15" size="40px" /></div>
                <div><Icon name="pepicons-print:question" style="color:#FACC15" size="20px" /></div>
                <div><Icon name="meteocons:lightning-bolt-fill" style="color:#FACC15" size="22px" /></div>
                <div></div>
            </div>
            <div class="formSection--h">
                <h3>Welcome</h3>
            </div>
            <div class="formSection--h">
                <h2>Please sign</h2>
            </div>
            <div class="formSection--input">
                <Icon name="uiw:mail" style="color: #FACC15" />
                <input type="email"
                placeholder="Email address"
                v-model="userLogin">
            </div>
            <div class="formSection--input">
                <Icon name="si:lock-duotone" style="color:#FACC15" size="17px"/>
                <input type="password"
                placeholder="Password"
                v-model="userPassword">
            </div>
            <div class="formSection--button h-[40px] ">
                <button @click="login">login</button>
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
    background: $deepBlue;
    border-radius: 10px;
}
.formSection{
    position: relative;
    width: 70%;
    max-width: 300px;
    height: 400px; 
    border-radius: 20px;
    background: linear-gradient(135deg, #2b2c4d 0%, #0F1021 100%);
    border:2px rgba(39, 39, 150, 0.395) solid;

    &::after{
        content: "";
        position: absolute;
        top: 8px;
        left: 8px;
        right: 8px;
        bottom: 8px;
        border-radius: 20px;
        border: 1px solid $gold; 
        pointer-events: none;
    }
    &--logo{
        position:relative;
        margin-top: 30px;
        width: 60px;
        height: 50px;

        & > div:nth-of-type(1){
            position: absolute;
            top: 50%; 
            left: 50%;
            transform: translate(-50%, -50%)
        } 
        & > div:nth-of-type(2){
            position:absolute;
            left:0px;
            top:5px;    
            transform: rotate(-20deg);
        }
        &> div:nth-of-type(3){
            position:absolute;
            right:0px;
            bottom:2px;    
            transform: rotate(15deg);   
        }
        &> div:nth-of-type(4){
            position:absolute;
            left:10px;
            bottom:10px;  
            width:5px;
            height: 5px;
            border-radius: 50%;
            background-color: $gold;     
        }
    }
    &--h{
        margin-top:20px;
        
        & h2{
            @include font($playFair,300,16px,20px,$gold);
            letter-spacing: 1.5px;
            margin-bottom: 5px;
        }
        & h3{
            @include font($serif,600,24px,30px,$gold);
            letter-spacing: 2px;
            text-shadow: 0 0 4px #ffffff76, 0 0 55px #0c1edd;
        }
    }
    &--input{
        border-radius: 20px;
        padding: 7px 12px;
        border: 1px $gold solid;
        background: $deepBlue;
        margin:10px;

        & input{
            padding-left: 10px;
            background: $deepBlue;
            color:$gold;
        } 
    }
    &--button{
        border-radius: 10px;
        margin:10px;
        padding: 7px 12px;
        width:80%;
        background: $lighBlue;
        border:1px white solid;
        @include font($playFair,800,16px,20px,$gold);
        
        & button{
            width:100%;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 2px 2px 5px black;
        }
    }
}
</style>