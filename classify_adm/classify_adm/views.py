__author__ = 'eoo'

from django.shortcuts import render
from django.http import HttpResponse,HttpRequest
import requests

# Create your views here.

def film(request):
	name = request.GET['name']
	result = get_rating(get_rating_id(name))
	return HttpResponse(result)
def get_rating_id(name):
	url = "http://api.kijkwijzer.nl/hackathon/suggest.php?term=" + name
	response = requests.get(url)
	status_code = response.status_code
	json_resp = response.json()
	if (json_resp == None):
		return None;

	id = json_resp[0]["value"]
	return str(id);
	#return json_resp + "<br\><br\><br\>"
def get_rating(id):
	if(id == None):
		return "Failure"
	url = "http://api.kijkwijzer.nl/hackathon/api.php?id="+id+"&output=json";
	response = requests.get(url)
	status_code = response.status_code
	json_resp = response.json()
	#rating = json_resp[0]["age-declaration"]["rating"]["age"]
	return json_resp["label"]["age-declaration"][0]["rating"]["age"];
