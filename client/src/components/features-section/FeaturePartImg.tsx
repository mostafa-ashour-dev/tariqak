import Image from "next/image"



type Props = {
    imgSrc: string,
    imgAlt: string,
    width?: number | string,
}

export default function FeaturePartImg({imgSrc, imgAlt, width}: Props) {
  return (
    <div className={`flex items-stretch justify-center w-[${width && width.toString().includes("%") ? width : `${width}px ` || "50%"}]`} >
        <Image src={imgSrc} alt={imgAlt} width={500} height={300} className={`object-contain w-full`}  />
    </div>
  )
}
