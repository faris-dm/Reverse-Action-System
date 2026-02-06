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
 give acces/shore lived , used  for idenitifying user type   also have exp date  user and give aotrazation

### Refresh Token 7 DAYS

long live sestion
 give a long term acces after login and it asks a acess token if the token exxpredate  and it allow  user session to reminas valid accross dlf pages

header =type and signining algo=HS256/type:jwt

payload:sub identifer
        iat time for token isued
        :expiration

     this is the data  you carry


signature:make them intigrate

### secret keys
 signing key  never be visable in the code  you should use envt varables



### PROCES
  1:USER LOGIN
   login using  there  info
 after the login  the server create acces and refresh token
   access token go to the browser heading
   refresh go to cookies


   2:  the user user access token o login and attch it to header  then  the se rver validate  the segnture and validate

3: after that the access token expdat and it need new access tokens
4: then the user request new  acccess  tokens

4: then the server validate the refresh token is valid if not login again

5: if it is valid  then the refresh token give new access tokens
 and it create new to refresh tokens and old tokens get expired 

 6: the server recives the new accces tokens and refresh tokens

 ## token refresh security 


 ### const authHeader = req.headers['authorization'];
   this line go to the header , are the metadata and the standard is the jet stored in the header auth


   our server  does not need to rember every one who logied in threy just need to verifay  the token which sent by the user and auth it

   