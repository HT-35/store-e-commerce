document.addEventListener("DOMContentLoaded", function () {
  const itemData = document.querySelector(".itemData");

  // Hàm xử lý chuyển hướng
  // function redirectToProductPage(event, slug) {
  //   // Ngăn chặn hành vi mặc định của thẻ <a>
  //   event.preventDefault();

  //   // Kiểm tra xem slug có tồn tại hay không
  //   if (slug) {
  //     // Chuyển hướng đến trang product.html và thêm slug vào URL
  //     window.location.href = `http://127.0.0.1:5500/product/product.html#${slug}`;
  //   } else {
  //     console.error("Slug not found!");
  //   }
  // }

  // Hàm xử lý fetch dữ liệu và render
  async function fetchDataAndRender() {
    try {
      const response = await fetch(
        "http://localhost:3000/product?page=0&limit=30"
      );

      const data = await response.json();

      data.data.forEach((item) => {
        // Lấy path hình ảnh, đảm bảo rằng item.Image chứa đường dẫn hợp lệ
        const path = "./IMG/fuze-tea.jpg";

        //  const template = `
        //   <div class="col-12 col-sm-5 col-md-2 col-lg-2 mb-3 mx-3 item">
        //       <a href="#" class="aItem" data-slug="${item.Slug}">
        //           <div class="image-container">
        //               <img class="img-fluid" src="${path}" alt="">
        //           </div>
        //           <div class="text-container">
        //               <h6 class="">${item.ProductName}</h6>
        //               <h6 class="">ĐVT: ${item.Price} đ</h6>
        //           </div>
        //       </a>
        //   </div>
        // `;
        // Tạo template với thuộc tính data-slug
        const template = `
          <div class="col-12 col-sm-5 col-md-2 col-lg-2 mb-3 mx-3 item">
              <a href="#" class="aItem" data-slug="${item.Slug} ">
                  <div class="image-container">
                      <img class="img-fluid" src="${path}" alt="">
                  </div>
                  <div class="text-container">
                      <h6 class="">${item.ProductName}</h6>
                      <h6 class="">ĐVT: ${item.Price} đ</h6>
                  </div>
              </a>
          </div>
        `;

        // Thêm template vào itemData bằng insertAdjacentHTML
        itemData.insertAdjacentHTML("beforeend", template);
      });

      // // Lấy tất cả các thẻ a chứa data-slug trong itemData
      const anchors = document.querySelectorAll(".aItem");

      // // Thêm sự kiện click cho mỗi thẻ a
      const token = localStorage.getItem("accessToken");
      anchors.forEach((anchor) => {
        // console.log(anchor);
        anchor.addEventListener("click", (event) => {
          if (!token) {
            window.location.href = `./html/login.html`;
          } else {
            const slug = anchor.getAttribute("data-slug");
            console.log(slug);
            // window.location.href = `http://127.0.0.1:5500/product/product.html#${slug}`;
            const callApi = async () => {
              const product = await fetch(
                `http://localhost:3000/product/${slug}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    token: token,
                  },
                }
              );
              if (!product.ok) {
                window.location.href = `./html/login.html`;
              } else {
                window.location.href = `http://127.0.0.1:5500/product/product.html#${slug}`;
              }
            };
            callApi();
            return;
          }
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Gọi hàm fetchDataAndRender
  fetchDataAndRender();

  // Retrieve user info from local storage
  const userInfoString = localStorage.getItem("profile");
  console.log(userInfoString);

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
});
