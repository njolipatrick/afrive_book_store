# Afrive Book Store API

## Introduction

Afrive is a web app that allows users to shop for books from various African authors across different genres. It also allows users write book reviews and make book recommendations. Everything a book lover needs in one platform.

## API Documentation

The documentation for the Pstit API can be found here [Afrive Book Store API Docs](https://documenter.getpostman.com/view/11537019/UzBmM7a1)

## Features

Based on API Endpoints requirement, the features covered for the endpoints are:

Books

- Index
- Show
- Search By (Category, Title, Author)
- Create [token required]
- Delete [token required]

Authentication

- Register
- Login
- Verify Email
- Send reset Password
- Reset Password
- Get Google URL
- Login with Google endpoint

Orders

- Create Order by user (args: user id)[token required]
- Get Orders by user (args: user id)[token required]
- Verify Orders by user (args: user id)[token required]
- Delete Orders by user (args: user id)[token required]

Reviews

- Create Review
- Update Review
- Get all Available Reviews
- Get Reviews By Book ID
- Get Review By User ID

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
- Ensure that you are on the **develop** branch. If on any other branch, run `git checkout develop` on the terminal.
- Run `npm install` from your terminal in your project directory to install all dependencies
- Then run the app with the command `npm start`

## Usage

To test out the endpoints, follow the following steps

- Once all dependencies have beeen installed, run `npm start` on your terminal to test the endpoints
  The app link for the hosted app on heroku is "http://afrive-book-store.herokuapp.com/".

## Limitations

- Currently, authenticated users can only buy a books but cannot create books.
- Users make order and can stop or adandon order.
- Real-time in-app notification for message posted to a group was not handled.


## How to contribute

Contributions are welcome and appreciated

- Fork this repository
- Open a terminal and execute the following command to make a local copy $ `git clone git@github.com:ogmaro/Afrive_Book_Store.git`
- Run `cd Afrive_Book_Store` to navigate into the folder
- Make your contributions to your local repo
- Add a connection to the original repo using $ `git remote add repo_nickname git@github.com:ogmaro/Afrive_Book_Store.gitt`. Note: repo_nickname is a nickname you choose
- Run git $ `remote -v` to verify that the connection is established
- Make your contributions to your local copy of the project
- Run $ `git add filename`, `git commit -m "commit message"` to add and commit your contributions
- Run $ `git push origin proposed-feature-name` to push your changes to your copy of the repository
- If you feel you've made a contribution that will improve the project, raise a Pull Request against develop branch.
- Be descriptive enough about your contributions so other contributors will understand what you've done

Pull Requests should:

- Contain code written in ES6 for Javascript files.
- Lint and adhere to the [Airbnb javascript style guide](https://github.com/airbnb/javascript).
- Ensure test cases are written for the feature being developed

## License

This project is available for use and modification under the ISC License. See the LICENSE file for more details.

## Contributor

- Njoli Patrick
