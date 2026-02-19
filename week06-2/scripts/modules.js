export function updateYear() {
    const yearSpan = document.querySelector('#year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

export function toggleMenu() {
    const button = document.querySelector('#menu-button');
    const nav = document.querySelector('#nav-menu');
    if (button && nav) {
        button.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
}