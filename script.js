document.addEventListener('DOMContentLoaded', () => {
    // --- INDEX.HTML LOGIKASI ---
    let authForm = document.getElementById('authForm');
    if (authForm) {
        let emailInput = document.getElementById('emailInput');
        let passwordInput = document.getElementById('passwordInput');
        let titleText = document.getElementById('titleText');
        let subTitleText = document.getElementById('subTitleText');
        let submitBtn = document.getElementById('submitBtn');
        let toggleMode = document.getElementById('toggleMode');
        let switchText = document.getElementById('switchText');
        let errorBox = document.getElementById('errorBox');

        let isSignUp = false;

        // Rejimni almashtirish (Sign In <-> Create Account)
        toggleMode.addEventListener('click', () => {
            isSignUp = !isSignUp;
            errorBox.style.display = 'none';
            if (isSignUp) {
                titleText.textContent = "Create account";
                subTitleText.textContent = "Sign up to get started";
                submitBtn.textContent = "Sign up";
                switchText.innerHTML = `Already have an account? <a id="toggleMode">Sign in</a>`;
            } else {
                titleText.textContent = "Welcome back";
                subTitleText.textContent = "Sign in to continue to your dashboard";
                submitBtn.textContent = "Sign in";
                switchText.innerHTML = `No account yet? <a id="toggleMode">Create one</a>`;
            }
            // Yangi yaratilgan elementga qaytadan hodisa biriktirish
            document.getElementById('toggleMode').addEventListener('click', arguments.callee);
        });

        // Formani tasdiqlash
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let email = emailInput.value.trim();
            let password = passwordInput.value.trim();
            errorBox.style.display = 'none';

            let users = JSON.parse(localStorage.getItem('signal_users')) || [];

            if (isSignUp) {
                let existingUser = users.find(u => u.email === email);
                if (existingUser) {
                    errorBox.textContent = "Bu email allaqachon ro'yxatdan o'tgan!";
                    errorBox.style.display = 'block';
                    return;
                }

                users.push({ email, password });
                localStorage.setItem('signal_users', JSON.stringify(users));
                localStorage.setItem('signal_current_user', email);
                window.location.href = 'dashboard.html';
            } else {
                let validUser = users.find(u => u.email === email && u.password === password);
                if (!validUser) {
                    errorBox.textContent = "Email yoki parol xato, yoki bunday account yo'q!";
                    errorBox.style.display = 'block';
                    return;
                }

                localStorage.setItem('signal_current_user', email);
                window.location.href = 'dashboard.html';
            }
        });
    }

    // --- DASHBOARD.HTML LOGIKASI ---
    let logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        let currentUser = localStorage.getItem('signal_current_user');
        if (!currentUser) {
            window.location.href = 'index.html';
        } else {
            let emailDisplay = document.getElementById('userEmailDisplay');
            if (emailDisplay) {
                emailDisplay.textContent = `Hisob: ${currentUser}`;
            }
        }

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('signal_current_user');
            window.location.href = 'index.html';
        });
    }
}); 
