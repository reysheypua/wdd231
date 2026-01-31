const spotlightContainer = document.querySelector('.spotlights');
const membersURL = 'data/members.json';

async function getMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displaySpotlights(data.businesses);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displaySpotlights(businesses) {
    // Gold (3) and Silver (2) members only
    const qualifiedBusinesses = businesses.filter(
        business => business.membershipLevel === 3 || business.membershipLevel === 2
    );

    // Randomize order
    qualifiedBusinesses.sort(() => 0.5 - Math.random());

    // Select 2 or 3 spotlights
    const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const selectedBusinesses = qualifiedBusinesses.slice(0, count);

    spotlightContainer.innerHTML = '';

    selectedBusinesses.forEach(business => {
        const card = document.createElement('section');
        card.classList.add('spotlight', 'card');

        let membershipText = business.membershipLevel === 3 ? 'Gold' : 'Silver';

        card.innerHTML = `
            <img src="${business.image}" alt="${business.name} logo" loading="lazy">
            <h3>${business.name}</h3>
            <p class="tagline">${business.tagline}</p>
            <p><strong>EMAIL:</strong> ${business.email}</p>
            <p><strong>PHONE:</strong> ${business.phone}</p>
            <p><strong>URL:</strong> ${business.website}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getMembers();