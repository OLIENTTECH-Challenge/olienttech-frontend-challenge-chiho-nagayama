import { Link, useParams } from 'react-router-dom';
import styles from './ManufacturerDetails.module.css';

export const ManufacturerDetails = () => {
  let { name } = useParams();
  // 仮の取扱商品と在庫情報
  const products = [
    { id: '1', name: '商品A', description: 'aaa', price: 1000, stock: 10 },
    { id: '2', name: '商品B', description: 'bbb', price: 1500, stock: 20 },
    { id: '3', name: '商品C', description: 'ccc', price: 2000, stock: 5 },
    { id: '4', name: '商品D', description: 'ddd', price: 2500, stock: 8 },
    { id: '5', name: '商品E', description: 'eee', price: 3000, stock: 70 },
    { id: '6', name: '商品F', description: 'fff', price: 2000, stock: 5 },
    { id: '7', name: '商品G', description: 'ggg', price: 2500, stock: 8 },
    { id: '8', name: '商品H', description: 'hhh', price: 3000, stock: 70 },

    // 他の商品データ...
  ];

  return (
    <div className={styles.container}>
      <h3>会社名: {name}</h3>
      <p>取扱商品一覧と在庫情報</p>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <div className={styles.productImage} />
            <div className={styles.productDetails}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productDescription}>説明: {product.description}</div>
              <div className={styles.productPrice}>価格: ¥{product.price}</div>
              <div className={styles.stockInfo}>在庫: {product.stock}</div>

              <Link
                to={`/shop/manufacturers/${name ? encodeURIComponent(name) : ''}/${product.id}?stock=${
                  product.stock
                }&price=${product.price}`}
                className={styles.orderLink}
              >
                発注する
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
