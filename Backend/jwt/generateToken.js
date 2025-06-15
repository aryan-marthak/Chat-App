import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie = (userId, res) => {
    try {
        console.log('Generating token for userId:', userId);
        console.log('JWT_SECRET exists:', !!process.env.JWT_TOKEN);
        
        const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
            expiresIn: '10d',
        });
        
        console.log('Token generated successfully');
        
        // Set cookie with more permissive options for development
        res.cookie("jwt", token, {
            httpOnly: false, // Allow JavaScript access for development
            secure: false,   // Allow non-HTTPS for development
            sameSite: 'lax', // More permissive for development
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            path: '/'
        });
        
        console.log('Cookie set successfully');
        return token;
    } catch (error) {
        console.error('Error in token generation:', error);
        throw error;
    }
};

export default createTokenAndSaveCookie;