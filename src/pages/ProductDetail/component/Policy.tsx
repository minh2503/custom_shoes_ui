import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
export const Policy = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-[18px] ">
          Chính sách bảo hành
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <p>Sau khi nhận hàng, quý khách có quyền được đổi trả sản phẩm:</p>
            <ul className="ml-5 ">
              <li>- Đổi size (miễn phí)</li>
              <li>- Đổi mẫu (miễn phí)</li>
              <li>- Trả hàng hoàn tiền (có phí)</li>
            </ul>

            <p>Yêu cầu:</p>
            <ul className="ml-5 ">
              <li>
                - Sản phẩm còn mới 100%, chưa qua sử dụng, có đầy đủ phụ kiện
                kèm theo như lúc mua hàng
              </li>
              <li>- Đổi hàng trong vòng 7 ngày từ lúc nhận hàng</li>
              <li>
                - Trả hàng trong vòng 3 ngày từ lúc nhận hàng, phí trả hàng 10%
                giá trị sản phẩm
              </li>
            </ul>

            <p>
              G-Local quyền từ chối đổi trả khi phát hiện sản phẩm đã qua sử
              dụng hoặc bị dơ, bẩn, rách... do bảo quản không cẩn thận. Chi tiết
              đổi trả quý khách vui lòng liên hệ Zalo 094.418.211 để được hỗ
              trợ.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-[18px] ">
          Chính sách giao hàng{' '}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <p>G-Local nhận giao hàng tận nơi trên toàn quốc:</p>
            <ul className="ml-5 list-disc">
              <li>Thời gian giao hàng từ 1-5 ngày tùy địa chỉ</li>
              <li>
                Khách hàng mới cọc 100,000đ, số còn lại quý khách thanh toán
                trực tiếp cho nhân viên giao hàng
              </li>
              <li>Khách hàng từng mua hàng không cần cọc</li>
              <li>Quý khách được kiểm tra sản phẩm trước khi thanh toán</li>
            </ul>

            <p>
              Mọi thắc mắc hoặc cần hỗ trợ về giao hàng, quý khách vui lòng liên
              hệ Zalo 0939 688 099 để được tư vấn nhanh nhất!
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
