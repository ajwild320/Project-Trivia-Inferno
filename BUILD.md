---------------------------------------------------------------------------------------------------------------------------------

## To Run The Current build using the Git Bash command line application!

1. install NodeJS (if you do not already have it installed)

2. Type <code>npm i</code> command to install the necessary dependencies for the project within your terminal

3. Type <code>npm i nodemon</code> to install nodemon (this allows you to run the program on your local port via Google Chrome)

4. At the current stage of the project, you will need an environment variable to access the DB which will then allow the application to deploy
   to localhost:3000. I am creating a read/write capable link for non developer users to keep the application functional as i work to implement the
   necessary security measures to allow users acces the the DB and site as a whole.

   first you must create an environment file <code>.env</code> in the main folder where app.js is located then copy/paste the contents of the .env.example into it.

   then you must copy/paste the link below to the right of the equals sign here <code>MONGODB_URI=</code>

   The link is below:
   <code>mongodb+srv://GeneralUser:wFk1cP9Bkwl3EZ3T@infernocluster.98mysiq.mongodb.net/?retryWrites=true&w=majority</code>

   You will need to copy/paste the above link EXACTLY AS IS in order to access the db and boot the application for the time being
   ---NOTE: this will eventually be updated out as project development continues!

5. Type <code>nodemon app.js</code> this will run the program on your local port 

6. Go to Google Chrome and enter http://localhost:3000/

<H4> If any of these instructions do not work for you, please leave a comment and they will be updated as soon as possible! </H4>
<H4> If the database link provided fails for any reason, please report this to us immediately!

---------------------------------------------------------------------------------------------------------------------------------