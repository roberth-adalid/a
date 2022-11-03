import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const axiosLimited = rateLimit(axios.create({ withCredentials: true }), {
  maxRequests: 2,
  perMilliseconds: 1500,
  maxRPS: 1
});

if (process.env.NEXT_PUBLIC_XSRF) {
  // @ts-ignore
  axiosLimited.defaults.headers['x-csrf-token'] = process.env.NEXT_PUBLIC_XSRF;
}

export default axiosLimited;
