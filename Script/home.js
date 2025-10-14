window.addEventListener("load", () => {
    const form = document.querySelector("form");
    const errorDiv = document.getElementById("formMessage");

    errorDiv.textContent = "";
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
            return [...str].every(ch => ch >= '0' && ch <= '9');
        }
        const Errors = [];

        if (firstName.length < 3 || lastName.length < 3) {
            Errors.push("First and last names must each be at least three characters long");
        }
        if (mobile.length !== 8 || !isDigits(mobile)) {
            Errors.push("Mobile No. must be numbers and contain exactly 8 digits");
        }

        if (Errors.length > 0) {
            errorDiv.innerHTML = Errors.join("<br><br>");
            errorDiv.classList.remove("p-2");
            errorDiv.classList.add("p-3");
        } else {
            errorDiv.classList.remove("bg-danger");
            errorDiv.classList.remove("p-3");
            errorDiv.classList.add("bg-success");
            errorDiv.classList.add("p-2");
            errorDiv.innerHTML = "success";

            sessionStorage.setItem('formData', JSON.stringify({ firstName, lastName, mobile }));
            errorDiv.innerHTML = `
                <p>Success! Click the button below to move to the next page.</p>
                <button id="nextPageBtn" class="btn btn-light">Go to Next Page</button>
            `;

            document.getElementById("nextPageBtn").addEventListener("click", () => {
                window.location.href = 'programming_basics.html';
            });

        }
    });
})