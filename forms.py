from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired

class BookForm(FlaskForm):
    book = StringField('Book', validators=[DataRequired()])
    submit = SubmitField('Submit')

class Make_Sentece_Form(FlaskForm):
    submit = SubmitField('Enter')