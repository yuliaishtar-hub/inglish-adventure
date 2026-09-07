```javascript
const BASE = "https://yuliaishtar-hub.github.io/inglish-adventure/";

const img = (name) => `${BASE}${encodeURIComponent(name)}`;

const familyLesson = {
  key: "family",

  title: "Family Adventure",

  description:
    "Meet Lily's family, learn the words, build sentences and complete the final quest.",

  stages: [

    {
      type: "story",
      label: "Story 1",
      title: "Meet Lily!",
      image: img("Lili.jpg"),
      text:
        "Hello! My name is Lily. Welcome to my family adventure!"
    },

    {
      type: "story",
      label: "Story 2",
      title: "Meet Mummy",
      image: img("mummy.jpg"),
      text:
        "This is my mummy. Her name is Anna. She is my mummy."
    },

    {
      type: "story",
      label: "Story 3",
      title: "Meet Daddy",
      image: img("daddy.jpg"),
      text:
        "This is my daddy. His name is Tom. He is my daddy."
    },

    {
      type: "story",
      label: "Story 4",
      title: "Meet Grandma",
      image: img("grandma.jpg"),
      text:
        "This is my grandma. She is kind and funny."
    },

    {
      type: "story",
      label: "Story 5",
      title: "Meet Grandpa",
      image: img("grandpa.jpg"),
      text:
        "This is my grandpa. He likes stories and walks."
    },

    {
      type: "story",
      label: "Story 6",
      title: "Meet My Sister",
      image: img("Lilissisterbig.jpg"),
      text:
        "This is my sister. Her name is Mia. She is funny and cheerful."
    },

    {
      type: "vocabulary",
      label: "Vocabulary",
      title: "Meet the Family",
      text:
        "Move your mouse over a word to hear it and see the Russian translation.",

      words: [
        {
          word: "mummy",
          translation: "мама",
          image: img("mummy.jpg")
        },
        {
          word: "daddy",
          translation: "папа",
          image: img("daddy.jpg")
        },
        {
          word: "grandma",
          translation: "бабушка",
          image: img("grandma.jpg")
        },
        {
          word: "grandpa",
          translation: "дедушка",
          image: img("grandpa.jpg")
        },
        {
          word: "sister",
          translation: "сестра",
          image: img("Lilissisterbig.jpg")
        }
      ]
    },

    {
      type: "listen",
      label: "Listen",
      title: "Listen carefully",
      text:
        "Listen to the sentence and get ready for the question.",
      sentence:
        "This is my grandma."
    },

    {
      type: "choose",
      label: "Choose",
      title: "Who is this?",
      image: img("grandpa.jpg"),
      question:
        "Who is this?",
      options: [
        "Grandpa",
        "Grandma",
        "Daddy",
        "Sister"
      ],
      answer: "Grandpa",
      success:
        "Great! This is grandpa."
    },

    {
      type: "choose",
      label: "Choose",
      title: "Who is this?",
      image: img("mummy.jpg"),
      question:
        "Who is this?",
      options: [
        "Grandma",
        "Mummy",
        "Sister",
        "Grandpa"
      ],
      answer: "Mummy",
      success:
        "Yes! This is mummy."
    },

    {
      type: "choose",
      label: "Choose",
      title: "Who is this?",
      image: img("Lilissisterbig.jpg"),
      question:
        "Who is this?",
      options: [
        "Daddy",
        "Grandpa",
        "Sister",
        "Grandma"
      ],
      answer: "Sister",
      success:
        "Correct! This is Lily's sister."
    },

    {
      type: "sentence",
      label: "Build",
      title: "Build the sentence",
      text:
        "Put the words in the correct order.",

      target:
        "This is my mummy.",

      words: [
        "mummy.",
        "my",
        "This",
        "is"
      ]
    },

    {
      type: "sentence",
      label: "Build",
      title: "Build the sentence",
      text:
        "Can you build another sentence?",

      target:
        "This is my grandpa.",

      words: [
        "grandpa.",
        "This",
        "my",
        "is"
      ]
    },

    {
      type: "sentence",
      label: "Build",
      title: "Build the sentence",
      text:
        "One more! Build Lily's sentence.",

      target:
        "I love my family.",

      words: [
        "family.",
        "I",
        "my",
        "love"
      ]
    },

    {
      type: "reading",
      label: "Reading",
      title: "Lily's Family",
      text:
        "Read Lily's little family story.",

      reading:
        "Hello! My name is Lily. I have a lovely family. My mummy is Anna and my daddy is Tom. I have a sister named Mia. My grandma and grandpa often visit us. I love my family!"
    },

    {
      type: "choose",
      label: "Reading",
      title: "Check your reading",
      question:
        "What is Lily's sister's name?",
      options: [
        "Anna",
        "Tom",
        "Mia",
        "Lily"
      ],
      answer: "Mia",
      success:
        "Correct! Lily's sister is Mia."
    },

    {
      type: "choose",
      label: "Reading",
      title: "One more question",
      question:
        "Who is Tom?",
      options: [
        "Lily's daddy",
        "Lily's grandpa",
        "Lily's brother",
        "Lily's friend"
      ],
      answer: "Lily's daddy",
      success:
        "Yes! Tom is Lily's daddy."
    },

    {
      type: "speak",
      label: "Speak",
      title: "Talk to Lily",
      text:
        "Say the sentence aloud.",

      target:
        "This is my mummy."
    },

    {
      type: "quest",
      label: "Final Quest",
      title: "Family Quest",
      text:
        "You have reached the final Family Quest!",

      missions: [
        "Find mummy",
        "Find grandpa",
        "Build a family sentence",
        "Say one sentence in English"
      ],

      reward:
        "Family Quest complete!"
    }

  ]
};

export default familyLesson;
```
