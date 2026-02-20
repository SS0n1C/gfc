interface IautStore {
    email: string
    name: string
    data: number
    status: boolean,
    live:number,
    correctAnswer:number,
    avatar:string,
}
const defaultUser: {user : IautStore} =  {
    user:{
        email: "",
        name: "guest",
        data: 0,
        status: false,
        live:0,
        correctAnswer:0,
        avatar:"https://fra.cloud.appwrite.io/v1/storage/buckets/reward_storage/files/689c7c80000fbad6f16d/view?project=67f26d0a0035c9009631&mode=admin"
    }
}
export const useAutStore = defineStore("isAuth",{
    state: () => defaultUser,
    getters:{
        isAuth: state => state.user.status,
        score: state => state.user.data
    },
    actions:{
        clear(){
            this.$patch(defaultUser)
        }, 
        set(input: Partial<IautStore>) {
            this.$patch({
                user: {
                ...this.user,
                ...input
                }
            })
    }
        
    }
})
export const useLoading = defineStore("isLoad",{
    state: () =>({
        isLoad: true,
     }),
     actions:{
        set(data: boolean){
            this.$patch({isLoad:data})
        }
     }
    })