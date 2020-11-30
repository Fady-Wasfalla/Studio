const userModel = require("../models/user")
const basicTypeModel = require("../models/basicTypes")
const backup = require('mongodb-backup');
const restore = require('mongodb-restore');
const Vimeo = require('vimeo').Vimeo;
 

let userControllers = {

try : async (req, res)=>{
  try{
    const id = req.params.id
    const users = await userModel.find()
    return res.json({ userId:id, msg: 'OFF a77',users })
  }
  catch (error) {
        console.log(error)
       }
},
backupMethod : async (req,res) =>{
  backup({
    uri: 'mongodb://localhost:27017/Studio',
    root:'/home/fady/Documents/Working/backup',
    collections: [ 'usersschemas' ],
    callback: function(err) {

      if (err) {
        console.error(err);
      } else {
        console.log('finish');
      }
    },
    
  });
  return res.json({ msg: 'Backup done' })
},
restoreMethod : async (req,res) =>{
  restore({
    uri: 'mongodb://localhost:27017/Studio',
    root:'/home/fady/Documents/Working/backup'
  });
  return res.json({ msg: 'Restore backup done' })
},
deleteUser : async (req,res) =>{
  try{
    const {userName } = req.body
    const user = await userModel.deleteOne({userName})
    return res.json({ msg: 'user is deleted' , user:user})
  }
  catch(error){
    console.log(error)
  }
},
videoTry : async (req,res) =>{
  let client = new Vimeo("3189f6a8066dc6f4cc565902e83342096f83f6f3", "0oVSoIlB13Waef2mEnl6aJ4P1HWdpCosv+dVJo8ubzrd6ECRqbRAew5qY6ZXDa3eDpxnJoImR9cJ9KjqebJHJ3Oa4obnr5Hf5JMfoM8+GwXFHgpCP6lZUtN0VH++yzTP",
   "2b26733dc1e151f37115f13504ce53af");
   let file_name = "{path_to_a_video_on_the_file_system}"
   client.upload(
     file_name,
     {
       'name': 'Untitled',
       'description': 'The description goes here.'
     },
     function (uri) {
       console.log('Your video URI is: ' + uri);
     },
     function (bytes_uploaded, bytes_total) {
       var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
       console.log(bytes_uploaded, bytes_total, percentage + '%')
     },
     function (error) {
       console.log('Failed because: ' + error)
     }
   )
},
register : async (req,res) => {
  try{
    const {userName , password } = req.body
    const newUser = await userModel.create({
      userName , password 
    })
    return res.json({ msg: 'new user is registered' , user:newUser})
  }
  catch(error){
    console.log(error)
  }
},
addNewBasicType : async (req,res) =>{
  try{
    const {type , price } = req.body
    const oldType = await basicTypeModel.findOne({type})
    if (oldType){
        return res.json({msg:"أنت تحاول إضافة نوع موجود"})
    }
    const newType = await basicTypeModel.create({
      type,price
    })
    return res.json({msg:"تم إضافة نوع جديد",data:newType})
  }
  catch(error){
    console.log(error)
  }
},
getBasicTypes : async (req,res) =>{
  try{
    const basicTypes = await basicTypeModel.find().sort({type:"asc"})
    return res.json({data:basicTypes})
  }catch(e){
    console.log(e)
  }
},
editBasicTypes : async (req,res)=>{
  try{
    const {id,type,price} = req.body
    const ed = await basicTypeModel.findOneAndUpdate({"_id":id},{"type":type,"price":price})
    if (ed){
      return res.json({msg:"تم التحديث بنجاح"})
    }
    return res.json({msg:"هناك مشكلة في التحديث تواصل مع قسم ال IT"})
  }catch(e){
    console.log(e)
  }
},
deleteBasicTypes : async (req,res)=>{
  try{
    const {id} = req.body
    const ed = await basicTypeModel.findByIdAndDelete({"_id":id})
    if (ed){
      return res.json({msg:"تم المسح ينجاح"})
    }
    return res.json({msg:"هناك مشكلة في التحديث تواصل مع قسم ال IT"})
  }catch(e){
    console.log(e)
  }
}
}

module.exports = userControllers