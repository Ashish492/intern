import passport from "passport"
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt"
import CustomError from "../Error/CustomError"
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
}
passport.use(
  new Strategy(options, (payload, done) => {
    if (payload.username === "admin") {
      return done(null, { username: "admin" })
    }
    return done(new CustomError("forbidden", 401), false)
  })
)

export function initializePassport() {
  return passport.initialize
}
export function Auth() {
  passport.authenticate("jwt", { session: false })
}
export default passport
