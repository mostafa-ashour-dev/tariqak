import Image from "next/image";
import React from "react";
import FooterSectionItem from "./FooterSectionItem";
import { footerSections } from "@/constants/footer.const";

export default function FooterSection() {
  return (
    <footer className="p-[2rem] pb-[1.5rem] flex flex-col items-start justify-center gap-2 bg-surface rounded-t-3xl">
      <header className="w-full flex items-start justify-start gap-[1rem] mb-[1.5rem] border-b-2 border-border pb-[1.5rem]">
        <div className="object-contain w-[50px] h-[50px] rounded-xl bg-border flex items-center justify-center">
          <Image
            src="/imgs/logos/logo-icon.png"
            alt="Logo Icon"
            width={40}
            height={40}
            className="object-contain w-[45px] h-[45px] rounded-2xl"
          />
        </div>

        <div className="flex flex-col items-start justify-center gap-[1rem]">
          <h2 className="text-5xl font-bold leading-none">طريقك</h2>
        </div>
      </header>

      <div className="w-full grid grid-cols-4 gap-[1rem]">
        {footerSections.map((section, index) => (
          <FooterSectionItem
            key={index}
            heading={section.heading}
            links={section.links}
          />
        ))}
      </div>

      <div className="w-full h-auto bg-body text-center py-3 rounded-xl mt-[1.5rem]">
        <p className="text-sm text-subtext">
          © {new Date().getFullYear()} تطبيق طريقك. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
