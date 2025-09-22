import { socialLinks } from "@/constants/social.const";
import { SocialIcon } from "react-social-icons";


type Props = {
    className?: string;
};

export default function HeroSectionSocialLinks({ className }: Props) {
  return (
    <div className={` ${className}`}>
      <ul className="flex items-center justify-strat gap-[1rem]">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <SocialIcon
              url={link.url}
              bgColor="#1e1e1e"
              fgColor="white"
              network={link.icon}
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: 43, width: 43 }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
