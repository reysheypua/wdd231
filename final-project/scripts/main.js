import { toggleMenu, updateYear } from './modules.js';
import { initModals } from './modal.js';
import { initPaletteGenerator } from './palette.js';

const PROMPT_URL = './data/prompts.json';
const ART_API = "https://api.artic.edu/api/v1/artworks/search?q=painting&fields=id,title,image_id,artist_display,medium_display";

async function loadHomeArt() {
    const container = document.querySelector('#art-container');
    if (!container) return;

    try {
        const response = await fetch(ART_API);
        const data = await response.json();
        const art = data.data[Math.floor(Math.random() * data.data.length)];

        container.innerHTML = `
            <div class="img-card">
                <img src="https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg" alt="${art.title}">
                <h3>${art.title}</h3>
                <button class="modal-trigger btn-primary" data-modal="art-modal">Learn More</button>
            </div>
        `;
        
        document.querySelector('#modal-title').textContent = art.title;
        document.querySelector('#modal-content').innerHTML = `<p>${art.artist_display}</p>`;
        
        initModals(); 
    } catch (err) { console.error(err); }
}

async function loadLabPrompts() {
    const grid = document.querySelector('#prompt-grid');
    if (!grid) return;

    try {
        const response = await fetch(PROMPT_URL);
        const data = await response.json();
        const prompts = data.prompts;

        grid.innerHTML = ""; 

        prompts.forEach(item => {
            const card = document.createElement('section');
            card.className = 'card';
            
            card.innerHTML = `
                <h3>${item.subject}</h3>
                <p>Style: ${item.style}</p>
                <p>Difficulty: ${item.difficulty}</p>
                <p>Color: ${item.color}</p>
                <button class="save-btn btn-primary" 
                        data-info='${JSON.stringify(item)}'>
                    Save to Studio
                </button>
            `;
            grid.appendChild(card);
        });

        setupSaveListeners();
    } catch (err) {
        console.error("Lab Error:", err);
    }
}

function setupSaveListeners() {
    const saveButtons = document.querySelectorAll('.save-btn');
    const successModal = document.querySelector('#prompt-save-success');
    const duplicateModal = document.querySelector('#already-saved-modal');

    saveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const promptObject = JSON.parse(button.getAttribute('data-info'));
            let saved = JSON.parse(localStorage.getItem('studioItems')) || [];
            
            const isAlreadySaved = saved.some(item => item.id === promptObject.id);

            if (isAlreadySaved) {
                duplicateModal.showModal();
            } else {
                saved.push(promptObject);
                localStorage.setItem('studioItems', JSON.stringify(saved));
                
                button.textContent = "Saved!";
                button.style.backgroundColor = "#444";
                button.style.color = "#ffffff";

                successModal.showModal();
            }
        });
    });

    [successModal, duplicateModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.close();
        });
    });
}

function initTimestamp() {
    const timestamp = document.querySelector('#timestamp');
    if (timestamp) {
        timestamp.value = new Date().toLocaleString();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateYear();
    toggleMenu();
    initTimestamp();

    if (document.querySelector('#art-container')) {
        loadHomeArt();
    }

    if (document.querySelector('#prompt-grid')) {
        loadLabPrompts();
        initPaletteGenerator();
    }
});