interface IquizQuest{
    id:string,
    category:string,
    price:number,
    quest:string,
    answer:string,
    link:string,
    slug:string
}
const defaultQuiz:  IquizQuest[] = [
    {
        id:"0",
        category:"none",
        price:0,
        quest:" ",
        answer:" ",
        link:" ",
        slug:" "
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
export function generateCardData(quizState: { quiz: IquizQuest[] }){
  const grouped: { [key: string]: any[] } = {}
  quizState.quiz.forEach((item) => {
    const category = item.category?.toLowerCase() || 'unknown'
    if (!grouped[category]) {
      grouped[category] = []
    }
    const itemIndex = grouped[category].length +1
    const ObKey = Object.keys(grouped)
    const categoryIndex = ObKey.findIndex(e => e == item.category.toLowerCase()) +1
    grouped[category].push({
      price: Number(item.price),
      quest: String(item.quest),
      id: String(item.id),
      answer: String(item.answer),
      link: `/${categoryIndex}.${itemIndex}`,
      slug: `${categoryIndex}.${itemIndex}`,
    })
  })
  return Object.entries(grouped).map(([name, quiz]) => ({
    name,
    quiz
  }))
}