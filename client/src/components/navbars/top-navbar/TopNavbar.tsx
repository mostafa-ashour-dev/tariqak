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
        <div className="flex justify-between items-center p-[1rem] w-full bg-surface rounded-full">
            <div className="me-[1rem]">
              <h2 className="text-2xl font-bold">الشعار</h2>
            </div>

            <ul className="flex items-center gap-4">
              {
                links.map((link, index) => (
                  <Link key={index} text={link.name} link={link.href} />
                ))
              }
            </ul>

            <div>
              <Btn>
                تواصل معنا
              </Btn>
            </div>
        </div>
    </nav>
  )
}
