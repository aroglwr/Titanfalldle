var countDownDate = new Date();
countDownDate.setHours(23);
countDownDate.setMinutes(0);
countDownDate.setSeconds(0);


var x = setInterval(function() {
    var now = new Date().getTime();

    var distance = countDownDate.getTime() - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0){
        location.reload()
    }

    document.getElementById("countdown").innerHTML = "Next in<br>" + hours + "h " + minutes + "m " + seconds + "s ";
}, 1000);

