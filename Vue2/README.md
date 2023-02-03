# project1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
Vue2
├─ .gitignore
├─ babel.config.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ city.json
│  ├─ favicon.ico
│  ├─ img
│  │  └─ logo
│  │     ├─ logo_long.png
│  │     └─ logo_max.png
│  ├─ index.html
│  └─ province.json
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ background
│  │  │  ├─ 1.jpg
│  │  │  ├─ 10.jpg
│  │  │  ├─ 11.jpg
│  │  │  ├─ 2.jpg
│  │  │  ├─ 3.jpg
│  │  │  ├─ 4.jpg
│  │  │  ├─ 5.jpg
│  │  │  ├─ 6.jpg
│  │  │  ├─ 7.jpg
│  │  │  ├─ 8.jpg
│  │  │  └─ 9.jpg
│  │  ├─ logo.png
│  │  ├─ shopImg
│  │  │  ├─ 10792500b-dcb9-40a4-8dde-c07eca6896ab.jpg
│  │  │  ├─ 1c3e5e52666669e1d92fff2c26c7221c.jpg
│  │  │  ├─ 21fb24ef4-7f2d-4af1-85c8-41b7d7c4b53c.jpg
│  │  │  ├─ 23bca890b-23bd-4b12-abc0-599a6a6672c6.jpg
│  │  │  ├─ 2b935392d-4e94-42d7-8a4b-c38ae28f58f8.jpg
│  │  │  ├─ 305f781ba-eb99-4e1d-9541-56a239e2d0a9.jpg
│  │  │  ├─ 477d51b93-2525-41c0-81e8-7518b8e2bec7.jpg
│  │  │  ├─ 4ed2f4426-2337-4b53-b2a2-2961e90a7328.jpg
│  │  │  ├─ 5463a190f-ccc5-4fa6-b458-57a7c69af449.jpg
│  │  │  ├─ 61a1c6754-f563-4800-a915-477adba269e6.jpg
│  │  │  ├─ 7d781723f-ac03-45dd-911b-ea716d80f1a8.jpg
│  │  │  ├─ 805b3347e-97b1-47ab-b22f-5b6be647acde.jpg
│  │  │  ├─ 879e1e81d-8ee4-45fd-b5cd-42a986668185.jpg
│  │  │  ├─ 9b14dfc11-49a5-47d5-933f-01bc0bc9b7a0.jpg
│  │  │  └─ b4babb6752addbf284b731577e0cffdb.jpg
│  │  ├─ swip
│  │  │  ├─ 1.jpg
│  │  │  ├─ 2.jpg
│  │  │  ├─ 3.jpg
│  │  │  ├─ 4.jpg
│  │  │  ├─ 5.jpg
│  │  │  └─ 6.jpg
│  │  ├─ upload
│  │  │  ├─ 00c4e9c2-c952-4e58-b781-74df7a33afb5.jpg
│  │  │  ├─ 1 (2)0286f824-1ee9-457e-a5c0-27b3756478e8.jpg
│  │  │  ├─ 1 (2)07becbb5-3385-452e-9029-34c50d0e1df7.jpg
│  │  │  ├─ 1 (2)4beebf38-8549-4ab9-9370-77860a422382.jpg
│  │  │  ├─ 1 (2)6ad8d1d7-fd9b-4263-ba3b-116d41b4b484.jpg
│  │  │  ├─ 1 (2)9d8da492-1c66-4383-9ddf-72f556ad6131.jpg
│  │  │  ├─ 1 (2)c2e26634-af9b-4d59-a9fa-7db4c849b749.jpg
│  │  │  ├─ 1 (2)db900211-163f-455d-ac20-3b693a441f53.jpg
│  │  │  ├─ 1 (3)0d07ed1b-fed9-414e-b2e2-78befc9855f6.jpg
│  │  │  ├─ 1 (3)2bc39d13-f37e-4972-a1f5-72206bc0b304.jpg
│  │  │  ├─ 1 (3)5b61a50e-f9db-4d10-9809-4222e51853eb.jpg
│  │  │  ├─ 1 (3)6ad1301f-c62d-4977-a19a-391a6ed82d68.jpg
│  │  │  ├─ 1 (3)88f0fe2c-05cc-4957-a270-f9c0caf499da.jpg
│  │  │  ├─ 1 (3)d678f8dd-5d08-4891-9001-6371f1722203.jpg
│  │  │  ├─ 1 (3)d9feb338-8855-4a4e-b85f-c23745613b45.jpg
│  │  │  ├─ 1 (4)19efdbe8-5e64-4c15-9e2c-a2048d13f2a5.jpg
│  │  │  ├─ 1 (4)4a0c14a3-ea55-47b1-8851-556f945c6cf3.jpg
│  │  │  ├─ 1 (4)4b587045-bc79-4dff-857a-ad6fa7b3d4e4.jpg
│  │  │  ├─ 1 (4)7a0fbb6c-0b26-4316-b957-e8e3f7d9b8fc.jpg
│  │  │  ├─ 1 (4)90bcf187-ef4d-45ab-b1ae-1f87d782b415.jpg
│  │  │  ├─ 1 (4)a8e0bd25-233f-47e3-96d0-adfde878bd8f.jpg
│  │  │  ├─ 1 (4)c771ebb7-d018-4a69-a49f-8d11e0336518.jpg
│  │  │  ├─ 1 (5)095f4796-f794-40f0-a621-caaab8e813c0.jpg
│  │  │  ├─ 1 (5)1f11a4b8-da6d-4c8a-82d9-b04ecaa0231f.jpg
│  │  │  ├─ 1 (5)740e91b1-4275-43dd-9adc-2baad6ebb5a6.jpg
│  │  │  ├─ 1 (5)77ab3a93-d23f-40b1-898a-3956493d24eb.jpg
│  │  │  ├─ 1 (5)bea4b88d-05ab-49ef-8a7c-42b140daeb2f.jpg
│  │  │  ├─ 1 (5)cace94d8-a1c3-45d0-b4b8-dcc614538071.jpg
│  │  │  ├─ 1 (5)f985a35a-8afa-4b76-8fa7-be014c594409.jpg
│  │  │  ├─ 10e0b7667-ad6f-4d18-aa2b-f92bee5e7617.jpg
│  │  │  ├─ 12dc40b70-e438-408e-b645-8e19c63cff69.jpg
│  │  │  ├─ 13.jpg
│  │  │  ├─ 1342983fa-8547-49a7-b030-88b3803506a4.jpg
│  │  │  ├─ 14fa8e33f-b92a-4a22-bb16-fb8d41fc4862.jpg
│  │  │  ├─ 16cd8dbd-c9d6-4dda-8c12-1a6659b76e94.jpg
│  │  │  ├─ 16e7cdca2-4f28-46e4-b53d-574b363f27bb.jpg
│  │  │  ├─ 18f84688f-7072-4d68-9e64-48779a466a1b.jpg
│  │  │  ├─ 1a2765c64-3969-4c2d-b738-2a9e792cfc8f.jpg
│  │  │  ├─ 1ab48a9c4-5b9c-4456-9025-c5cc19f80d0f.jpg
│  │  │  ├─ 1f146a575-85e1-4946-a575-5eceadd96c23.jpg
│  │  │  ├─ 1fb3dc275-1f58-4aa6-b8e2-0362b417af4b.jpg
│  │  │  ├─ 238ebbc07-4271-4bd6-b03d-4139e3f84a71.jpg
│  │  │  ├─ 2537fed43-b6f8-4cf3-ace3-d3e54b9e10b7.jpg
│  │  │  ├─ 26.jpg
│  │  │  ├─ 27ca05f9-4eeb-4e15-9fa2-d62ea97ee93e.jpg
│  │  │  ├─ 28b6097b8-3d42-43f4-b4b9-3b679f960eae.jpg
│  │  │  ├─ 2a6d040e-ce2f-4a9b-8b08-065ea1e447b1.jpg
│  │  │  ├─ 32e418bd4-607d-4a12-80b3-d82c5fe88bf0.jpg
│  │  │  ├─ 3daf61a1b-25e7-4c6c-9cd2-f243a999faf0.jpg
│  │  │  ├─ 40e9a6828-e7fb-463f-bd3d-d4de36d120f1.jpg
│  │  │  ├─ 41b0747fc-d6a2-46a6-839c-a5f1c69e5ed5.jpg
│  │  │  ├─ 49204f624-e27d-4d05-ae51-4aafae878f94.jpg
│  │  │  ├─ 57b4a3b5c-8051-4b1b-bfc0-e5c7c44bb0d6.jpg
│  │  │  ├─ 5b37242a-62ff-471f-bdbf-7a728193de67.jpg
│  │  │  ├─ 5b91e436-2327-4b70-ac64-7f730ca80185.jpg
│  │  │  ├─ 5e3036b41-0be7-400c-841d-386f10dcd5c9.jpg
│  │  │  ├─ 64897679-e4e5-48fd-b0d5-a7e450a5f3d0.jpg
│  │  │  ├─ 67bcac89-6db4-4555-ad67-b8255915451b.jpg
│  │  │  ├─ 8b3402d7d-74c9-4b04-a67f-e1a9d51a18fa.jpg
│  │  │  ├─ 8e8e076fb-eee7-42a5-80f7-744e1f6d2e89.jpg
│  │  │  ├─ a40c80e4-1ddb-4228-8c4f-aa18d0f25938.jpg
│  │  │  ├─ a809498e-f7fa-4ec9-9eed-5754ee2b6b02.jpg
│  │  │  ├─ d9c7829d-1ae3-4ca9-beac-c4c72ce4e5de.jpg
│  │  │  ├─ da2c12f4-b14b-4947-a52a-074793fe4c2d.jpg
│  │  │  ├─ dcea043d-95de-4915-a601-50f62049070e.jpg
│  │  │  └─ f85f89fa-51cc-479c-b8ef-c8df169ad13d.jpg
│  │  └─ userhead
│  │     ├─ 6e9089fb-23bd-4e5f-8715-86a2362d9b5a.jpg
│  │     ├─ a6baf223-35de-4dd4-b17f-f93111933d7f.jpg
│  │     └─ pande.jpg
│  ├─ components
│  │  ├─ AboutMe.vue
│  │  ├─ AdminFirstPage.vue
│  │  ├─ DishesManage
│  │  │  ├─ ManageDishe.vue
│  │  │  └─ PushDishe.vue
│  │  ├─ home
│  │  │  ├─ CenterBox.vue
│  │  │  ├─ DishesList.vue
│  │  │  ├─ Footer.vue
│  │  │  ├─ Header.vue
│  │  │  ├─ sellerList.vue
│  │  │  └─ Top.vue
│  │  ├─ MySellerManage.vue
│  │  ├─ NameLogin.vue
│  │  ├─ order
│  │  │  ├─ AllOrder.vue
│  │  │  ├─ DishesCollection.vue
│  │  │  ├─ EvaluatedOrder.vue
│  │  │  ├─ FinishOrder.vue
│  │  │  ├─ NopayOrder.vue
│  │  │  ├─ PayOrder.vue
│  │  │  └─ ShopCollection.vue
│  │  ├─ OrderManage
│  │  │  ├─ Finish.vue
│  │  │  ├─ NoPay.vue
│  │  │  ├─ OrderData.vue
│  │  │  └─ Pay.vue
│  │  ├─ SellerManage
│  │  │  ├─ SellerDel.vue
│  │  │  ├─ SellerIsPass.vue
│  │  │  └─ SellerQuit.vue
│  │  ├─ SellerManage.vue
│  │  └─ TextLogin.vue
│  ├─ main.js
│  ├─ pages
│  │  ├─ AdminHome.vue
│  │  ├─ AdminLogin.vue
│  │  ├─ DishesPage.vue
│  │  ├─ DishesSearch.vue
│  │  ├─ Home.vue
│  │  ├─ OrderHome.vue
│  │  ├─ SellerHome.vue
│  │  ├─ SellerLogin.vue
│  │  ├─ SellerPage.vue
│  │  ├─ SellerRegister.vue
│  │  ├─ SellerRegisterMessage.vue
│  │  ├─ SettleHome.vue
│  │  ├─ ShopCart.vue
│  │  ├─ ShopSearch.vue
│  │  ├─ UserLogin.vue
│  │  └─ UserRegister.vue
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  └─ index.js
│  └─ utils
│     ├─ imgPath.js
│     └─ request.js
└─ vue.config.js

```