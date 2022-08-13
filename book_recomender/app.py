#using flask to deploy to pipeline
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import pickle
from config import config

app = Flask(__name__)

app.config.from_object(config.get('APP_SETTINGS'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)



# load the model, where model = pickle model

model = pickle.load(open('correlation.pkl','rb'))

@app.route("/")
@app.route("/api/v1/index")
def home():
        """ Home View """

        return (jsonify(message="Hello, Welcome Afriver!"))

@app.route('/api/v1/predict', methods=['GET', 'POST'])
def predict():


    i=df.index[40]
    product_names = list(df.index)
    product_ID = product_names.index(i)
    product_ID
    correlation_product_ID = model[product_ID]
    correlation_product_ID.shape
    Recommend = list(df.index[correlation_product_ID > 0.020])
    Recommend.remove(i) 
    print('Books you may also like')
    Recommend[0:20]
    # pred= recommendation.results(request.args.get( 'Book_Title'))
    pred= df.iloc[Recommend[0:20]].Book_Title.values
    # pred = Recommend[0:20]


    return(jsonify(prediction=pred))
    

if __name__=="__main__":
    #debug=False for production use 
    app.run(debug=True, host='0.0.0.0', port=9001)