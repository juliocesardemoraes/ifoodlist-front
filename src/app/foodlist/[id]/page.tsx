"use client";
import {
  addRestaurantToList,
  fetchFoodlistById,
  fetchRestaurants,
} from "@/api/foodlist";
import { IFoodlist, IRestaurant } from "@/entities/entities";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<IFoodlist | null>(null);
  const [ids, setIds] = useState<string[] | null>(null);
  const [dataSuggestions, setDataSuggestions] = useState<IRestaurant[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const foodlists = await fetchFoodlistById(params.id);
        const idsToInsert = [];
        for (let i = 0; i < foodlists?.restList?.length; i++) {
          idsToInsert.push(foodlists?.restList[i]?._id);
        }
        setIds(idsToInsert);
        setData(foodlists);
      } catch (error) {
        console.error("Failed to fetch foodlists", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getDataSuggestions = async () => {
      try {
        const foodlists = await fetchRestaurants(params.id);
        setDataSuggestions(foodlists);
      } catch (error) {
        console.error("Failed to fetch foodlists", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    getDataSuggestions();
  }, [params]);

  const addRestaurant = async (item) => {
    setData((prev) => {
      return { ...prev, restList: [...prev.restList, item] };
    });

    try {
      await addRestaurantToList(item, params.id);
    } catch (error) {
      console.error("Failed to add restaurant", error);
    }

    const filter = dataSuggestions.filter(
      (itemSugg) => itemSugg._id != item._id
    );
    setDataSuggestions(filter);
  };

  if (isLoading) return <h1>Carregando ...</h1>;
  if (data == null) return <h1>404</h1>;

  return (
    <>
      <div className="idImage flex justify-center mt-4 mb-4">
        <Image
          src={data?.image}
          height={100}
          width={100}
          alt={"List image"}
        ></Image>
      </div>
      <div className="p-4">
        <h1 className="font-bold">{data?.title}</h1>
        <h4>Criado por: {data.creator}</h4>
        {data?.restList.length > 0 &&
          data?.restList.map((item: IRestaurant) => {
            return (
              <>
                <div
                  className="item__list flex gap-1 items-center justify-between mt-2"
                  key={item._id}
                >
                  <div className="flex gap-2 items-center">
                    <Image
                      src={item?.image}
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

        <div className="mt-12">
          <h1 className="font-bold">Sugestões</h1>
        </div>
        {dataSuggestions?.length > 0 &&
          dataSuggestions.map((item) => (
            <>
              {ids.includes(item._id) ? (
                <>AH</>
              ) : (
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
                      />
                      <div>
                        <h1>{item.title}</h1>
                        <div className="flex gap-4">
                          <p>{item.rank}</p>
                          <p>{item.type}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="chevron"
                      target="_blank"
                      onClick={() => {
                        addRestaurant(item);
                      }}
                    >
                      <h1 className="font-semibold text-2xl text-red-400">+</h1>
                    </div>
                  </div>
                  <hr className="gray__hr mt-3"></hr>
                </>
              )}
            </>
          ))}
      </div>
    </>
  );
}
