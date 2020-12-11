import {resolve} from 'path';

// const path = require('path');
// ref: https://umijs.org/config/
// https://blog.csdn.net/SCU_Cindy/article/details/82914547 路由配置

export default {


  // exportStatic: {
  //   htmlSuffix: true,
  //   dynamicRoot: true,
  // },

  history: 'hash',
  treeShaking: true,

  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {path: '/', component: './find/components/'},
        {path: '/find', component: './find/components/'},
        {path: '/find/desc/:id', component: './find/components/$desc.js'},
        {path: '/demo', component: './demo/components/'},
        {path: '/demo/desc/:id', component: './demo/components/$desc.js'},

      ]
    }
  ],


  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      default: 'zh-CN',
      antd: true,
      dva: {
        immer: true,
      },
      dynamicImport: false,
      title: '移动端',
      dll: false,

      routes: {
        exclude: [],
      },


      hardSource: false,
      // 添加全局css
      links: [
        // { rel: 'stylesheet', href: "http://at.alicdn.com/t/font_1092043_zapf4yqi50q.css" },
        // { rel: 'stylesheet', href: "http://at.alicdn.com/t/font_1092043_zapf4yqi50q.css" },
        // { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" },
      ],
    }],
    // ['./baidu-map-plugin.js'],
  ],


  alias: {
    components: resolve(__dirname, 'src/components/'),
    node_modules: resolve(__dirname, 'src/node_modules/'),
    utils: resolve(__dirname, 'src/utils'),
    assets: resolve(__dirname, 'src/assets'),
  },


  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      // target: 'http://192.168.43.30:8888/',
      // target: 'http://192.144.173.229:27000/',
      changeOrigin: true,
      headers: {
        Cookie: 'JSESSIONID=node0xew89av5ug6t1meat2tl1jva013139.node0; _yht_code_uuid=58e8df02-342b-42bf-be33-3074a0771177; at=2f2597b4-eab2-4adb-b723-433c3a8c2d01; yonyou_uid=ec4326d0-d490-4d5a-9105-260b51fd16d0; yonyou_uid=ec4326d0-d490-4d5a-9105-260b51fd16d0; yonyou_uname=yhtmanager; yonyou_uname=yhtmanager; yht_username_diwork=ST-5275-D9feDoif9QiDPoEBC7pN-dev.nbf.qm.cn__ec4326d0-d490-4d5a-9105-260b51fd16d0; yht_usertoken_diwork=tdg3WOphyPYgeJeQWUxPyLboIvKxYZ6h8ryR0xy0qfllKSSBl6h9B3kWK%2FvV7XNkaki4hDm0qwOV3mtQEI8WgA%3D%3D; yht_access_token=bttSHptL0U5NjgrQUJacVlaSUlxcWpJNHR3QkluVVZBZ21vaVRwc3FLSC95QmdmakdPaFRGK2dSTU5PWlduWkd1T05ZbURlbHlOelMzTFYyakVZSk15T1IvaW9uZlk5QUZhNVFPR1F2T3BOVW89X19kZXYubmJmLnFtLmNu__6bb50b0f7a1017da0812d77154b8dcf0_1605937986427; wb_at=LMjrotrj6ved6nhevJh6In745toGjcdukmaekplkbm; locale=zh_CN; jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDU5MzgxMTksInNlc3Npb24iOiJ7XCJjbGllbnRJcFwiOlwiMTAuNTIuNjkuMjRcIixcImNyZWF0ZURhdGVcIjoxNjA1OTM4MDU4LFwiZGF0YWZvcm1hdFwiOlwie1xcXCJkYXRlVGltZUZvcm1hdFxcXCI6XFxcInl5eXktTU0tZGQgSEg6bW06c3NcXFwiLFxcXCJudW1iZXJGb3JtYXRcXFwiOlxcXCIrIywjIyMsIyMjLCMjIywjIyMsIyMjWy5dIyMjIyMjIyNcXFwiLFxcXCJkYXRlRm9ybWF0XFxcIjpcXFwieXl5eS1NTS1kZFxcXCIsXFxcInRpbWVGb3JtYXRcXFwiOlxcXCJISDptbTpzc1xcXCJ9XCIsXCJleHRcIjp7XCJvcmdTdGF0dXNcIjpcIm11bHRpXCIsXCJ5aHRfdXNlcm5hbWVcIjpcIlNULTUyNzUtRDlmZURvaWY5UWlEUG9FQkM3cE4tZGV2Lm5iZi5xbS5jbl9fZWM0MzI2ZDAtZDQ5MC00ZDVhLTkxMDUtMjYwYjUxZmQxNmQwXCIsXCJ5aHRfdXNlcm5hbWVfZGl3b3JrXCI6XCJTVC01Mjc1LUQ5ZmVEb2lmOVFpRFBvRUJDN3BOLWRldi5uYmYucW0uY25fX2VjNDMyNmQwLWQ0OTAtNGQ1YS05MTA1LTI2MGI1MWZkMTZkMFwiLFwiYWRtaW5cIjp0cnVlLFwibG9nb1wiOlwiaHR0cDovL2Rldi5uYmYucW0uY24vbWFuYWdlci9maWxlL3JlYWQvZmFzdGRmcz9maWxlUGF0aD1ncm91cDEvTTAwLzAwLzMyL0NvWFBEVi1uWEpXQUZHd2xBQUNybWJaY0x5NDA4Ny5qcGdcIixcInlodF91c2VydG9rZW5cIjpcInRkZzNXT3BoeVBZZ2VKZVFXVXhQeUxib0l2S3hZWjZoOHJ5UjB4eTBxZmxsS1NTQmw2aDlCM2tXSy92VjdYTmtha2k0aERtMHF3T1YzbXRRRUk4V2dBPT1cIixcInlodF9hY2Nlc3NfdG9rZW5cIjpcImJ0dFNIcHRMMFU1TmpnclFVSmFjVmxhU1VseGNXcEpOSFIzUWtsdVZWWkJaMjF2YVZSd2MzRkxTQzk1UW1kbWFrZFBhRlJHSzJkU1RVNVBXbGR1V2tkMVQwNVpiVVJsYkhsT2VsTXpURll5YWtWWlNrMTVUMUl2YVc5dVpsazVRVVpoTlZGUFIxRjJUM0JPVlc4OVgxOWtaWFl1Ym1KbUxuRnRMbU51X182YmI1MGIwZjdhMTAxN2RhMDgxMmQ3NzE1NGI4ZGNmMF8xNjA1OTM3OTg2NDI3XCIsXCJ5aHRfdXNlcnRva2VuX2Rpd29ya1wiOlwidGRnM1dPcGh5UFlnZUplUVdVeFB5TGJvSXZLeFlaNmg4cnlSMHh5MHFmbGxLU1NCbDZoOUIza1dLL3ZWN1hOa2FraTRoRG0wcXdPVjNtdFFFSThXZ0E9PVwifSxcImp3dEV4cFNlY1wiOjYwLFwiand0VmFsaWREYXRlXCI6MCxcImxhc3REYXRlXCI6MTYwNTkzODA1OSxcImxvY2FsZVwiOlwiemhfQ05cIixcInByb2R1Y3RMaW5lXCI6XCJkaXdvcmtcIixcInNlc3Npb25FeHBNaW5cIjoyMTYwLFwic2Vzc2lvbklkXCI6XCJMTWpyb3RyajZ2ZWQ2bmhldkpoNkluNzQ1dG9HamNkdWttYWVrcGxrYm1cIixcInNvdXJjZUlkXCI6XCJkaXdvcmtcIixcInRlbmFudElkXCI6XCJyMnNjOHVmZVwiLFwidGltZXpvbmVcIjpcIlVUQyswODowMFwiLFwidXNlcklkXCI6XCJlYzQzMjZkMC1kNDkwLTRkNWEtOTEwNS0yNjBiNTFmZDE2ZDBcIn0iLCJzdWIiOiJkaXdvcmsifQ.oSt12CvH_y8oguarWCPnG3ZBiHy6NEKLMCfqrrowezo; tenantid=r2sc8ufe; locale=zh_CN; ARK_STARTUP=eyJTVEFSVFVQIjp0cnVlLCJTVEFSVFVQVElNRSI6IjIwMjAtMTEtMjEgMTM6NTQ6MjIuNzI2In0%3D; ARK_ID=JSd2983222507ab0ecb4b405d09a1ff95ed298; FZ_STROAGE.qm.cn=eyJTRUVTSU9OSUQiOiI0ZjVlMjIwZjhmZjI3NWM0IiwiU0VFU0lPTkRBVEUiOjE2MDU5MzgwNjI3NDYsIkFOU0FQUElEIjoiNGQwZjAwZjZiNWZhYjQ3ZCIsIkFOUyRERUJVRyI6MiwiQU5TVVBMT0FEVVJMIjoiaHR0cHM6Ly9hcnQuZGl3b3JrLmNvbS8iLCJGUklTVERBWSI6IjIwMjAxMTIxIiwiRlJJU1RJTUUiOmZhbHNlLCJBUktfSUQiOiJKU2QyOTgzMjIyNTA3YWIwZWNiNGI0MDVkMDlhMWZmOTVlZDI5OCIsIkFSS0ZSSVNUUFJPRklMRSI6IjIwMjAtMTEtMjEgMTM6NTQ6MjIuNzQyIiwiQU5TU0VSVkVSVElNRSI6LTg0MX0%3D; JSESSIONID=ZLLTK4ZoP9Oe_rqYPVrmxH65XAdMRUQ1TZ3SqoFK',
      },
      // pathRewrite: { "^/api" : ""}
    },

    '/h5': {
      target: 'http://127.0.0.1:8080/',
      changeOrigin: true,
    },



  },
};
