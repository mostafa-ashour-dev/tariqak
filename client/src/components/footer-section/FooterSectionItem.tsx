import { FooterSectionItem as Props } from "../../interfaces/footer.interface";
import Link from "../ui/Link";

export default function FooterSectionItem({heading, links}: Props) {
  return (
    <div className="flex flex-col items-start justify-center gap-[1rem]">
        <h3 className="text-lg font-bold"> {heading} </h3>
        <ul className="flex flex-col items-start justify-center gap-[1rem]">
            {links && links.length > 0 ? links.map((link, index) => <li key={index}> <Link href={link.href} className="text-sm"> {link.text} </Link> </li>): ""}
        </ul>
    </div>
  )
}
