// Grab the current URL
const currentUrl = window.location.href;

// Split the URL to get only the query string
const everything = currentUrl.split('?');

// If there is no data, handle it gracefully
if (everything.length > 1) {
    const formData = everything[1].split('&');

    function show(cup) {
        let result = "";
        formData.forEach((element) => {
            if (element.startsWith(cup)) {
                // Decode URI components to fix spaces and special characters
                result = decodeURIComponent(element.split('=')[1]).replace(/\+/g, ' ');
            }
        });
        return result;
    }

    const showInfo = document.querySelector('#results');
    showInfo.innerHTML = `
        <div class="result-item"><strong>First Name:</strong> ${show('fname')}</div>
        <div class="result-item"><strong>Last Name:</strong> ${show('lname')}</div>
        <div class="result-item"><strong>Email:</strong> ${show('email')}</div>
        <div class="result-item"><strong>Mobile:</strong> ${show('phone')}</div>
        <div class="result-item"><strong>Business:</strong> ${show('organization')}</div>
        <div class="result-item"><strong>Submitted On:</strong> ${show('timestamp')}</div>
    `;
}