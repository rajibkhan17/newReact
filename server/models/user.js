const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        maxlength : [30, 'Product name cannot axceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter product email'],
        unique: true,
        validator: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter product password'],
        minlength: [6, 'Your Password must be longer than 6 characters'], 
        select: false
    }, 
   
    createAt: {
        type: Date,
        default: Date.now()
    },
    
})


//Entrypting password before saving 
userSchema.pre('save', async function (next){
    if(!this.isDirectModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Return JWT token 
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, 'skdfjlsdjf', {expiresIn: 7 * 24 * 60 * 60})
}

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}



module.exports = mongoose.model('User', userSchema)