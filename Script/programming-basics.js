window.addEventListener("load", () => {
  const data = sessionStorage.getItem("formData");

  if (data) {
    const { firstName, lastName, mobile } = JSON.parse(data);

    document.getElementById("userName").textContent = `${firstName} ${lastName}`;
    document.getElementById("userMobile").textContent = mobile;
  }
});