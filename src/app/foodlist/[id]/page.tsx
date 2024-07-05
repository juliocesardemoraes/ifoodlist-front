"use client";
import { fetchFoodlistById } from "@/api/foodlist";
import { IFoodlist, IRestaurant } from "@/entities/entities";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<IFoodlist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const foodlists = await fetchFoodlistById(params.id);
        setData(foodlists);
      } catch (error) {
        console.error("Failed to fetch foodlists", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [params]);

  useEffect(() => {
    console.log("DATA", data);
  }, [data]);

  if (isLoading) return <h1>Carregando ...</h1>;
  if (data == null) return <h1>404</h1>;
  //   if (data.length === 0)
  //     return (
  //       <main className="flex flex-col justify-center items-center mt-4">
  //         <div className="mt-16"></div>
  //         <Image
  //           src={"/space.png"}
  //           quality={100}
  //           alt="nada aqui"
  //           width={140}
  //           height={140}
  //         />
  //         <h1 className="mt-8">Nada por aqui ainda</h1>
  //         <Button
  //           className="button__primary p-4"
  //           onClick={redirectToCreate}
  //           type="button"
  //         >
  //           Criar sua primeira foodlist
  //         </Button>
  //       </main>
  //     );

  return (
    <>
      <div className="idImage flex justify-center mt-4 mb-4">
        <Image
          src={data.image}
          height={100}
          width={100}
          alt={"List image"}
        ></Image>
      </div>
      <div className="p-4">
        <h1 className="font-bold">{data?.title}</h1>
        <h4>Criado por: {data.creator}</h4>
        {data.restList.length > 0 &&
          data.restList.map((item: IRestaurant) => {
            return (
              <>
                <div
                  className="item__list flex gap-1 items-center justify-between mt-2"
                  key={item._id}
                >
                  <div className="flex gap-2 items-center">
                    <Image
                      src={item.image}
                      width={50}
                      height={50}
                      alt={"item image"}
                    ></Image>
                    <div>
                      <h1>{item.title}</h1>
                      <div className="flex gap-4">
                        <p>{item.rank}</p>
                        <p>{item.type}</p>
                      </div>
                    </div>
                  </div>
                  <Link className="chevron" href={item.link} target="_blank">
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
    </>
  );
}
