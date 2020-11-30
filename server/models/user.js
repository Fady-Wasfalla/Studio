const mongoose= require ('mongoose')
const Schema= mongoose.Schema

const usersSchema = new Schema( {

    userName: {
        type: String
    },
    password:{
        type: String
    }
})
module.exports= userSchema=mongoose.model('usersSchema',usersSchema)