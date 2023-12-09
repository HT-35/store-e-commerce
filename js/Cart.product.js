//

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("accessToken");
  const item = document.querySelector(".insertData");

  const callApiCart = async (token) => {
    const cart = await fetch("http://localhost:3000/card/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const data = await cart.json();
    const products = data.data.products;
    return await products;
  };

  const addItem = async (token) => {
    const data = await callApiCart(token);

    for (const i of data) {
      const quality = i.quality;
      const { _id } = i;
      //   console.log(_id);

      const { Image, ProductName, Price, Shipping, Unit } = i.product;

      const calcuTotal = Number(quality) * Number(Price);
      //   console.log(calcuTotal);

      const template = `  
                                                                          <div class="product ">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <img class="img-fluid mx-auto d-block image" src="../IMG/fuze-tea.jpg">
                                        </div>
                                        <div class="col-md-6">
                                            <div class="info">
                                                <div class="row">
                                                    <div class="col-md-5 product-name">
                                                        <div class="product-name">
                                                            <a href="#">${ProductName}</a>
                                                            <div class="product-info">
                                                                <div>Tiền ship: <span class="value">${Shipping}</span>
                                                                </div>
                                                                <div>Loại: <span class="value">${Unit}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                      <div class="col-md-3 quantity">
                                                        <label for="quantity">Quantity:</label>
                                                        <input data-product-id="${_id}" id="quantity" type="number" value="${quality}" class="form-control quantity-input">
                                                      </div>
                                                      <div class="col-md-4">
                                                        <h5>Thành Tiền</h5>
                                                        <h5 class="priceProduct" data-product-id='{"id":"${_id}","price":"${Price}"}'>${calcuTotal}</h5>
                                                      </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="info ">
                                                <div class="row ">
                                                    <div class="col-md-1"></div>

                                                    <button type="button" class="btn btn-success col-sm-12 col-md-4 border border-primary justify-content-center mb-2 totalAmount" data-id="${_id}">Tính Tiền</button>


                                                    <div class="col-md-1"></div>

                                                    <button type="button"
                                                        class="btn btn-success col-sm-12 col-md-4   border border-primary justify-content-center  mb-2 ">Xóa</button>
                                                    <div class="col-md-1"></div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    `;
      item.insertAdjacentHTML("beforeend", template);
    }
    const quantityInputs = document.querySelectorAll(".quantity-input");

    quantityInputs.forEach((item) => {
      item.addEventListener("input", () => {
        // lấy dataset của input
        const idPro = item.dataset.productId;
        console.log(idPro);
        // sau khi có dataset của input thì select các price product có cùng dataset
        const priceProduct = document.querySelector(
          `.priceProduct[data-product-id*='"id":"${idPro}"']`
        );
        const { id, price } = JSON.parse(priceProduct.dataset.productId);
        // console.log(priceProduct);

        let total = Number(item.value) * Number(price);
        priceProduct.textContent = total;
      });
    });

    const totalAmountElements = document.querySelectorAll(".totalAmount");

    totalAmountElements.forEach((item) => {
      item.addEventListener("click", () => {
        // console.log("Data Value:", dataValue);
        const dataValue = item.dataset.id;
        const priceProduct = document.querySelector(
          `.quantity-input[data-product-id="${dataValue}"]`
        ).value;
        console.log(priceProduct);
        window.location.href = `http://127.0.0.1:5500/product/payment.html?quantity=${priceProduct}&product=${dataValue}`;
      });
    });
  };

  addItem(token);
});
