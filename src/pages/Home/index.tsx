import BasePages from '@/components/shared/base-pages.js';
import Promo from './components/Promo';
import BannerImg from '@/assets/banner/slider_1.jpg';
import Footer from '@/components/shared/footer';
import { ProductMore } from '../ProductDetail/component/ProductMore';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ShopPage() {
  return (
    <div className="bg-white">
      <Promo />
      <img alt="banner" src={BannerImg} />
      <BasePages
        className="relative mx-auto w-[90%] flex-1 overflow-y-auto bg-white p-4"
        pageHead="Trang chủ | G-Local"
      >
        <div className="mt-[5%]">
          <ProductMore />
        </div>
        <div className="mt-[5%] flex w-full justify-center ">
          <Link to="/shop">
            {' '}
            <Button className="bg-yellow text-black">Xem thêm</Button>
          </Link>
        </div>
        <Footer />
      </BasePages>
    </div>
  );
}
