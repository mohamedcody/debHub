console.log('main.js loaded');

const toolsBtn = document.getElementById('tools-btn');
const toolsMenu = document.getElementById('sub-menu');

if (toolsBtn && toolsMenu) {
    toolsBtn.setAttribute('aria-expanded', 'false');
    toolsBtn.setAttribute('aria-controls', toolsMenu.id);

    toolsBtn.addEventListener('click', function() {
        const isOpen = toolsMenu.classList.toggle('show');
        toolsBtn.setAttribute('aria-expanded', String(isOpen));
    });
}

const searchInput = document.querySelector('.search-bar input');
const toolCards = document.querySelectorAll('.tools-grid .tool-card');

if (searchInput) {

    searchInput.addEventListener('input', function () {

        const searchValue = searchInput.value.toLowerCase();

        toolCards.forEach(function (card) {
            const searchDescription = card.querySelector('p').textContent.toLowerCase();
            const toolName = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = (toolName.includes(searchValue) || searchDescription.includes(searchValue)) ? 'block' : 'none';
        });
        });
}
