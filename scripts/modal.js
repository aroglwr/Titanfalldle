var infoModal = document.getElementById("iModal");
var infoBtn = document.getElementById("infoButton");
var infoSpan = document.getElementsByClassName("close")[0];
infoBtn.onclick = function() {

  infoModal.style.display = "inline-block";

}

infoSpan.onclick = function() {
  infoModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == infoModal) {
    infoModal.style.display = "none";
  }

}