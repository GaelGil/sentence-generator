#TODO: make function to determine if code is running on localhost or server

import requests

# DOMAIN = "http://34.94.206.234"

DOMAIN = "http://127.0.0.1"

def send_request_to_server(sentence:str):
    upload = {"task": f"{sentence}"}

    session = requests.Session()
    response = session.post(f"{DOMAIN}:4000/todos", data=upload)

    return(response.text)


# def():
