# sentence-generator


## What This Does
In this project I created a webapp using flask that you can go to at [project](https://github.com/GaelGil/markov-app).
In this website you can input some text into a form that will then generate a sentence from that text. It does this by createing a markov chain with the text. If you dont know what a markov chain is you can go to my [website](https://gaelgil.github.io/my_markov_chain/) where I go over a basic markov chain. But in its simplest form it creates a dictionary with probabolities. These probabilities can be used to predict what words come after each ohter. With this we can createa sentence. Down below will be a visual to even further understand. 

![image of markov chain](./chain.png)
The image of above is a markov chain a visual of a very simple markov chain. As you can see Point E is more likely to go to Point A, but Point A is just slightly more likely to go back to it’s self. A real life example of this is the weather. Using a markov chain you can predict what the weather will be given the weather before. If we create a visual representation for the weather a simple visual would look like this.


## Try it out
If you want to try this out locally you can clone the repo. You will need to install some requirements. To do so you can start a virtual enviornment with `python3 -m venv env`. Once your virtual enviornment has been created you can activate it with `source ./env/bin/activate`. Now we can install the requirements with `pip install -r reuqirements.txt`. Because Im using flask for this project to start the project we will need to run `export FLASK_APP=app.py` and lastly `flask run`


## Things to note
Ideally the model should be seperate from the front end/backend. The website should just call my model to do something and the model server returns what has been created. I was able to do this by using google cloud platform for my model server and heroku for frontend. I needed the free gcp credits for a larger project so for now the model doesn't have a seperate server. Therefore `api.py` is not being used.