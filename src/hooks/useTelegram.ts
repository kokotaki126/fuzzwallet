import { FUZZ_LOGIN_JWT } from '@/config';
import axios from '@/utils/axios';

const useTelegram = () => {
  const TGInit = async (query_params: string) => {
    const result: any = await axios.get(`/auth/tg_login?${query_params}`);
    localStorage.setItem(FUZZ_LOGIN_JWT, result);
  };

  return {
    TGInit,
  };
};

export default useTelegram;

