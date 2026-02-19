export async function initPaletteGenerator() {
    const paletteDisplay = document.querySelector('#palette-display');
    const generateBtn = document.querySelector('#generate-palette');
    const saveBtn = document.querySelector('#save-palette');
    
    const successModal = document.querySelector('#save-success-modal');
    const closeSuccess = document.querySelector('#close-success');
    const stayBtn = document.querySelector('#stay-btn');

    let currentPalette = []; 

    const fetchPalette = async () => {
        const randomHex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        const url = `https://www.thecolorapi.com/scheme?hex=${randomHex}&mode=monochrome&count=4`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            currentPalette = data.colors.map(c => c.hex.value); 
            renderPalette(data.colors, paletteDisplay);
        } catch (error) { console.error(error); }
    };

    const renderPalette = (colors, container) => {
        container.innerHTML = '';
        colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color.hex.value;
            swatch.innerHTML = `<span>${color.hex.value}</span>`;
            container.appendChild(swatch);
        });
    };

    generateBtn.addEventListener('click', fetchPalette);
    
    saveBtn?.addEventListener('click', () => {
        if (currentPalette.length > 0) {
            let savedPalettes = JSON.parse(localStorage.getItem('studioPalettes')) || [];
            savedPalettes.push(currentPalette);
            localStorage.setItem('studioPalettes', JSON.stringify(savedPalettes));
            
            successModal.showModal();
        }
    });

    [closeSuccess, stayBtn].forEach(btn => {
        btn?.addEventListener('click', () => successModal.close());
    });

    successModal?.addEventListener('click', (e) => {
        if (e.target === successModal) successModal.close();
    });

    fetchPalette();
}