from flask import Flask, render_template, flash, redirect,  url_for
from forms import BookForm, Make_Sentece_Form
# from app import create_book, generate_sentence
app = Flask(__name__)

app.config['SECRET_KEY'] = '42f49c1690ad3348fa5212382e379685'

# @app.route('/')
@app.route('/', methods=['GET', 'POST'])
def home():
    phrase = None
    form = BookForm()
    if form.validate_on_submit():
       phrase = form.book.data
    return render_template('home.html', form=form, phrase=phrase)


# @app.route('/generate', methods=['GET', 'POST'])
# def generate():
#     form = Make_Sentece_Form()
#     if form.validate_on_submit():
#         phrase = generate_sentence()
#     return render_template('home.html', form=form, phrase=phrase)

# @app.route('/', methods=['GET', 'POST'])
# def index():
#     """
#     This is the website's main route. Only one route needs to be defined for this application.
#     """
#     phrase = None
#     language = None
#     form = LanguageForm()
#     if form.validate_on_submit():
#         phrase = form.language.data
#         language = identify(form.language.data)
#         form.language.data = ''
#     return render_template('index.html', form=form, phrase=phrase, language=language)


if __name__ == '__main__':
    app.run(debug=True)