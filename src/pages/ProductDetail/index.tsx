import BasePages from '@/components/shared/base-pages.js';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useEffect, useState } from 'react';
import { Policy } from './component/Policy';
import { ProductMore } from './component/ProductMore';
import Footer from '@/components/shared/footer';
import { Link } from 'react-router-dom';
import { useId } from '@/routes/hooks/use-id';
import { useGetDetailShoes } from '@/queries/shoes.query';
import { ProductType, ShoesImagesViewModels } from '@/types';
import { useRouter } from '@/routes/hooks';
import {
  AddCartModel,
  CreateCartModel,
  useAddItemToCart,
  useCreateCart,
  useGetOrderUserByStatus
} from '@/queries/cart.query';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { updateCart } from '@/redux/cart.slice';
import { updateCustom } from '@/redux/custom.slice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { PagingModel } from '@/constants/data';

const listGift = [
  'Tặng 1 đôi tất',
  'Tặng 1 đôi dây giày',
  'Double box (hộp 2 lớp)',
  'Miễn ship cho đơn hàng trên 300k'
];

const listSize = ['38', '39', '40', '41', '42', '43', '44'];

const listWarranty = [
  {
    id: 1,
    title: 'Giao hàng toàn quốc',
    icon: 'truck'
  },
  {
    id: 2,
    title: 'Kiểm hàng trước thanh toán',
    icon: 'handCoins'
  },
  {
    id: 3,
    title: 'Bảo hành keo 1 năm',
    icon: 'badgeCheck'
  }
];

