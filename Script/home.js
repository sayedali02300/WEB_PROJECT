// home.js
window.addEventListener("load", () => {
  const form = document.querySelector("form");
  const errorDiv = document.getElementById("formMessage");
  const parentBox = document.getElementById("firstlogindiv");

  // check if already logged
  const storedData = sessionStorage.getItem("formData");
  const userData = storedData ? JSON.parse(storedData) : {};

  const isRegistered =
    userData.firstName?.trim() &&
    userData.lastName?.trim() &&
    userData.mobile?.trim();

  if (isRegistered) {
    parentBox.innerHTML = makeWelcomeCard(userData.firstName, userData.lastName, userData.mobile);
    return;
  }

  // if not logged yet:
  if (!form) return;

  errorDiv.style.display = "none";
  errorDiv.textContent = "";

  form.addEventListener("submit", e => {
    e.preventDefault();
    const firstName = document.getElementById("firstName")?.value?.trim() ?? "";
    const lastName = document.getElementById("lastName")?.value?.trim() ?? "";
    const mobile = document.getElementById("mobile")?.value?.trim() ?? "";

    const Errors = [];

    if (firstName === "") {
      Errors.push("First name is required.");
    }
    if (lastName === "") {
      Errors.push("Last name is required.");
    }
    if (mobile === "") {
      Errors.push("Mobile number is required.");
    } else if (!/^\+?\d{6,15}$/.test(mobile)) {
      Errors.push("Mobile looks invalid.");
    }

    if (Errors.length > 0) {
      errorDiv.innerHTML = Errors.join("<br>");
      errorDiv.style.display = "block";
    } else {
      sessionStorage.setItem(
        "formData",
        JSON.stringify({ firstName, lastName, mobile })
      );
      // reload so navbar + other pages know you're 'logged'
      window.location.reload();
    }
  });

  function makeWelcomeCard(fn, ln, mobile) {
    return `
      <div id="welcomeCard" class="p-3">
        <div class="d-flex flex-column">
          <div class="text-accent fw-semibold text-uppercase small mb-2">You're in</div>
          <div class="welcome-name mb-1">${fn} ${ln}</div>
          <div class="welcome-mobile">Mobile: ${mobile}</div>
        </div>

        <hr class="border-secondary my-3" />

        <div class="meta-text mb-2">Unlocked:</div>
        <ul class="list-unstyled small mb-3">
          <li>• Match Analysis (tactics)</li>
          <li>• Premium transfer rumors</li>
          <li>• Full table & form guide</li>
        </ul>

        <a class="btn btn-accent w-100 fw-semibold" href="programming_basics.html">
          Go to Match Analysis
        </a>
      </div>
    `;
  }
});
