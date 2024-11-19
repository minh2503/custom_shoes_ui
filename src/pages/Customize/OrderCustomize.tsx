// OrderCustomize.tsx
import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ComboBoxFilter from '@/components/shared/combo-box-filter';
import BaseRequest from '@/config/axios.config';
import { useCreateUpdateOrderCustom } from '@/queries/cart.query';
const listSize = ['38', '39', '40', '41', '42', '43', '44'];

const listWarranty = [
  {
    id: 1,
    title: 'Giao hàng toàn quốc',
    icon: 'truck',
    color: 'yellow'
  },
  {
    id: 2,
    title: 'Kiểm hàng trước thanh toán',
    icon: 'handCoins',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Bảo hành keo 1 năm',
    icon: 'badgeCheck',
    color: 'red'
  }
];

interface Product {
  id: number;
  name: string;
  brandName: string;
  price: number;
}

interface TypeOrderCustomize {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  product: Product;
  onSuccess: () => void;
}

const listGift = [
  'Tặng 1 đôi tất',
  'Tặng 1 đôi dây giày',
  'Double box (hộp 2 lớp)',
  'Miễn ship cho đơn hàng trên 300k'
];

export default function OrderCustomize({
  openModal,
  setOpenModal,
  product,
  onSuccess
}: TypeOrderCustomize) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    sizePicked: '39',
    quantity: '1'
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const { mutateAsync: createUpdateOrderCustom } = useCreateUpdateOrderCustom();

  const handleUpdateQuantity = (type: 'decrease' | 'increase') => {
    setFormData((prev) => {
      const currentQuantity = parseInt(prev.quantity, 10);
      if (type === 'decrease' && currentQuantity > 1) {
        return { ...prev, quantity: (currentQuantity - 1).toString() };
      }
      if (type === 'increase') {
        return { ...prev, quantity: (currentQuantity + 1).toString() };
      }
      return prev;
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const { name, phone, address, detailAddress, sizePicked, quantity } =
        formData;
      const model = {
        note: name + '.' + phone,
        shipAddress: address + '.' + detailAddress,
        paymentMethod: 1,
        shoesId: product.id,
        quantity: parseInt(quantity),
        size: sizePicked,
        status: 2,
        thumbnail: imageUrl
      };
      const data = await createUpdateOrderCustom(model);
      if (data) {
        setOpenModal(false);
        onSuccess();
        window.location.href = '/profile';
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await BaseRequest.UploadStockPhoto(file);
      if (res) {
        setImageUrl(res.imageUrl);
        setPreviewUrl(res.imageUrl);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddressFilter = (value: {
    province?: string;
    district?: string;
    ward?: string;
  }) => {
    const combinedAddress = [value.province, value.district, value.ward]
      .filter(Boolean)
      .join(', ');
    setFormData((prev) => ({
      ...prev,
      address: combinedAddress
    }));
  };
  const memoizedListWarranty = useMemo(() => listWarranty, []);
  const memoizedListGift = useMemo(() => listGift, []);
  const memoizedListSize = useMemo(() => listSize, []);
  return (
    <Dialog
      open={openModal}
      onOpenChange={(open) => {
        if (!open) {
          setOpenModal(false);
        }
      }}
    >
      <DialogContent className="w-[70%]">
        <DialogHeader>
          <DialogTitle>Đặt hàng custom giày</DialogTitle>
          <DialogDescription>
            Gửi hình ảnh và thông tin của bạn để đặt hàng
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-10">
          <div>
            {product && (
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">{product.name}</h1>

                <div className="flex gap-3 text-sm font-semibold text-muted-foreground">
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

                <div className="my-3 mt-4 text-xl font-semibold text-primary">
                  Giá sản phẩm: {product.price.toLocaleString()} VNĐ
                </div>

                <div className="relative mt-5 flex h-40 w-full items-center border-2 border-dashed px-10">
                  <p className="absolute left-3 top-[-10%] flex items-center gap-2 text-yellow backdrop-blur">
                    <Icons.gift /> KHUYẾN MÃI - ƯU ĐÃI
                  </p>
                  <ul className="flex list-disc flex-col gap-1">
                    {memoizedListGift.map((item, index) => (
                      <li
                        key={index}
                        className="text-base font-semibold text-primary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mt-5 text-base font-semibold text-muted-foreground">
                    Kích thước sản phẩm:{' '}
                    <span className="font-normal">{formData.sizePicked}</span>
                  </p>
                  <div className="mt-2 flex gap-3">
                    {memoizedListSize.map((size) => (
                      <button
                        key={size}
                        className={`h-9 w-9 rounded-md border text-muted-foreground ${
                          formData.sizePicked === size
                            ? 'border-2.5 border-yellow text-primary'
                            : 'border-muted-foreground hover:border-primary hover:text-primary'
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, sizePicked: size }))
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid h-12 grid-cols-1 gap-3">
                  <div className="flex h-full w-full items-center justify-between border border-gray-300">
                    <button
                      className="flex h-full w-10 items-center justify-center rounded text-xl font-semibold hover:bg-gray-100"
                      onClick={() => handleUpdateQuantity('decrease')}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <div className="text-xl font-semibold">
                      {formData.quantity}
                    </div>
                    <button
                      className="flex h-full w-10 items-center justify-center rounded text-xl font-semibold hover:bg-gray-100"
                      onClick={() => handleUpdateQuantity('increase')}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex w-full flex-col gap-3">
                  <p className="text-center">
                    Bạn cần hỗ trợ?{' '}
                    <a href="/contact" className="underline">
                      Liên hệ ngay
                    </a>
                  </p>
                </div>

                <div className="my-6 flex justify-between">
                  {memoizedListWarranty.map((item) => {
                    const IconComponent = Icons[item.icon];
                    return (
                      <div key={item.id} className="flex items-center gap-2">
                        <IconComponent className={`stroke-${item.color}`} />
                        <p>{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="rounded-2xl bg-white p-4">
              <h1 className="flex items-center font-bold">
                <Icons.mapPin className="mr-2 h-6 w-6 stroke-orange" />
                Thông tin giao hàng
              </h1>
              <p className="my-4 flex justify-between gap-2">
                <Input
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  name="phone"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </p>
              <div>
                <ComboBoxFilter onFilter={handleAddressFilter} />
              </div>
              <div>
                <Textarea
                  name="detailAddress"
                  placeholder="Địa chỉ (số nhà, ấp, tên đường, tòa nhà)"
                  value={formData.detailAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <Input
                  id="file"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file"
                  className="mt-3 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow p-2"
                >
                  <Icons.upload />
                  <span>Upload ảnh</span>
                </label>
                {uploading && <p className="text-yellow">Đang tải ảnh...</p>}
                {previewUrl && !uploading && (
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-red">
                      Bản xem trước hình ảnh
                    </h2>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mt-2 h-40 w-auto rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-white p-4">
              <h1 className="font-bold">Phương thức thanh toán</h1>
              <div className="mt-3">
                <div className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-orange bg-[#fff2ca] p-3">
                  <Icons.receipt className="stroke-orange" />
                  <div className="flex flex-col">
                    Thanh toán khi nhận hàng
                    <span className="text-sm text-muted-foreground">
                      (GLocal sẽ liên hệ xác nhận đơn hàng trước khi giao hàng)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-yellow text-black"
            type="button"
            onClick={handleSubmit}
            // disabled={
            //   !formData.name ||
            //   !formData.phone ||
            //   !formData.address ||
            //   !formData.detailAddress
            // }
          >
            Gửi đơn đặt hàng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
