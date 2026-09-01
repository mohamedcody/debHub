// the button named tools how to hte show the style in the click the show 
const toolsBtn = document.getElementById('tools-btn');
const toolsMenu = document.getElementById('sub-menu');

toolsBtn.addEventListener('click', function(event) {
    event.preventDefault(); // 
    toolsMenu.classList.toggle('show');
});
