import { APP_WRITE_ID} from '@/appconstans'
import {DB_ID} from '@/appconstans'
import {USER_COLLECTION} from '@/appconstans'
import {QUIZ_COLLECTION} from '@/appconstans'
import{REWARD_COLLECTION} from '@/appconstans'
import { Account, Client, Databases,Query, ID} from 'appwrite'
export const client = new Client()

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(APP_WRITE_ID)

export const account = new Account(client)
export{ ID } from "appwrite"
export const DB = new Databases(client)

export async function getUserData(data) {
  const docs = await DB.listDocuments(
  DB_ID,
  USER_COLLECTION,
  [Query.equal("userID", data.$id)])

    if (docs.documents.length === 0) {
    return null
  }
  const userScore = docs.documents[0];
  return userScore 
}
export async function changeUserData(userData,userQuestID,userDataScore){
  const docs = await DB.updateDocument(
  DB_ID,
  USER_COLLECTION,
  userData.$id,
   {
      questID: userQuestID,
      data: userDataScore,
    }
)
}
export async function createUserData(user) {
  const createDoc =  await DB.createDocument(
    DB_ID,
    USER_COLLECTION,
      ID.unique(),
      {userID: user.$id, data:"2000",questID:0}
  )
  return createDoc
}
export async function getAllQuestion(stateQuData) {
  const question = await DB.listDocuments(
    DB_ID,
    QUIZ_COLLECTION,
  )
  const getQData = question.documents.map(data =>({
          id: data.$id,
          category: data.category,
          price: data.price,
          quest: data.quest
  }))
  stateQuData.set(getQData)
}
export async function allReward(){
  const getReward = await DB.listDocuments(
    DB_ID,
    REWARD_COLLECTION,
  )
  const getRewardList = getReward.documents
  console.log(getRewardList)
}