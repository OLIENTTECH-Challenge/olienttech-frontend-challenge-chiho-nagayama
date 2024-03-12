import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './OrderPage.module.css';

// 商品の型定義
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export const OrderPage = () => {
  // const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProducts] = useState<Product[]>([
    { id: '1', name: '商品A', description: 'aaa', price: 1000, stock: 10 },
    { id: '2', name: '商品B', description: 'bbb', price: 1500, stock: 20 },
    { id: '3', name: '商品C', description: 'ccc', price: 2000, stock: 5 },
    { id: '4', name: '商品D', description: 'ddd', price: 2500, stock: 8 },
    { id: '5', name: '商品E', description: 'eee', price: 3000, stock: 70 },
    { id: '6', name: '商品F', description: 'fff', price: 2000, stock: 5 },
    { id: '7', name: '商品G', description: 'ggg', price: 2500, stock: 8 },
    { id: '8', name: '商品H', description: 'hhh', price: 3000, stock: 70 },
    // 他の商品...
  ]);

  // 本来はここでAPIからデータを取得するロジックを記述
  useEffect(() => {
    // const loadProducts = async () => {
    //   try {
    //     // トークンとショップIDを適切に設定
    //     const token = localStorage.getItem('token');
    //     const shopId = localStorage.getItem('shopId');
    //     if (!token || !shopId) {
    //       console.error('認証情報が見つかりません');
    //       return;
    //     }
    //     const products = await fetchProducts({ shopId, token });
    //     setSelectedProducts(products);
    //   } catch (error) {
    //     console.error('商品データの取得中にエラーが発生しました:', error);
    //   }
    // };
    // loadProducts();
  }, []);

  return (
    <div className={styles.main}>
      {selectedProducts.map((product) => (
        <div key={product.id} className={styles.productContainer}>
          <div className={styles.sub}>
            <Link
              to={`/shop/orders/${product.name}?productId=${product.id}&price=${product.price}&stock=${product.stock}`}
              className={styles.title}
            >
              {product.name}
            </Link>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>価格: ¥{product.price}</p>
            <p className={styles.stock}>在庫数: {product.stock}</p>
          </div>
          <div className={styles.square} />
        </div>
      ))}
    </div>
  );
};
