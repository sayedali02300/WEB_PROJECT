window.addEventListener("load", async () => {
  const response = await fetch("navbar.html");
  const data = await response.text();
  document.getElementById("navbar-placeholder").innerHTML = data;

  await new Promise(r => setTimeout(r, 0));

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

    if (!isRegistered && href !== "home.html" && href !== "our-story.html") {
      li.style.display = "none";
    } else {
      li.style.display = "block";
    }
  });
});
