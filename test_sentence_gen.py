import pytest

from app import clean_book_tokens

def test_clean_book_tokens():
    input_1 = ['The', 'man', 'died.', 'It', 'was', 'sad.', 'Boohoo.']
    output_1 = ['the', 'man', 'died', 'it', 'was', 'sad', 'boohoo']

    assert clean_book_tokens(input_1) == output_1