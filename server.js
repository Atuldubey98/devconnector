const express = require("express")
const mongoose = require("mongoose")
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const bodyParser = require("body-parser")
const passport = require("passport")
const port = process.env.PORT || 9000
const app = express()
// DB config
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
const db = require("./config/keys").MONGO_URI

// Connect to mongofb

mongoose.connect(db,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log("DB Connected");
}).catch(err=>{
    console.log(err);
})

// Passport middleware
app.use(passport.initialize())
// Passport Config
// Use Routes

app.use("/api/users", users)
app.use("/api/posts", posts)
app.use("/api/profile", profile)


app.listen(port , ()=>{
    console.log(`Server is Listening on ${port}`);
})