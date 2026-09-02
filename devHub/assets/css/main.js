// the button named tools how to hte show the style in the click the show 
const toolsBtn = document.getElementById('tools-btn');
const toolsMenu  = document.getElementById('sub-menu');

toolsBtn.setAttribute('aria-expanded', 'false');
toolsBtn.setAttribute('aria-controls', 'sub-menu');


// click the button the show the style in the click the show 
toolsBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const isOpen = toolsMenu.classList.toggle('show');
    toolsBtn.setAttribute('aria-expanded', String(isOpen));
});
