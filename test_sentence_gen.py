import pytest

from app import clean_data, create_dict, create_sentence



def test_clean_data():
    input_value = "1:2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.  1:3 And God said, Let there be light: and there was light.  "

    output_1 = ['and', 'the', 'earth', 'was', 'without', 'form', 'and', 'void', 'and', 'darkness', 'was', 'upon', 'the', 'face', 'of', 'the', 'deep', 'and', 'the', 'spirit', 'of', 'god', 'moved', 'upon', 'the', 'face', 'of', 'the', 'waters', 'and', 'god', 'said', 'let', 'there', 'be', 'light', 'and', 'there', 'was', 'light']

    output_2 = ['god', 'without', 'light', 'earth', 'the', 'was', 'void', 'and', 'of', 'said', 'there', 'waters', 'darkness', 'deep', 'spirit', 'form', 'upon', 'let', 'be', 'moved', 'face']

    assert clean_data(input_value)[0] == output_1

    # clean_data outputs two values. The second value is a set, so it's not ordered.
    # Because of that, we can't use a list of input data, we must convert to a set.
    assert set(clean_data(input_value)[1]) == set(output_2)


def test_create_dict():
    input_1 = ['and', 'the', 'earth', 'was', 'without', 'form', 'and', 'void', 'and', 'darkness', 'was', 'upon', 'the', 'face', 'of', 'the', 'deep', 'and',
    'the', 'spirit', 'of', 'god', 'moved', 'upon', 'the', 'face', 'of', 'the', 'waters', 'and', 'god', 'said', 'let', 'there', 'be', 'light', 'and', 'there', 'was', 'light']

    input_2 = ['of', 'earth', 'god', 'upon', 'face', 'deep', 'and', 'was', 'darkness', 'let', 'spirit', 'light', 'be', 'waters', 'said', 'void', 'there', 'form', 'the', 'moved', 'without']

    output = {'of': ['the', 'god', 'the'], 'earth': ['was'], 'god': ['moved', 'said'], 'upon': ['the', 'the'], 'face': ['of', 'of'], 'deep': ['and'], 'and':['the', 'void', 'darkness', 'the', 'god', 'there'], 'was': ['without', 'upon', 'light'], 'darkness': ['was'], 'let': ['there'], 'spirit': ['of'], 'light': ['and'], 'be': ['light'], 'waters': ['and'], 'said': ['let'], 'void': ['and'], 'there': ['be', 'was'], 'form': ['and'], 'the': ['earth', 'face',
    'deep', 'spirit', 'face', 'waters'], 'moved': ['upon'], 'without': ['form']}

    assert create_dict(input_1, input_2) ==  output


def test_create_sentence():
    test_dict = {'let': ['there'], 'the': ['earth', 'face', 'deep', 'spirit', 'face', 'waters'], 'light': ['and'], 'moved': ['upon'], 'earth': ['was'], 'void': ['and'], 'darkness': ['was'], 'of': ['the', 'god', 'the'], 'was': ['without', 'upon', 'light'], 'god': ['moved', 'said'], 'there': ['be', 'was'], 'said': ['let'], 'deep': ['and'], 'and': ['the', 'void', 'darkness', 'the', 'god', 'there'], 'face': ['of', 'of'], 'spirit': ['of'], 'upon': ['the', 'the'], 'waters': ['and'], 'without': ['form'], 'form': ['and'], 'be': ['light']}

    assert len(create_sentence(test_dict).split()) == 10
    assert create_sentence(test_dict).partition(' ')[0] == 'the'
