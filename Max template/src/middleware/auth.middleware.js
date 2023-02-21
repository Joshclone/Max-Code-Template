import jwt from "jsonwebtoken";

export const verifyToken = async ( req, res, next) =>
{
    try
    { 
        let token = req.header( "Authorization" );
        
        if ( !token ) return res.status( 401 ).json( { success: false, message: 'Unauthorized access', error_code: 401, data: {} } );
        
        if ( token.startsWith( "Bearer " ) )
        {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify( token, process.env.JWT_SECRET );

        if ( !verified ) return res.status( 401 ).json( { success: false, message: 'Unauthorized access', error_code: 401, data: {} } );
        
        req.user = verified;

        next();
     }
    catch ( e )
    { 
        return res.status(500).json({
            success: false,
            message: e.message,
            error_code: e.code,
            data: {}
        })
     }
 }