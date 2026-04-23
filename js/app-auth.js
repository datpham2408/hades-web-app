function setAuthMode(mode) {
  localStorage.setItem(STORAGE_KEYS.authMode, mode);

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.style.display = mode === "login" ? "block" : "none";
  }

  if (registerForm) {
    registerForm.style.display = mode === "register" ? "block" : "none";
  }
}

function showRegister() {
  setAuthMode("register");
}

function showLogin() {
  setAuthMode("login");
}

function getRegisterFieldElements() {
  return {
    name: document.getElementById("register-name"),
    phone: document.getElementById("register-phone"),
    email: document.getElementById("register-email"),
    birthdate: document.getElementById("register-birthdate"),
    gender: document.getElementById("register-gender"),
    password: document.getElementById("register-password"),
  };
}

function setFieldError(fieldName, message = "") {
  const input = document.getElementById(`register-${fieldName}`);
  const error = document.getElementById(`register-${fieldName}-error`);

  if (input) {
    input.classList.toggle("is-invalid", Boolean(message));
  }

  if (error) {
    error.textContent = message;
  }
}

function clearRegisterErrors() {
  AUTH_FIELDS.forEach((field) => {
    setFieldError(field, "");
  });

  const success = document.getElementById("register-success");

  if (success) {
    success.textContent = "";
  }
}

function getAgeFromBirthdate(value) {
  if (!value) {
    return 0;
  }

  const today = new Date();
  const birthdate = new Date(value);
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function validateRegisterForm() {
  const fields = getRegisterFieldElements();

  if (Object.values(fields).some((field) => !field)) {
    return false;
  }

  clearRegisterErrors();

  const name = fields.name.value.trim().replace(/\s+/g, " ");
  const phone = fields.phone.value.trim();
  const email = fields.email.value.trim();
  const birthdate = fields.birthdate.value;
  const gender = fields.gender.value;
  const password = fields.password.value;

  let isValid = true;

  if (name.length < 2) {
    setFieldError("name", AUTH_MESSAGES.nameMin);
    isValid = false;
  } else if (name.split(" ").length < 2) {
    setFieldError("name", AUTH_MESSAGES.nameFull);
    isValid = false;
  }

  if (!/^0\d{9}$/.test(phone)) {
    setFieldError("phone", AUTH_MESSAGES.phone);
    isValid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError("email", AUTH_MESSAGES.email);
    isValid = false;
  }

  if (!birthdate) {
    setFieldError("birthdate", AUTH_MESSAGES.birthdateRequired);
    isValid = false;
  } else if (new Date(birthdate) > new Date()) {
    setFieldError("birthdate", AUTH_MESSAGES.birthdateInvalid);
    isValid = false;
  } else if (getAgeFromBirthdate(birthdate) < 15) {
    setFieldError("birthdate", AUTH_MESSAGES.birthdateAge);
    isValid = false;
  }

  if (!gender) {
    setFieldError("gender", AUTH_MESSAGES.gender);
    isValid = false;
  }

  if (password.length < 8) {
    setFieldError("password", AUTH_MESSAGES.passwordMin);
    isValid = false;
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    setFieldError("password", AUTH_MESSAGES.passwordRule);
    isValid = false;
  }

  if (!isValid) {
    return false;
  }

  const success = document.getElementById("register-success");

  if (success) {
    success.textContent = AUTH_MESSAGES.success;
  }

  writeStorage(STORAGE_KEYS.registeredUser, {
    fullName: name,
    phone,
    email,
    birthdate,
    gender,
  });

  return true;
}

function initAuthForm() {
  const registerForm = document.getElementById("register-form");

  if (!registerForm) {
    return;
  }

  const savedMode = localStorage.getItem(STORAGE_KEYS.authMode) || "login";
  setAuthMode(savedMode === "register" ? "register" : "login");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateRegisterForm()) {
      window.setTimeout(showLogin, 900);
    }
  });

  registerForm.addEventListener("input", (event) => {
    if (event.target.id?.startsWith("register-")) {
      const fieldName = event.target.id.replace("register-", "");
      setFieldError(fieldName, "");
    }
  });
}

function openForgot() {
  const forgotModal = document.getElementById("forgotModal");

  if (forgotModal) {
    forgotModal.style.display = "flex";
  }
}

function closeForgot() {
  const forgotModal = document.getElementById("forgotModal");

  if (forgotModal) {
    forgotModal.style.display = "none";
  }
}
