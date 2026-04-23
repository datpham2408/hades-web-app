const AUTH_I18N = {
  vi: {
    title: "Tài khoản",
    home: "Trang chủ",
    projectInfo: "Thông tin",
    registerTitle: "Đăng ký",
    registerNameLabel: "Họ và tên *",
    registerNamePlaceholder: "Nhập họ tên tại đây",
    registerPhoneLabel: "Số điện thoại *",
    registerPhonePlaceholder: "Nhập số điện thoại tại đây",
    registerEmailLabel: "Email *",
    registerEmailPlaceholder: "Thông tin này cần bắt buộc",
    registerBirthdateLabel: "Ngày sinh *",
    registerGenderLabel: "Giới tính *",
    registerGenderPlaceholder: "Chọn giới tính",
    registerGenderMale: "Nam",
    registerGenderFemale: "Nữ",
    registerPasswordLabel: "Mật khẩu *",
    registerPasswordPlaceholder: "Mật khẩu",
    registerSubmit: "Đăng ký",
    registerSwitch: "Bạn đã có tài khoản? Đăng nhập tại đây",
    loginTitle: "Đăng nhập",
    loginPhoneLabel: "Số điện thoại *",
    loginPhonePlaceholder: "Số điện thoại",
    loginPasswordLabel: "Mật khẩu *",
    loginPasswordPlaceholder: "Mật khẩu",
    loginForgot: "Quên thông tin tài khoản",
    loginSubmit: "Đăng nhập",
    loginSwitch: "Bạn chưa có tài khoản? Đăng ký ngay",
    forgotTitle: "Quên mật khẩu",
    forgotPlaceholder: "Email/SĐT...",
    forgotSubmit: "Gửi yêu cầu",
    modalClose: "Đóng",
    nameMin: "Họ tên phải có ít nhất 2 ký tự.",
    nameFull: "Vui lòng nhập đầy đủ họ và tên.",
    phone: "Số điện thoại phải gồm 10 số và bắt đầu bằng 0.",
    email: "Email không đúng định dạng.",
    birthdateRequired: "Vui lòng chọn ngày sinh.",
    birthdateInvalid: "Ngày sinh không hợp lệ.",
    birthdateAge: "Bạn phải từ 15 tuổi trở lên.",
    gender: "Vui lòng chọn giới tính.",
    passwordMin: "Mật khẩu phải có ít nhất 8 ký tự.",
    passwordRule: "Mật khẩu cần có cả chữ và số.",
    success: "Đăng ký hợp lệ. Bạn có thể đăng nhập.",
  },
  en: {
    title: "Account",
    home: "Home",
    projectInfo: "Project Info",
    registerTitle: "Sign Up",
    registerNameLabel: "Full name *",
    registerNamePlaceholder: "Enter your full name",
    registerPhoneLabel: "Phone number *",
    registerPhonePlaceholder: "Enter your phone number",
    registerEmailLabel: "Email *",
    registerEmailPlaceholder: "This field is required",
    registerBirthdateLabel: "Date of birth *",
    registerGenderLabel: "Gender *",
    registerGenderPlaceholder: "Choose gender",
    registerGenderMale: "Male",
    registerGenderFemale: "Female",
    registerPasswordLabel: "Password *",
    registerPasswordPlaceholder: "Password",
    registerSubmit: "Sign Up",
    registerSwitch: "Already have an account? Sign in here",
    loginTitle: "Sign In",
    loginPhoneLabel: "Phone number *",
    loginPhonePlaceholder: "Phone number",
    loginPasswordLabel: "Password *",
    loginPasswordPlaceholder: "Password",
    loginForgot: "Forgot account details",
    loginSubmit: "Sign In",
    loginSwitch: "Don't have an account? Sign up now",
    forgotTitle: "Forgot password",
    forgotPlaceholder: "Email/Phone...",
    forgotSubmit: "Send request",
    modalClose: "Close",
    nameMin: "Full name must be at least 2 characters.",
    nameFull: "Please enter your full name.",
    phone: "Phone number must be 10 digits and start with 0.",
    email: "Email format is invalid.",
    birthdateRequired: "Please choose a date of birth.",
    birthdateInvalid: "Date of birth is invalid.",
    birthdateAge: "You must be at least 15 years old.",
    gender: "Please choose a gender.",
    passwordMin: "Password must be at least 8 characters.",
    passwordRule: "Password must include letters and numbers.",
    success: "Registration is valid. You can sign in now.",
  },
};
function getAuthLanguage() {
  return localStorage.getItem(STORAGE_KEYS.language) === "en" ? "en" : "vi";
}

