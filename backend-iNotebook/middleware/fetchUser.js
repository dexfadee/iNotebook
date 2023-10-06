const jwt = require('jsonwebtoken');

const JWT_SECRET = 'shhhhh';

const fetchUsers = (req, res, next)=>{

    // Get the user from the JWT token and append ID to req object
    const token = req.header('token');

    // Checking if token is present
    if(!token){
        res.status(401).send({error: 'Please authenticate using a valid token'})
    }

    try {
        
        // Getting user data after verifying token
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error: 'Please authenticate using a valid token'})
    }

}

module.exports = fetchUsers;