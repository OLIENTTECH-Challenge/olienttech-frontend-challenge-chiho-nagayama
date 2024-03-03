import { APP_API_URL } from '@/libs/constants';
import { SuccessResponse } from '@olienttech/model';

// ショップの情報取得
type FetchShopInfoRequest = {
  shopId: string;
  token: string;
};

type FetchShopInfoResponse = {
  id: string;
  name: string;
  description: string;
};

export const fetchShopInfo = async (req: FetchShopInfoRequest) => {
  const { shopId, token } = req;

  const res = await fetch(`${APP_API_URL}/shops/${shopId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error();
  }

  const json = (await res.json()) as SuccessResponse<FetchShopInfoResponse>;
  return json.data;
};

// 商品カタログの取得
type FetchProductsRequest = {
  shopId: string;
  token: string;
};

type FetchProductsResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}[];

export const fetchProducts = async (req: FetchProductsRequest) => {
  const { shopId, token } = req;

  const res = await fetch(`${APP_API_URL}/shops/${shopId}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error();
  }

  const json = (await res.json()) as SuccessResponse<FetchProductsResponse>;
  return json.data;
};

// 注文履歴の取得
type FetchOrdersRequest = {
  shopId: string;
  token: string;
};

type FetchOrdersResponse = {
  id: string;
  date: string;
  totalPrice: number;
  items: {
    productId: string;
    quantity: number;
  }[];
}[];

export const fetchOrders = async (req: FetchOrdersRequest) => {
  const { shopId, token } = req;

  const res = await fetch(`${APP_API_URL}/shops/${shopId}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error();
  }

  const json = (await res.json()) as SuccessResponse<FetchOrdersResponse>;
  return json.data;
};
