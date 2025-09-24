const HomeBanner = () => {
  return (
    <div className="my-12 mt-12">
      <hr />
      <br />
      <h1 className="text-3xl font-bold mb-4">How it Works</h1>
      <p>
        To generate sentences we use Markov chains. A Markov chain is a sequence
        of events where the probability of future events depend only on the
        current event.
        <br />
        <br />
        In our case the Markov chain is a sequence of words. Where the next word
        can be predicted based on the current word. I did this by creating a
        dictionary of all the words in a given text. Then for each word we get
        the following words and count them.
        <br />
        <br />
        For example after creating a dictionary of all the words in a given text
        we get the following:
        <br />
        <br />
        <code>
          {
            "{'the': {'book': 1, 'car': 5, 'person': 1}, 'car': {'drove': 45 'exploeded': 1, 'jumped': 1, person': 1}, 'person': {'over': 1, 'gave': 1, 'jumped': 1, 'ate': 1}, 'book': {'of': 1, 'on': 1, 'and': 1}, 'drove': {'the': 1}, 'over': {'the': 1}}"
          }
        </code>
        <br />
        <br />
        We can see that some words are more common than others. For example car
        is more likely to be followed by drove rather than person or exploeded.
        <br />
        <br />I applied softmax to this dictionary to accurately represent a
        Markov chain. This means all probabilities of each of the next words sum
        to 1. To learn more about the implementation check out the repo!
      </p>
    </div>
  );
};

export default HomeBanner;
