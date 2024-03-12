import * as shopApi from '@/api/shop';
import { Button } from '@/components/base/Button';
import { LinkCard } from '@/components/base/LinkCard';
import { useAuthLoaderData } from '@/hooks/useAuthLoaderData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import { ManufacturerList } from './ManufacturerList';
import { OrderPage } from './OrderPage';

type Response = Awaited<ReturnType<typeof shopApi.fetchShopInfo>>;

const useShopInfo = () => {
  const lodaerData = useAuthLoaderData();
  const shopId = lodaerData.id;
  const token = lodaerData.token;
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
  const navigate = useNavigate();
  const [showManufacturerList] = useState(false);
  const [showOrder] = useState(false);

  const logout = () => {
    document.cookie = 'token=; max-age=0';
    location.reload();
  };

  const handleShowManufacturerList = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    navigate('/shop/manufacturers');
  };

  const handleShowOrderPage = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    navigate('/shop/orders');
  };

  return (
    <>
      <div className={styles.container}>
        {showManufacturerList ? (
          <ManufacturerList />
        ) : showOrder ? (
          <OrderPage /> // OrderPage コンポーネントを表示
        ) : (
          <>
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
            {/* <div className={styles.linkList}> */}
            <div onClick={handleShowManufacturerList} className={styles.linkCardWrapper}>
              <LinkCard
                title='発注会社一覧'
                description='商品を発注できる会社一覧です'
                href='/shop/manufacturers'
                className={styles.linkCard}
              />
            </div>
            <div onClick={handleShowOrderPage} className={styles.linkCardWrapper}>
              <LinkCard
                title='商品一覧'
                description='取り扱い商品のカタログを確認します'
                href='/shop/orders'
                className={styles.linkCard}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
