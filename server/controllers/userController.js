const User = require('../models/user')

//Register a user => /api/register
exports.registerUser =  async (req, res) =>{


    const {name, email, password} = req.body

    console.log(name)

    const user = await User.create({
        name, 
        email,
        password, 
        
    })

    console.log(user)

    const token = user.getJwtToken()

    res.status(201).json({
        success: true, 
        token
    })

}

//Login user => /api/login
exports.loginUser = async (req, res, next) => {
    const {email, password} = req.body

    //Check if email and password is entered by user 
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password!', 404))

    }

    //Find user in database
    const user = await User.findOne({email}).select('+password')

    if(!user) {
        return next(new ErrorHandler('Invalied email or password', 401)) // 401 = un authenticated user
    }

    //Check if password matched or not 
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalied or password', 401))
    }

    sendToken(user, 200, res)
} 