from flask import Flask, render_template, flash, redirect,  url_for
from forms import BookForm, Make_Sentece_Form
from app import make_sentence, generate_sentence
import os
app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

@app.route('/', methods=['GET', 'POST'])
def home():
    """
    This is the main route of the website
    the phrase is the input from the user 
    and the sentence is the generated sentence
    we get back
    """
    phrase = None
    sentence = None
    form = BookForm()
    if form.validate_on_submit():
       phrase = form.book.data
       sentence = make_sentence(form.book.data)
       form.book.data = ''
    return render_template('home.html', form=form, phrase=phrase, sentence=sentence)


@app.route('/generate', methods=['GET', 'POST'])
def generate():
    basic_sentence = None
    form = Make_Sentece_Form()
    if form.validate_on_submit():
        basic_sentence = generate_sentence()
    return render_template('generate.html', form=form, basic_sentence=basic_sentence)





if __name__ == '__main__':
    app.run(debug=True)