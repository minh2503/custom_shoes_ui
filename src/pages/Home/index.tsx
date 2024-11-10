import BasePages from '@/components/shared/base-pages.js';
import Promo from './components/Promo';
import BannerImg from '@/assets/banner/slider_1.jpg';
import Footer from '@/components/shared/footer';
import { ProductMore } from '../ProductDetail/component/ProductMore';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const listLogo = [
  {
    id: 1,
    title: 'Hàng chính hãng',
    url: 'https://theme.hstatic.net/200000858039/1001213316/14/season_coll_1_img_large.png?v=344'
  },
  {
    id: 2,
    title: 'Yordan Best Quality',
    url: 'https://theme.hstatic.net/200000858039/1001213316/14/season_coll_2_img_large.png?v=344'
  },
  {
    id: 3,
    title: 'Nike',
    url: 'https://theme.hstatic.net/200000858039/1001213316/14/season_coll_3_img_large.png?v=344'
  },
  {
    id: 4,
    title: 'Adidas',
    url: 'https://theme.hstatic.net/200000858039/1001213316/14/season_coll_4_img_large.png?v=344'
  },
  {
    id: 5,
    title: 'Converse',
    url: 'https://theme.hstatic.net/200000858039/1001213316/14/season_coll_5_img_large.png?v=344'
  }
];

export default function ShopPage() {
  return (
    <div className="bg-white">
      <Promo />
      <img alt="banner" src={BannerImg} />
      <BasePages
        className="relative mx-auto w-[90%] flex-1 overflow-y-auto bg-white p-4"
        pageHead="Trang chủ | G-Local"
      >
        <div className="grid grid-cols-5 bg-white">
          {listLogo.map((item, index) => (
            <div className="flex flex-col items-center justify-center duration-500 hover:scale-110">
              {' '}
              <img
                className="h-[150px] w-[150px]  object-cover"
                key={index}
                src={item.url}
                alt={item.title}
              />
              <span> {item.title}</span>
            </div>
          ))}
        </div>

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
