import User from "../models/user.model.js"

export const getUser = async ( req, res ) =>
{ 
    try {
        const { id } = req.params
        
        const user = await User.findById( id );

        if ( !user ) return res.status( 404 ).json( {
            success: false,
            message: 'User not found',
            error_code: 404,
            data: {}
        } );

        return res.status( 200 ).json( {
            success: false,
            message: 'User successfully retrieved',
            data: {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    occupation: user.occupation,
                    email: user.email,
                    location: user.location,
                    picturePath: user.picturePath,
                    impressions: user.impressions,
                    viewProfile: user.viewProfile
                }
            }
        })
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }

export const getUserFriends = async ( req, res ) =>
{ 
    try {
        const { id } = req.params
        
        const user = await User.findById( id );

        const friends = await Promise.all( user.friends.map( async( id ) => await User.findById( id ) )
        );

        const formatted = friends.map(
            ( {
                _id, firstName, lastName, occupation, location, picturePath
            } ) =>
            {
                return {
                    id: _id, firstName, lastName, occupation, location, picturePath
                } 
            });
        
        return res.status( 200 ).json( {
            success: true,
            message: 'Friends successfully retrieved',
            data: {
                friends: formatted
            }
        } );
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }

export const addRemoveFriend = async ( req, res ) =>
{ 
    try {
        const { id, friendId } = req.params;
        
        const user = await User.findById( id );
        
        const friend = await User.findById( friendId );

        if ( user.friends.includes( friendId ) )
        {
            user.friends = user.friends.filter( id => id !== friendId );
            friend.friends = friend.friends.filter( id => id!== id );
        } else
        {
            user.friends.push( friendId );
            friend.friends.push( id );
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all( user.friends.map( async ( id ) => await User.findById( id ) )
        );

        const formatted = friends.map(
            ( {
                _id, firstName, lastName, occupation, location, picturePath
            } ) =>
            {
                return {
                    id: _id, firstName, lastName, occupation, location, picturePath
                } 
            });
        
        return res.status( 200 ).json( {
            success: true,
            message: 'Friend successfully added or removed',
            data: {
                friends: formatted
            }
        } );
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }