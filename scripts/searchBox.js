function autocomplete(inp, arr) {
  var currentFocus;

  inp.addEventListener("input", function (e) {
    var val = this.value;
    closeAllLists();

    if (!val) {
      return false;
    }

    var suggestions = arr.filter(function (item) {

      return item.toUpperCase().includes(val.toUpperCase());//return item.substr(0, val.length).toUpperCase() === val.toUpperCase();
    });

    currentFocus = -1;
    var autocompleteContainer = document.createElement("DIV");
    autocompleteContainer.setAttribute("id", this.id + "autocomplete-list");
    autocompleteContainer.setAttribute("class", "autocomplete-items");

    if (suggestions.length === 0) {
      var noResultsMessage = document.createElement("DIV");
      noResultsMessage.innerHTML = "No results found";
      autocompleteContainer.appendChild(noResultsMessage);
    }

    for (var i = 0; i < suggestions.length; i++) {
      var suggestionDiv = document.createElement("DIV");
      var suggestionIndex = suggestions[i].toUpperCase().indexOf(val.toUpperCase());
      suggestionDiv.innerHTML = suggestions[i].substr(0, suggestionIndex) ;
      suggestionDiv.innerHTML += "<strong>" + suggestions[i].substr(suggestionIndex, val.length)+ "</strong>";
      suggestionDiv.innerHTML +=  suggestions[i].substr(suggestionIndex + val.length);
      suggestionDiv.innerHTML += "<input type='hidden' value='" + suggestions[i] + "'>";
      suggestionDiv.addEventListener("click", function (e) {
        inp.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
      });
      autocompleteContainer.appendChild(suggestionDiv);
    }

    inp.parentNode.appendChild(autocompleteContainer);
    
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        // do up and down arrow stuff
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //up
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        // enter key
        e.preventDefault();
        if (currentFocus > -1) {

          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {

    if (!x) return false;

    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    // close box
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  // click out
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}



fetch('tf2.json')
  .then(response => response.json())
  .then(data => {
    
    const keysDictionary =  data.keys;
    const valuesList = Object.values(keysDictionary);

    autocomplete(document.getElementById("guessInput"), valuesList);


  })
