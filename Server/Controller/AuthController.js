const userModel = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message:"User already exists", success:false});  
        }
        const UM = new userModel({name, email, password})
        UM.password =await bcrypt.hash(password, 10);

        await UM.save()
        res.status(201)
            .json({message:"Signup successfull",
                success: true
            })

    } catch (error) {
        res.status(500).json({ message: "Signup failed", success: false, error:error.message });
        
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const errmsg = "User doesn't exist or wrong pass"
    if (!user) {
      return res
        .status(403)
        .json({ message: errmsg , success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password)
    if(!isPassEqual){
        return res.status(403)
            .json({message:errmsg, success:false})

    }

    const jwtToken = jwt.sign(
        {email :user.email , _id:user._id},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )

    res.status(200).json({ 
        message: "Login successfull",
        success: true,
        jwtToken,
        email,
        name: user.name 
        });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Login failed", success: false, error: error.message });
  }
};


module.exports = {
    signup, login
}