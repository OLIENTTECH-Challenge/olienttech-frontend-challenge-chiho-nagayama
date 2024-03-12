import * as shopApi from '@/api/shop';
import { Button } from '@/components/base/Button';
import { TextInput } from '@/components/base/TextInput';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

export const ShopLoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const id = formData.get('id');
    const password = formData.get('password');

    if (typeof id === 'string' && typeof password === 'string') {
      void toast
        .promise(shopApi.signin({ id, password }), {
          loading: 'ログイン中です',
          success: (data) => {
            // ログイン成功時にlocalStorageに認証情報を保存
            localStorage.setItem('token', data.token);
            localStorage.setItem('shopId', data.id);
            return `${data.name}でログインしました`; // data.nameはレスポンスに含まれるショップ名を指す
          },
          error: 'ログインに失敗しました',
        })
        .then(() => {
          navigate('/shop');
        });
    } else {
      toast.error('エラーが発生しました');
    }
  };

  return (
    <div className={styles.main}>
      <form method='post' className={styles.form} onSubmit={handleSubmit}>
        <TextInput name='id' type='text' placeholder='ショップID' required />
        <TextInput name='password' type='password' placeholder='パスワード' required />
        <Button variant='filled'>ログイン</Button>
      </form>
    </div>
  );
};
