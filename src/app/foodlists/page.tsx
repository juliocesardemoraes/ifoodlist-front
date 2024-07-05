"use client";
import React, { useEffect, useState } from "react";
import { fetchFoodlists } from "@/api/foodlist";
import { IFoodlist } from "@/entities/entities";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FoodList() {
  const [data, setData] = useState<IFoodlist[] | null>(null);
  const [filterData, setFilterData] = useState<IFoodlist[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const foodlists = await fetchFoodlists();
        setData(foodlists);
        setFilterData(foodlists);
      } catch (error) {
        console.error("Failed to fetch foodlists", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const redirectToCreate = () => {
    router.push("/foodlistcreate");
  };

  if (isLoading) return <h1>Carregando ...</h1>;
  if (data.length === 0)
    return (
      <main className="flex flex-col justify-center items-center mt-4">
        <div className="mt-16"></div>
        <Image
          src={"/space.png"}
          quality={100}
          alt="nada aqui"
          width={140}
          height={140}
        />
        <h1 className="mt-8">Nada por aqui ainda</h1>
        <Button
          className="button__primary p-4"
          onClick={redirectToCreate}
          type="button"
        >
          Criar sua primeira foodlist
        </Button>
      </main>
    );

  const searchAll = () => {
    const filteredData = data?.filter((foodlist) =>
      foodlist.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilterData(filteredData);
  };

  return (
    <main className="p-4">
      <h1 className="font-semibold">Suas Foodlists</h1>
      <hr className="red__hr w-[122px]"></hr>
      <div className="search mt-2">
        <div className="flex items-center gap-2">
          <div
            className="lupa"
            onClick={() => {
              searchAll();
            }}
          >
            <Image src={"/lupa.svg"} width={12} height={12} alt="lupa"></Image>
          </div>
          <input
            id="title"
            name="Title"
            placeholder="Pesquise aqui uma foodlist"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          ></input>
        </div>
        <div
          className="close"
          onClick={() => {
            setFilterData(data);
            setSearchInput("");
          }}
        >
          <Image src={"/x.svg"} width={12} height={12} alt="lupa"></Image>
        </div>
      </div>

      <div className="mt-4">
        {filterData?.map((foodlist: IFoodlist) => {
          return (
            <>
              <div
                className="item__list flex gap-1 items-center justify-between mt-2"
                key={foodlist._id}
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={foodlist.image}
                    width={50}
                    height={50}
                    alt={"Foodlist image"}
                  ></Image>
                  <div>
                    <h1>{foodlist.title}</h1>
                    <p>Criador: {foodlist.creator}</p>
                  </div>
                </div>
                <Link className="chevron" href={`/foodlist/${foodlist._id}`}>
                  <Image
                    src={"/chevron.svg"}
                    width={16}
                    height={16}
                    alt={"Chevron"}
                  ></Image>
                </Link>
              </div>
              <hr className="gray__hr mt-3"></hr>
            </>
          );
        })}
      </div>
      <div className="flex justify-end mt-4">
        <Button
          className="button__primary p-4"
          onClick={redirectToCreate}
          type="button"
        >
          Criar uma nova FoodList
        </Button>
      </div>
    </main>
  );
}
