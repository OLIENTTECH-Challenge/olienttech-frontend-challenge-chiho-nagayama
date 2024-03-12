import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './OrderCompanyPage.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const OrderCompanyPage = () => {
  const { productName } = useParams();
  const query = useQuery();
  const productId = query.get('productId');
  const price = query.get('price');
  const stock = query.get('stock');
  // 仮想的な会社情報のデータ配列
  const companies = [
    { id: 'C01', name: '会社A' },
    { id: 'C02', name: '会社B' },
    { id: 'C03', name: '会社C' },
    { id: 'C04', name: '会社D' },
    { id: 'C05', name: '会社E' },
    { id: 'C06', name: '会社F' },
    { id: 'C07', name: '会社G' },
    { id: 'C08', name: '会社H' },
    // 他の会社データ...
  ];

  return (
    <>
      <h3>{productName}</h3>
      <p>取扱会社一覧</p>
      <div className={styles.main}>
        <table className={styles.companyTable}>
          <thead>
            <tr>
              <th>会社名</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>
                  <Link
                    to={`/shop/orders/${encodeURIComponent(productName ?? '')}/${encodeURIComponent(
                      company.name,
                    )}?productId=${productId}&price=${price}&stock=${stock}`}
                  >
                    {company.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
