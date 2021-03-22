import random
import re


class TextCreator(object):
    def __init__(self, doc):
        # Clean up and tokenize the text, splitting on whitespace.
        self.cleaned_text = self._clean_text(doc)
        self.tokenized_doc = self.cleaned_text.split()

        # Creates a dict where each word is mapped to the words that follow it.
        # If the data size is too large, this could be replaced with probabilities.
        # i.e. {"the": ["man", "hotdog", "man"], "some": ["sand", "candy", "of"], ...}
        self.transition_probabilities = {}
        for i in range(len(self.tokenized_doc) - 1):
            current_word = self.tokenized_doc[i]
            if current_word not in self.transition_probabilities:
                self.transition_probabilities[current_word] = [self.tokenized_doc[i + 1]]
            else:
                self.transition_probabilities[current_word].append(self.tokenized_doc[i + 1])
    
        # If the final word of the document is unique, then it's not possible to choose a subsequent word.
        # Add a special end token for the word that ends the document in order to handle this edge case.
        final_word = self.tokenized_doc[-1]
        if final_word not in self.transition_probabilities:
            self.transition_probabilities[final_word] = ["<END>"]


    def _clean_text(self, document):
        # This function cleans up the text, removing unwanted characters and making it lowercase.
        cleaned = re.sub(r'[\.!#$%*()@,:/;"{}+=-]', ' ', document)
        cleaned = re.sub(r'[0-9]', ' ', cleaned)
        cleaned = cleaned.lower()

        return cleaned


    def generate_text(self, output_length):
        # Randomly select a word to start the Markov process.
        current_word = random.choice(list(self.transition_probabilities.keys()))
        
        output_text = []
        i = 0
        while i < output_length:
            # Add the word to the output text.
            output_text.append(current_word)

            # Randomly sample from the following words.
            random_choice = random.randint(0, (len(self.transition_probabilities[current_word])-1))
            current_word = self.transition_probabilities[current_word][random_choice]

            # If the final word is chosen, end the Markov process early.
            # Alternatively, a different word could be sampled, but this might make the text less grammatical.
            if current_word == "<END>":
                break
            i+=1

        return ' '.join(output_text)
        
