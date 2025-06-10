import { APP_WRITE_ID} from '@/appconstans'
import { Account, Client, Databases,Query, ID} from 'appwrite'
export const client = new Client()

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(APP_WRITE_ID)

export const account = new Account(client)
export{ ID } from "appwrite"
export const DB = new Databases(client)

export async function getUserData(data) {
  const docs = await DB.listDocuments(
  "user_data",
  "user_collection",
  [Query.equal("userID", data.$id)])

    if (docs.documents.length === 0) {
    return null
  }
  const userScore = docs.documents[0].data;
  return userScore
}
export async function createUserData(user) {
  const createDoc =  await DB.createDocument(
    "user_data",
    "user_collection",
      ID.unique(),
      {userID: user.$id, data:"2000"}
  )
  return createDoc
}