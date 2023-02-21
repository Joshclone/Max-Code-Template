import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const createPost = async ( req, res ) =>
{ 
    try {
        const { userId, description } = req.body;

        const { filename } = req.file;

        const user = await User.findById( userId );
        
        const newPost = new Post( {
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            userPicturePath: user.picturePath,
            description,
            picturePath: filename,
            likes: {},
            comments: []
        } )
        
        await newPost.save();
 
        const posts = await Post.find()

        return res.status( 201 ).json( {
            success: true,
            message: "Post created successfully",
            data: {
                posts
            }
        });
    } catch (e) {
        return res.status(409).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }

export const getFeedPosts = async ( req, res ) =>
{ 
    try {
        const posts = await Post.find()

        return res.status( 200 ).json( {
            success: true,
            message: "Posts fetched successfully",
            data: {
                posts
            }
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }

export const getUserPosts = async ( req, res ) =>
{ 
    try
    {
        const { id } = req.params;

        const posts = await Post.find({ userId: id })
        
        return res.status( 200 ).json( {
            success: true,
            message: 'Post fetcheed successfully',
            data: {
                posts
            }
        } );
    } catch (e) {
        return res.status(409).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }

export const likePost = async ( req, res ) =>
{ 
    try {
        const { id } = req.params;

        const { userId } = req.body;

        const post = await Post.findById( id );

        const isLiked = post.likes.get( userId );

        if ( isLiked )
        {
            post.likes.delete(userId);
        } else
        {
            post.likes.set( userId, true );
        }

        const updatedPost = await Post.findByIdAndUpdate( id, {
            likes: post.likes
        }, { new: true } );
        
        return res.status( 200 ).json( {
            success: true,
            message: 'Post liked successfully',
            data: {
                post: updatedPost
            }
        } );
    } catch (e) {
        return res.status(409).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }

export const updatePost = async ( req, res ) =>
{ 
    try {
        
    } catch (e) {
        return res.status(409).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
    }
 }