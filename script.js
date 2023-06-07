const carousle = document.querySelector(".carousel");
const firstImage = carousle.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".arrow-div");
const toggleButton = document.querySelectorAll(".toggleBtn");
const li_Elements = document.querySelectorAll(".show-plus");

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let imageWidthDesktop = firstImage.clientWidth + 780;
    let imageWidth = firstImage.clientWidth + 30;

    if (carousle.clientWidth > 800) {
      if (icon.id === "left") {
        carousle.scrollLeft -= imageWidthDesktop;
      } else {
        carousle.scrollLeft += imageWidthDesktop;
      }
    } else {
      if (icon.id === "left") {
        carousle.scrollLeft -= imageWidth;
      } else {
        carousle.scrollLeft += imageWidth;
      }
    }
  });
});

function toggleQuestionArticles(e) {
  let addContainerDiv = e.target.parentNode;
  let removeContainerDiv = addContainerDiv.nextElementSibling;
  let answerDiv = document.querySelector(".div-" + e.target.id);

  if (e.target.classList.contains("show")) {
    addContainerDiv.classList.toggle("hidden");
    removeContainerDiv.classList.toggle("hidden");
    answerDiv.classList.toggle("hidden");
  } else {
    removeContainerDiv = e.target.parentNode;
    addContainerDiv = removeContainerDiv.previousElementSibling;

    addContainerDiv.classList.toggle("hidden");
    removeContainerDiv.classList.toggle("hidden");
    answerDiv.classList.toggle("hidden");
  }
}

function toggleSubmenu(e) {
  const submenu1 = document.querySelector(".sub-menu1");
  const submenu2 = document.querySelector(".sub-menu2");
  console.log(e.target)
  let submenuContainer = e.target.parentNode;
  console.log(e.target,submenuContainer)

  if (submenuContainer.classList.contains("a1")) {
    if (carousle.clientWidth > 800) {
      submenu2.style.display = "none";
    }
    window.getComputedStyle(submenu1).display === "none"
      ? (submenu1.style.display = "flex")
      : (submenu1.style.display = "none");
  } else if (submenuContainer.classList.contains("a2")) {
    if (carousle.clientWidth > 800) {
      submenu1.style.display = "none";
    }
    window.getComputedStyle(submenu2).display === "none"
      ? (submenu2.style.display = "flex")
      : (submenu2.style.display = "none");
  }
}


const menuBtn = document.querySelectorAll(".menu-icon");

function navBarHandler(e) {
  let menuBtnOpenContainer = e.target.parentNode;
  let menuBtnCloseContainer = menuBtnOpenContainer.nextElementSibling;
  const navEl = document.querySelector(".nav-list-container");
  const headerEl = document.querySelector("header");

  if (e.target.classList.contains("menu-open")) {
    navEl.classList.toggle("hidden");
    headerEl.style.borderBottom = "2px solid #F3E401";
    menuBtnOpenContainer.classList.toggle("hidden");
    menuBtnCloseContainer.classList.toggle("hidden");
  } else if (e.target.classList.contains("menu-close")) {
    menuBtnCloseContainer = e.target.parentNode;
    menuBtnOpenContainer = menuBtnCloseContainer.previousElementSibling;

    navEl.classList.toggle("hidden");
    headerEl.style.borderBottom = "none";
    menuBtnOpenContainer.classList.toggle("hidden");
    menuBtnCloseContainer.classList.toggle("hidden");
  }
}

async function loadImages() {
  const response = await fetch("./data/images.json");
  const dataFiles = await response.json();

  const imageElements = document.querySelectorAll("img");
  let width = window.screen.width;

  for (let img of imageElements) {
    for (let data of dataFiles) {
      const urlObject = data.url;

      if (img.classList.contains("img" + data.id) && width >= 801) {
        if (urlObject["default"] !== undefined) {
          img.src = urlObject.default;
          img.alt = data.description;
        } else {
          img.src = data.url.desktop;
          img.alt = data.description;
        }
      } else if (
        img.classList.contains("img" + data.id) &&
        width > 480 &&
        width < 801
      ) {
        if (urlObject["default"] !== undefined) {
          img.src = urlObject.default;
          img.alt = data.description;
        } else {
          img.src = data.url.tablet;
          img.alt = data.description;
        }
      } else if (img.classList.contains("img" + data.id)) {
        if (urlObject["default"] !== undefined) {
          img.src = urlObject.default;
          img.alt = data.description;
        } else {
          img.src = urlObject.mobile;
          img.alt = data.description;
        }
      }
    }
  }
}
loadImages();



li_Elements.forEach((elem) => {
  elem.addEventListener("click", toggleSubmenu);
});

toggleButton.forEach((button) => {
  button.addEventListener("click", toggleQuestionArticles);
});
menuBtn.forEach((button) => {
  button.addEventListener("click", navBarHandler);
});
window.addEventListener("resize", function () {
  "use strict";
  window.location.reload();
});
