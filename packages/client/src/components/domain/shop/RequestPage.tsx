import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './RequestPage.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const RequestPage = () => {
  let { companyName, productName } = useParams();
  let query = useQuery();
  const stock = parseInt(query.get('stock') || '0', 10);
  const price = parseInt(query.get('price') || '0', 10);
  const [quantity, setQuantity] = useState(1); // 仮の初期値
  // 在庫情報、価格計算などのロジックをここに実装

  const handleSubmit = () => {
    alert(
      `発注が完了しました。\n会社名: ${companyName || productName}\n数量: ${quantity}\n合計価格: ¥${quantity * price}`,
    );
    // ここで実際の発注処理を行う
  };

  return (
    <div className={styles.main}>
      <div className={styles.requestPageContainer}>
        <h3>発注画面</h3>
        <p>会社名: {companyName}</p>
        <p>商品ID: {productName}</p>
        <p>数量を選択してください:</p>
        <input
          type='number'
          value={quantity}
          onChange={(e) => {
            const numValue = Number(e.target.value);
            if (numValue >= 1 && numValue <= stock) {
              setQuantity(numValue);
            }
          }}
          max={stock}
        />
        <p>合計価格: ¥{quantity * price}</p>
        <button onClick={handleSubmit} className={styles.submitOrderButton}>
          発注する
        </button>
      </div>
    </div>
  );
};
