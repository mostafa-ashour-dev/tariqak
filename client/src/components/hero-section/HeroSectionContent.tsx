import { Download } from 'lucide-react';
import Btn from '../ui/Btn'
export default function HeroSectionContent() {
  return (
    <div className="w-1/2">
      <h1 className="text-[5rem] font-extrabold mb-[1rem]">تطبيق طريقك</h1>
      <p className="text-1xl font-tajawal text-subtext">
        كل اللي هتحتاجه لعربيتك من إنقاذ، ورش، محطات بنزين، تتبع مباشر وخدمات
        تانية.. كله في تطبيق طريقك 🚗
      </p>
      <div className="mt-[2rem] flex gap-[1rem]">
        <Btn link="#">تحميل التطبيق</Btn>
        <Btn className="px-0 h-[2.8rem] w-[2.8rem] bg-surface border-surface shadow-[0_0_0_2px] shadow-surface text-text hover:text-primary hover:border-surface hover:shadow-surface">
          <Download />
        </Btn>
      </div>
    </div>
  );
}
