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
          Giải thích lựa chọn đặt hàng
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <p>
              Kiểu lựa chọn đặt hàng bao gồm 2 kiểu: <strong>đặt hàng</strong>{' '}
              lập tức và <strong>gửi đơn hàng cho G-Local</strong>
            </p>
            <ul className="ml-5 list-decimal">
              <li>
                Đặt hàng lập tức: Hệ thống lập tức ghi nhận đơn hàng, sau đó chờ
                admin liên hệ và hàng sẽ được đóng gói gửi về cho bạn
              </li>
              <li>
                Gửi đơn hàng cho G-Local: Đối với những đơn hàng custom, đơn
                hàng sẽ được gửi về cho G-Local. Đội ngũ hỗ trợ sẽ giúp bạn
                chỉnh sửa lại sao cho đẹp nhất và sau đó sẽ gửi lại cho bạn xác
                nhận{' '}
              </li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-[18px] ">
          Phương thức thanh toán
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <p>
              Hiện tại hệ thống G-Local chỉ hỗ trợ thanh toán COD, tuy nhiên bạn
              cũng có thể liên hệ đội ngũ để tiến hành chuyển khoản, đội ngũ
              G-Local sẽ tiến hành xác nhận cho bạn. Các đơn hàng thanh toán
              trước sẽ được ưu tiên xử lý vì tiết kiệm được thời gian xác thực
              từ chúng tôi
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-[18px] ">Giá tiền</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <p>
              Giá tiền của G-Shoes đối với những đơn hàng có sản phẩm custom sẽ
              được admin xác nhận lại với bạn trước khi gửi hàng. Đối với những
              đơn hàng không custom, giá tiền sẽ được hiển thị ngay trên trang
              sản phẩm
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
