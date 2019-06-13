import random 
import re


def create_sentence(**dict):
    SENTENCE_LENGTH = 10
    word = 'god'
    for i in range(SENTENCE_LENGTH):
        print(word, end=" ")
        word = random.sample(dict[word], 1)[0]


def create_dict(tokens, tokens_index):
    words_with_nearby = {}
    for token in tokens_index:
        words_with_nearby[token] = []

    for i in range(len(tokens) - 1):
        current_word = tokens[i]
        next_word = tokens[i + 1]

        words_with_nearby[current_word].append(next_word)
    return create_sentence(**words_with_nearby)


def clean_data(data):
    tokens = data.split()
    tokens = [token.lower() for token in tokens] 
    tokens = [token.replace('.', '') for token in tokens]
    tokens = [token.replace(',', '') for token in tokens]
    tokens = [token.replace("'", '') for token in tokens]
    tokens = [token.replace('""', '') for token in tokens]
    tokens = [token.replace(':', '') for token in tokens]
    tokens_index = list(set(tokens))
    return create_dict(tokens, tokens_index)


def create_book(book):
    return clean_data(book)

def generate_sentence():
    with open('bible.txt', 'r') as file:        
        data = file.read().replace('\n', ' ')  
    return clean_data(data)

generate_sentence()