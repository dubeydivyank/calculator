const theme = document.querySelector(".radio-buttons");
theme.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.checked) {
    // console.log(e.target.id);
    switch (e.target.id) {
      case "1":
        document.querySelector("body").classList = "theme-1";
        break;
      case "2":
        document.querySelector("body").classList = "theme-2";
        break;
      case "3":
        document.querySelector("body").classList = "theme-3";
        break;
      default:
        document.querySelector("body").classList = "theme-1";
    }
  }
});
