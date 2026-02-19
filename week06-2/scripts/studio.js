import { toggleMenu, updateYear } from './modules.js';
import { initModals } from './modal.js';

let itemToDelete = null;
let deleteType = "";

function initStudio() {
    renderPrompts();
    renderPalettes();
    setupDeleteConfirmation();
}

function renderPalettes() {
    const container = document.querySelector('#saved-palettes-grid');
    const palettes = JSON.parse(localStorage.getItem('studioPalettes')) || [];
    container.innerHTML = "";

    palettes.forEach((palette, index) => {
        const card = document.createElement('div');
        card.className = 'palette-card';
        const swatchHTML = palette.map(color => `<div class="mini-swatch" style="background-color: ${color}"></div>`).join('');
        
        card.innerHTML = `
            ${swatchHTML}
            <button class="delete-btn" data-index="${index}" data-type="palette">&times;</button>
        `;
        container.appendChild(card);
    });
}

function renderPrompts() {
    const container = document.querySelector('#saved-prompts-grid');
    const savedData = JSON.parse(localStorage.getItem('studioItems')) || [];
    container.innerHTML = "";

    savedData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card relative-card'; 
        
        card.innerHTML = `
            <h3>${item.subject}</h3>
            <p><strong>Style:</strong> ${item.style}</p>
            <p><strong>Difficulty:</strong> ${item.difficulty}</p>
            <p><strong>Primary Color:</strong> ${item.color}</p>
            <button class="delete-btn" data-index="${index}" data-type="prompt" aria-label="Remove">&times;</button>
        `;
        container.appendChild(card);
    });
}

function setupDeleteConfirmation() {
    const modal = document.querySelector('#confirm-modal');
    const confirmBtn = document.querySelector('#confirm-delete');
    const cancelBtn = document.querySelector('#cancel-delete');

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            itemToDelete = e.target.getAttribute('data-index');
            deleteType = e.target.getAttribute('data-type');
            modal.showModal();
        }
    });

    confirmBtn.addEventListener('click', () => {
        const storageKey = deleteType === "palette" ? 'studioPalettes' : 'studioItems';
        let items = JSON.parse(localStorage.getItem(storageKey));
        items.splice(itemToDelete, 1);
        localStorage.setItem(storageKey, JSON.stringify(items));
        
        modal.close();
        renderPalettes();
        renderPrompts();
    });

    cancelBtn.addEventListener('click', () => modal.close());
}

document.addEventListener('DOMContentLoaded', initStudio);