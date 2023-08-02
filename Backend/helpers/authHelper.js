

const bcrypt = require("bcryptjs")

const hashPassword = async(password)=>{
    try{
       const salt = 10;
       const hashedPassword = await bcrypt.hash(password,salt);
       return hashedPassword
    }
    catch(err){
   console.log("error")
    }
}

const comparePassword = async(password, hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}

module.exports ={hashPassword,comparePassword }