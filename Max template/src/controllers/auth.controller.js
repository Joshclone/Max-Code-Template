import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

/* Register User */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, friends, location, occupation } = req.body 

        const { filename } = req.file;
        
        const user = await User.findOne( { email } )
        
        if ( user ) { return res.status(400).json({ success: false, message: "User record already exists", error_code: 400, data: {}}) }

        const salt = await bcrypt.genSalt(12)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            picturePath: filename,
            password: hashedPassword,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })

        const savedUser = await newUser.save()

        return res
            .status(201)
            .json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: savedUser
                }
            })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
}

/* Log User In */

export const login = async ( req, res ) =>
{ 
    try {
        const { email, password } = req.body;

        const user = await User.findOne( { email } );
        
        if ( !user ) { return res.status( 404 ).json( { success: false, error_code: 404, message: 'User not found', data: {} } ); }
        
        const isMatch = await bcrypt.compare( password, user.password );

        if ( !isMatch ) { return res.status( 400 ).json( { success: false, error_code: 400, message: 'Invalid email or password', data: {} } ); }
        
        const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picturePath: user.picturePath,
        }

        const token = jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: '1h' } );

        return res.status( 200 ).json( {
            success: true,
            message: 'User logged in successfully',
            data: {
                user: {
                    ...payload,
                    friends: user.friends,
                    occupation: user.occupation,
                    impressions: user.impressions,
                    location: user.location,
                    viewedProfile: user.viewedProfile
                }
            },
            authorization: {
                type: 'Bearer',
                token
            }
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }