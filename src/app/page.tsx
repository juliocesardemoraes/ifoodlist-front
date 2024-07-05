import Header from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <Link href={"/foodlists"}>
          <Image
            src={"intro.svg"}
            height={300}
            width={384}
            quality={100}
            alt="intro"
          />
        </Link>
      </main>
    </>
  );
}
