import { Download } from 'lucide-react';
import Btn from '../ui/Btn'

export default function HeroSectionContent() {
  return (
    <div className="">
      <h1 className="text-[5rem] font-extrabold mb-[1rem]">تطبيق طريقك</h1>
      <p className="text-1xl font-tajawal text-subtext">
        كل اللي هتحتاجه لعربيتك من إنقاذ، ورش، محطات بنزين، تتبع مباشر وخدمات
        تانية.. كله في تطبيق طريقك 🚗
      </p>
      <div className="mt-[2rem] flex gap-[1rem]">
        <Btn link="#">تحميل التطبيق</Btn>
        <Btn className="btn-fourth w-[43px] h-[43px] p-0">
          <Download />
        </Btn>
      </div>

    </div>
  );
}
