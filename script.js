window.onload = function() {
    document.getElementById("input").focus()
    wordlist = [
      "the",
      "be",
      "to",
      "of",
      "and",
      "a",
      "in",
      "that",
      "have",
      "I",
      "it",
      "for",
      "not",
      "on",
      "with",
      "he",
      "as",
      "you",
      "do",
      "at",
      "this",
      "but",
      "his",
      "by",
      "from",
      "they",
      "we",
      "say",
      "her",
      "she",
      "or",
      "an",
      "will",
      "my",
      "one",
      "all",
      "would",
      "there",
      "their",
      "what",
      "so",
      "up",
      "out",
      "if",
      "about",
      "who",
      "get",
      "which",
      "go",
      "me",
      "when",
      "make",
      "can",
      "like",
      "time",
      "no",
      "just",
      "him",
      "know",
      "take",
      "person",
      "into",
      "year",
      "your",
      "good",
      "some",
      "could",
      "them",
      "see",
      "other",
      "than",
      "then",
      "that",
      "now",
      "look",
      "only",
      "come",
      "its",
      "over",
      "think",
      "also",
      "back",
      "after",
      "use",
      "two",
      "how",
      "our",
      "work",
      "first",
      "well",
      "way",
      "even",
      "new",
      "want",
      "because",
      "any",
      "these",
      "give",
      "day",
      "most",
      "us",
      "table",
      "green",
      "happy",
      "short",
      "heavy",
      "watch",
      "world",
      "sweet",
      "large",
      "early",
      "music",
      "night",
      "light",
      "right",
      "small",
      "story",
      "south",
      "floor",
      "group",
      "carry",
      "north",
      "front",
      "peace",
      "seems",
      "truck",
      "month",
      "point",
      "heart",
      "track",
      "brown",
      "third",
      "spend",
      "sugar",
      "eager",
      "beach",
      "fruit",
      "candy",
      "shirt",
      "waste",
      "bloom",
      "fence",
      "funny",
      "thick",
      "queen",
      "admit",
      "alarm",
      "aside",
      "awful",
      "blade",
      "blend",
      "bunch",
      "cheer",
      "clasp",
      "climb",
      "cling",
      "cloth",
      "coach",
      "cream",
      "crown",
      "dense",
      "devil",
      "diner",
      "elbow",
      "fable",
      "feline",
      "forge",
      "froth",
      "giant",
      "gleam",
      "glide",
      "gnome",
      "grief",
      "grind",
      "groom",
      "grope",
      "hatch",
      "hazel",
      "hiker",
      "holly",
      "homer",
      "hurry",
      "hymn",
      "jolly",
      "judge",
      "jumbo",
      "knack",
      "kneel",
      "koala",
      "latch",
      "liver",
      "lunar",
      "mango",
      "march",
      "mimic",
      "munch",
      "nacho",
      "naval",
      "nerve",
      "nimble",
      "nurse",
      "ozone",
      "pilot",
      "punch",
      "queen",
      "quick",
      "quiet",
      "quirk",
      "resin",
      "rhyme",
      "rival",
      "siren"
  ]
    generated = ""
    letters = 0
    for (let i of Array(20).keys()) {
        generated += wordlist[Math.floor(Math.random()*wordlist.length)]
        generated += " "
    }
    for (let letter of generated) {
        document.getElementById("dummy").innerHTML += `<p>${letter}</p>`
        letters += 1
    } 
    document.getElementById("generated").innerHTML = generated
    display()
}
document.addEventListener("keydown", function(event) {
    var keyLocation = ["Standard", "Left", "Right", "Numpad", "Mobile", "Joystick"][event.location]
    key = event.key.toLocaleLowerCase()
    if (keyLocation == "Right") {
        key = "r" + key
    }
    if (keyLocation == "Left") {
        key = "l" + key
    }
    if (key == "raltgraph") {
        document.getElementById("lcontrol").classList.remove("pressed")
    }
    if (key == " ") {
        type(" ", "space")
    }
    if (key == "lcontrol") {
        setTimeout(function() {document.getElementById(key).classList.add("pressed")} ,1)
    } else if (key == "capslock") {
        if (event.getModifierState('CapsLock')) {
            document.getElementById("capslock").classList.add("pressed")
        }
    } else {
        document.getElementById(key).classList.add("pressed")
    }
    if (key == "backspace") {
      select = document.getElementById('output')
      select.removeChild(select.lastChild)
      select.removeChild(select.lastChild)
      letter -= 1
      document.getElementById("generated").innerHTML = `${document.querySelector(`#dummy :nth-child(${letter})`).innerHTML}${document.getElementById("generated").innerHTML}`
      display()
  }
    if (key == "meta") {
        setTimeout(function() {document.getElementById(key).classList.remove("pressed")} ,100)
    }
    event.preventDefault()
    document.getElementById("input").focus()
    if (key.length == 1) {
      type(event.key, "symbol")
    }
    })
document.addEventListener("keyup", function(event) {
    var keyLocation = ["Standard", "Left", "Right", "Numpad", "Mobile", "Joystick"][event.location]
    key = event.key.toLocaleLowerCase()
    if (keyLocation == "Right") {
        key = "r" + key
    }
    if (keyLocation == "Left") {
        key = "l" + key
    }
  if (key != "capslock") {
      document.getElementById(key).classList.remove("pressed")
  }
  if (!event.getModifierState('CapsLock')) {
      document.getElementById("capslock").classList.remove("pressed")
  }
})

letter = 1
time = 0
start = 0
end = 0
wpm = 0
errors = 0

function type(key, type) {
    output = document.getElementById("output").innerHTML
    text = document.getElementById("generated").innerHTML
    if (key == document.querySelector(`#dummy :nth-child(${letter})`).innerHTML) {
        output += `
            <span class="${type} correct">${key}</span>
        `
        text = text.substring(1)
    } else {
        if (key != " ") {
            output += `
              <span class="${type} incorrect">${key}</span>
            `
            text = text.substring(1)
            errors += 1
            error()
        } else {
            letter -= 1
        }
    }
    document.getElementById("generated").innerHTML = text
    document.getElementById("output").innerHTML = output
    letter += 1
    setTimeout(function() {
        document.querySelectorAll(".symbol").forEach(function(symbol) {
            if (!symbol.classList.contains("visible")) {
                symbol.classList.add("visible")
            }
        })
    }, 1)
    display()
    console.log(letter)
    if (letter == 2) {
        start = Date.now()
    }
}

function display() {
    output = document.getElementById("output").innerHTML
    text = document.getElementById("generated").innerHTML
    separated = ""
    for (let letter of text.split(" ")) {
      separated += `<span class="symbol visible">${letter} </span>`
    }
    document.getElementById("main").innerHTML = output + separated
    if (letter == letters) {
        end = Date.now()
        time = Math.round((end - start) / 1000) / 60
        wpm = Math.round(20 / time)
        accuracy = Math.round(((document.querySelectorAll('#main .symbol').length - errors) / document.querySelectorAll('#main .symbol').length) * 100)
        document.getElementById("wpm").innerHTML = "WPM: " + wpm * (accuracy / 100)
        document.getElementById("time").innerHTML = "Time: " + Math.round((end - start) / 1000) + "s"
        document.getElementById("errors").innerHTML = "Errors: " + errors
        document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy + "%"
    }
}

function error() {
    document.querySelectorAll(".circle").forEach(function(circle) {
        circle.style.background = "#8f3232";
    });
    setTimeout(function() {
        document.querySelectorAll(".circle").forEach(function(circle) {
            circle.style.background = "#0f0f0f";
        });
    }, 100);
}
