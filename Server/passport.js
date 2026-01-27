// const { use } = require("passport");

let LocalStrategy = require("passport-local").Strategy;
let bcrypt = require("bcrypt");

function authticationIntilazation(passport, getUserEmail, getUserId) {
  async function authicateUser(email, password, done) {
    let user = getUserEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user Foundwith this email" });
    } else {
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  }

  passport.use(new LocalStrategy({ usernameField: "email" }, authicateUser));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserId(id));
  });
}

module.exports = authticationIntilazation;
