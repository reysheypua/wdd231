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
    const qualifiedBusinesses = businesses.filter(
        business => business.membershipLevel === 3 || business.membershipLevel === 2
    );

    qualifiedBusinesses.sort(() => 0.5 - Math.random());

    const count = Math.floor(Math.random() * 2) + 2;
    const selectedBusinesses = qualifiedBusinesses.slice(0, count);

    spotlightContainer.innerHTML = '';

    selectedBusinesses.forEach(business => {
        const card = document.createElement('section');
        card.classList.add('spotlight', 'card');

        let membershipText = business.membershipLevel === 3 ? 'Gold' : 'Silver';

        card.innerHTML = `
            <h2>${business.name}</h2>
            <span class="tagline">${business.tagline}</span>
            <div class="spotlight-body">
                <img src="${business.image}" alt="${business.name} logo" 
                     loading="lazy" width="100" height="100">
                <div class="spotlight-info">
                    <p><strong>EMAIL:</strong> ${business.email}</p>
                    <p><strong>PHONE:</strong> ${business.phone}</p>
                    <p><strong>URL:</strong> ${business.website}</p>
                </div>
            </div>
        `;

        spotlightContainer.appendChild(card);
    });
}

getMembers();