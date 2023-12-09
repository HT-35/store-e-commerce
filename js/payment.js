document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const quantity = urlParams.get("quantity");
  console.log(quantity);
});
