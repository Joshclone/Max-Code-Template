import { users, posts } from "./data/index.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

const seedTables = async () =>
{
    /* Insert this data only once */
    const dbUsers = await User.find()
    const dbPosts = await Post.find()

    if ( dbUsers.length === 0 && dbPosts.length === 0 )
    {
        await User.insertMany( users );
        await Post.insertMany( posts );
    }
}

export default seedTables;