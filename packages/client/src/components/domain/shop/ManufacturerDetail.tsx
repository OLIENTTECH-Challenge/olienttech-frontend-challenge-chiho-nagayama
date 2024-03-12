import { useParams } from 'react-router-dom';
import styles from './ManufacturerDetails.module.css';

export const ManufacturerDetails = () => {
  let { name } = useParams();
  // 仮の取扱商品と在庫情報
  const products = [
    { productId: 'P01', productName: '商品A', stock: 20 },
    { productId: 'P02', productName: '商品B', stock: 5 },
    { productId: 'P03', productName: '商品C', stock: 10 },
    { productId: 'P04', productName: '商品D', stock: 20 },
    { productId: 'P05', productName: '商品E', stock: 5 },
    { productId: 'P06', productName: '商品F', stock: 10 },

    // 他の商品データ...
  ];

  return (
    <div className={styles.container}>
      <h3>会社名: {name}</h3>
      <p>取扱商品一覧と在庫情報</p>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.productId} className={styles.productItem}>
            <div className={styles.productImage} />
            <div className={styles.productDetails}>
              <div className={styles.productName}>{product.productName}</div>
              <div className={styles.stockInfo}>在庫: {product.stock}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
