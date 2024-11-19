import BasePages from '@/components/shared/base-pages.js';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useState } from 'react';
import { AlertModal } from '@/components/shared/alert-modal';
import { Link } from 'react-router-dom';
import Footer from '@/components/shared/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDeleteOrder } from '@/queries/cart.query';

const initialProducts = [
  {
    id: 1,
    name: 'Giày thể thao nam',
    price: 100000,
    quantity: 1,
    isCustomized: false,
    brand: 'Nike',
    size: '38',
    image:
      'https://shopgiayreplica.com/wp-content/uploads/2020/06/Giay-Saint-Laurent-Court-Classic-like-auth-6.jpg'
  },
  {
    id: 2,
    name: 'Jordan 1',
    price: 200000,
    quantity: 1,
    isCustomized: true,
    brand: 'Adidas',
    size: '39',
    image:
      'https://product.hstatic.net/1000011840/product/giay-trang-sneaker-cho-be-gh87-5_b94398fdb35e49f08025e39bd4c230a5_master.jpg'
  },
  {
    id: 3,
    name: 'Nike Air Force 1',
    price: 300000,
    quantity: 1,
    brand: 'Nike',
    isCustomized: false,
    size: '40',
    image: 'https://pos.nvncdn.com/205d8e-20707/ps/20231225_NGJyTgrVez.jpeg'
  },
  {
    id: 4,
    name: 'Air Jordan 1',
    price: 300000,
    quantity: 1,
    size: '41',
    brand: 'Adidas',
    isCustomized: true,
    image:
      'https://product.hstatic.net/1000230642/product/giay-the-thao-nam-biti-s-hunter-x-2k22-jet-dsmh02202-luacw-color-den_aa78bf9ad04645369f6bbdb9427a1b33.jpg'
  }
];

export default function CartPage() {
  const [products, setProducts] = useState(initialProducts);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const cart = useSelector((state: RootState) => state.cart.cartDetail);
  const listProduct = cart?.listObjects[0];
  const { mutateAsync: deleteOrder } = useDeleteOrder();
  console.log(products);

  const handleDeleteProduct = async () => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productToDelete)
    );
    const data = await deleteOrder(productToDelete);
    if (data) {
      window.location.reload();
    }
    setIsAlertModalOpen(false);
  };

  const confirmDeleteProduct = async (id) => {
    setProductToDelete(id);
    setIsAlertModalOpen(true);

    // window.location.reload();
  };

  return (
    <>
      <BasePages
        className="relative mx-auto max-h-screen w-[80%] flex-1  p-4"
        pageHead="Giỏ hàng | G-Local"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Giỏ hàng', link: '/cart' }
        ]}
      >
        {/* Modal Xác nhận xóa */}
        <AlertModal
          isOpen={isAlertModalOpen}
          title="Thông báo"
          onClose={() => setIsAlertModalOpen(false)}
          onConfirm={handleDeleteProduct}
          description="Bạn chắc chắc muốn xóa sản phẩm này chứ?"
        />

        <h1 className="mt-4">Giỏ hàng</h1>
        <div className="mt-4 grid grid-cols-[70%,30%] gap-4">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-4">
            {listProduct?.orderItemDetailModels?.map((product) => (
              <div className="flex w-full" key={product.id}>
                <img
                  className="h-[100px] w-[150px] object-cover duration-300 hover:scale-105"
                  src={product.shoesImage.thumbnail}
                  alt="#"
                />
                <div className="ml-3 mt-3 flex w-full justify-between">
                  {/* Tên và size sản phẩm */}
                  <div>
                    <p>
                      {product.shoesModel.name}{' '}
                      {/* {product.isCustomized ? `(Sản phẩm custom)` : ''}{' '} */}
                    </p>
                    <p className="text-muted-foreground">
                      Size: {product.size}
                    </p>
                  </div>

                  {/* Giá, tăng lượng sản phẩm và xóa */}
                  <div className="flex items-center gap-4">
                    {/* Giá */}
                    <div>
                      <p>
                        {/* {product.isCustomized ? (
                          <>
                            Chỉ từ:{' '}
                            <span className="text-red">
                              {product.price * product.quantity}
                            </span>{' '}
                            đ
                          </>
                        ) : (
                          <>
                           
                          </>
                        )} */}
                        Giá:{' '}
                        <span className="text-red">
                          {product.unitPrice * product.quantity}
                        </span>{' '}
                        đ
                      </p>
                    </div>

                    <div
                      className="cursor-pointer text-yellow"
                      onClick={() => confirmDeleteProduct(product.id)}
                    >
                      <Icons.trash2 />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white p-4">
            <h1 className="font-bold">Tạm tính</h1>
            <p className="my-4 flex justify-between">
              Tổng tiền :
              <span className="text-bold text-red">
                {listProduct?.orderItemDetailModels?.reduce(
                  (acc, cur) => acc + cur.unitPrice * cur.quantity,
                  0
                )}{' '}
                đ
              </span>
            </p>
            <Link to="/checkout-pay/1">
              <Button className="mt-4 w-full cursor-pointer bg-yellow text-black">
                Thanh toán
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </BasePages>
    </>
  );
}
