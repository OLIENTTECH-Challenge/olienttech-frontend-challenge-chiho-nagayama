import { Breadcrumb } from '@/components/case/Breadcrumb';
import { Container } from '@/components/case/Container';
import { HomeHeader } from '@/components/common/HomeHeader';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './Layout.module.css';

export const ShopLayout = () => {
  const params = useParams();
  const orderId = params['orderId'];

  const location = useLocation();
  const isLoginPage = location.pathname.includes('login');
  const isManufacturerListPage = location.pathname.includes('manufacturers');
  const isOrderListPage = location.pathname.includes('orders');
  const isOrderPage = !!orderId;

  let breadcrumbItems = [{ href: '/shop', title: 'ドラッグストア向けトップ' }];
  if (isManufacturerListPage) {
    breadcrumbItems = [...breadcrumbItems, { href: '/shop/manufacturers', title: '発注会社一覧' }];
  }
  if (isOrderListPage) {
    breadcrumbItems = [...breadcrumbItems, { href: '/shop/orders', title: '商品一覧' }];
  }
  if (isOrderPage) {
    breadcrumbItems = [...breadcrumbItems, { href: location.pathname, title: orderId }];
  }
  if (isLoginPage) {
    breadcrumbItems = [];
  }
  return (
    <>
      <HomeHeader />
      <Container>
        <div className={styles.container}>
          <Breadcrumb items={breadcrumbItems} />
          <Outlet />
        </div>
      </Container>
    </>
  );
};
