import * as shopApi from '@/api/shop';
import { Button } from '@/components/base/Button';
import { LinkCard } from '@/components/base/LinkCard';
import { useAuthLoaderData } from '@/hooks/useAuthLoaderData';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';

type Response = Awaited<ReturnType<typeof shopApi.fetchShopInfo>>;

const useShopInfo = () => {
  const lodaerData = useAuthLoaderData();
  const shopId = lodaerData.id;
  const token = lodaerData.token;
  // const shopId = lodaerData.id;
  // const token = lodaerData.token;

  const [shopInfo, setShopInfo] = useState<Response | null>(null);

  useEffect(() => {
    if (shopId && token) {
      void shopApi.fetchShopInfo({ shopId, token }).then((res) => {
        setShopInfo(res);
      });
    }
  }, [shopId, token]);

  return { shopInfo };
};

export const ShopHomePage = () => {
  const { shopInfo } = useShopInfo();

  const logout = () => {
    document.cookie = 'token=; max-age=0';
    location.reload();
  };

  return (
    <>
      <div className={styles.container}>
        {shopInfo && (
          <div>
            <h3>{shopInfo.name}</h3>
            <p>{shopInfo.description}</p>
            <div className={styles.logoutButton}>
              <Button variant='outlined' onClick={logout}>
                ログアウト
              </Button>
            </div>
          </div>
        )}
        <div className={styles.linkList}>
          <LinkCard
            title='発注会社一覧'
            description='商品を発注できる会社一覧です'
            href='/shop/manufacturers'
            className={styles.linkCard}
          />
          <LinkCard
            title='商品一覧'
            description='取り扱い商品のカタログを確認します'
            href='//shop/orders'
            className={styles.linkCard}
          />
        </div>
      </div>
    </>
  );
};
