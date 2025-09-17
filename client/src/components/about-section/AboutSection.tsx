import BoxShapedSection from "../box-shaped-section/BoxShapedSection";

export default function AboutSection() {
  return (
    <BoxShapedSection
      heading="عن التطبيق"
      text="طريقك هو تطبيق بيقدملك منصة كاملة لكل حاجة ممكن تحتاجهة لعربيتك وأنت
          على الطريق عشان تضمن لنفسك رحلة أمنة."
      callToAction={{
        text: "اقرأ المزيد",
        link: "#"
      }}
      theme="solid"
    />
  );
}
