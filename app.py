from flask import Flask, render_template
from forms import BookForm, Make_Sentece_Form
# from app import create_book, generate_sentence
from markov_function import TextCreator as tc
app = Flask(__name__)

app.config['SECRET_KEY'] = '42f49c1690ad3348fa5212382e379685'

@app.route('/', methods=['GET', 'POST'])
def home():
    phrase = None
    sentence = None
    form = BookForm()
    if form.validate_on_submit():
       phrase = form.book.data
       MarkovChain = tc(form.book.data)
       sentence = MarkovChain.generate_text(output_length=20)
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