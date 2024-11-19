import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import * as fabric from 'fabric';
import styled from 'styled-components';
import IMGShirt from '@/assets/shoes/Product.jpg';
import { ArrowLeftToLine } from 'lucide-react';
//9
// 10;
// 11;
// 12;
// 13;
// 14;
// 15;
// 16;
// 17;
// 18;
// 19;
// 20;
// 21;
// 22;
// 23;
// 24;

// 25;
// 26;
// 27;
// 28;
// 37;
// 38;
// 39;
// 40;
// 41;
// 42;
// 43;
// 29;
// 30;
// 31;
// 32;
// 33;
// 34;
// 35;
// 36;

import Shoes9 from '@/assets/shoes/9.jpg';
import Shoes10 from '@/assets/shoes/10.jpg';
import Shoes11 from '@/assets/shoes/11.jpg';
import Shoes12 from '@/assets/shoes/12.jpg';
import Shoes13 from '@/assets/shoes/13.jpg';
import Shoes14 from '@/assets/shoes/14.jpg';
import Shoes15 from '@/assets/shoes/15.jpg';
import Shoes16 from '@/assets/shoes/16.jpg';
import Shoes17 from '@/assets/shoes/17.jpg';
import Shoes18 from '@/assets/shoes/18.jpg';
import Shoes19 from '@/assets/shoes/19.jpg';
import Shoes20 from '@/assets/shoes/20.jpg';
import Shoes21 from '@/assets/shoes/21.jpg';
import Shoes22 from '@/assets/shoes/22.jpg';
import Shoes23 from '@/assets/shoes/23.jpg';
import Shoes24 from '@/assets/shoes/24.jpg';

import Shoes25 from '@/assets/shoes/25.jpg';
import Shoes26 from '@/assets/shoes/26.jpg';
import Shoes27 from '@/assets/shoes/27.jpg';
import Shoes28 from '@/assets/shoes/28.jpg';
import Shoes29 from '@/assets/shoes/29.jpg';
import Shoes30 from '@/assets/shoes/30.jpg';
import Shoes31 from '@/assets/shoes/31.jpg';
import Shoes32 from '@/assets/shoes/32.jpg';
import Shoes33 from '@/assets/shoes/33.jpg';
import Shoes34 from '@/assets/shoes/34.jpg';
import Shoes35 from '@/assets/shoes/35.jpg';
import Shoes36 from '@/assets/shoes/36.jpg';
import Shoes37 from '@/assets/shoes/37.jpg';
import Shoes38 from '@/assets/shoes/38.jpg';
import Shoes39 from '@/assets/shoes/39.jpg';
import Shoes40 from '@/assets/shoes/40.jpg';
import Shoes41 from '@/assets/shoes/41.jpg';
import Shoes42 from '@/assets/shoes/42.jpg';
import Shoes43 from '@/assets/shoes/43.jpg';
import { useToast } from '@/components/ui/use-toast';
import { SketchPicker } from 'react-color';
import { CongCu } from './MenuDetail';
import { listMenuCustomize } from '@/constants/data';

import { Input } from '@/components/ui/input';
import { exportCanvasAsImage } from '@/helpers';
import { useGetDetailShoes } from '@/queries/shoes.query';
import { useParams } from 'react-router-dom';
import OrderCustomize from './OrderCustomize';

type StarPointsParams = {
  numPoints: number;
  outerRadius: number;
  innerRadius: number;
  centerX: number;
  centerY: number;
};

interface Point {
  x: number;
  y: number;
}

const listDataIMG = [
  // {
  //   name: 'Adidas G001',
  //   image: AdidasG001
  // },
  // {
  //   name: 'Adidas G002',
  //   image: AdidasG002
  // },
  // {
  //   name: 'Adidas G003',
  //   image: AdidasG003
  // },
  // {
  //   name: 'Jordan G001',
  //   image: JordanG001
  // },
  // {
  //   name: 'Jordan G002',
  //   image: JordanG002
  // },
  // {
  //   name: 'Jordan G003',
  //   image: JordanG003
  // }
  {
    id: 9,
    image: Shoes9
  },
  {
    id: 10,
    image: Shoes10
  },
  {
    id: 11,
    image: Shoes11
  },
  {
    id: 12,
    image: Shoes12
  },
  {
    id: 13,
    image: Shoes13
  },
  {
    id: 14,
    image: Shoes14
  },
  {
    id: 15,
    image: Shoes15
  },
  {
    id: 16,
    image: Shoes16
  },
  {
    id: 17,
    image: Shoes17
  },
  {
    id: 18,
    image: Shoes18
  },
  {
    id: 19,
    image: Shoes19
  },
  {
    id: 20,
    image: Shoes20
  },
  {
    id: 21,
    image: Shoes21
  },
  {
    id: 22,
    image: Shoes22
  },
  {
    id: 23,
    image: Shoes23
  },
  {
    id: 24,
    image: Shoes24
  },
  {
    id: 25,
    image: Shoes25
  },
  {
    id: 26,
    image: Shoes26
  },
  {
    id: 27,
    image: Shoes27
  },
  {
    id: 28,
    image: Shoes28
  },
  {
    id: 29,
    image: Shoes29
  },
  {
    id: 30,
    image: Shoes30
  },
  {
    id: 31,
    image: Shoes31
  },
  {
    id: 32,
    image: Shoes32
  },
  {
    id: 33,
    image: Shoes33
  },
  {
    id: 34,
    image: Shoes34
  },
  {
    id: 35,
    image: Shoes35
  },
  {
    id: 36,
    image: Shoes36
  },
  {
    id: 37,
    image: Shoes37
  },
  {
    id: 38,
    image: Shoes38
  },
  {
    id: 39,
    image: Shoes39
  },
  {
    id: 40,
    image: Shoes40
  },
  {
    id: 41,
    image: Shoes41
  },
  {
    id: 42,
    image: Shoes42
  },
  {
    id: 43,
    image: Shoes43
  }
];

