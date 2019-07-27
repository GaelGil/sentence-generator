import random 
import re



def create_sentence(tokens_dictionary:dict, starting_word='the', SENTENCE_LENGTH = 10):
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
    # print("TOKENS: ", tokens)
    # print("TOKENS_INDEX", tokens_index)
    words_with_nearby = {}
    for token in tokens_index:
        words_with_nearby[token] = []

    for i in range(len(tokens) - 1):
        current_word = tokens[i]
        next_word = tokens[i + 1]

        words_with_nearby[current_word].append(next_word)
    print(words_with_nearby)
    return words_with_nearby


def clean_data(data: list) -> list:
    """
    This function takes in a varible which is a book 
    and the book is cleaned with regular expressions to
    get rid of certain punctuation and numbrers.
    It also returns 2 variables to create_dict.
    """
    # print("DATA " , data)
    cleaned = re.sub(r'[\.!#$%*()@,:/;"{}+=-]', ' ', data)
    clean_nums = re.sub(r'[0-9]', ' ', cleaned)
    tokens = clean_nums.split()
    tokens = [token.lower() for token in tokens] 
    tokens_index = list(set(tokens))
    return tokens, tokens_index


def generate_sentence():
    """
    This function takes in no argument but it opens a text file and
    puts it in varible data to return to clean_data
    """
    with open('test_bible.txt', 'r') as file:        
        data = file.read().replace('\n', ' ')  
    return data


def make_sentence(book):
    """
    This function takes in a book or text from 
    the user and calls all the functions 
    """
    tokens, tokens_index = clean_data(the_book)
    token_dictionary = create_dict(tokens, tokens_index)
    dictionary = create_sentence(**token_dictionary)
    return dictionary


def make_bible_sentence():
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
