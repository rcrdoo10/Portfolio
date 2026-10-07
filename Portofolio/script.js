if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

let progress = 0;
const bar = document.getElementById("bar");
const percent = document.getElementById("percent");
const loadingPage = document.getElementById("loadingPage");
const navbar = document.getElementById("navbar");
const heroPhoto = document.getElementById("heroPhoto");

const interval = setInterval(() => {
  progress++;
  bar.style.width = progress + "%";
  percent.textContent = progress + "%";

  if (progress >= 100) {
    clearInterval(interval);

    setTimeout(() => {
      loadingPage.classList.add("slide-up");

      setTimeout(() => {
        navbar.classList.add("show");
        heroPhoto.classList.add("show");
        startTyping();
        document.body.classList.remove("loading");
      }, 600);
    }, 400);
  }
}, 30);

const words = ["Web Development", "Data Analyst", "Machine Learning"];
const typingText = document.getElementById("typingText");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startTyping() {
  type();
}

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 500;
  }

  setTimeout(type, speed);
}

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-tab");

    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById("tab-" + target).classList.add("active");
  });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar ul li a");
  let current = "";

  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
