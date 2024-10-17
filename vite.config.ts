import { ConfigEnv, UserConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {cwd} from 'process'
import { resolve } from 'path'
export default ({command, mode}:ConfigEnv):UserConfig=>{
  const root = cwd()
  const isBuild = command === 'build'
  const env = loadEnv(mode, root)
  console.log(env,isBuild)
  return {
    base:"/",
    resolve:{
      alias:{
        '@':resolve(root,'src')
      }
    },
    plugins: [react()],
    optimizeDeps: {
      include: ['crypto-js'], // 确保 crypto-js 被包含在优化依赖中
    },
    server:{
      port:parseInt(env.VITE_PORT,10),
      open:false,
      host:'127.0.0.1',
      proxy:{
        '/api':{
          target: 'https://callapi.xfyun.cn/v1/',
          changeOrigin:true,
          rewrite:path=>path.replace(/^\/api/,'')
        }
      }
    }
  }
}
