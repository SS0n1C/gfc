interface IquizQuest{
    id:string,
    category:string,
    price:number,
    quest:string,
}
const defaultQuiz:  IquizQuest[] = [
    {
        id:"0",
        category:"none",
        price:0,
        quest:"test",
    }
]
export const getQuizData = defineStore("questionData",{
      state: () => ({
        quiz: defaultQuiz,
  }),
    actions: {
        set(input: IquizQuest[]) {
      this.quiz = input;
    },
}
})