const timestamp = document.querySelector('#timestamp');
if (timestamp) {
    timestamp.value = new Date().toLocaleString();
}

const modals = document.querySelectorAll('dialog');
const openModalButtons = document.querySelectorAll('.modal-trigger');
const closeModalButtons = document.querySelectorAll('.close-modal');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.showModal();
        }
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});

window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.close();
        }
    });
});
