# Sentence Generator

To generate sentences we use Markov chains. A Markov chain is a sequence
of events where the probability of future events depend only on the
current event

In our case the Markov chain is a sequence of words. Where the next word
can be predicted based on the current word. I did this by creating a
dictionary of all the words in a given text. Then for each word we get
the following words and count them
For example after creating a dictionary of all the words in a given text
we get the following:

```
          {
            "{'the': {'book': 1, 'car': 5, 'person': 1}, 'car': {'drove': 45 'exploded': 1, 'jumped': 1, person': 1}, 'person': {'over': 1, 'gave': 1, 'jumped': 1, 'ate': 1}, 'book': {'of': 1, 'on': 1, 'and': 1}, 'drove': {'the': 1}, 'over': {'the': 1}}"
          }

```

We can see that some words are more common than others. For example car
is more likely to be followed by drove rather than person or exploded.

I applied softmax to this dictionary to accurately represent a
Markov chain. This means all probabilities of each of the next words sum
to 1. To learn more about the implementation check out the repo!
