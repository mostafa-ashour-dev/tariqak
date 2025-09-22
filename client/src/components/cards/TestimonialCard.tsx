import { Testimonial as Props } from "@/interfaces/testimonials.interface";
import Image from "next/image";

export default function TestimonialCard({ user, content, createdAt }: Props) {
  return (
    <div className="flex flex-col items-start justify-start gap-[1rem] bg-surface rounded-3xl p-[2rem] w-full ">
      <header className="w-full flex items-start justify-start gap-[1rem]">
        <div className="w-[50px] h-[50px] rounded-full">
          <Image
            src={user.avatar}
            alt="Logo Icon"
            width={50}
            height={50}
            className="object-contain w-full h-full rounded-full"
          />
        </div>

        <div className="flex flex-col items-start justify-center">
          <h3 className="text-lg font-bold leading-relaxed">{user.username}</h3>
          <p className="text-subtext text-sm">{user.role}</p>
        </div>
      </header>

      <p className="text-subtext text-sm font-tajawal">{content}</p>

      <span className="text-primary text-sm place-self-end">{createdAt}</span>
    </div>
  );
}