export default function ProductDetail() {
  const id = useId();
  const router = useRouter();
  const [imagePicked, setImagePicked] = useState<ShoesImagesViewModels>();
  const [sizePicked, setSizePicked] = useState<string>('39');
  const [quantity, setQuantity] = useState<string>('1');
  const [product, setProduct] = useState<ProductType>();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const {
    data: detailShoes,
    isSuccess,
    refetch
  } = useGetDetailShoes(String(id));
  // query here
  const { mutateAsync: createCart } = useCreateCart();
  const { mutateAsync: addItem } = useAddItemToCart();
  const { mutateAsync: getItemInCart } = useGetOrderUserByStatus();
  // redux
  const cartObject = useSelector(
    (state: RootState) => state.cart?.cartDetail?.listObjects
  );

  useEffect(() => {
    if (isSuccess && detailShoes) {
      setProduct(detailShoes);
      setImagePicked(detailShoes.shoesImagesViewModels[0]);
    }
  }, [isSuccess, detailShoes]);

  useEffect(() => {
    refetch();
  }, [id]);

  const handleUpdateQuantity = (type: string) => {
    if (type === 'decrease') {
      if (quantity === '1') return;
      setQuantity((prev) => (parseInt(prev) - 1).toString());
    }
    if (type === 'increase') {
      setQuantity((prev) => (parseInt(prev) + 1).toString());
    }
  };

  const handleAddToCart = async () => {
    if (cartObject.length > 0) {
      let model: AddCartModel = {
        shoesId: Number(id),
        quantity: Number(quantity),
        shoesImageId: imagePicked?.id || 0,
        orderId: cartObject[0].id,
        size: sizePicked
      };
      await addItem(model);
    } else {
      let model: CreateCartModel = {
        note: '',
        shipAddress: 'Đang cập nhật',
        paymentMethod: 1,
        shoesId: Number(id),
        quantity: Number(quantity),
        shoesImageId: imagePicked?.id || 0,
        size: sizePicked
      };
      await createCart(model);
    }
    const model = { ...PagingModel, orderStatus: 1 };
    const res = await getItemInCart(model);
    if (res) {
      dispatch(updateCart(res));
    }
    toast({
      variant: 'success',
      title: 'Thêm vào giỏ hàng thành công ',
      description: 'Sản phẩm đã được thêm vào giỏ hàng của bạn !'
    });
  };

  const handleCustomProduct = (product) => {
    dispatch(updateCustom(product.name));
    router.push(`/customize/${id}/${imagePicked?.id}`);
  };

  return (
    <>
      <BasePages
        className="relative mx-auto  max-h-screen w-[80%] flex-1"
        pageHead="Chi tiết sản phẩm | G-Local"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Sản phẩm', link: '/shop' },
          { title: 'Chi tiết sản phẩm', link: '/product-detail' }
        ]}
      >
        <div className="mx-auto  mt-3 grid w-full grid-cols-2 rounded-2xl bg-white p-6 ">
          <div className="grid grid-cols-[20%,80%] ">
            <div className="flex flex-col gap-4">
              {product?.shoesImagesViewModels?.map(
                (item) =>
                  !item.isUserCustom && (
                    <img
                      key={item.id}
                      src={item.thumbnail}
                      alt="product"
                      className={`h-[105px] w-[90px] rounded-xl p-1 transition-transform duration-300 hover:scale-105 ${
                        item.id === imagePicked?.id
                          ? 'border-[1.5px] border-yellow'
                          : ''
                      }`}
                      onClick={() => setImagePicked(item)}
                    />
                  )
              )}
            </div>

            {/* Product Image Picked */}
            <div className="flex w-full  justify-center">
              <img
                src={imagePicked?.thumbnail}
                alt="product"
                className="h-[50%] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
          {/* Info Product Detail */}
          {product && (
            <div className=" mb-[100px] ml-[5%] flex  flex-col gap-1">
              <h1 className="text-[20px] font-bold">{product.name}</h1>

              <div className="flex gap-3 text-[13px] font-semibold text-muted-foreground">
                <div>
                  Thương hiệu sản phẩm:{' '}
                  <span className="font-normal text-yellow">
                    {product.brandName}
                  </span>
                </div>
                <div>
                  Mã sản phẩm:{' '}
                  <span className="font-normal text-yellow">SP0001</span>
                </div>
              </div>

              <div className="my-3 mt-4 text-[18px] font-semibold text-primary">
                {/* {imagePicked.isCustomized
                  ? `Giá sản phẩm: ${product.price} VNĐ`
                  : `Giá sản phẩm: Chỉ từ ${product.price} VNĐ`} */}
              </div>

              <div className="relative mt-[20px] flex h-[150px] w-full items-center border-[2px] border-dashed px-10">
                <p className="absolute left-[3%] top-[-10%] flex gap-2 text-yellow backdrop-blur">
                  <Icons.gift /> KHUYẾN MÃI - ƯU ĐÃI
                </p>
                <ul className="flex list-disc flex-col gap-1 ">
                  {listGift.map((item, index) => (
                    <li
                      key={index}
                      className="text-[15px] font-semibold text-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mt-5 text-[15px] font-semibold text-muted-foreground">
                  Kích thước sản phẩm :{' '}
                  <span className="font-normal ">{sizePicked}</span>
                </p>
                <div className="mt-2 flex gap-3">
                  {listSize.map((item: string, index) => (
                    <button
                      key={index}
                      className={`h-9 w-9 rounded-md border-[1px] border-muted-foreground text-muted-foreground ${
                        sizePicked == item
                          ? 'border-[2.5px] border-yellow text-primary'
                          : 'hover:border-primary hover:text-primary'
                      }`}
                      onClick={() => setSizePicked(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid h-[48px] grid-cols-[18%,80%] gap-3">
                <div className=" flex h-full w-full items-center justify-between  border border-gray-300 ">
                  <button
                    className="flex h-full w-10 items-center justify-center rounded text-xl font-semibold hover:bg-gray-100"
                    onClick={() => handleUpdateQuantity('decrease')}
                  >
                    -
                  </button>
                  <div className="text-xl font-semibold">
                    <span>{quantity}</span>
                  </div>
                  <button
                    className="flex h-full w-10 items-center justify-center rounded  text-xl font-semibold hover:bg-gray-100"
                    onClick={() => handleUpdateQuantity('increase')}
                  >
                    +
                  </button>
                </div>

                <div className="flex h-full w-full">
                  <button
                    className=" h-full w-full border border-black   text-black "
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>

              <div className="mt-5 flex w-full flex-col gap-3">
                <Button
                  onClick={() => handleCustomProduct(product)}
                  className="flex h-[56px] w-full flex-col items-center justify-center rounded-md bg-primary text-primary-foreground"
                >
                  <p className="text-[16px]">Custom sản phẩm</p>
                  <span className="text-[13px]">
                    (Custom sản phẩm tùy theo ý thích của bạn)
                  </span>
                </Button>
                <Link to="/cart">
                  <Button className="h-[48px] w-full rounded-md bg-primary text-[16px] text-primary-foreground">
                    Thanh toán sản phẩm (COD)
                  </Button>
                </Link>
                <p className="text-center">
                  Bạn cần hỗ trợ ? <a className="underline">Liên hệ ngay</a>
                </p>
              </div>

              <div className="my-6 flex justify-between">
                {listWarranty.map((item, index) => {
                  const Icon = Icons[item.icon];
                  return (
                    <div key={item.id} className="flex items-center gap-2">
                      <Icon
                        className={`${
                          index === 0
                            ? 'stroke-yellow'
                            : index === 1
                              ? 'stroke-blue'
                              : 'stroke-red'
                        } `}
                      />
                      <p>{item.title}</p>
                    </div>
                  );
                })}
              </div>

              <div>
                <p className="text-[18px] font-semibold ">Thông tin sản phẩm</p>
                <p className="mt-2 text-[13px] text-muted-foreground">
                  Giày thể thao nam chính hãng, chất lượng cao, đảm bảo không
                  phai màu, không bong tróc, không đau chân khi sử dụng.
                </p>
              </div>
              <div>
                <Policy />
              </div>
            </div>
          )}
        </div>
        <div className="mx-auto mt-4 w-full rounded-2xl bg-white p-6">
          {' '}
          <ProductMore />
        </div>
        <Footer />
      </BasePages>
    </>
  );
}
