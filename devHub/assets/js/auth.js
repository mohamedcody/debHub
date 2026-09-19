const forms = document.querySelectorAll('form');
const passwordToggles = document.querySelectorAll('.password-toggle');
const forgotLink = document.querySelector('.forgot-link');
const socialButtons = document.querySelectorAll('.social-login button');

function showStatus(form, message, type = '') {
    const status = form.parentElement.querySelector('.form-status');

    status.textContent = message;
    status.className = `form-status${type ? ` is-${type}` : ''}`;
}

forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const invalidControl = [...form.elements].find((control) => !control.checkValidity());

        if (invalidControl) {
            showStatus(form, invalidControl.validationMessage, 'error');
            invalidControl.focus();
            return;
        }

        showStatus(form, 'The form is valid. Connect your API to continue.', 'success');
    });
});

passwordToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        const input = toggle.parentElement.querySelector('input');
        const icon = toggle.querySelector('i');
        const isVisible = input.type === 'text';

        input.type = isVisible ? 'password' : 'text';
        toggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
        toggle.setAttribute('aria-pressed', String(!isVisible));
        icon.classList.toggle('fa-eye', isVisible);
        icon.classList.toggle('fa-eye-slash', !isVisible);
    });
});

if (forgotLink) {
    forgotLink.addEventListener('click', (event) => {
        event.preventDefault();
        showStatus(forgotLink.closest('.auth-panel').querySelector('form'), 'Password recovery will be connected when the API is available.');
    });
}

socialButtons.forEach((button) => {
    button.addEventListener('click', () => {
        showStatus(button.closest('.auth-panel').querySelector('form'), 'Social login is not connected yet.');
    });
});
