import random 
import re



# def markov_generated_sentence(text_data:str):
    


def create_sentence(tokens_dictionary:dict, starting_word='the', SENTENCE_LENGTH = 10)->str:
    """
    This function takes in a dictionary as its argument
    and populates the list sentence with 10 words that 
    come after the keyword and the word after that.
    """
    sentence_list = []
    SPACE = ' '
    for i in range(SENTENCE_LENGTH):
        sentence_list.append(starting_word)
        starting_word = random.sample(tokens_dictionary[starting_word], 1)[0]
    sentence = SPACE.join(sentence_list)
    return sentence


def create_dict(tokens: list, tokens_index: list) -> dict:
    """
    This function takes in a list of tokens
    and creates a dictionary to with a word as its 
    key and the words after it as its value.
    """
    words_with_nearby = {}
    for token in tokens_index:
        words_with_nearby[token] = []

    for i in range(len(tokens) - 1):
        current_word = tokens[i]
        next_word = tokens[i + 1]

        words_with_nearby[current_word].append(next_word)
    return words_with_nearby


def clean_data(data: str) -> list:
    """
    This function takes in a varible which is a book 
    and the book is cleaned with regular expressions to
    get rid of certain punctuation and numbrers.
    It also returns 2 variables
    """
    cleaned = re.sub(r'[\.!#$%*()@,:/;"{}+=-]', ' ', data)
    clean_nums = re.sub(r'[0-9]', ' ', cleaned)
    tokens = clean_nums.split()
    tokens = [token.lower() for token in tokens] 
    tokens_index = list(set(tokens))
    # print(tokens_index)
    return tokens, tokens_index


def generate_sentence():
    """
    This function takes in no argument but it opens a text file and
    puts it in varible data
    """
    with open('test_bible.txt', 'r') as file:        
        data = file.read().replace('\n', ' ')  
    return data


def make_sentence(book:str)->str:
    """
    This function takes in a book or text from 
    the user and calls all the functions 
    """
    tokens, tokens_index = clean_data(book)
    token_dictionary = create_dict(tokens, tokens_index)
    dictionary = create_sentence(token_dictionary)
    return dictionary

my_string = '1:2 And the !# earth was without $ form,   and void; and *()@ darkness was upon, {  the } face of the deep. And the +  Spirit of God moved upon the face of the = waters. - 1:3 And God said, Let there be light: and there was light.  '
make_sentence(my_string)

def make_bible_sentence()-> str:
    """
    This function takes in no argument and is called once
    and sets varianles to functions, those varibles are 
    turned into retrun values passed into the next function
    """
    the_book = generate_sentence()
    tokens, tokens_index = clean_data(the_book)
    token_dictionary = create_dict(tokens, tokens_index)
    dictionary = create_sentence(token_dictionary)
    return dictionary

if __name__ == "__main__":
    make_bible_sentence()



