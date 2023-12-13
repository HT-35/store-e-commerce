document.addEventListener("DOMContentLoaded", async () => {
  const priceHTML = document.querySelector(".priceHTML");
  const dataInsert = document.querySelector(".data-insert");

  const btnPay = document.querySelector(".btn-Pay");
  const urlParams = new URLSearchParams(window.location.search);
  const token = localStorage.getItem("accessToken");

  // console.log(token);

  // số lượng
  const quantity = urlParams.get("quantity");

  // product detail
  const id = urlParams.get("product");

  // products
  const objProduct = {
    detailProduct: id,
    quantity: Number(quantity),
  };

  const convertObjToArr = (obj) => {
    return [{ ...obj }];
  };

  const products = convertObjToArr(objProduct);

  const Callproduct = async (id, token) => {
    const pro = await fetch(
      `http://localhost:3000/product/productdetail/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const data = await pro.json();
    return await data;
    // console.log(data);
  };
  const data = await Callproduct(id, token);
  // console.log(data);
  const {
    Image,
    InformationProduct,
    Price,
    ProductName,
    Shipping,
    Unit,
    Status,
  } = data.data;

  let total = Number(Price) * Number(quantity);
  priceHTML.textContent = total;

  const template = `            
                    <div class="container">
                      <div class="row">
                        <div class="col-sm-12 col-md-6 text-center">
                          <div class="active"> 
                            <img src="http://localhost:3000/public//img//product//1699632064671.jpg" class="  img-fluid "  alt="Responsive image"> 
                          </div>
                        </div>
                      </div>
                    </div>

                    </div>
                    <div class="row mt-4">       
                        <dt class="col-5"> <h6> Tên sản phẩm:</h6> </dt>
                        <dd class="col-7">  <h6> ${ProductName}</h6></dd>    

                        <dt class="col-5"> <h6> Số lượng:</h6></dt>
                        <dd class="col-7">  <h6> ${quantity}</h6></dd>


                        <dt class="col-5"> <h6>Vận chuyển: </h6></dt>
                        <dd class="col-7"> <h6> Miễn Phí</h6></dd>

                        <dt class="col-5"> <h6>Khuyến mại:</h6></dt>
                        <dd class="col-7"> <h6> Không Có</h6></dd>

                        <dt class="col-5"> <h6> Chọn loại:</h6></dt>
                        <dd class="col-7"> <h6> ${Unit}</h6></dd>



                        <dt class="col-5"> <h6> Tình Trạng:</dt>
                        <dd class="col-7"> <h6> ${Status}</h6></dd>
                    </div>
         `;

  const div = document.createElement("div");
  div.setAttribute("class", " pb-3 mb-3");
  div.innerHTML = template;

  dataInsert.insertAdjacentElement("afterbegin", div);

  btnPay.addEventListener("click", async () => {
    const formPayment = document.querySelector(".form-Payment");
    const email = formPayment.querySelector(
      '.form-control[type="email"]'
    ).value;

    const numberPhone = formPayment.querySelector(
      '.form-control[type="text"]'
    ).value;

    const address = formPayment.querySelector(
      '.form-control[type="text"]'
    ).value;

    const createBill = await CallApiCreateBill(
      token,
      products,
      email,
      numberPhone,
      address
    );
    const data = await createBill.json();
    if (data.status) {
      console.log("ok");
      window.location.href = "http://127.0.0.1:5500/product/orderSuccess.html";
    } else {
      console.log("dell");
    }
    // console.log(data);
  });

  const CallApiCreateBill = async (
    token,
    products,
    email,
    numberPhone,
    address
  ) => {
    const callApi = await fetch("http://localhost:3000/bill/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        products,
        email,
        numberPhone,
        address,
      }),
    });
    return await callApi;
  };
});
