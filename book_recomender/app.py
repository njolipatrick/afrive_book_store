#using flask to deploy to pipeline
from flask import Flask, request, jsonify
import requests
import pandas as pd
import pickle
import psycopg2
from dotenv import dotenv_values
# from flask_sqlalchemy import SQLAlchemy

# --------------------------------------------------------------
# # useful for connecting directly to a local db
# --------------------------------------------------------------

# dotenv_path = r"..\.env"
# DATABASE_URL = dotenv_values(dotenv_path).get('DATABASE_URL')
# conn = psycopg2.connect(DATABASE_URL, sslmode='require')

app = Flask(__name__)
# --------------------------------------------------------------
# # useful for connecting to a local db when models are defined in the app
# --------------------------------------------------------------

# app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL#'postgres://postgres:abc@localhost:5432/example'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# --------------------------------------------------------------
# load the model, where model = pickle model
# --------------------------------------------------------------
model = pickle.load(open('correlation.pkl','rb'))

@app.route("/")
@app.route("/api/v1/index")
def home():
        """ Home View """
        # --------------------------------------------------------------
        # Open a cursor to perform database operations
        # --------------------------------------------------------------
        # query = "SELECT * FROM books ORDER BY id DESC LIMIT 20;"#"SELECT * FROM users;"
        # with conn.cursor() as cur:
        #     data = cur.execute(query)
        # conn.commit()
        # conn.close()
        return jsonify(
                {
                    "message":"Hello, Welcome Afriver!",
                }
            )

@app.route('/api/v1/predict', methods=['GET', 'POST'])
def predict():
    data = requests.get("https://afrive-book-store.herokuapp.com/api/v1/book").json().get("data")
    df = pd.DataFrame(data)
    i=df.index[15]
    product_names = list(df.index)
    product_ID = product_names.index(i)
    correlation_product_ID = model[product_ID]
    # Recommend = list(df.index[correlation_product_ID > 0.020])
    Recommend = list(df.reset_index().index[correlation_product_ID[:20] != 0])
    Recommend.remove(i) 
    print('Books you may also like')
    Recommend[0:10]
    # pred= recommendation.results(request.args.get( 'Book_Title'))
    # pred= df.reset_index().iloc[Recommend[0:20]].title.values
    pred = df.reset_index().iloc[Recommend[0:20]]

    return jsonify(
        {
            #"prediction": pred.tolist(),
            "success": True,
            "prediction": pred.to_dict(orient='records')
        }
    )
    

if __name__=="__main__":
    #debug=False for production use 
    app.run(debug=True, host='0.0.0.0', port=9001)