import { useGetRandomShoes } from '@/queries/shoes.query';
import { useRouter } from '@/routes/hooks';

export const ProductMore = () => {
  const { data: listShoes } = useGetRandomShoes();
  const router = useRouter();
  return (
    <div className="">
      <div>
        <h1 className="mb-2 text-[18px]">Sản phẩm nổi bật</h1>
        <div className="grid h-1/2 grid-cols-4 gap-8">
          {listShoes &&
            listShoes.length > 0 &&
            listShoes.map((product) => (
              <div className="h-1/2 w-full" key={product.id}>
                <div onClick={() => router.push(`/product/${product.id}`)}>
                  <img
                    className="h-full w-full rounded-xl object-cover duration-300 hover:scale-105"
                    src={product.shoesImagesViewModels[0].thumbnail}
                    alt={product.name}
                  />
                </div>
                <div className="mt-3">
                  <p className="text-[14px] text-muted-foreground">
                    BEST SELLER
                  </p>
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
