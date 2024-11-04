
async function fetchSantaRoute() {
    try {
        const response = await axios.get('https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b');
        const rom = response.data.destinations;

        // Format each destination's arrival and departure timestamps
        rom.forEach(destination => {
            if (destination.arrival) { // Ensure that the arrival property exists
                destination.formattedArrival = formatDate(destination.arrival, destination.details.timezone); // Pass timezone for formatting
            }
            if (destination.departure) { // Ensure that the departure property exists
                destination.formattedDeparture = formatDate(destination.departure, destination.details.timezone); // Pass timezone for formatting
            }
        });

        console.log(rom); // Log the updated rom array with formatted times
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function formatDate(timestamp, regionTimezoneOffset) {
    const date = new Date(timestamp);
    
    // Create a new Date object with the year set to 2024 for Bucharest
    const updatedBucharestDate = new Date(Date.UTC(2024, date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));

    // Format for Bucharest time
    const bucharestOptions = {
        year: 'numeric', 
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Bucharest',
        timeZoneName: 'short'
    };

    // Convert the region's timezone offset from seconds to milliseconds
    const localTimezoneOffset = regionTimezoneOffset * 1000; // Convert seconds to milliseconds
    const localDate = new Date(timestamp + localTimezoneOffset); // Adjust timestamp for local time

    // Create a new Date object with the year set to 2024 for local time
    const updatedLocalDate = new Date(Date.UTC(2024, localDate.getUTCMonth(), localDate.getUTCDate(), localDate.getUTCHours(), localDate.getUTCMinutes(), localDate.getUTCSeconds()));

    // Format for local time based on region's timezone offset
    const localOptions = {
        year: 'numeric', 
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC', // Display in UTC for clarity
        timeZoneName: 'short'
    };

    const formattedBucharestTime = updatedBucharestDate.toLocaleString('ro-RO', bucharestOptions);
    const formattedLocalTime = updatedLocalDate.toLocaleString('ro-RO', localOptions);

    return {
        bucharestTime: formattedBucharestTime,
        localTime: formattedLocalTime
    };
}

// Call the function to fetch and log the Santa route
fetchSantaRoute();
