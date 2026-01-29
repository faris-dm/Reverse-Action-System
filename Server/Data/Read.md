i am using map to store user info in my local storge

Map is used to store data in the memory while the app is running

it is usefull for
temporary storage
testing the logic

set(key,value) =add or update a vallue
get()=geta vallue by key
get(key)= check if a key exist

<!--  map is -->

new product ={ id:name,req.body.name }
set= save data
get()=read data

####

express.urlencoded() - Parses URL-encoded bodies.

it acceptes text from and change it to clean js-object

when data is sent from the form it is in the form of x-www-urlincoded like name=solo&password=12345

### so

express can not read this so express.urlencode-change it to parse and make it readable

and then attach it toreq.body.

it it vallue true ,it is a permisstion to use a libery in node true use this qs
false=use querystring
if it is false it only accespts basic vallues {name:"solo"
}

if it is true: we can send multiple line nasted array

const {email,profile}=req.body

used for clean code
but if one varable is not correvt then it is the whole is undefined
means
const email=req.body.email
const profile=req.body.profile

lets say let email=:solo@gmail

let user={name:"faris",age:"rool"}
then if we used const userStore=new map()

userStore.set(email.user)
then i stored emai and an object called suer in then localstorges

#### const signup=(email,userInfo)=> {

}
means it check a user with that email are existed or not
also this are emails and userInfo
are parameters that the user expexts from suer or some one when the function is called

#### Map()

    is a fast and simple way of storeing data in the local memorey
    propertes of Map
    1 new Map()=create new map
    2:Map.set(key,vallue)=add or   update  an item
    3: .get(key)=find some vallue
    .has(key)=check if it existed
    .delete()=delete evetything
    .size()=count elements

### WHY WE USE EMAIL AS A KEY

     we use email as a key blc it is unique and,can be used  to  retive the needed info based on  that
