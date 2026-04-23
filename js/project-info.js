const PROJECT_INFO_TEXT = {
  vi: {
    title: "Thông tin đồ án",
    heroKicker: "THÔNG TIN ĐỒ ÁN",
    heroTitle: "Thông tin đồ án website thời trang HADES",
    heroLead:
      "Trang này tổng hợp thông tin sinh viên thực hiện và giảng viên hướng dẫn của đồ án.",
    student1: "Sinh viên 1",
    student2: "Sinh viên 2",
    lecturerKicker: "GIẢNG VIÊN",
    lecturerTitle: "Giảng viên hướng dẫn",
    studentId: "MSSV",
    lecturerNote: "Giảng viên hướng dẫn đồ án",
    footerDesc:
      "Streetwear brand mang phong cách hiện đại, cá tính và đậm chất riêng.",
  },
  en: {
    title: "Project Information",
    heroKicker: "PROJECT INFORMATION",
    heroTitle: "HADES fashion website project information",
    heroLead:
      "This page summarizes the students who built the project and the lecturers who supervised it.",
    student1: "Student 1",
    student2: "Student 2",
    lecturerKicker: "LECTURERS",
    lecturerTitle: "Supervising lecturers",
    studentId: "Student ID",
    lecturerNote: "Project supervisor",
    footerDesc:
      "A modern streetwear brand with a distinct, confident personality.",
  },
};

function getProjectInfoLanguage() {
  return localStorage.getItem("language") === "en" ? "en" : "vi";
}

function p(key) {
  return PROJECT_INFO_TEXT[getProjectInfoLanguage()][key];
}

function updateProjectInfoText() {
  const lang = getProjectInfoLanguage();
  document.documentElement.lang = lang;

  const heroKicker = document.querySelector(".project-info-hero .project-info-kicker");
  const heroTitle = document.querySelector(".project-info-hero h1");
  const heroLead = document.querySelector(".project-info-hero .project-info-lead");
  const cardLabels = document.querySelectorAll(".project-info-card .project-info-label");
  const cardIds = document.querySelectorAll(".project-info-card p:not(.project-info-label)");
  const sectionKicker = document.querySelector(".project-info-section-head .project-info-kicker");
  const sectionTitle = document.querySelector(".project-info-section-head h2");
  const guideCards = document.querySelectorAll(".project-info-guide-card");
  const footerDesc = document.querySelector(".footer-desc");

  if (document.title) {
    document.title = p("title");
  }

  if (heroKicker) {
    heroKicker.textContent = p("heroKicker");
  }

  if (heroTitle) {
    heroTitle.textContent = p("heroTitle");
  }

  if (heroLead) {
    heroLead.textContent = p("heroLead");
  }

  if (cardLabels[0]) {
    cardLabels[0].textContent = p("student1");
  }

  if (cardLabels[1]) {
    cardLabels[1].textContent = p("student2");
  }

  if (cardIds[0]) {
    cardIds[0].textContent = `${p("studentId")}: 24660841`;
  }

  if (cardIds[1]) {
    cardIds[1].textContent = `${p("studentId")}: 24650951`;
  }

  if (sectionKicker) {
    sectionKicker.textContent = p("lecturerKicker");
  }

  if (sectionTitle) {
    sectionTitle.textContent = p("lecturerTitle");
  }

  if (guideCards[0]) {
    const title = guideCards[0].querySelector("h3");
    const desc = guideCards[0].querySelector("p");

    if (title) {
      title.textContent = "Nguyễn Thị Hồng Lương";
    }

    if (desc) {
      desc.textContent = p("lecturerNote");
    }
  }

  if (guideCards[1]) {
    const title = guideCards[1].querySelector("h3");
    const desc = guideCards[1].querySelector("p");

    if (title) {
      title.textContent = "Nguyễn Ngọc Lễ";
    }

    if (desc) {
      desc.textContent = p("lecturerNote");
    }
  }

  if (footerDesc) {
    footerDesc.textContent = p("footerDesc");
  }
}

function initProjectInfoPage() {
  updateProjectInfoText();

  window.addEventListener("languagechange", updateProjectInfoText);
  window.addEventListener("storage", (event) => {
    if (event.key === "language") {
      updateProjectInfoText();
    }
  });
}

initProjectInfoPage();
