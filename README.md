## Nodejs-Authentication-JWT
Assign guard(Token Verification) with Jwt and Express.
For running current Nodejs app should install "@hapi/joi": "^15.0.3" which is more compatible version here. 
Before downloading the files and folders make sure making directory(with proper name) first then copy all the files and folders right there.
In the current directory npm install list of modules and dependencies below:
# npm install express
# npm install --save @hapi/joi@15.0.3
# npm install bcryptjs
# npm install dotenv
# npm install mongoose
# npm install jsonwebtoken
# npm install nodemon

## Install Postman which is a software development tool. It enables people to test calls to APIs. <a href="https://www.postman.com/downloads/" target="_blank">Click</a> here to download latest version.

After all edit package.json file then in "scripts" attribut change the value then save the file, like this below:  
"scripts": {
    "start": "nodemon index.js"
  },
  
After install dotenv create a file with ".env" then write below codes(then save it):                                                
//Connection link to MongoDB                                        
DB_CONNECT = mongodb+srv://<username>:<password>@p1.4jm6a.mongodb.net/p1?retryWrites=true&w=majority            
//JWT-Token randome secret string                                                           
APP_TOKEN_CONFIG = BasilSecret
