const IMG =
  "https://yuliaishtar-hub.github.io/inglish-adventure/";

const familyLesson = {

  key: "family",

  title: "Family Adventure",

  description:
    "Meet Lily's family and learn how to talk about your family.",


  stages: [

    /* ==================================
       1. STORY
    ================================== */

    {
      type: "story",

      title: "Meet Lily!",

      text:
        "Hello! I'm Lily! Come and meet my family.",

      image:
        IMG + "Lili.jpg"
    },


    {
      type: "story",

      title: "Mummy",

      text:
        "This is my mummy. Her name is Anna.",

      image:
        IMG + "mummy.jpg"
    },


    {
      type: "story",

      title: "Daddy",

      text:
        "This is my daddy. His name is Tom.",

      image:
        IMG + "daddy.jpg"
    },


    {
      type: "story",

      title: "Grandma",

      text:
        "This is my grandma.",

      image:
        IMG + "grandma.jpg"
    },


    {
      type: "story",

      title: "Grandpa",

      text:
        "This is my grandpa.",

      image:
        IMG + "grandpa.jpg"
    },


    {
      type: "story",

      title: "Sister",

      text:
        "This is my sister. Her name is Mia.",

      image:
        IMG + "Lilissisterbig.jpg"
    },


    /* ==================================
       2. VOCABULARY
    ================================== */

    {
      type: "vocabulary",

      title: "Family Words",

      words: [
        {
          word: "mummy",
          image: IMG + "mummy.jpg"
        },

        {
          word: "daddy",
          image: IMG + "daddy.jpg"
        },

        {
          word: "grandma",
          image: IMG + "grandma.jpg"
        },

        {
          word: "grandpa",
          image: IMG + "grandpa.jpg"
        },

        {
          word: "sister",
          image: IMG + "Lilissisterbig.jpg"
        }
      ]
    },


    /* ==================================
       3. LISTEN
    ================================== */

    {
      type: "listen",

      title: "Listen Carefully",

      text:
        "This is my grandma.",

      image:
        IMG + "grandma.jpg"
    },


    /* ==================================
       4. CHOOSE
    ================================== */

    {
      type: "choose",

      title: "Who is it?",

      text:
        "Who is this?",

      image:
        IMG + "grandpa.jpg",

      answers: [
        "grandpa",
        "daddy",
        "grandma",
        "sister"
      ],

      correct: "grandpa"
    },


    {
      type: "choose",

      title: "Who is it?",

      text:
        "Who is this?",

      image:
        IMG + "mummy.jpg",

      answers: [
        "sister",
        "mummy",
        "grandma",
        "daddy"
      ],

      correct: "mummy"
    },


    {
      type: "choose",

      title: "Who is it?",

      text:
        "Who is this?",

      image:
        IMG + "Lilissisterbig.jpg",

      answers: [
        "grandma",
        "daddy",
        "sister",
        "mummy"
      ],

      correct: "sister"
    },


    /* ==================================
       5. SENTENCE BUILDER
    ================================== */

    {
      type: "sentence",

      title: "Build the Sentence",

      instruction:
        "Make a sentence.",

      words: [
        "This",
        "is",
        "my",
        "mummy"
      ],

      correct:
        "This is my mummy."
    },


    {
      type: "sentence",

      title: "Build the Sentence",

      instruction:
        "Make a sentence.",

      words: [
        "This",
        "is",
        "my",
        "grandpa"
      ],

      correct:
        "This is my grandpa."
    },


    {
      type: "sentence",

      title: "Build the Sentence",

      instruction:
        "Make a sentence.",

      words: [
        "I",
        "love",
        "my",
        "family"
      ],

      correct:
        "I love my family."
    },


    /* ==================================
       6. READING
    ================================== */

    {
      type: "reading",

      title: "Lily's Family",

      text:
        "Hello! I'm Lily. I have a mummy, a daddy, a grandma, a grandpa and a sister. My mummy's name is Anna. My daddy's name is Tom. My sister's name is Mia. I love my family!"
    },


    {
      type: "choose",

      title: "Reading Mission",

      text:
        "What is Lily's sister's name?",

      answers: [
        "Anna",
        "Mia",
        "Lily",
        "Emma"
      ],

      correct: "Mia"
    },


    {
      type: "choose",

      title: "Reading Mission",

      text:
        "Who is Tom?",

      answers: [
        "Lily's daddy",
        "Lily's grandpa",
        "Lily's brother",
        "Lily's teacher"
      ],

      correct: "Lily's daddy"
    },


    /* ==================================
       7. SPEAK
    ================================== */

    {
      type: "speak",

      title: "Speak with Lily",

      text:
        "Say: This is my mummy.",

      target:
        "This is my mummy.",

      image:
        IMG + "mummy.jpg"
    },


    /* ==================================
       8. FINAL QUEST
    ================================== */

    {
      type: "quest",

      title: "Family Quest",

      text:
        "Lily wants to show her family album. Complete the final mission!",

      missions: [
        "Name a family member.",
        "Build a family sentence.",
        "Read Lily's family story.",
        "Say one sentence in English."
      ]
    }

  ]

};


export default familyLesson;
