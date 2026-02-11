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

app.post("/token", (req, res) => {
let RefreshTokens = req.body.token;
if (!RefreshTokens) {
return res.send("refresh token is missing");
}
if (!refreshStore.includes(RefreshTokens)) {
return res.status(403).send("invalid Tokens");
}
jwt.verify(RefreshTokens, RefreshTokenSecret, (err, user) => {
if (err) return res.status(403).send("error found");
// let accessTokens=generateAccess({username:user.username})
let payload = { username: user.username };
let accessTokens = generateAccess(payload);
res.json({ accessTokens: accessTokens });
});
});