export default function CustomizePage() {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [color, setColor] = useState<string>('#ff0000');
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [listImage, setListImage] = useState<string[]>([]);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(
    null
  );
  const [detailCanvas, setDetailCanvas] = useState({
    xPosition: 0,
    yPosition: 0
  });
  const { productId } = useParams();
  const [selectedImg, setSelectedImg] = useState<string>(IMGShirt);
  const [openModal, setOpenModal] = useState(false);
  // query
  const { data: dataShoes } = useGetDetailShoes(String(productId));
  const { toast } = useToast();
  useEffect(() => {
    if (dataShoes) {
      console.log('dataShoes', dataShoes);
      const shoes = listDataIMG.find((item) => item.id == dataShoes?.id);
      console.log('shoes nek', shoes);
      if (shoes) {
        setSelectedImg(shoes.image);
      }
    }
  }, [dataShoes]);

  useEffect(() => {
    setDetailCanvas({
      xPosition: 0,
      yPosition: 0
    } as any);
  }, []);

  useEffect(() => {
    if (canvaRef.current) {
      const fabricCanvas = new fabric.Canvas(canvaRef.current);
      setCanvas(fabricCanvas);

      fabricCanvas.on('selection:created', function (e) {
        console.log('Object selected:', e.selected[0]);
        setSelectedObject(e.selected[0]);
      });

      fabricCanvas.on('selection:updated', function (e) {
        console.log('Selection updated:', e.selected[0]);
        setSelectedObject(e.selected[0]);
      });

      fabricCanvas.on('selection:cleared', function () {
        console.log('Selection cleared');
        setSelectedObject(null);
      });

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        fabricCanvas.dispose();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      deleteSelectedObject();
    }
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (selectedObject) {
      selectedObject.set('fill', newColor);
      canvas?.renderAll();
    }
  };

  const handleExportCanvasAsImage = () => {
    if (canvas) {
      exportCanvasAsImage({
        canvas,
        selectedImg,
        detailPosition: detailCanvas
      });
    }
    setOpenModal(true);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target?.result;
        if (dataURL) {
          setListImage([...listImage, dataURL.toString()]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = (url: string) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const fabricImage = new fabric.Image(img, {
        left: 0,
        top: 0,
        scaleX: 150 / img.width!,
        scaleY: 150 / img.height!
      });
      fabricImage.on('selected', () => {
        setSelectedObject(fabricImage);
      });
      canvas?.add(fabricImage);
      canvas?.renderAll();
    };
  };

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const calculateStarPoints = ({
    numPoints,
    outerRadius,
    innerRadius,
    centerX,
    centerY
  }: StarPointsParams) => {
    const angle = Math.PI / numPoints;
    let points: Point[] = [];

    for (let i = 0; i < 2 * numPoints; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = centerX + radius * Math.cos(i * angle - Math.PI / 2);
      const y = centerY + radius * Math.sin(i * angle - Math.PI / 2);
      points.push({ x, y });
    }

    return points;
  };

  const addShape = (shape: string) => {
    if (!canvas) return;
    let left = 100;
    let top = 100;
    const padding = 10;
    const color = randomColor();
    let newShape: fabric.Object;

    const objects = canvas.getObjects();
    const isOverlapping = (left: number, top: number) => {
      return objects.some((obj) => {
        return (
          obj.left === left ||
          obj.top === top ||
          obj.left! + obj.width! === left ||
          obj.top! + obj.height! === top
        );
      });
    };

    while (isOverlapping(left, top)) {
      left += padding;
      top += padding / 2 - 3;
    }

    const commonProperties = { left: left, top: top, fill: color };

    switch (shape) {
      case 'rectangle':
        newShape = new fabric.Rect({
          width: 50,
          height: 50,
          ...commonProperties
        });
        break;
      case 'circle':
        newShape = new fabric.Circle({ radius: 25, ...commonProperties });
        break;
      case 'triangle':
        newShape = new fabric.Triangle({
          width: 50,
          height: 50,
          ...commonProperties
        });
        break;
      case 'star':
        const points = calculateStarPoints({
          numPoints: 5,
          outerRadius: 25,
          innerRadius: 10,
          centerX: left,
          centerY: top
        });
        newShape = new fabric.Polygon(points, {
          left: left,
          top: top,
          fill: color,
          stroke: 'black',
          strokeWidth: 2
        });
        break;
      case 'line':
        newShape = new fabric.Line([50, 50, 50, 50], { ...commonProperties });
        break;
      default:
        return;
    }

    newShape.on('selected', () => {
      setSelectedObject(newShape);
      setSelectedMenu(0);
    });

    canvas.add(newShape);
    canvas.renderAll();
  };

  const addText = () => {
    if (canvas) {
      const text = new fabric.Textbox('Nội dung văn bản của bạn', {
        left: 50,
        top: 50,
        width: 150,
        fill: color,
        fontSize: 20
      });
      text.on('selected', () => {
        setSelectedObject(text);
        setSelectedMenu(1);
      });
      canvas.add(text);
    }
  };

  const deleteSelectedObject = () => {
    if (canvas && selectedObject) {
      canvas.remove(selectedObject);
      canvas.discardActiveObject();
      setSelectedObject(null);
      canvas.renderAll();
    }
  };

  const renderMenuDetail = (selectedMenu: number) => {
    switch (selectedMenu) {
      case 0:
        return <CongCu addShape={addShape} addImage={addImage} />;
      case 1:
        return (
          <>
            <Button
              onClick={addText}
              className="bg-[#8b3dff] hover:bg-[#662ad4]"
            >
              Thêm ô văn bản
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Input
              id="upload"
              className="hidden"
              type="file"
              onChange={handleUploadImage}
            />
            <label
              htmlFor="upload"
              className="w-[150px] cursor-pointer rounded-2xl bg-yellow p-3 text-center text-black"
            >
              Upload image
            </label>
            <div className="grid grid-cols-2 gap-2">
              {listImage.map((item, index) => (
                <div key={index}>
                  <img
                    src={item}
                    alt="image"
                    className="h-[150px] w-full cursor-pointer object-cover"
                    onClick={() => {
                      addImage(item);
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <ColorPickerContainer>
            <SketchPicker
              color={color}
              onChange={(color) => {
                handleColorChange(color.hex);
              }}
            />
          </ColorPickerContainer>
        );
    }
  };

  const handleSuccess = () => {
    toast({
      title: 'Đặt hàng thành công',
      variant: 'success',
      description: 'Đơn hàng của bạn đã được ghi nhận'
    });
  };

  return (
    <div className="flex h-screen w-full">
      {dataShoes && (
        <OrderCustomize
          openModal={openModal}
          setOpenModal={setOpenModal}
          product={dataShoes}
          onSuccess={handleSuccess}
        />
      )}
      {/* Left Toolbar */}
      <div className="flex w-[5%] flex-col items-center justify-between bg-[#18191b] py-4">
        <div className="grid w-full gap-2">
          <TooltipProvider>
            {listMenuCustomize.map((item, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    className={`flex flex-col hover:bg-[#252627] ${
                      item.id - 1 === selectedMenu
                        ? 'bg-[#252627]'
                        : 'bg-transparent transition-all duration-300'
                    } rounded-0 w-full items-center justify-center p-2`}
                    onClick={() => {
                      setSelectedMenu(item.id - 1);
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.title}</span>
                    <p className="text-[10px] text-white"> {item.title}</p>
                  </button>
                </TooltipTrigger>
                <TooltipContent>{item.title}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        <div className="grid gap-2">
          <TooltipProvider>
            {/* Other toolbar buttons */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    window.location.href = `/product/${productId}`;
                  }}
                >
                  <ArrowLeftToLine
                    className="h-5 w-5 stroke-white 
                  hover:stroke-[#8b3dff]"
                  />
                  <span className="sr-only">Back</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Back</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Menu Detail */}
      <div className="flex w-[20%] flex-col bg-[#252627]">
        <div className="sticky top-0 z-10 px-4 py-3">
          <h3 className="text-lg font-medium text-white">
            {listMenuCustomize[selectedMenu].title}
          </h3>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid gap-2 p-4">{renderMenuDetail(selectedMenu)}</div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-muted">
        <div className="flex h-full items-center justify-center">
          <div className="grid gap-4 rounded-lg bg-background p-8 shadow-lg">
            <div className="flex aspect-[4/3] h-[700px] w-[700px] flex-col items-center justify-center rounded-lg border bg-white">
              <ContainerWrapper bg={selectedImg}>
                <div className="relative h-full w-full border-[1px] border-dotted border-gray-500">
                  <canvas width="700px" height="700px" ref={canvaRef} />
                </div>
              </ContainerWrapper>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportCanvasAsImage}>
                  Lưu và đặt hàng
                </Button>
                <Button
                  variant="outline"
                  onClick={deleteSelectedObject}
                  disabled={!selectedObject}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContainerWrapper = styled.div<{ bg: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${(props) => props.bg});
  width: 100%;
  height: 100%;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  background-position: center;
`;

const ColorPickerContainer = styled.div`
  margin: 20px;
  label {
    margin-right: 10px;
  }
`;
