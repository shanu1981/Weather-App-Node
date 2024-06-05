// Function to get current position
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Function to get city name from coordinates
async function getCity(lat, lng) {
    const url = `https://us1.locationiq.com/v1/reverse.php?key=pk.1b3227ba0f772bfdf526d12d4b1c6762&lat=${lat}&lon=${lng}&format=json`;

    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data.address.city;
    } else {
        throw new Error(`Error: ${response.statusText}`);
    }
}

// Main function to get city name using current position
async function main() {
    try {
        const position = await getCurrentPosition();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const city = await getCity(lat, lng);
        return city; // Return the city value
    } catch (error) {
        console.error(error);
        return null; // Return null in case of an error
    }
}

// Function to execute main and store the city value
export async function getCityFromLocation() {
    const city = await main();
    return city;
}


