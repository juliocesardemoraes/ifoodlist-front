"use client";
import { addFoodlist } from "@/api/foodlist";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  const cadastrarFoodlist = async (event) => {
    const data = new FormData(event.target);
    const title = data.get("title");
    const privacy = data.get("privacy");

    if (typeof title != "string") return;
    if (typeof privacy != "string") return;

    await addFoodlist({
      title,
      privacy,
      creator: "Douglas",
      restList: [],
      image: "https://i.imgur.com/baKajKw.png",
    });
  };

  return (
    <main className="font-semibold">
      <h1 className="mt-4">Coloque o nome da foodlist abaixo</h1>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarFoodlist(e);
          router.push("/foodlists");
        }}
      >
        <input
          className="input w-[100%]"
          placeholder="Nome da foodlist"
          id="title"
          name="title"
          required
        ></input>

        <select className="input w-[100%] mt-4" id="privacy" name="privacy">
          <option value="public">Pública</option>
          <option value="private">Privada</option>
        </select>
        <div className="flex justify-center">
          <Button
            className="button__primary mt-8 pl-16 pr-16 pt-4 pb-4"
            onClick={() => {}}
            type="submit"
          >
            Criar a foodlist
          </Button>
        </div>
      </form>
    </main>
  );
}
