export const startLoader = () => {
  const spinner = document.createElement("span");
  spinner.id = "loader";
  spinner.classList.add(
    "loading",
    "loading-infinity",
    "loading-lg",
    "fixed",
    "right-4",
    "bottom-4",
    "z-50"
  );
  document.body.appendChild(spinner);
};

export const stopLoader = () => {
  const spinner = document.querySelector("span#loader");
  spinner?.remove();
};
