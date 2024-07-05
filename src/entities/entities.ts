export interface IFoodlist {
  _id?: string;
  title: string;
  creator: string;
  image: string;
  privacy: string;
  restList?: IRestaurant[];
}

export interface IRestaurant {
  _id?: string;
  title: string;
  type: string;
  rank: number;
  link: string;
  image: string;
}
