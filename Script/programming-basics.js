// programming-basics.js
window.addEventListener("load", () => {
  const data = sessionStorage.getItem("formData");

  if (data) {
    const { firstName, lastName, mobile } = JSON.parse(data);

    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      mobile.trim() !== ""
    ) {
      document.getElementById("userName").textContent = `${firstName} ${lastName}`;
      document.getElementById("userMobile").textContent = mobile;
      document.getElementById("userInfo").style.display = "block";
    } else {
      document.getElementById("userInfo").style.display = "none";
    }
  }
});
