##### passport

a flexable auth middleware for node and purpose is to handle auth

### it give a method to authticate users based on some stratagies

#### STARTAGIES OFPASSPORT

this are modules that tell the passport how to authticate the use using the stargries

### passport

    passport  is  a middleware  that allow user to use passport strtagies to authticate the login and password and help us to integrate google and facebook signup features

##### passport uniquicity

    it is mach easier to authticate and integrate this  google and facebook signup with passport instead of writing ny our hand/costume authticatetion

    usage  two route one desplaying the route using get and one to authticate and send data from the signup using post

### Importance of passport.authenticate() function

a function used by passport that check the user has an account and logied in before going to the index page

#### Check whather the user is loged in or Not

to check that we check if the req.session.user is set then we used this sesion as a middleware and auth
so it the use is authticated it go to next() function or redirect to login

###### How serializeUser() and deserializeUser() actually works

we gete the email we sent and we get the email id andstore it in req.session.passport to trck things

#### express-session

when you log to the bewsite and login the website forget you after that so we created a session or id to all the user, and if you have the id you can open the door with out telling who you are

#### Passport/Local

Passport is the big manager
and Local is the gard
take email and password and check if it exit in the store and check match up

### Express-Flash

it used for showing error message if the input does not ma match
so to send message

#### passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

we are telling the passport to use our local methods means database to verify the auth

## usernameField: "email" },

## by defalut passport udes username to auth so we say forget the username: and make see the email

### he Activity Flow (The "Wake Up" Moment)

When a POST request hits your /login route:

Passport wakes up and sees the LocalStrategy.

It goes into req.body and pulls out the email (because of the usernameField setting) and the password.

It then calls your authenticateUser function and passes those two values into it as the first two parameters.

It also creates the done callback and hands it to you as the third parameter.

#### passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser))

## Localstartgy takes two aregements

1:where to look
2:verify callback so ehat answer

the reason we used the ({
is to map the names in the form and get the needed info
})

### Wristband bage card
