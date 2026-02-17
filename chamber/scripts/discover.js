import { itemsOfInterest } from '../data/items.mjs';

const grid = document.querySelector('.discover-grid');
const messageArea = document.querySelector('#visitor-message');

const msInDay = 84600000;
const lastVisit = localStorage.getItem('lastVisitDate');
const now = Date.now();

if (!lastVisit) {
    messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysSince = Math.floor((now - lastVisit) / msInDay);
    if (daysSince < 1) {
        messageArea.textContent = "Back so soon! Awesome!";
    } else {
        messageArea.textContent = `You last visited ${daysSince} ${daysSince === 1 ? 'day' : 'days'} ago.`;
    }
}
localStorage.setItem('lastVisitDate', now);

itemsOfInterest.forEach((item, index) => {
    const card = document.createElement('section');
    card.className = 'card';
    
    card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <a href="${item.url}" target="_blank" rel="noopener">
            <button type="button" class="learn-more-btn">Learn More</button>
        </a>
    `;
    grid.appendChild(card);
});