import * as api from '@/api';
import { Role } from '@olienttech/model';
import { LoaderFunction, redirect } from 'react-router-dom';

// 共通の認証ロジックを抽象化した関数
const authLoader = async (roleRequired: string, redirectPath: string) => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token'))
    ?.split('=')[1];

  if (!token) {
    return redirect(redirectPath);
  }

  try {
    const { id, role } = await api.verify(token);

    if (role !== roleRequired) {
      return redirect(redirectPath);
    }

    return {
      id,
      role,
      token,
    };
  } catch {
    return redirect(redirectPath);
  }
};

// 製造業者用の認証ローダー
export const manufacturerAuthLoader: LoaderFunction = () => {
  return authLoader(Role.Manufacturer, '/manufacturer/login');
};

// ショップ用の認証ローダー
export const shopAuthLoader: LoaderFunction = () => {
  return authLoader(Role.Shop, '/shop/login');
};

// import { Role } from '@olienttech/model';
// import { LoaderFunction, redirect } from 'react-router-dom';
// import * as api from '@/api';

// export const manufacturerAuthLoader: LoaderFunction = async () => {
//   const token = document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('token'))
//     ?.split('=')[1];

//   if (token === undefined) {
//     return redirect('/manufacturer/login');
//   }

//   try {
//     const { id, role } = await api.verify(token);

//     if (role !== Role.Manufacturer) {
//       return redirect('/manufacturer/login');
//     }

//     return {
//       id,
//       role,
//       token,
//     };
//   } catch {
//     return redirect('/manufacturer/login');
//   }
// };