function ai(key) {
  return AUTH_I18N[getAuthLanguage()][key];
}

function setAuthMode(mode) {
  localStorage.setItem(STORAGE_KEYS.authMode, mode);

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const modeButtons = document.querySelectorAll(".auth-mode-btn");

  if (loginForm) {
    loginForm.style.display = mode === "login" ? "block" : "none";
  }

  if (registerForm) {
    registerForm.style.display = mode === "register" ? "block" : "none";
  }

  modeButtons.forEach((button, index) => {
    const isActive = (index === 0 && mode === "login") || (index === 1 && mode === "register");
    button.classList.toggle("active", isActive);
  });
}

function showRegister() {
  setAuthMode("register");
}

function showLogin() {
  setAuthMode("login");
}

function updateAuthText() {
  const lang = getAuthLanguage();
  document.documentElement.lang = lang;

  const title = document.querySelector("title");
  const homeLink = document.querySelector('.auth-nav a[href="../index.html"]');
  const infoLink = document.querySelector('.auth-nav a[href="project-info.html"]');
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const forgotModal = document.getElementById("forgotModal");

  if (title) {
    title.textContent = ai("title");
  }

  if (homeLink) {
    homeLink.textContent = ai("home");
  }

  if (infoLink) {
    infoLink.textContent = ai("projectInfo");
  }

  if (registerForm) {
    const labels = registerForm.querySelectorAll("label");
    const inputs = registerForm.querySelectorAll("input");
    const pNodes = registerForm.querySelectorAll("p");
    const genderSelect = document.getElementById("register-gender");
    const submitButton = registerForm.querySelector('button[type="submit"]');
    const heading = registerForm.querySelector("h2");
    const switchText = pNodes[pNodes.length - 1];

    if (heading) heading.textContent = ai("registerTitle");
    if (labels[0]) labels[0].textContent = ai("registerNameLabel");
    if (labels[1]) labels[1].textContent = ai("registerPhoneLabel");
    if (labels[2]) labels[2].textContent = ai("registerEmailLabel");
    if (labels[3]) labels[3].textContent = ai("registerBirthdateLabel");
    if (labels[4]) labels[4].textContent = ai("registerGenderLabel");
    if (labels[5]) labels[5].textContent = ai("registerPasswordLabel");
    if (inputs[0]) inputs[0].placeholder = ai("registerNamePlaceholder");
    if (inputs[1]) inputs[1].placeholder = ai("registerPhonePlaceholder");
    if (inputs[2]) inputs[2].placeholder = ai("registerEmailPlaceholder");
    if (inputs[5]) inputs[5].placeholder = ai("registerPasswordPlaceholder");
    if (genderSelect) {
      genderSelect.options[0].textContent = ai("registerGenderPlaceholder");
      genderSelect.options[1].textContent = ai("registerGenderMale");
      genderSelect.options[2].textContent = ai("registerGenderFemale");
    }
    if (submitButton) submitButton.textContent = ai("registerSubmit");
    if (switchText) switchText.textContent = ai("registerSwitch");
  }

  if (loginForm) {
    const labels = loginForm.querySelectorAll("label");
    const inputs = loginForm.querySelectorAll("input");
    const pNodes = loginForm.querySelectorAll("p");
    const heading = loginForm.querySelector("h2");
    const forgotText = loginForm.querySelector(".forgot");
    const submitButton = loginForm.querySelector('button[type="button"]');
    const switchText = pNodes[pNodes.length - 1];

    if (heading) heading.textContent = ai("loginTitle");
    if (labels[0]) labels[0].textContent = ai("loginPhoneLabel");
    if (labels[1]) labels[1].textContent = ai("loginPasswordLabel");
    if (inputs[0]) inputs[0].placeholder = ai("loginPhonePlaceholder");
    if (inputs[1]) inputs[1].placeholder = ai("loginPasswordPlaceholder");
    if (forgotText) forgotText.textContent = ai("loginForgot");
    if (submitButton) submitButton.textContent = ai("loginSubmit");
    if (switchText) switchText.textContent = ai("loginSwitch");
  }

  if (forgotModal) {
    const heading = forgotModal.querySelector("h2");
    const input = forgotModal.querySelector("input");
    const button = forgotModal.querySelector("button");
    const closeBtn = forgotModal.querySelector(".close-btn");

    if (heading) heading.textContent = ai("forgotTitle");
    if (input) input.placeholder = ai("forgotPlaceholder");
    if (button) button.textContent = ai("forgotSubmit");
    if (closeBtn) closeBtn.setAttribute("aria-label", ai("modalClose"));
  }
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
    input.setAttribute("aria-invalid", String(Boolean(message)));
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

function getRegisterFieldErrorMessage(fieldName, value) {
  const trimmedValue = value.trim();

  switch (fieldName) {
    case "name":
      if (!trimmedValue) {
        return ai("nameFull");
      }

      if (trimmedValue.length < 2) {
        return ai("nameMin");
      }

      if (trimmedValue.split(" ").length < 2) {
        return ai("nameFull");
      }

      return "";
    case "phone":
      if (!trimmedValue) {
        return ai("phone");
      }

      if (!/^0\d{9}$/.test(trimmedValue)) {
        return ai("phone");
      }

      return "";
    case "email":
      if (!trimmedValue) {
        return ai("email");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        return ai("email");
      }

      return "";
    case "birthdate":
      if (!trimmedValue) {
        return ai("birthdateRequired");
      }

      if (new Date(trimmedValue) > new Date()) {
        return ai("birthdateInvalid");
      }

      if (getAgeFromBirthdate(trimmedValue) < 15) {
        return ai("birthdateAge");
      }

      return "";
    case "gender":
      return trimmedValue ? "" : ai("gender");
    case "password":
      if (!trimmedValue) {
        return ai("passwordMin");
      }

      if (trimmedValue.length < 8) {
        return ai("passwordMin");
      }

      if (!/[A-Za-z]/.test(trimmedValue) || !/\d/.test(trimmedValue)) {
        return ai("passwordRule");
      }

      return "";
    default:
      return "";
  }
}

function validateRegisterField(fieldName) {
  const field = document.getElementById(`register-${fieldName}`);

  if (!field) {
    return true;
  }

  const message = getRegisterFieldErrorMessage(fieldName, field.value);

  setFieldError(fieldName, message);

  return message === "";
}

function validateRegisterForm() {
  const fields = getRegisterFieldElements();

  if (Object.values(fields).some((field) => !field)) {
    return false;
  }

  clearRegisterErrors();

  let isValid = true;
  const fieldNames = ["name", "phone", "email", "birthdate", "gender", "password"];

  fieldNames.forEach((fieldName) => {
    if (!validateRegisterField(fieldName)) {
      isValid = false;
    }
  });

  if (!isValid) {
    return false;
  }

  const name = fields.name.value.trim().replace(/\s+/g, " ");
  const phone = fields.phone.value.trim();
  const email = fields.email.value.trim();
  const birthdate = fields.birthdate.value;
  const gender = fields.gender.value;
  const password = fields.password.value;
  const success = document.getElementById("register-success");

  if (success) {
    success.textContent = ai("success");
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
  updateAuthText();

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateRegisterForm()) {
      window.setTimeout(showLogin, 900);
    }
  });

  ["name", "phone", "email", "password"].forEach((fieldName) => {
    const field = document.getElementById(`register-${fieldName}`);

    if (!field) {
      return;
    }

    field.addEventListener("input", () => {
      validateRegisterField(fieldName);
      const success = document.getElementById("register-success");

      if (success) {
        success.textContent = "";
      }
    });

    field.addEventListener("blur", () => {
      validateRegisterField(fieldName);
    });
  });

  ["birthdate", "gender"].forEach((fieldName) => {
    const field = document.getElementById(`register-${fieldName}`);

    if (!field) {
      return;
    }

    field.addEventListener("change", () => {
      validateRegisterField(fieldName);
      const success = document.getElementById("register-success");

      if (success) {
        success.textContent = "";
      }
    });

    field.addEventListener("blur", () => {
      validateRegisterField(fieldName);
    });
  });

  window.addEventListener("languagechange", updateAuthText);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEYS.language) {
      updateAuthText();
      clearRegisterErrors();
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

