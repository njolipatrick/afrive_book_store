# Afrive_Project


https://devcenter.heroku.com/articles/getting-started-with-python#set-up

- git add .
- git commit -m "heroku deployment"

- heroku login
- heroku create afrive-book-recommender

- heroku git:remote -a afrive-book-recommender
- git push heroku master

- *heroku logs --tail
- *heroku apps:destroy
