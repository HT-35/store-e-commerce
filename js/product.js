// lấy slug và cắt kí tự đầu tiên

import { Callproduct } from "../utils/callAPI.js";

let countQuanlity = 0;
const insertData = document.querySelector(".productDetail");
console.log(insertData);

const token = localStorage.getItem("accessToken");
const slug = location.hash.substring(1);

const callApi = async (slug, token) => {
  const product = await Callproduct(slug, token);
  const data = await product.json();
  //   console.log(data);

  const { _id, ProductName, Image, Price, Unit, InformationProduct, Status } =
    data.data;

  return { _id, ProductName, Image, Price, Unit, InformationProduct, Status };
};

const product = async () => {
  if (slug && token) {
    const { _id, ProductName, Image, Price, Unit, InformationProduct, Status } =
      await callApi(slug, token);
    console.log(_id);
    const template = `        <section class="py-3">
                <div class="container">
                    <div class="row gx-5 ">
                        <!-- img -->
                        <aside class="col-lg-6  ">
                            <div class=" mb-3 d-flex justify-content-center ">
                                <div data-fslightbox="mygalley" class="rounded-4" target="_blank" data-type="image"
                                    href="#">
                                    <img style="max-width: 100%; max-height: 70vh; margin: auto;" class="rounded-4 fit "
                                        src="../IMG/fuze-tea.jpg" />
                                </div>
                            </div>
                            <div class="d-flex justify-content-center mb-3">
                                <div data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank"
                                    data-type="image" href="" class="item-thumb">
                                    <img width="60" height="60" class="rounded-2" src="../IMG/fuze-tea.jpg" />
                                </div>
                                <div data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank"
                                    data-type="image" href="" class="item-thumb">
                                    <img width="60" height="60" class="rounded-2" src="../IMG/fuze-tea.jpg" />
                                </div>
                                <div data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank"
                                    data-type="image" href="" class="item-thumb">
                                    <img width="60" height="60" class="rounded-2" src="../IMG/fuze-tea.jpg" />
                                </div>
                                <div data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank"
                                    data-type="image" href="" class="item-thumb">
                                    <img width="60" height="60" class="rounded-2" src="../IMG/fuze-tea.jpg" />
                                </div>
                                <div data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank"
                                    data-type="image" href="" class="item-thumb">
                                    <img width="60" height="60" class="rounded-2" src="../IMG/fuze-tea.jpg" />
                                </div>
                            </div>
                            <!-- thumbs-wrap.// -->
                            <!-- gallery-wrap .end// -->
                        </aside>

                        <!-- content -->
                        <main class="col-lg-6">
                            <div class="ps-lg-2 insertData">
                                <h4 class="title text-dark mb-4">
                                    ${ProductName}
                                </h4>

                                <div class="mb-1 mt-1">
                                    <div class="row">

                                        <div class="col-5 h5">Giá bán lẻ: </div>
                                        <div class="col-7">
                                            <span class="h5"> ${Price} đ</span>

                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <dt class="col-5">Vận chuyển:</dt>
                                    <dd class="col-7">Miễn Phí</dd>

                                    <dt class="col-5">Khuyến mại:</dt>
                                    <dd class="col-7">Không Có</dd>

                                    <dt class="col-5">Chọn loại:</dt>
                                    <dd class="col-7">${Unit}</dd>

                                    <dt class="col-5">Xuất Xứ:</dt>
                                    <dd class="col-7">${InformationProduct}</dd>

                                    <dt class="col-5">Tình Trạng:</dt>
                                    <dd class="col-7">${Status}</dd>
                                </div>
                                <hr />

                                <div class="row mb-1">

                                    <!-- col.// -->
                                    <div class="col-md-12 col-12 ">
                                        <div class="row mb-1">

                                            <div class="col-md-5 col-5 mb-1">
                                                <label for="quantity" class="form-label mb-1">Số lượng</label>

                                            </div>

                                            <div class="col-md-7 col-7 mb-1">

                                                <div class="input-group">

                                                    <input type="number" class="form-control text-center" id="quantity"
                                                        value="1" min="0" aria-label="Quantity">

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 col-6">
                                            <a href="#" class="btn btn-warning shadow-0 w-100" id="BTN-Buy"> Buy now
                                            </a>
                                        </div>
                                        <div class="col-md-6 col-6 ">
                                            <a href="#" class="btn btn-primary shadow-0 w-100"> <i
                                                    class="me-1 fa fa-shopping-basket"></i> Add tocart</a>
                                        </div>
                                    </div>
                                </div>
                        </main>
                    </div>
                </div>
            </section>
`;

    insertData.insertAdjacentHTML("afterbegin", template);
    const quantity = document.getElementById("quantity");

    const btnBuy = document.getElementById("BTN-Buy");

    btnBuy.addEventListener("click", async () => {
      let countQuanlity = quantity.value;
      console.log(countQuanlity);
      const callApiCart = await fetch("http://localhost:3000/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          products: [
            {
              product: _id,
              quality: countQuanlity,
            },
          ],
        }),
      });
      console.log(await callApiCart);
      window.location.href = `http://127.0.0.1:5500/product/card.product.html`;
    });
  }
  return;
};

document.addEventListener("DOMContentLoaded", product);
