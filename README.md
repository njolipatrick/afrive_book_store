
## Afrive Book Store API

  

## Introduction

  

Afrive is a web app that allows users to shop for books from various African authors across different genres. It also allows users write book reviews and make book recommendations. Everything a book lover needs in one platform.

  

## API Documentation

  

The documentation for the Afrive Book API can be found here [Afrive Book Store API Docs](https://documenter.getpostman.com/view/11537019/UzBmM7a1)

  

## Features

  
  

Based on API Endpoints requirement, the features covered for the endpoints are:

  
  **Authentication** 
| Feature |  Version | Endpoint |
| --- |---|---|
| Register|v1/| /auth|
|Login|v1/| /auth|
|Verify Email|v1/| /auth|
|Send Reset Password|v1/| /auth|
|Reset Password|v1/| /auth|
|Get Google URL|v1/| /auth|
|Login with Google |v1/| /auth| 


  **Books** 
| Feature |  Version | Endpoint |
| --- |---|---|
| Index|v1/| /auth|
|Show|v1/| /auth|
|Search By (Category, Title, Author)|v1/| /auth|
| Create [token required]|v1/| /auth|
|Delete [token required]|v1/| /auth|

  **Orders** 
| Feature |  Version | Endpoint |
| --- |---|---|
| Create Order by user (args: user id)[token required]|v1/| /auth|
|Get Orders by user (args: user id)[token required]|v1/| /auth|
| Verify Orders by user (args: user id)[token required]|v1/| /auth|
| Delete Orders by user (args: user id)[token required]|v1/| /auth|

  **Reviews** 
| Feature |  Version | Endpoint |
| --- |---|---|
|Get all Available Reviews|v1/| /auth|
|Create Review|v1/| /auth|
| Update Review|v1/| /auth|
| Get Reviews By Book ID|v1/| /auth|
|Get Review By User ID|v1|auth|

## Dependencies
To install Afrive Book Store API, you will need the following:
- Node
- PostgreSQL
- db-migrate
- Other dependencies required are listed in the package.json file. Use `npm install` on the command line
- Environment variables are defined in a .env file. You can find a .example.env file in the repository root to guide you on setting up your .env file.
## Installation 

The steps outline will provide a walkthrough on how to install the app on your local machine
- Clone this repository
- From the terminal, change directory to store_front_api app folder
- Ensure that you are on the **dev** branch. If on any other branch, run `git checkout dev` on the terminal.
- Create a new branch from the dev branch.
-  Copy .example.env to a new file .env 
`cp .example.env .env`
- Install node packages from the termial using this command
     ```npm install```

- Create a postgres database connection
```POSTGRES_HOST=```
```POSTGRES_DEV_DB=```
```POSTGRES_TEST_DB=```
```POSTGRES_USER=```
```POSTGRES_PASSWORD=```

## Usage

   | Command | Description|
   |---|---|
   |`npm start`|run the server in production mode|
   |`npm run dev`|run the server in dev mode|
   |`npm run lint`|style formatter|
   |`npm run build`|build typescipt files|   
   |`npm run dev`|run the test in test enviroment|
   |`npm run migrate`|run databse migration files|
   |`npm run reset`|clean out database and restart the app|
   |`npm run dev`|run test files in dev enviroment|
   |`npm run test-down`|drop database|
   |`npm run dev`|run the server in dev mood|
   

The app link for the hosted app on heroku is "http://afrive-book-store.herokuapp.com/".

  

## Limitations

  

- Currently, authenticated users can only buy a books but cannot create books.

- Users make order and can stop or adandon order.

- Real-time in-app notification for message posted to a group was not handled.

  
  

## How to contribute

  Contributions are welcome and appreciated
- Clone the repository
	- Open a terminal and execute the following command to make a local copy 
		 `git clone https://github.com/ogmaro/afrive_book_store.git`

- Run `cd Afrive_Book_Store` to navigate into the folder

- Create a new branch with the action_abbriveration-contribution_name
	e.g. `ft-google-auth`
	
- Make your contributions to your newly created branch.

- When done, ensure to test your code.

- Commit and push you code to github.

- If you feel you've made a contribution that will improve the project, raise a Pull Request against develop branch.  

Pull Requests should:

  

- Contain code written in ES6 for Javascript files.

- Lint and adhere to the [Airbnb javascript style guide](https://github.com/airbnb/javascript).

- Ensure test cases are written for the feature being developed

  

## License

  

This project is available for use and modification under the ISC License. See the LICENSE file for more details.

  

## Contributor

  

- Njoli Patrick