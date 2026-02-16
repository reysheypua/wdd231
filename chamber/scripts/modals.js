// 1. Set Hidden Timestamp
const timestamp = document.querySelector('#timestamp');
if (timestamp) {
    timestamp.value = new Date().toLocaleString();
}

// 2. Modal Functionality
const modals = document.querySelectorAll('dialog');
const openModalButtons = document.querySelectorAll('.modal-trigger');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Open the specific modal based on data-modal attribute
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.showModal();
        }
    });
});

// Close buttons inside modals
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});

// Close modal if user clicks the backdrop (outside the modal)
window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.close();
        }
    });
});