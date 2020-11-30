const mongoose= require ('mongoose')
const Schema= mongoose.Schema

const typesSchema = new Schema( {

    type: {
        type: String
    },
    price:{
        type: Number
    },
})
module.exports= typeSchema=mongoose.model('typeSchema',typesSchema)