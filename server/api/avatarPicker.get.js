export default defineEventHandler(async () => {
  const avatarArr = [
    "Brooklynn","Valentina","Christian","Adrian","Aiden","Riley","Chase","Jude","Sawyer","Alexander","Brian","Jack","Jameson","Vivian"
  ]
  let blend = avatarArr.sort(() => Math.random() - 0.5);
  let unicAvaArr = blend.slice(0, 8);
  const req = unicAvaArr.map(unicAva =>
    $fetch(`https://api.dicebear.com/9.x/adventurer/svg?seed=${unicAva}`,
      { responseType: "text" }
    )
  )
  let result = await Promise.all(req)
  return result
});