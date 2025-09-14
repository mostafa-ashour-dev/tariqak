import Image from 'next/image';
import Btn from '../../ui/Btn';
import Link from '../../ui/Link';

const links = [
  {
    name: 'الصفحة الرئيسية',
    href: '#'
  },
  {
    name: 'الفكرة',
    href: '#'
  },
  {
    name: 'المزاية',
    href: '#'
  }
]

export default function TopNavbar() {
  return (
    <nav className="flex items-center align-center px-[2.5rem] pt-[2rem] w-full fixed top-0 left-0 z-100">
      <div className="flex justify-between items-center  w-full bg-surface rounded-full">
        <div className="h-full me-[1rem]">
          <Image
            src="/imgs/logos/logo-icon.png"
            alt="Logo Icon"
            className="object-contain p-[.5rem] max-h-[4rem] "
            width={60}
            height={40}
          />
        </div>

        <ul className="flex items-center py-[1rem] gap-4">
          {links.map((link, index) => (
            <Link key={index} text={link.name} link={link.href} />
          ))}
        </ul>

        <div className="p-[1rem]">
          <Btn>تواصل معنا</Btn>
        </div>
      </div>
    </nav>
  );
}
