const splitLayout = document.querySelector('.split-layout');
const authPanels = {
    login: document.querySelector('.login-panel'),
    register: document.querySelector('.register-panel')
};
const switchButtons = document.querySelectorAll('.auth-switch');
const forms = document.querySelectorAll('.auth-panel form');

function setAuthMode(isRegister) {
    splitLayout.classList.toggle('is-register', isRegister);
    authPanels.login.setAttribute('aria-hidden', String(isRegister));
    authPanels.register.setAttribute('aria-hidden', String(!isRegister));
    authPanels.login.toggleAttribute('inert', isRegister);
    authPanels.register.toggleAttribute('inert', !isRegister);

    const activePanel = isRegister ? authPanels.register : authPanels.login;
    const firstControl = activePanel.querySelector('input, button');
    setTimeout(() => firstControl.focus({ preventScroll: true }), 350);
}

switchButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setAuthMode(button.closest('.register-panel') === null);
    });
});

forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
});

setAuthMode(false);
