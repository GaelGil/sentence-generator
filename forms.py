from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length


class BookForm(FlaskForm):
    book = StringField('Text', validators=[DataRequired(), Length(min=100)])
    submit = SubmitField('Submit')


class Make_Sentece_Form(FlaskForm):
    submit = SubmitField('Enter')
