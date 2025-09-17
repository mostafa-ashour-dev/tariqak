import Btn from "../ui/Btn"


type Props = {
    title?: string
    description?: string
    callToAction?: {
        text: string
        link?: string
    }
    width?: number | string
}

export default function FeaturePartContent({title, description, callToAction, width}: Props) {
    return (
      <div
        className={`w-[${
          width && width.toString().includes("%")
            ? width
            : `${width}px ` || "50%"
        }] flex items-start justify-center flex-col`}
      >
        {title && <h3 className="text-[1rem] font-bold text-primary"> {title} </h3>}
        {description && (
          <p className="text-[2rem] font-tajawal"> {description} </p>
        )}
        {callToAction && (
          <Btn link={callToAction.link} className="mt-[1.5rem]">
            {callToAction.text}
          </Btn>
        )}
      </div>
    );
}
