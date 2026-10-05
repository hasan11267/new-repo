(() => {
  const dialog = document.createElement('dialog');
  dialog.className = 'auth-dialog';
  dialog.id = 'authDialog';
  dialog.setAttribute('aria-labelledby', 'authTitle');
  dialog.innerHTML = `
    <section class="auth-panel">
      <button class="auth-close" type="button" aria-label="Close login dialog">&times;</button>
      <div class="auth-brand"><img src="images/logo-icon.svg" alt=""><span>Fresh<span>Find</span></span></div>
      <h2 id="authTitle">Welcome back</h2>
      <p class="auth-description">Sign in to your FreshFind account.</p>
      <div class="auth-tabs" role="tablist" aria-label="Account access">
        <button type="button" role="tab" id="loginTab" aria-selected="true">Log in</button>
        <button type="button" role="tab" id="registerTab" aria-selected="false">Create account</button>
      </div>
      <form id="loginForm" class="auth-form">
        <label for="loginEmail">Email address</label>
        <input id="loginEmail" name="email" type="email" autocomplete="email" required>
        <label for="loginPassword">Password</label>
        <input id="loginPassword" name="password" type="password" autocomplete="current-password" required>
        <button class="auth-submit" type="submit">Log in</button>
      </form>
      <form id="registerForm" class="auth-form hidden">
        <label for="registerName">Full name</label>
        <input id="registerName" name="name" type="text" autocomplete="name" required>
        <label for="registerEmail">Email address</label>
        <input id="registerEmail" name="email" type="email" autocomplete="email" required>
        <label for="registerPassword">Password</label>
        <input id="registerPassword" name="password" type="password" autocomplete="new-password" minlength="8" required>
        <button class="auth-submit" type="submit">Create account</button>
      </form>
      <p class="auth-feedback" id="authFeedback" role="status" aria-live="polite"></p>
      <p class="auth-demo-note">Account access is a demo and is not connected to a server.</p>
    </section>`;
  document.body.append(dialog);

  const loginForm = dialog.querySelector('#loginForm');
  const registerForm = dialog.querySelector('#registerForm');
  const loginTab = dialog.querySelector('#loginTab');
  const registerTab = dialog.querySelector('#registerTab');
  const feedback = dialog.querySelector('#authFeedback');
  const title = dialog.querySelector('#authTitle');
  const description = dialog.querySelector('.auth-description');

  function showForm(mode) {
    const registering = mode === 'register';
    loginForm.classList.toggle('hidden', registering);
    registerForm.classList.toggle('hidden', !registering);
    loginTab.setAttribute('aria-selected', String(!registering));
    registerTab.setAttribute('aria-selected', String(registering));
    title.textContent = registering ? 'Join FreshFind' : 'Welcome back';
    description.textContent = registering
      ? 'Create an account to get started.'
      : 'Sign in to your FreshFind account.';
    feedback.textContent = '';
  }

  document.querySelectorAll('#loginBtn').forEach(button => {
    button.addEventListener('click', () => {
      showForm('login');
      dialog.showModal();
    });
  });

  loginTab.addEventListener('click', () => showForm('login'));
  registerTab.addEventListener('click', () => showForm('register'));
  dialog.querySelector('.auth-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  [loginForm, registerForm].forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      feedback.textContent = 'This demo does not create accounts or verify sign-ins yet.';
    });
  });
})();