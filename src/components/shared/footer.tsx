import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { Input } from '../ui/input';

export default function Footer() {
  return (
    <footer className="mt-[5%] h-[40dvh] w-full   py-8 2xl:h-[30dvh]">
      <div className="">
        <div className="grid grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <p className="mt-4">
              <ul className="flex flex-col gap-2">
                <li className="flex">
                  <Icons.mapPin className="mr-2 size-5" /> Địa chỉ : FPT
                  University, Q9 - TP.Hồ Chí Minh
                </li>
                <li className="flex">
                  <Icons.phone className="mr-2 size-5" /> Số điện thoại : 0941
                  821 121
                </li>
                <li className="flex">
                  <Icons.mail className="mr-2 size-5" /> Email :
                  Glocal@gmail.com
                </li>
              </ul>
            </p>
          </div>
          <div>
            <h3 className="flex gap-4 text-lg font-semibold">Menu</h3>
            <div className="mt-2 flex flex-col gap-2">
              <a href="/" className="block">
                Trang chủ
              </a>
              <a href="/shop" className="block">
                Sản phẩm
              </a>
              <a href="/shop" className="block">
                Giày Custom
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Đăng ký nhận tin</h3>
            <div className="mt-4 flex gap-2">
              <Input
                className="h-[40px] rounded-md border border-gray-300"
                placeholder="Nhập email của bạn"
              />
              <Button className="h-[40px] rounded-md bg-primary text-primary-foreground">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
