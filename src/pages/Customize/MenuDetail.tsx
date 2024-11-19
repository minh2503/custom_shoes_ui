import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImgCustomize } from '@/constants/data';

interface CongCuProps {
  addImage: (url: string) => void;
  addShape: (shape: string) => void;
}

const CongCu: React.FC<CongCuProps> = (props) => {
  return (
    <div className="w-full bg-transparent text-white">
      <div>
        <Input
          type="search"
          placeholder="Tìm kiếm thành phần"
          className="w-full rounded-md p-2"
        />
      </div>
      <div className="my-4 flex space-x-2">
        <Button className="bg-gray-700">Logo</Button>
        <Button className="bg-gray-700">Khung</Button>
        <Button className="bg-gray-700">Hình tròn</Button>
        <Button className="bg-gray-700">Hoa</Button>
      </div>
      <div className="mb-4">
        <h2 className="mb-2 text-lg font-bold">Hình ảnh</h2>
        <div className="mb-2 flex items-center gap-3">
          {ImgCustomize.map((item, index) => (
            <img
              key={index}
              src={item.img}
              alt="recent"
              className="h-[70px] w-[70px] cursor-pointer"
              width="50"
              height="50"
              onClick={() => {
                props.addImage(item.img);
              }}
              style={{ aspectRatio: '50/50', objectFit: 'cover' }}
            />
          ))}
        </div>
        <div className="mb-2 flex items-center"></div>
      </div>
      <div className="mb-4">
        <h2 className="mb-2 text-lg font-bold">Hình dạng</h2>
        <div className="mb-2 flex items-center gap-2">
          {/* Rectangle */}
          <div
            className="h-16 w-16 cursor-pointer bg-gray-600"
            onClick={() => props.addShape('rectangle')}
          />
          {/* Circle */}
          <div
            className="ml-2 h-16 w-16 cursor-pointer rounded-full bg-gray-600"
            onClick={() => props.addShape('circle')}
          />
          {/* Triangle */}
          <div
            className="ml-2 h-16 w-16 cursor-pointer bg-gray-600"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            onClick={() => props.addShape('triangle')}
          />
          {/* Star */}
          <div
            className="ml-2 h-16 w-16 cursor-pointer bg-gray-600"
            style={{
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
            onClick={() => props.addShape('star')}
          />
          {/* Line */}
        </div>
      </div>
    </div>
  );
};

export { CongCu };
