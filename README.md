# <H1> Project 6: Sprint 2: Application Database </H1>

---------------------------------------------------------------------------------------------------------------------------------

**Topic:** Trivia game website

**App Name:** Trivia Inferno

**Group 11:** Christopher Coetzer, Josh Eckard, Zeke Marshall, Will Poole , AJ Wild

---------------------------------------------------------------------------------------------------------------------------------

<H2> Tasks Completed: </H2>

<ins>**Task 1:**</ins>\
Original formatting work has been converted into an Express app in partially implemented MVC Architecture.
Basic question and answer API has been implemented into the current iteration of the project.
Basic (initial) question-and-answer functionality has been implemented alongside the ability to choose an initial set of categories. 

<ins>**Task 2:**</ins>\
We have created several types of issues and posted them for viewing and editing

<ins>**Task 3:**</ins>\
We are using EJS/HTML and CSS to build custom formatting for our project.

<ins>**Task 4:**</ins>\
We are using Express for our backend and have set up a MongoDB Atlas account to host our database
- The atlas DB is successfully linked to our application
- Users can now create an account and login to it.
  - The error page for invalid logins is currently bugged, we are working to fix this.
  - The validation is set up for user inputs within the email and password fields to prevent SQL injection based attacks.
- As of right now the user can login and logout
  - login and logout both use "sessions" to ensure proper login and logout capabilities
  - This requires further testing to ensure perfect functionality.
- As mentioned above sessions have been integrated within the application to track logged in users and ensure seemless cross
  site navigation as the project matures.

---------------------------------------------------------------------------------------------------------------------------------

## Future Tasks/ideas: 

- Find more APIs to use for questions and answers, data manipulation, etc.
- Integrate a map API for users to compete with other users in their local area.
- Implement a NoSQL Database (constructed and maintained by us) to store in-app information: (IN PROGRESS)
  - Users
  - Sessions
  - Specific user info
  - Quiz results
  - Question of the day responses
  - Streaks
- Develop a unified sitewide formatting build.(IN PROGRESS)

---------------------------------------------------------------------------------------------------------------------------------

# Team 11
## Scrum Master
Josh Eckard
## Product Owner
- AJ Wild
## Developer
- Christopher Coetzer
- Josh Eckard
- Zeke Marshall
- Will Poole
