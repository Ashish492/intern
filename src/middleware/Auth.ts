import passport from "passport"
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt"
import CustomError from "../Error/CustomError"
import dotenv from "dotenv"
dotenv.config()
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
}
passport.use(
  new Strategy(options, (payload, done) => {
    if (payload.username === process.env.ADMIN_USERNAME) {
      return done(null, { username: process.env.ADMIN_USERNAME })
    }
    return done(new CustomError("forbidden", 401), false)
  })
)
export function initializePassport() {
  return passport.initialize()
}
export function auth() {
  return passport.authenticate("jwt", { session: false })
}
export default passport
