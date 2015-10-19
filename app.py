import requests
from xml.etree import ElementTree
from flask import Flask

#app = Flask(__name__)

#@app.route("/hi")
def hello():
	name = request.headers.get('film')
	return get_rating_id(name);

def get_rating_id(name):
	url = "http://api.kijkwijzer.nl/hackathon/suggest.php?term=" + name
	response = requests.get(url)
	status_code = response.status_code
	json_resp = response.json()
	id = json_resp[0]["value"]
	return str(id);
	#return json_resp + "<br\><br\><br\>"
def get_rating(id):
	url = "http://api.kijkwijzer.nl/hackathon/api.php?id="+id+"&output=json";
	response = requests.get(url)
	status_code = response.status_code
	json_resp = response.json()
	#rating = json_resp[0]["age-declaration"]["rating"]["age"]
	return json_resp["label"]["age-declaration"][0]["rating"]["age"];

if __name__ == "__main__":
    print (get_rating(get_rating_id("Kill Bill 2")))
    #app.run()