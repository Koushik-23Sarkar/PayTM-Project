// backend/routes/user.js
// in this JS file, i basiclly handle the '/signup' , '/signin' ,
// '/' (pust request for updating the User information) , '/bulk' (this will take perameters which helps you to find users)



//url/api/vi/user/signup
//url/api/vi/user/signin
//url/api/vi/user/ (put)
//url/api/vi/user/bluk?<perameters>


const express = require('express');
const router = express.Router();

const zod = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const {User} = require('../db');
const {authMiddleware} = require('../middleware')
const { Account } = require('../db');

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
});

router.post("/signup", async (req,res)=>{
    //------------------------------------
    
    //-------------------------------------
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const  existingUser = await User.findOne({
        username: req.body.username
    });

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    });
    //console.log(user);
    const userId = user._id;

		/// ----- Create new account ------

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })
    
            /// -----  ------
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token,
    });

});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

router.post("/signin", async (req , res)=>{
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        return req.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    //console.log(req.body.username);
   // console.log(req.body);
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });


    if(user){
       // console.log(user);
        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET);

        res.json({
            token: token
        });

        return;
    }


    res.json({
        message: "Incorrect inputs"
    });
})

//Upating user information//
const updateBody = zod.object({
    password:zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
});

router.put("/",authMiddleware, async (req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.json({
            message: "Error while updating information"
        })
    }

    User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully"
    })
})


//Search users

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;