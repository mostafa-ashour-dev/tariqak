import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";
import Btn from "../ui/Btn";

type Props = {
  theme: "solid" | "red" | "blue";
  heading: string;
  text: string;
  callToAction: {
    text: string;
    link: string;
  };
};

interface ThemeColors {
  bg?: string;
  surface?: string;
  text?: string;
  btn?: string;
}

export default function BoxShapedSection({
  theme,
  heading,
  text,
  callToAction,
}: Props) {


  let themeColors: ThemeColors = {
    bg: "bg-surface",
    surface: "primary-dark",
    text: "text",
    btn: "fourth",
  };

  switch (theme) {
    case "red":
      themeColors = {
        bg: "bg-primary",
        surface: "border-primary-dark",
        text: "text",
        btn: "fourth",
      };
      break;
    case "blue":
      themeColors = {
        bg: "bg-secondary",
        surface: "border-secondary-dark",
        text: "text",
        btn: "second",
      };
      break;
    default:
      themeColors = {
        bg: "bg-surface",
        surface: "border-primary-dark",
        text: "text",
        btn: "fourth",
      };
      break;
  }

  return (
    <section className={`section py-[3rem] rounded-3xl ${themeColors.bg}`}>
      <SectionHeader>{heading}</SectionHeader>
      <div
        className={`shape w-[20rem] h-[20rem] absolute top-[-5rem] right-[-5rem] rounded-full border-[2rem] ${themeColors.surface} z-10`}
      ></div>
      <div
        className={`shape w-[20rem] h-[20rem] absolute bottom-[-5rem] left-[-5rem] rounded-4xl border-[2rem] ${themeColors.surface} z-10`}
      ></div>
      <div
        className={`shape w-[5rem] h-[5rem] absolute top-[3rem] left-[30%] rounded-full border-[.5rem] ${themeColors.surface} z-10`}
      ></div>
      <div
        className={`shape w-[5rem] h-[5rem] absolute bottom-[3rem] right-[30%] rounded-3xl border-[.5rem] ${themeColors.surface} z-10`}
      ></div>
      <div className="w-full flex items-center justify-center z-20">
        <p className="text-[2rem] w-[80%] text-center font-tajawal ">
          {text}
        </p>
      </div>

      {callToAction && (
        <Btn className={`btn-${themeColors.btn}`} link={callToAction.link}>{callToAction.text}</Btn>
      )}
    </section>
  );
}
