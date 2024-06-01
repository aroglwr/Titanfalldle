

function fetchData() {
    return fetch('tf2.json')
        .then(response => response.json())
        .then(data => {
            const dataDictionary = data.data.weapons.pilot;
            const keysDictionary = data.keys;

            detailList = dataDictionary
            
            valuesList = Object.values(keysDictionary);
            valuesLower = valuesList.map(element => element.toLowerCase());
            const randomIndex = Math.floor(Math.random() * valuesList.length);
        
            
            
        })
        .then(a => 
            fetchDaily());
}

function fetchDaily() {

    return fetch('ans.json')
    .then(response => response.json())
    .then(data => {
        for (const dailyNum in data) {
            today = dailyNum
            answer = data[dailyNum]
        }
        answerDetails = detailList[answer]
        
        
    });
}



var guessArray = []
var statArray = []

function doGuess(guess=""){
    if (guess == ""){
        
        const guessInput = document.getElementById('guessInput');
        
        guessChecked = valuesList.find(function(element) {
            return element.toLowerCase().startsWith(guessInput.value.toLowerCase());
        
    })
    addToCookie(guessChecked)} 
    else {
        guessChecked = guess
    }



    if (guessInput.value.length == 0 && guess == ""){
        // pass
    } else{

        try{

            guess = guessChecked.replace(/\b\w/g, char => char.toUpperCase());
            guessArray.unshift(guess)
            //document.cookie = "guessArray=" + guessArray + ";samesite=strict"
            
            guessInput.value=''

            guessTable(guess, guessArray)
        }
        catch (TypeError) {
            console.log(TypeError)
            
        }
    }


    
}


function guessTable(guess, guessList) {



    const resultDiv = document.getElementById("result")
    resultTable = document.getElementById("resultTable");
    resultTable.style.display = "table";
    var statStr = ""


    var guessDetails = detailList[guess]
    
    const guessRow = resultTable.insertRow(1);

    const guessName = guessRow.insertCell(0);
    guessName.classList.add("nameResult")
    

    //const guessGender = guessRow.insertCell(2);
    //if (guessDetails["gender"] == answerDetails["gender"]){
    //    guessGender.id = "resTrue"
    //    guessGender.textContent = "True"
    //} else{
    //    guessGender.id = "resFalse"
    //    guessGender.textContent = "False"
    //}
    
    const attr = ["slot", "class", "damage", "accuracy", "range", "rof", "capacity", "unlock"]
    
    for (j = 0; j < 8; j++){
        statChar = guessCell(j+1, attr[j], guessRow, guessDetails)
        statStr =   statStr + statChar
    }
    //guessCell(2, "gender", guessRow, guessDetails)
    //guessCell(3, "species", guessRow, guessDetails)
    //guessCell(4, "world", guessRow, guessDetails)
    //guessCell(5, "role", guessRow, guessDetails)

    const charIcon = document.createElement("img")
    const charName = document.createElement("p")
    charName.textContent = guess
    charIcon.src=guessDetails["icon"]
    charIcon.classList.add("charIcon")

    const charDiv = document.createElement("div")

    charDiv.append(charIcon)
    charDiv.append(charName)

    guessName.append(charDiv)


    const elemIcon = document.createElement("img")
    

    statArray.unshift(statStr)
    if (guess == answer){
        correctAnswer(guessList, statArray)
    }


}

function guessCell(index, key, tableRow, guessDetails) {
            
    const guessCell = tableRow.insertCell(index);
    const guessCellBg = document.createElement("div");
    
    if(guessDetails[key] == -1){
        console.log(guessDetails[key])
    }
    

    guessCellBg.style.width = "100%";
    guessCellBg.style.borderRadius = "5px";
    guessCellBg.style.display = "inline-block";
    if (guessDetails[key] == answerDetails[key]){
        guessCell.id = "resTrue"
        guessCell.textContent = guessDetails[key]
        
        return "🟩"
       

    } else{
        guessCell.id = "resFalse"
        if(typeof(guessDetails[key]) == "number"){
            if(guessDetails[key] == -1){
                guessCell.textContent = "140/∞ (SP/MP)"
            }
            else if(guessDetails[key] < answerDetails[key]){
                guessCell.textContent = guessDetails[key] + "   ↑"
                return "⬆️"
            }
            else{
                guessCell.textContent = guessDetails[key] + "   ↓"
                return "⬇️"
            }
        }
        
        else{
            guessCell.textContent = guessDetails[key]
        }
        
        // ↑↓
        return "🟥"
        
        
    }
}

function submitGuess(event){
    event.preventDefault();

    doGuess();


}

function correctAnswer(guessList, stats) {
    const form = document.getElementById("form")
    const resDiv = document.getElementById("resultText")
    const resText = resDiv.querySelector("p")
    console.log(stats)
    
    
    
    resText.textContent = "You guessed correct! Today's answer was " + answer + ". You got it in " + guessList.length +" guesses!"


    resDiv.style.display = "inline"

    form.style.display = "none"
}


function copyStats() {
    stats = statArray
    var copyStr = "I found Titanfalldle #" + today +" in " + stats.length + " guesses!\n"
    for (i = 0; i < stats.length; i++){
        copyStr += stats[i]+ "\n"
    }
    navigator.clipboard
      .writeText(copyStr)
      .then(() => {
        alert("successfully copied");
      })
      .catch(() => {
        alert("something went wrong");
      });
}





window.onload = function() {

    fetchData().then(() => {
        try{

        
        let guessCookie = JSON.parse(getCookie("guessesArray"))


        let guesses = guessCookie


        if (guesses != "") {

            playGame();
            for (i =0; i< guesses.length; i++){

                doGuess(guesses[i])
                
            }
        }
        }
        catch(error){
            console.log(error);
        }


    })

    resultTable = document.getElementById("resultTable");
    resultTable.style.display = "none";





    //const topRow = resultTable.insertRow();
//
    //const guessTitle = topRow.insertCell(0);
    //const elementTitle = topRow.insertCell(1);
    //const genderTitle = topRow.insertCell(2);
    //const speciesTitle = topRow.insertCell(3);
    //const worldTitle = topRow.insertCell(4);
    //const roleTitle = topRow.insertCell(5);
//
    //guessTitle.textContent = "Guess";
    //elementTitle.textContent = "Element";
    //genderTitle.textContent = "Gender";
    //speciesTitle.textContent = "Species";
    //worldTitle.textContent = "World";
    //roleTitle.textContent = "Role";


}




function handleEnterKey(event) {
    if (event.key === "Enter") {

        event.preventDefault();
        try {
            const autofillBox = document.getElementById("guessInputautocomplete-list");
            autofillBox.style.display = "none"
        } catch (TypeError) {

        }
        submitGuess(event);
    }
}


function addToCookie(newValue) {
    // Get existing array from the cookie or initialize an empty array
    let existingArray = JSON.parse(getCookieValue('guessesArray')) || [];

    // Add the new value to the array
    existingArray.push(newValue);

    // Save the updated array back to the cookie
    setCookie('guessesArray', JSON.stringify(existingArray));


}

function getCookieValue(cookieName) {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}

function setCookie(cookieName, cookieValue) {
    document.cookie = `${cookieName}=${cookieValue};expires=${countDownDate.toUTCString()}; samesite=strict`; // make the timeout be the next midnight - maybe from countdownDisplay.js
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}




