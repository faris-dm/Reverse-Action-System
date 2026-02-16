#### JWT

jwt allow to auth request without storeing data in the server this allow to auth user from diffreance parts of asystem using one session

### stateless auth

allow servers to auth with out storeing a session

jwt?header/payload/signature
jwt :acces token
refreace token
by working together we can get a secure server

## BOTH OF THEM CREATE SECURE AND STABILITY

### AccesToken 15M

    shortlived  token  for request admin  giving admin

give acces/shore lived , used for idenitifying user type also have exp date user and give aotrazation

### Refresh Token 7 DAYS

long live sestion
give a long term acces after login and it asks a acess token if the token exxpredate and it allow user session to reminas valid accross dlf pages

header =type and signining algo=HS256/type:jwt

payload:sub identifer
iat time for token isued
:expiration

     this is the data  you carry

signature:make them intigrate

### secret keys

signing key never be visable in the code you should use envt varables

### PROCES

1:USER LOGIN
login using there info
after the login the server create acces and refresh token
access token go to the browser heading
refresh go to cookies

2: the user user access token o login and attch it to header then the se rver validate the segnture and validate

3: after that the access token expdat and it need new access tokens
4: then the user request new acccess tokens

4: then the server validate the refresh token is valid if not login again

5: if it is valid then the refresh token give new access tokens
and it create new to refresh tokens and old tokens get expired

6: the server recives the new accces tokens and refresh tokens

## token refresh security

### const authHeader = req.headers['authorization'];

this line go to the header , are the metadata and the standard is the jet stored in the header auth

our server does not need to rember every one who logied in threy just need to verifay the token which sent by the user and auth it

#### let go yo action frust user add it info

app.post("/login", (req, res) => {
let username = req.body.username;

### user input in username

let user = { username: username };

### for future verify is create an objec and it dtore usename:"faris" in obj

let accessTokens = generateAccess(user);

let RefreshTokens = jwt.sign(user, RefreshTokenSecret, { expiresIn: "7d" });

### it takes the username and user the secret key to encrypted it so other people can not change it and user for auth

refreshStore.push(RefreshTokens);
console.log("accessTokens:", accessTokens);
res.json({ accessTokens: accessTokens, RefreshTokens: RefreshTokens });
});

#### a reusable function to generate access token

function generateAccess(user) {
return jwt.sign(user, secret, { expiresIn: "15m" });
}

### the entry point

post=> send data
app.post("/token", (req, res) => {

let RefreshTokens = req.body.token;

### get the token sent by the user

if (!RefreshTokens) {
return res.send("refresh token is missing");
}
if (!refreshStore.includes(RefreshTokens)) {
return res.status(403).send("invalid Tokens");
}
jwt.verify(RefreshTokens, RefreshTokenSecret,

### it verify the refreshtiken useing the secret key and says auth or not auth

(err, user) => {
if (err) return res.status(403).send("error found");
// let accessTokens=generateAccess({username:user.username})

### it get the user.name from refrshtoken and store it in the payload obj in the name of username

let payload = { username: user.username };
let accessTokens = generateAccess(payload);

### then it create new generate accesstoen from the username

res.json({ accessTokens: accessTokens });
});
});

#### logout user

app.delete("/logout", (req, res) => {
refreshStore = refreshStore.filter((token) => token !== req.body.token);
res.status(204).send("deluted the token succefully");
});

### the filte array make it simplil to filter the array and crete new array in the new elements

### array oparet three things

one loop throughr array
two filter and ask true or false question  
 three create new arrat with the new elements with the true ones

### const numbers = [5, 12, 8, 130, 44];

### const bigNumbers = numbers.filter((num) => num > 10);

### console.log(bigNumbers);

### the second route

#### when leening to code put a goal to achive

thi allow you to think
so my goal is to be a good dev which specilased in logic and strcture which is backend

### road map to your goal

    and have quises,assisment,projects

### just take your internet off and try to write something

evalute your self

#### why the broser work in redirecting but not the postman

frist broswer is for the humans so it show the ui and the postman is created for devs and it show the exactly the outcome,''

### we use ejs in server side rendering and react client side rendering

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFhQGdtYWlsLmNvbSIsImlhdCI6MTc3MTA3NDU1NSwiZXhwIjoxNzcxMDc0NTcwfQ.8mnNAQG0oIedOGrrck1E76yF7Bcm8kAy986DFNIC0iI

### Zod is a library that check the uer input and validatete and check if it is what the code is expexting

u put some rules and if this rules are not abeyod it will fail means if the user enter number in the email or password is not more than eight and so on

### mostily used for input protection

check the data and give correction

### used words

### scheme=rules that govern the data

### parsing= accept the user info,req.body and check the it based on scheme rules

## inferance: guideance for better writing

// POST /supplier – handle form submission
router.post("/supplier", async (req, res) => {
// save logic...
let RegistorSuppleZod = signUpsupplier.safeParse(req.body);
if (!RegistorSuppleZod) {
return res.status(400).json({
err: RegistorSuppleZod.error.errors.map((errors) => ({
field: errors.path[0],
message: errors.message,
})),
});
}

const { email, password, name, businessName, confirmPassword } = req.body;
try {
let hashPassword = await bcrypt.hash(password, 10);
let cleanEmail = email.toLowerCase();
if (!userMapStore.has(cleanEmail)) {
return res.status(403).send("email aready Found");
}

    if(!await bcrypt.compare(password,confirmPassword)) {
        console.log("incorrect password");
        return res.json("incorrect Password");
    }



    userMapStore.set({
      name: name,
      email: email,
      password: hashPassword,
      confirmPassword:hashPassword,
      businessName: businessName,
    });
    console.log("user supplier added succefully", userMapStore.get(email));
    return res.redirect("/");

} catch (error) {
console.log("error happened", error);
res.redirect("/role");
}

res.redirect("/profile/complete?role=supplier");
});
