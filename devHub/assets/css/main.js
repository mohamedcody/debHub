const toolsBtn = document.getElementById('tools-btn');
const toolsMenu = document.getElementById('sub-menu');

if (toolsBtn && toolsMenu) {
    toolsBtn.setAttribute('aria-expanded', 'false');
    toolsBtn.setAttribute('aria-controls', toolsMenu.id);

    toolsBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const isOpen = toolsMenu.classList.toggle('show');
        toolsBtn.setAttribute('aria-expanded', String(isOpen));
    });
}
