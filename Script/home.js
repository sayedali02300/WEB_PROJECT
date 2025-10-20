window.addEventListener("load", () => {
  const form = document.querySelector("form");
  const errorDiv = document.getElementById("formMessage");
  errorDiv.textContent = "";
  const logged = document.getElementById("firstlogindiv");

  const storedData = sessionStorage.getItem("formData");
  const userData = storedData ? JSON.parse(storedData) : {};

  const isRegistered =
    userData.firstName?.trim() &&
    userData.lastName?.trim() &&
    userData.mobile?.trim();

  if (isRegistered) {
    logged.innerHTML = `
      <div class="text-center mt-3">
        <img id="robotimg" src="../Images/robot.webp" class="img-fluid mb-3" style="max-width: 100px;">
      </div>

      <div id="sucessdiv" class="text-center text-light p-3 rounded d-block my-0 mx-auto">
        <p>You are already registered, ${userData.firstName}!</p>
        <p>Click the toggle to explore our services</p>
      </div>

      <div class="card bg-light text-dark p-3 mb-4 mt-4 mx-auto" style="max-width: 600px;">
        <h5>Tip of the day</h5>
        <p>Remember to practice HTML and CSS every day. Small steps build big skills!</p>
      </div>

      <div class="text-center">
        <button id="newAccountBtn" class="btn btn-warning mb-4">Register with another account?</button>
      </div>
    `;

    setTimeout(() => {
      const btn = document.getElementById("newAccountBtn");
      if (btn) {
        btn.addEventListener("click", () => {
          sessionStorage.removeItem("formData");
          const first = document.getElementById("firstName");
          const last = document.getElementById("lastName");
          const mobile = document.getElementById("mobile");
          if (first) first.value = "";
          if (last) last.value = "";
          if (mobile) mobile.value = "";
          window.location.reload();
        });
      }
    }, 0);

    return;
}



  errorDiv.classList.remove("bg-success", "bg-danger", "p-3");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    errorDiv.textContent = "";
    errorDiv.classList.remove("bg-success");
    errorDiv.classList.add("bg-danger");

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    function isDigits(str) {
      return [...str].every((ch) => ch >= "0" && ch <= "9");
    }
    const Errors = [];

    if (firstName.length < 3 || lastName.length < 3) {
      Errors.push(
        "First and last names must each be at least three characters long"
      );
    }
    if (mobile.length !== 8 || !isDigits(mobile)) {
      Errors.push("Mobile No. must be numbers and contain exactly 8 digits");
    }

    if (Errors.length > 0) {
      errorDiv.innerHTML = Errors.join("<br><br>");
      errorDiv.classList.remove("p-2");
      errorDiv.classList.add("p-3");
    } else {
      sessionStorage.setItem(
        "formData",
        JSON.stringify({ firstName, lastName, mobile })
      );
      window.location.reload();
    }
  });
});
