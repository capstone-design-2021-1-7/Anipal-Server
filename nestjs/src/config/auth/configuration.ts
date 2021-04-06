import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expire: process.env.JWT_ACCESS_EXPIRE,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE,
  google_client_id: process.env.ANIPAL_GOOGLE_CLIENT_ID,
  google_secret_key: process.env.ANIPAL_GOOGLE_SECRET_KEY,
  google_redirect_url: process.env.ANIPAL_GOOGLE_REDIRECT_URL,
  facebook_app_key: process.env.ANIPAL_FACEBOOK_APP_KEY,
  facebook_secret_key: process.env.ANIPAL_FACEBOOK_SECRET_KEY,
  facebook_redirect_url: process.env.ANIPAL_FACEBOOK_REDIRECT_URL,
}));
