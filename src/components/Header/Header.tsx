import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <Link href={"/"}>
          <Image
            src={"/ifoodlogo.png"}
            width={50}
            height={25}
            priority={true}
            alt="ifood logo"
            quality={100}
          ></Image>
        </Link>
        <h1>Próximo a avenida ...</h1>
        <Image
          src={"chevron.svg"}
          width={10}
          height={4}
          alt="chevron"
          quality={100}
        ></Image>
      </header>
      <hr className="gray__hr"></hr>
    </>
  );
}
