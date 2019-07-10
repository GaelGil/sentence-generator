import random 
import re


def create_sentence(**dict):
    """
    This function takes in a dictionary as its argument
    and populates the list sentence with 10 words that 
    come after the keyword and the word after that.
    """
    SENTENCE_LENGTH = 10
    word = 'the'
    sentence = []
    space = ' '
    for i in range(SENTENCE_LENGTH):
        sentence.append(word)
        word = random.sample(dict[word], 1)[0]

    return space.join(sentence)


def create_dict(tokens, tokens_index):
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
    return create_sentence(**words_with_nearby)


def clean_data(data):
    """
    This function takes in a varible which is a book 
    and the book is cleaned with regular expressions to
    get rid of certain punctuation and numbrers.
    It also returns 2 variables to create_dict.
    """
    cleaned = re.sub(r'[\.!#$%*()@,:/;"{}+=-]', ' ', data)
    clean_nums = re.sub(r'[0-9]', ' ', cleaned)
    tokens = clean_nums.split()
    tokens = [token.lower() for token in tokens] 
    tokens_index = list(set(tokens))
    return create_dict(tokens, tokens_index)


def create_book(book):
    """
    This function takes in a string and returns it to the function
    clean_data.
    """
    return clean_data(book)


def generate_sentence():
    """
    This function takes in no argument but it opens a text file and
    puts it in varible data to return to clean_data
    """
    with open('bible.txt', 'r') as file:        
        data = file.read().replace('\n', ' ')  
    return clean_data(data)

# import re



# def get_sentence_dict(tokens):
#     return tokens
#     """
#     implement actual function
#     """


# def clean_book_tokens(book):
#     clean_book = [re.sub(r'\.', '', i) for i in book] # strips punct
#     clean_book = [i.lower() for i in clean_book] # normalizes
#     return clean_book


# def get_book_tokens(book):
#     return book.split()


# def generate_sentence(book_path, sentence_len=12):
#     with open(book_path, 'r') as b:
#         book = b.read()

#     book_tokens = get_book_tokens(book)
#     cleaned_book_tokens = clean_book_tokens(book_tokens)
    

#     sentence_dict = get_sentence_dict(arg1, arg2)


#     return sentence_dict


# print(generate_sentence('bible.txt', 14))