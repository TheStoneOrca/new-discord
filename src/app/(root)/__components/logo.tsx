import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Logo() {
  return (
    <div className="flex text-center">
      <Image
        src="/CocoCord-logos_black.png"
        alt="logo"
        className="dark:block hidden"
        width={50}
        height={50}
      />
      <Image
        src="/CocoCord-logos_white.png"
        alt="logo"
        className="dark:hidden block"
        width={50}
        height={50}
      />
      <p
        className={cn(
          "text-center text-2xl dark:text-black text-white",
          font.className
        )}
      >
        CocoCord
      </p>
    </div>
  );
}
