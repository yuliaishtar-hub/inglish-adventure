const allLevels = {
    school: {
        name: "🏫 School Days",
        questions: [
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/pen.jpg", options: ["It's a pen.", "It's a ruler.", "It's an eraser."], correctIndex: 0 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/pencil.jpg", options: ["It's a pencil.", "It's a ruler.", "It's a pen."], correctIndex: 0 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/ruler.jpg", options: ["It's a pencil.", "It's a ruler.", "It's a pen."], correctIndex: 1 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Eraser.jpg", options: ["It's a ruler.", "It's a pen.", "It's an eraser."], correctIndex: 2 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/School bag.jpg", options: ["It's a school bag.", "It's a pen.", "It's a ruler."], correctIndex: 0 }
        ]
    },
    family: {
        name: "👨‍👩‍👧 Family",
        questions: [
            { question: "Who is she?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/mummy.jpg", options: ["She's my mummy.", "She's my sister.", "She's my grandma."], correctIndex: 0 },
            { question: "Who is he?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/daddy.jpg", options: ["He's my daddy.", "He's my grandpa.", "He's my brother."], correctIndex: 0 },
            { question: "Who is she?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/grandmagrandpa.jpg", options: ["She's my grandma.", "She's my mummy.", "She's my sister."], correctIndex: 0 },
            { question: "Who is she?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Lilissisterbig.jpg", options: ["She's my sister.", "She's my mummy.", "She's my grandma."], correctIndex: 0 }
        ]
    },
    animals: {
        name: "🐾 Animals",
        questions: [
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/monkey.jpg", options: ["It's a chimp.", "It's a fish.", "It's a bird."], correctIndex: 0 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/fish.jpg", options: ["It's a mouse.", "It's a frog.", "It's a fish."], correctIndex: 2 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/bird.jpg", options: ["It's a bird.", "It's a chimp.", "It's a mouse."], correctIndex: 0 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/mouse.jpg", options: ["It's a fish.", "It's a mouse.", "It's a frog."], correctIndex: 1 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/frog.jpg", options: ["It's a frog.", "It's a bird.", "It's a chimp."], correctIndex: 0 }
        ]
    },
    seasons: {
        name: "🌦️ Seasons",
        questions: [
            { question: "What season is it?", image: "❄️", options: ["It's winter.", "It's summer.", "It's spring."], correctIndex: 0 },
            { question: "What season is it?", image: "🌸", options: ["It's autumn.", "It's spring.", "It's winter."], correctIndex: 1 },
            { question: "What season is it?", image: "☀️", options: ["It's winter.", "It's spring.", "It's summer."], correctIndex: 2 },
            { question: "What season is it?", image: "🍂", options: ["It's autumn.", "It's winter.", "It's summer."], correctIndex: 0 }
        ]
    },
    colours: {
        name: "🎨 Colours",
        questions: [
            { question: "What colour is it?", image: "🔴", options: ["It's red.", "It's blue.", "It's white."], correctIndex: 0 },
            { question: "What colour is it?", image: "🔵", options: ["It's yellow.", "It's black.", "It's blue."], correctIndex: 2 },
            { question: "What colour is it?", image: "🟡", options: ["It's yellow.", "It's brown.", "It's orange."], correctIndex: 0 },
            { question: "What colour is it?", image: "⚫", options: ["It's white.", "It's black.", "It's red."], correctIndex: 1 }
        ]
    },
    toys: {
        name: "🧸 Toys",
        questions: [
            { question: "What is it?", image: "🧸", options: ["It's a teddy bear.", "It's a doll.", "It's a ball."], correctIndex: 0 },
            { question: "What is it?", image: "🪀", options: ["It's a yoyo.", "It's a puppet.", "It's a toy soldier."], correctIndex: 0 },
            { question: "What is it?", image: "⚽", options: ["It's a ball.", "It's a teddy bear.", "It's a doll."], correctIndex: 0 },
            { question: "What is it?", image: "🪆", options: ["It's a puppet.", "It's a yoyo.", "It's a ball."], correctIndex: 0 }
        ]
    },
    home: {
        name: "🏡 Home",
        questions: [
            { question: "What is it?", image: "🪑", options: ["It's a chair.", "It's a table.", "It's a shelf."], correctIndex: 0 },
            { question: "What is it?", image: "🛏️", options: ["It's a kitchen.", "It's a bedroom.", "It's a bathroom."], correctIndex: 1 },
            { question: "What is it?", image: "🍳", options: ["It's a kitchen.", "It's a living room.", "It's a bedroom."], correctIndex: 0 },
            { question: "What is it?", image: "🚽", options: ["It's a bedroom.", "It's a bathroom.", "It's a kitchen."], correctIndex: 1 }
        ]
    },
    food: {
        name: "🍕 Food & Drinks",
        questions: [
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Apple.jpg", options: ["It's an apple.", "It's a pizza.", "It's a burger."], correctIndex: 0 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Burger.jpg", options: ["It's an apple.", "It's a burger.", "It's a sandwich."], correctIndex: 1 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Chips.jpg", options: ["It's a pizza.", "It's a burger.", "It's chips."], correctIndex: 2 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Chocolate cake.jpg", options: ["It's a chocolate cake.", "It's an apple.", "It's ice cream."], correctIndex: 0 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Ice cream.jpg", options: ["It's a burger.", "It's ice cream.", "It's a sandwich."], correctIndex: 1 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Milk.jpg", options: ["It's milk.", "It's pizza.", "It's chips."], correctIndex: 0 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Orange juice.jpg", options: ["It's orange juice.", "It's milk.", "It's water."], correctIndex: 0 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Pizza.jpg", options: ["It's pizza.", "It's an apple.", "It's a burger."], correctIndex: 0 },
            { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Sandwich.jpg", options: ["It's a sandwich.", "It's an apple.", "It's chips."], correctIndex: 0 }
        ]
    }
};
