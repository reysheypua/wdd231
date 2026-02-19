document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.querySelector('#form-results');
    const params = new URLSearchParams(window.location.search);

    if (resultsContainer && params.has('fname')) {
        resultsContainer.innerHTML = `
            <p><strong>Artist:</strong> ${params.get('fname')}</p>
            <p><strong>Email:</strong> ${params.get('email')}</p>
            <p><strong>Subject:</strong> ${params.get('subject')}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        `;
    } else {
        resultsContainer.innerHTML = `<p>No data submitted.</p>`;
    }
});