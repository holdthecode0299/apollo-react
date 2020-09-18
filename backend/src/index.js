const cookieParser = require('cookie-parser');
const jwt = require ('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// decode jwt to get user ID on each request 
server.express.use((req, res, next)=> {
  const {token} = req.cookies;
  if(token) {
    const {userId} = jwt.verify(token, process.env.APP_SECRET)
    // put user ID onto the request for further requests to access 
    req.userId = userId;
  }
  next();
})

// **** */ 2. Create middleware that populates the user on each request
server.express.use(async(req, res, next) => {
  if(!req.userId)  return next();
  const user = await db.query.user(
    {where: {id: req.userId} }, 
    '{id, permissions, email, name}'
    
    );
    req.user = user; 
    next();
})

// super server 
server.start({
    
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
      },

  
},   deets => {
    console.log(`Server is now running on port
     http:/localhost:${deets.port}`); 
})
