// main.js
window.addEventListener("load", async () => {
  // load navbar
  const response = await fetch("navbar.html");
  const data = await response.text();
  document.getElementById("navbar-placeholder").innerHTML = data;

  // wait 1 tick so navbar is in DOM before we query it
  await new Promise(r => setTimeout(r, 0));

  // read login data
  const storedData = sessionStorage.getItem("formData");
  const userData = storedData ? JSON.parse(storedData) : {};

  const isRegistered =
    userData.firstName?.trim() &&
    userData.lastName?.trim() &&
    userData.mobile?.trim();

  const navList = document.querySelector(".navbar-nav");
  if (!navList) return;

  const navLinks = navList.querySelectorAll("a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    const li = link.closest("li");

    // public pages that should always show:
    const alwaysAllowed = [
      "home.html",
      "our-story.html"
    ];

    if (!isRegistered && !alwaysAllowed.includes(href)) {
      // hide locked stuff
      li.style.display = "none";
    } else {
      li.style.display = "block";
    }
  });
});
