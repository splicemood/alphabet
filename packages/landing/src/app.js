const toast = document.querySelector(".toast");
let toastTimer;

async function copyText(value) {
  await navigator.clipboard.writeText(value);
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 1600);
}

for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    await copyText(button.getAttribute("data-copy"));
  });
}
