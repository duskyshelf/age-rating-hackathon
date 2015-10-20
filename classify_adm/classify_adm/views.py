__author__ = 'eoo'

from django.shortcuts import render
from django.http import HttpResponse,HttpRequest
import requests
import json
from django.http import JsonResponse
import subprocess
# Create your views here.

def film_old_nojson(request):
    name = request.GET['name']
    result = get_rating(get_rating_id(name))
    return HttpResponse(result)
def film(request):
    response = HttpResponse("",
    content_type="application/json; charset=utf-8")

    name = request.GET['name']
    result = get_rating(get_rating_id(name))

    response.write("{\"age\" : \"" + str(result) + "\"}");
    return response;
def search(request):
	name = "Toy"
	req = "egrep -i "+name+" /tmp/troll"
	list_of_names = []
	resp_http = "";
	resp_json = '''
{
    "results": [
        {
            "name": "Toy Story",
            "countries": [
                {
                    "code": "gb",
                    "rating": "pg"
                },
                {
                    "code": "nl",
                    "rating": "pg"
                }
            ]
        }
    ]
}
'''
	with open("/tmp/troll") as fp:
		for line in fp:
			if line.startswith(name):
				list_of_names.append(line)

	return HttpResponse (list_of_names);

def film_2(request):
    name = request.GET['name']
    result = get_rating(get_rating_id(name))

    data = {}
    data['age'] = result
    json_data = json.dumps(data)

    return JsonResponse(json_data,safe=False)
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
