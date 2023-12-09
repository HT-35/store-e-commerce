function showProfile(token, username, email) {
  // Save the token to local storage
  const userInfo = {
    username: username,
    email: email || null,
  };
  localStorage.setItem("accessToken", token);
  localStorage.setItem("profile", username);
}

const username = document.querySelector('.login-form input[name="username"]');
const password = document.querySelector('.login-form input[name="password"]');

async function login() {
  // Lấy giá trị từ các trường input sử dụng querySelector

  const btn = document.querySelector(".btn");

  // Kiểm tra nếu cần thiết
  if (username === "" || password === "") {
    alert("Vui lòng điền đầy đủ thông tin đăng nhập");
    return;
  }

  // Tạo một object chứa thông tin đăng nhập
  var loginData = {
    UserName: username.value,
    Password: password.value,
  };

  // Sử dụng fetch để gửi POST request đến API login
  const login = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await login.json();

  if (data.status === false) {
    console.log(data);
    const errorMessage = document.querySelector(".text-login");

    password.value = "";

    // Kiểm tra xem có thông báo lỗi nào đã được hiển thị chưa
    if (!errorMessage) {
      const p = document.createElement("p");
      p.classList.add("text-login");
      p.textContent = "Tài Khoản Hoặc Mật Khẩu Sai Rồi Kìa Thằng Chó";

      // Chèn thông báo trước phần tử có id là "btn"
      // const btn = document.getElementById("btn");
      btn.parentNode.insertBefore(p, btn);
    }
  } else {
    console.log(data);
    const token = data.token;
    const username = data.data.UserName;
    console.log(token, username);
    window.location.href = "http://127.0.0.1:5500/index.html";
    showProfile(token, username);
  }
}

// if (username === "" || password === "") {
//   alert("Vui lòng điền đầy đủ thông tin đăng nhập");
//   return;
// } else {
// password.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault(); // Ngăn chặn hành động mặc định của phím Enter (như submit form)
//     login(); // Gọi hàm đăng nhập tại đây
//   }
// });
// }
