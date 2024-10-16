import {serviceAccessToken} from '@/utils/axiosAI'
const app_secret = 'ZmJjMzQzN2ZiYTI1NWYwYzM5OWJhOTgz'
const app_key = '152bb29fc144b62e55d7cc1f54795eee'
export const getChatList = (params: any) => serviceAccessToken.post('', {
    app_key,
    app_secret
  }
)