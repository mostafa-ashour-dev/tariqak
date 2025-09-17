import BoxShapedSection from "../box-shaped-section/BoxShapedSection"

export default function CTASection() {
  return (
    <BoxShapedSection heading="حمل التطبيق" text="حمل تطبيق طريقك واستمتع برحلة أمنة - كل اللي هتحتاجه لعربيتك هتلاقيه في تطبيق طريقك." callToAction={{
        text: "حمل الأن",
        link: "#"
    }} theme="red"/>
  )
}
