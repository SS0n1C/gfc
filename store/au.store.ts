interface IautStore {
    email: string
    name: string
    score: number
    status: boolean
}
const defaultUser: {user : IautStore} =  {
    user:{
        email: "",
        name: "guest",
        score: 0,
        status: false,
    }
}
export const useAutStore = defineStore("isAuth",{
    state: () => defaultUser,
    getters:{
        isAuth: state => state.user.status,
        score: state => state.user.score
    },
    actions:{
        clear(){
            this.$patch(defaultUser)
        }, 
        set(input: IautStore){
            this.$patch({user:input})
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