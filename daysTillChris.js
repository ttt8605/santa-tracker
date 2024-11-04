function timeUntilChristmas() {
    const today = new Date(); // Get the current date and time
    let christmasYear = today.getFullYear();
    const christmasDate = new Date(christmasYear, 11, 25); // Christmas is December 25

    // If today is after Christmas, move to next year's Christmas
    if (today > christmasDate) {
        christmasYear += 1;
        christmasDate.setFullYear(christmasYear);
    }

    // Calculate the difference in milliseconds
    const timeDiff = christmasDate - today;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
        message: `${days} zile  ${hours} ore  ${minutes} minute ${seconds} secunde.`
    };
}

// Automatically display the countdown when the page loads
const countdown = timeUntilChristmas();
document.getElementById('countdown').textContent = countdown.message;

// Optional: Update the countdown every second
setInterval(() => {
    const countdown = timeUntilChristmas();
    document.getElementById('countdown').textContent = countdown.message;
}, 1000);