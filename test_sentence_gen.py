import pytest

from app import clean_data, create_dict, create_sentence

def test_clean_book_tokens():
    input_1 = ['The', 'man', 'died.', 'It', 'was', 'sad.', 'Boohoo.']
    output_1 = ['the', 'man', 'died', 'it', 'was', 'sad', 'boohoo']

    assert clean_book_tokens(input_1) == output_1


def test_dictionary_was_made():
    input_value = ['The', 'man', 'died.', 'It', 'was', 'sad.', 'Boohoo.']
    tokens, tokens_index = clean_data(input_value)
    assert create_dict(tokens, tokens_index) != None

def test_sentence_was_made():
    test_dict = {'and': ['more'], 'direction': ['implies'], 'implies': ['dimension', 'direction', 'measurement'], 'less': ['the'], 'measurement': ['implies'], 'the': ['implies', 'and'], 'dimension': [''], 'more': ['the']}
    assert len(create_sentence(test_dict)) == 9