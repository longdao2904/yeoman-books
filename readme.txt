MEAN Stack

NODE.JS
- Install Nodejs: http://nodejs.org/

MONGODB
- Install MongoDB: http://www.mongodb.org/downloads	
- Create directories for MongoDB with below structure
	"C:\WorkSpaces\dna.mvp\src_mean\mongoDBs"
	"C:\WorkSpaces\dna.mvp\src_mean\mongoDBs\data"
	"C:\WorkSpaces\dna.mvp\src_mean\mongoDBs\bin"
- Copy 'bin' folder in "C:\Program Files\MongoDB 2.6 Standard\" to "C:\WorkSpaces\dna.mvp\src_mean\mongoDBs"
- Install mongoDB to window server: Run cmd in "C:\WorkSpaces\dna.mvp\src_mean\mongoDBs" with
"C:\WorkSpaces\dna.mvp\src_mean\mongoDBs\bin\mongod.exe" --install --logpath "C:\WorkSpaces\dna.mvp\src_mean\mongoDBs\log.txt" --dbpath ""C:\WorkSpaces\dna.mvp\src_mean\mongoDBs\data"
- Start mongodb service: run cmd “net start mongodb”
- Check mongoDB service works: open http://localhost:27017/

YEOMAN, BOWER, GRUNT
- Install Yeoman, Bower and Grunt task runner: run cmd "npm install -g yo bower grunt-cli"

*Server
- Go to the root folder "Source\Server\MVP MEAN\Books Demo" and run cmd with below commands 
	+ "npm install" to get required node modules
	+ "bower install" to get required bower components
	+ "grunt serve" to build and start the app
- Populate DB with sample data on server start
  	+ To disable, edit server/config/environment/index.js, and set `seedDB: false`
  	+ Edit seed data in serve/config/seed.js	

