const userInfoString = localStorage.getItem("profile");
// console.log(userInfoString);

if (userInfoString) {
  const userInfo = JSON.stringify(userInfoString);

  // Hide the login button
  document.getElementById("loginNavItem").style.display = "none";

  // Display the profile link or content
  const profileNavItem = document.getElementById("profileNavItem");
  profileNavItem.style.display = "block";
  profileNavItem.innerHTML = `
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
          data-bs-toggle="dropdown" aria-expanded="false">
          ${userInfo}
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li>
              <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="#">Logout</a></li>
      </ul>`;
}
