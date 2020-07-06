import requests



def send_request_to_server(sentence:str):
    pload = {"task": f"{sentence}"}

    session = requests.Session()
    response = session.post("http://34.94.206.234:5000/todos", data=pload)

    return(response.text)
