window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", function(event) {
  window.history.pushState(null, "", window.location.href);
});


document.querySelectorAll(".collapsible-header").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });
});

const links = document.querySelectorAll(".collapsible-content a");
let visitedCount = 0;
const totalLinks = links.length;

links.forEach((link) => {
  const key = `visited-${link.href}`;
  if (localStorage.getItem(key)) {
    link.classList.add("visited");
    visitedCount++;
  }

  link.addEventListener("click", () => {
    localStorage.setItem(key, "true");
    link.classList.add("visited");
  });
});

function updateProgressBar() {
  const bar = document.getElementById("progress-bar");
  const visitedLinks = document.querySelectorAll(".visited").length;
  const progress = Math.floor((visitedLinks / totalLinks) * 100);
  bar.style.width = `${progress}%`;
}

updateProgressBar();


