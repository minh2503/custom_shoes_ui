import BasePages from '@/components/shared/base-pages.js';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import ComboBoxFilter from '@/components/shared/combo-box-filter';
import { Textarea } from '@/components/ui/textarea';
import { Policy } from './components/Policy';
import Footer from '@/components/shared/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { UpdateOrderModel, useUpdateOrder } from '@/queries/cart.query';
import { useToast } from '@/components/ui/use-toast';
export default function CheckoutPay() {
  const cart = useSelector((state: RootState) => state.cart.cartDetail);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [address, setAddress] = useState('');
  const listProduct = cart?.listObjects[0];
  const { mutateAsync: updateOrder } = useUpdateOrder();
  const { toast } = useToast();

  const handleSubmit = async () => {
    const shipAddress = detailAddress + ', ' + address;
    let model: UpdateOrderModel = {
      id: listProduct.id,
      status: 2,
      note: name + '.' + phone,
      shipAddress: shipAddress,
      paymentMethod: 1,
      amount: listProduct.orderItemDetailModels.reduce(
        (acc, cur) => acc + cur.unitPrice * cur.quantity,
        0
      )
    };
    await updateOrder(model);
    toast({
      variant: 'success',
      title: 'Đặt hàng thành công',
      description: 'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất'
    });
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };
  console.log(listProduct);

  return (
    <>
      <BasePages
        className="relative mx-auto max-h-screen w-[80%] flex-1 p-4"
        pageHead="Thanh toán | G-Local"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Giỏ hàng', link: '/cart' },
          { title: 'Thanh toán', link: '/checkout-pay/1' }
        ]}
      >
        {/* Modal Xác nhận xóa */}

        <div className="mt-4 grid  grid-cols-[58%,42%] gap-4">
          <div className="">
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-4">
              <h1 className="flex gap-2 font-bold">
                <Icons.money className="stroke-orange" />
                Thông tin thanh toán
              </h1>
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
                      <p>{product.shoesModel.name} </p>
                      <p className="text-muted-foreground">
                        Size: {product.size}
                      </p>
                    </div>

                    {/* Giá, tăng lượng sản phẩm và xóa */}
                    <div className="flex flex-col items-center gap-4">
                      {/* Số lượng sp */}
                      <div className="flex flex-col gap-4">
                        <p>Số lượng: {product.quantity}</p>
                      </div>
                      {/* Giá */}
                      <div>
                        <p>
                          {/* {product.isCustomized ? (
                            <>
                              Chỉ từ:{' '}
                              <span className="text-orange">
                                {product.price * product.quantity}
                              </span>{' '}
                              đ
                            </>
                          ) : (
                            <>
                           
                            </>
                          )} */}
                          Giá:{' '}
                          <span className="text-orange">
                            {product.unitPrice * product.quantity}
                          </span>{' '}
                          đ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl bg-white p-4">
              <h1>Phương thức thanh toán</h1>
              <div className="mt-3 ">
                <div className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-orange bg-[#fff2ca] p-3">
                  <Icons.receipt className="stroke-orange" />
                  <div className="flex flex-col">
                    Thanh toán khi nhận hàng
                    <span className="text-[13px] text-muted-foreground">
                      (GLocal sẽ liên hệ xác nhận đơn hàng trước khi giao hàng)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <h1 className="flex items-center font-bold ">
              <Icons.mapPin className="mr-2 h-6 w-6 stroke-orange" />
              Thông tin giao hàng
            </h1>
            <p className="my-4 flex justify-between gap-2">
              <Input
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Input
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Input>
            </p>
            <div>
              <ComboBoxFilter
                onFilter={(value) => {
                  const address =
                    value?.province +
                    ', ' +
                    value?.district +
                    ', ' +
                    value?.ward;
                  setAddress(address);
                }}
              />
            </div>
            <div>
              <Textarea
                placeholder="Địa chỉ (số nhà, ấp, tên đường, tòa nhà)"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
              />
            </div>

            <div className="mt-3">
              Tổng tiền tạm tính
              <span className="text-bold ml-2 text-orange ">
                {listProduct?.orderItemDetailModels?.reduce(
                  (acc, cur) => acc + cur.unitPrice * cur.quantity,
                  0
                )}{' '}
                đ
              </span>
            </div>
            <Button
              className="mt-4 w-full cursor-pointer bg-yellow text-black"
              onClick={handleSubmit}
            >
              Đặt hàng
            </Button>

            <Policy />
          </div>
        </div>
        <Footer />
      </BasePages>
    </>
  );
}
