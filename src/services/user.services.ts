import axios from 'axios';

export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

export const getUserListService = async (page: number, limit: number) => {
  const response = await axios({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users',
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response;
};
