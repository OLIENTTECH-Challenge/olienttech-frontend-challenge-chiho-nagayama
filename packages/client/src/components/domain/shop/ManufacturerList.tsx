// import { fetchShopInfo } from '@/api/shop';
import { Table } from '@/components/case/Table';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ManufacturerList.module.css';

type Column<T> = {
  header: string;
  accessor: (data: T) => React.ReactNode;
};

type PartnerManufacturer = {
  id: string;
  name: string;
  description: string;
};

// const fetchPartnerManufacturers = async (shopId: string, token: string) => {
//   const response = await fetch(`${process.env.APP_API_URL}/shops/${shopId}/partner-manufacturers`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     console.error('Response status:', response.status);
//     const errorText = await response.text();
//     console.error('Error response:', errorText);
//     throw new Error('パートナーメーカー情報の取得に失敗しました');
//   }

//   const data = await response.json();
//   console.log('API response:', data);
//   return data;
//   // return await response.json();
// };

export const ManufacturerList = () => {
  // const [companies, setCompanies] = useState<PartnerManufacturer[]>([]);
  const companies = [
    { id: 'C01', name: '会社A', description: 'あいうえお' },
    { id: 'C02', name: '会社B', description: 'かきくけこ' },
    { id: 'C03', name: '会社C', description: 'さしすせそ' },
    { id: 'C04', name: '会社D', description: 'たちつてと' },
    { id: 'C05', name: '会社E', description: 'なにぬねの' },
    { id: 'C06', name: '会社F', description: 'はひふへほ' },
    { id: 'C07', name: '会社G', description: 'まみむめも' },
    { id: 'C08', name: '会社H', description: 'やゆよ' },
  ];

  useEffect(() => {
    // const loadCompanyInfo = async () => {
    //   try {
    //     // トークンとショップIDをローカルストレージから取得
    //     const token = localStorage.getItem('token');
    //     const shopId = localStorage.getItem('shopId');
    //     if (!token || !shopId) {
    //       console.error('認証情報が見つかりません');
    //       return;
    //     }
    //     // APIからショップ情報を取得
    //     const companyInfo = await fetchPartnerManufacturers(shopId, token);
    //     // 取得したショップ情報を配列に変換して状態に格納
    //     setCompanies(companyInfo);
    //   } catch (error) {
    //     console.error('会社情報の取得中にエラーが発生しました:', error);
    //   }
    // };
    // loadCompanyInfo();
  }, []);

  const columns: Column<PartnerManufacturer>[] = [
    {
      header: '会社ID',
      accessor: (company) => company.id,
    },
    {
      header: '会社名',
      accessor: (company) => (
        <Link to={`/shop/manufacturers/${encodeURIComponent(company.name)}`} className={styles.link}>
          {company.name}
        </Link>
      ),
    },
    {
      header: '説明',
      accessor: (company) => company.description,
    },
  ];

  return (
    <>
      <div className={styles.main}>
        <Table columns={columns} data={companies} />
      </div>
    </>
  );
};
