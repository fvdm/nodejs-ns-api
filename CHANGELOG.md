## 4.0.0 (2019-12-16)

##### Breaking Changes

*  Full rewrite to the new NS API ([5ca0f6a8](https://github.com/fvdm/nodejs-ns-api/commit/5ca0f6a8978ef16e62f993750e317e38013cc376))

##### Chores

* **package:**
  *  Update dotest dev dep ([af1fe0bb](https://github.com/fvdm/nodejs-ns-api/commit/af1fe0bb1d4ad463cab85d2214ae739c89723760))
  *  Removed nodexml dep ([59fe9ff1](https://github.com/fvdm/nodejs-ns-api/commit/59fe9ff170fbfeeefe4e8992bbc2218400061b6b))
* **dev:**
  *  Added .nyc_output to gitignore ([3e9750d6](https://github.com/fvdm/nodejs-ns-api/commit/3e9750d62390b6bec6e976bb6e7e8d40d7f5f2d2))
  *  Added editorconfig ([a0bd5be8](https://github.com/fvdm/nodejs-ns-api/commit/a0bd5be86643755cad8ac4dc6e2fb66c7086eb87))
* **example:**
  *  Short example code ([1bd4b156](https://github.com/fvdm/nodejs-ns-api/commit/1bd4b1560f58624a07c7d4e18985d20cd194fe7e))
  *  Rewrite to v3 interface ([53843cc9](https://github.com/fvdm/nodejs-ns-api/commit/53843cc9ecd4c2f18d379ba78fd288d50c91e105))

##### Documentation Changes

* **readme:**
  *  Minor edits to tables ([5bd33df9](https://github.com/fvdm/nodejs-ns-api/commit/5bd33df9730d020b3882fad1e44d1a0a858989d1))
  *  Useful examples ([a4a0872e](https://github.com/fvdm/nodejs-ns-api/commit/a4a0872e66e3699a0fa8160a2c04a60bee44fd6f))
  *  Cleaner config table ([06a002c5](https://github.com/fvdm/nodejs-ns-api/commit/06a002c54f471cf76b4bd9eef568de0a9cde12b3))
  *  Added interface note to Methods ([ff0a3023](https://github.com/fvdm/nodejs-ns-api/commit/ff0a302341d8d9666fc4ee2f01333bb5f27b21be))
  *  Fixed Methods intro ([245b0f8f](https://github.com/fvdm/nodejs-ns-api/commit/245b0f8f8c8c5b385adadea3e677a911fc809468))
  *  Removed getBigDepartures, other edits (ci skip) ([3975c68e](https://github.com/fvdm/nodejs-ns-api/commit/3975c68ea06240f8ea6ca197469a538a69409cdb))
  *  Update API docs urls (ci skip) ([6f286732](https://github.com/fvdm/nodejs-ns-api/commit/6f286732c61b8c862bb70173fadfc7213392d7b9))
  *  Update intro urls ([97a325ba](https://github.com/fvdm/nodejs-ns-api/commit/97a325bab80bbdbe6ba55a465919adce61bd31e3))
  *  Shorter example code ([358e1e49](https://github.com/fvdm/nodejs-ns-api/commit/358e1e49f093ea7c01f7658cfd668897ac684905))
  *  Clarify Methods intro ([2ecbbad3](https://github.com/fvdm/nodejs-ns-api/commit/2ecbbad383d08dad465ec4590ada5228694d8373))
  *  Fixed getPrices() example ([5a3d4cfa](https://github.com/fvdm/nodejs-ns-api/commit/5a3d4cfac7516017dc712e847acf052a8ed97c2e))
  *  Fixed getTrips() example ([9485e349](https://github.com/fvdm/nodejs-ns-api/commit/9485e349a0e02262a0aef5dd9722267bd66eb89d))
  *  Rewrite to module v3.0.0 ([94f14106](https://github.com/fvdm/nodejs-ns-api/commit/94f1410695fa9cc3d1aeaebd6f4342b5bde8b56c))
*  Update examples to v3 (ci skip) ([5739c594](https://github.com/fvdm/nodejs-ns-api/commit/5739c594ffc5354efb1266ca29cea055ea214bc9))
*  Updated intro urls ([8732b7e2](https://github.com/fvdm/nodejs-ns-api/commit/8732b7e2501fb705251529c13808e4c14a37ab93))
* **badges:**  Removed bitHound ([7b41f75d](https://github.com/fvdm/nodejs-ns-api/commit/7b41f75d3538921ee0f2417180bd389509ab6e40))
* **contributing:**  Updated contributing info ([15b513b5](https://github.com/fvdm/nodejs-ns-api/commit/15b513b59e70f45cdd451d0ba3812ca0133bafbf))

##### Refactors

*  Removed not implemented methods ([95d6f9d8](https://github.com/fvdm/nodejs-ns-api/commit/95d6f9d871c49dbbe27e7df0d2ed76347c8793ab))
*  Minor edits ([5aeafe96](https://github.com/fvdm/nodejs-ns-api/commit/5aeafe967de81c6e8294fb04dbcd96a1fc80bbfe))
*  Some methods require parameters ([bd7b7557](https://github.com/fvdm/nodejs-ns-api/commit/bd7b7557d0abd33754ccb7e31853114fb09ce43f))
* **class:**  Cleaner config defaults ([8355a114](https://github.com/fvdm/nodejs-ns-api/commit/8355a1140ea0172a40a997d8ba16bb5e303fdba5))
* **interface:**
  *  Cleaner result data ([9a5c022d](https://github.com/fvdm/nodejs-ns-api/commit/9a5c022df4554ca9e6c5aac63505bc65076f459e))
  *  Full rewrite to NS API v2 ([68cba196](https://github.com/fvdm/nodejs-ns-api/commit/68cba196c2f3a0cdea7f1bb1e0b03545f351594e))
* **package:**
  *  Bump major version to 3.0.0 ([1a8b85d6](https://github.com/fvdm/nodejs-ns-api/commit/1a8b85d6e11ce18bfc453c5d7fe9211df7ca8d5b))
  *  Minimum node v8.0 ([4cb2e3b9](https://github.com/fvdm/nodejs-ns-api/commit/4cb2e3b9ed38883467ade0dea4987fa894c0906e))

##### Code Style Changes

* **test:**  Minor syntax consistency ([9a6a5026](https://github.com/fvdm/nodejs-ns-api/commit/9a6a502698159aae8e9223b9bd9d62909112b11e))
* **package:**  Removed trailing whitespace from json ([9a991ecf](https://github.com/fvdm/nodejs-ns-api/commit/9a991ecf2b1a4e4acb4337cbe47cb041402e678f))
* **cleanup:**  Removed unnecessary getTrip() args ([031419c9](https://github.com/fvdm/nodejs-ns-api/commit/031419c93e4079d560510cb63671608150c88bcf))

##### Tests

*  Clean up ([2b7516c3](https://github.com/fvdm/nodejs-ns-api/commit/2b7516c3cb5a08454f915f68efb2e238cd264832))
*  Removed debug data dump ([89268221](https://github.com/fvdm/nodejs-ns-api/commit/89268221608ab82ad23efbadbd0e8cdb6fd9742e))
*  Added warning for missing check ([c0486215](https://github.com/fvdm/nodejs-ns-api/commit/c048621515c9ee388be359fd3177e07dc7d8d6a8))
*  Allow console in example.js ([78070d1d](https://github.com/fvdm/nodejs-ns-api/commit/78070d1d436c32b655f57778ec54fd5188933208))
* **coverage:**  Ignore untestable lines ([37cef629](https://github.com/fvdm/nodejs-ns-api/commit/37cef629ac881bd48b41f818aa389500a3283e2b))
* **main:**
  *  Added more tests ([f6e90fac](https://github.com/fvdm/nodejs-ns-api/commit/f6e90fac32d226ed82b1d636cf0ba2b97153a3fa))
  *  Test more errors ([db48ce08](https://github.com/fvdm/nodejs-ns-api/commit/db48ce082228fb419808dc3add234623cc026d87))
  *  Increase default timeout to 8 sec ([c55c5bb6](https://github.com/fvdm/nodejs-ns-api/commit/c55c5bb6c5a5b93b2be38a6bd8206f6390883a3f))
  *  Rewrite to new interface and methods ([27545a6b](https://github.com/fvdm/nodejs-ns-api/commit/27545a6b3b54f568c9b9c936a1a09d502793e4a5))
* **config:**
  *  Add Node 13 to Travis and clean up ([accd4542](https://github.com/fvdm/nodejs-ns-api/commit/accd4542d16631c223d3f811f1b7cb8008afbed9))
  *  Modernized ESLint config ([502736d5](https://github.com/fvdm/nodejs-ns-api/commit/502736d59664f31267d4f120912fc19b7ae6c920))
  *  Added node v13 to Travis CI ([546ede6f](https://github.com/fvdm/nodejs-ns-api/commit/546ede6f7b69f32519047515c39b75ce8a19004c))
  *  Limit Travis to main branches ([e0e3623e](https://github.com/fvdm/nodejs-ns-api/commit/e0e3623eb37d798319ba7b910b9106539b63ad5a))
  *  Updated Travis node versions ([4e798e18](https://github.com/fvdm/nodejs-ns-api/commit/4e798e18febe1b0a56e4933bd0c3dfa8b9ac36fe))
  *  Removed bitHound ([1cd54ad4](https://github.com/fvdm/nodejs-ns-api/commit/1cd54ad4a4eb4381c937b2482dd70bee71688427))

#### 2.0.8 (2017-12-12)

##### Chores

* **package:**
  * Update httpreq dependency ([44dbc87e](https://github.com/fvdm/nodejs-ns-api/commit/44dbc87e2ffaa6eae6bc753f23235c5091bbdde7))
  * Reduce dev deps to dotest ([c499eae2](https://github.com/fvdm/nodejs-ns-api/commit/c499eae233a592c9fd25690b4fcf5684c3aa4918))
* **develop:** Cleanup .gitignore ([6a753e7f](https://github.com/fvdm/nodejs-ns-api/commit/6a753e7ff534486ffdd6d6819e7ab5a5d9cd8f74))

##### Documentation Changes

* **readme:** Minor style changes ([789e3ee9](https://github.com/fvdm/nodejs-ns-api/commit/789e3ee9eb05b50e05bb1b77988f4d0983af4a46))
* **badges:** Get bithound badges for master ([d2c308ab](https://github.com/fvdm/nodejs-ns-api/commit/d2c308ab74e89ed36d71799368d3cc833a225921))

##### Bug Fixes

* **package:** Fixed syntax typo ([4821d618](https://github.com/fvdm/nodejs-ns-api/commit/4821d618c7a7aee9503ea14283227cd3a55559b3))

##### Code Style Changes

* **example:** Convert to ES6 syntax ([1ea95fe0](https://github.com/fvdm/nodejs-ns-api/commit/1ea95fe0e7deff47c2edf80348bff935970f84ed))

##### Tests

* **main:** Fixed ES6 syntax ([93e76bc0](https://github.com/fvdm/nodejs-ns-api/commit/93e76bc05e517188fce484cffb6c42614370f89c))
* **style:** Convert syntax to ES6 ([3f415ab5](https://github.com/fvdm/nodejs-ns-api/commit/3f415ab5b1a8215c3dc423e031aec80e7b1c7b23))
* **config:**
  * Remove ecmaVersion from .eslintrc ([a3cf2a32](https://github.com/fvdm/nodejs-ns-api/commit/a3cf2a326ca907fe939b75ec9490712fd246f554))
  * Update Travis CI node versions ([f3b23bb7](https://github.com/fvdm/nodejs-ns-api/commit/f3b23bb7a8b8100f15342d450f4bd7fe2b190d51))
  * Replaced node 7 with 8 on Travis CI ([6f7da3a9](https://github.com/fvdm/nodejs-ns-api/commit/6f7da3a91157ebb36e05c2f04d4683a1a93aa7d0))

#### 2.0.7 (2017-12-12)

#### 2.0.6 (2017-5-16)

##### Chores

* **package:**
  * Update deps versions ([6093f361](https://github.com/fvdm/nodejs-ns-api/commit/6093f361b1e3e898e9e390a322311a85b115b6b7))
  * Update dotest dev dep ([15804b57](https://github.com/fvdm/nodejs-ns-api/commit/15804b5772101198dab9eab1563c88cd729be690))
  * Update dev deps ([f4009689](https://github.com/fvdm/nodejs-ns-api/commit/f4009689e29d7d5ba78b89efd3880f074a7a0afc))
* **develop:** Fixed JSdoc syntax ([b8b93056](https://github.com/fvdm/nodejs-ns-api/commit/b8b93056a71c33ead7268e8224fba9f159a38e2e))

##### Documentation Changes

* **readme:** Add coffee button to Author ([204575c3](https://github.com/fvdm/nodejs-ns-api/commit/204575c3b8ecb17c0e2b8fa36ee09f26a1a46e81))

##### Code Style Changes

* **main:**
  * Correct LICENSE file ([6184e387](https://github.com/fvdm/nodejs-ns-api/commit/6184e38721f20ebe16168fbc63ada42c5cf46fcc))
  * Minor JSDoc edits ([2210f965](https://github.com/fvdm/nodejs-ns-api/commit/2210f965e6e6826d4e1407d32fdd41a667b5f836))
  * Correct JSDoc syntax ([521e63de](https://github.com/fvdm/nodejs-ns-api/commit/521e63de69b2988c6f5c2e8eaa1184fa7c92264b))

#### 2.0.5 (2016-10-31)

##### Chores

* **package:**
  * Added CONTRIBUTING.md ([164f92a1](https://github.com/fvdm/nodejs-ns-api/commit/164f92a1916e1bbac57f070f3cb9864d31d67af9))
  * Updated dev deps ([2e7e5947](https://github.com/fvdm/nodejs-ns-api/commit/2e7e5947df5c98509724e48e8953cb4abb4950d4))
  * Replaced test runner and dev deps by dotest ([7d61a11d](https://github.com/fvdm/nodejs-ns-api/commit/7d61a11dd78cc457e6ac9c699b544beda663a043))
* **develop:** Added bitHound config ([040313a6](https://github.com/fvdm/nodejs-ns-api/commit/040313a61599a012b419555c5baf8e194dc570b6))

##### Documentation Changes

* **readme:** Added linebreak at end ([6c74a046](https://github.com/fvdm/nodejs-ns-api/commit/6c74a0463fa6bb2e54c1e385c05c7d43ec0b9346))
* **badges:** Replaced deps badge, code quality ([0011f95d](https://github.com/fvdm/nodejs-ns-api/commit/0011f95de0ca8e17e39b11af8c9a208dbdb1cb6a))

##### Refactors

* **main:** No need to wrap body in Buffer ([2b8f0f59](https://github.com/fvdm/nodejs-ns-api/commit/2b8f0f593813737613ff5c1893b337a8a57ea70d))

##### Tests

* **config:**
  * Set bitHound long file to 500 lines ([045c234b](https://github.com/fvdm/nodejs-ns-api/commit/045c234b6c26de13eb8076d7234650e62cf7eda5))
  * Use dynamic node versions on Travis CI ([86731d5a](https://github.com/fvdm/nodejs-ns-api/commit/86731d5aa374696b16d1c6138074ac61b2e89064))
* **lint:** Update eslint to ES6 ([d6a58f80](https://github.com/fvdm/nodejs-ns-api/commit/d6a58f80c3b8266378414d6180f71a31323869e1))

#### 2.0.4 (2016-7-2)

##### Refactors

* **cleanup:** Removed unused iteration from objectOmit ([c0852859](https://github.com/fvdm/nodejs-ns-api/commit/c08528596ee0058f950f201a70014fa345ef68f9))

#### 2.0.3 (2016-7-2)

##### Bug Fixes

* **storingen:** Fixed empty dataset handling ([820a019c](https://github.com/fvdm/nodejs-ns-api/commit/820a019c67da3624ae50f3867384f510506ada20))

##### Tests

* **tests:** Set actual to true for storingen with params ([bde8f006](https://github.com/fvdm/nodejs-ns-api/commit/bde8f006e3c3ba60ba05e3985f194c36af8cd891))

#### 2.0.2 (2016-7-2)

##### Chores

* **example:** Removed dangling comma ([6aa349a3](https://github.com/fvdm/nodejs-ns-api/commit/6aa349a34a5265a5c5fe53ee7e8e241fc83b23b6))
* **package:**
  * Add example.js ([e3b5d935](https://github.com/fvdm/nodejs-ns-api/commit/e3b5d93567a04dce233f5240f5a7fa57b1b326d1))
  * Update dotest dev dep ([04a503d5](https://github.com/fvdm/nodejs-ns-api/commit/04a503d58e621f2fb1097e7d78bf1036ba9638ef))
  * Add test.sh runner and dev deps ([d9cff20d](https://github.com/fvdm/nodejs-ns-api/commit/d9cff20d722217019785020775fb0f79ba442f9a))
  * Clean up unneeded stuff ([a0c21643](https://github.com/fvdm/nodejs-ns-api/commit/a0c216434d70fc3471bbff2fa0bc6efc0f86d35a))
  * Renamed UNLICENSE file to LICENSE ([3a5bf9d5](https://github.com/fvdm/nodejs-ns-api/commit/3a5bf9d55c672ffad917fde54709e40f0207c413))
  * Add .package.json to gitignore ([ba4a51d9](https://github.com/fvdm/nodejs-ns-api/commit/ba4a51d9c21abaaea09eb2a40f3aec0752e6cd1d))
  * update eslint to version 3.0.0 ([e493b732](https://github.com/fvdm/nodejs-ns-api/commit/e493b732b37495de138eea1d0ee48eebd12fa3c3))

##### Documentation Changes

* **readme:**
  * Remove dangling comma ([dd292693](https://github.com/fvdm/nodejs-ns-api/commit/dd292693b51b8afd4c1e81c7521cd6fb98ff5754))
  * Use example from example.js ([8fdfd8e0](https://github.com/fvdm/nodejs-ns-api/commit/8fdfd8e04d37a257374c210dc7510d440fd05036))
  * Use https links for NS.nl ([0884a402](https://github.com/fvdm/nodejs-ns-api/commit/0884a4027673c9bef8889872032320aaf63e75e1))
  * Minor author line cleanup ([f6cd71ee](https://github.com/fvdm/nodejs-ns-api/commit/f6cd71eed8f0f5d7a9360764d0cd9edd20b12a87))
* **badges:** Add coverage status badge ([19188006](https://github.com/fvdm/nodejs-ns-api/commit/19188006caab98eefd1afa5be1941b509d4c3336))

##### Bug Fixes

* **processData:** Make sure data is always a Buffer ([a0fdd89b](https://github.com/fvdm/nodejs-ns-api/commit/a0fdd89b53c4f15028c70567705f2286f9f06195))
* **setup:** Fixed fatal error when config is missing ([1da58df3](https://github.com/fvdm/nodejs-ns-api/commit/1da58df384a7999dd3d2cf394feb24692fedb278))

##### Refactors

* **style:**
  * Reduced complexity of methodStoringen ([3455c2f2](https://github.com/fvdm/nodejs-ns-api/commit/3455c2f24eb4027f0f0c2d8c8ae511564784be68))
  * Reduced complexity of methodStations ([8b8d0116](https://github.com/fvdm/nodejs-ns-api/commit/8b8d011651b878a851d49ed9abadf4d7ad73a7be))
  * Reduced complexity methodReisadvies ([f71bc605](https://github.com/fvdm/nodejs-ns-api/commit/f71bc605f74acfc08269bded164c30ea28cdb90a))
  * More consistent returns ([f3a8d760](https://github.com/fvdm/nodejs-ns-api/commit/f3a8d7605a740a96090443b7b4f450a5b767ea6e))
* **request:**
  * Cleaner boolean conversion ([156d4f69](https://github.com/fvdm/nodejs-ns-api/commit/156d4f69f1ffde6ce45ad81d5e18258de30e0f36))
  * Renamed talk to httpRequest ([a0705a32](https://github.com/fvdm/nodejs-ns-api/commit/a0705a32c74de9eace95441363d8b70f1469bd73))
* **errors:** Generate most errors with makeError() ([acc14be2](https://github.com/fvdm/nodejs-ns-api/commit/acc14be23b7c63cfd938206133b965654c58f27c))
* **response:** Renamed processResponse to httpResponse ([48543393](https://github.com/fvdm/nodejs-ns-api/commit/48543393f0a1be2d217512c9ff825aa62b3cf90f))
* **package:**
  * Minor description change ([1cfb2d5e](https://github.com/fvdm/nodejs-ns-api/commit/1cfb2d5e1061d8222e48d7304b941e62ac623134))
  * Minimum node v4.0.0 ([741cc1f5](https://github.com/fvdm/nodejs-ns-api/commit/741cc1f52050a62876a6109365d5ca1ecba595eb))

##### Tests

* **tests:**
  * Do test .prijzen even tough it is not available ([4b7e5dbc](https://github.com/fvdm/nodejs-ns-api/commit/4b7e5dbcdfdc06b71ce6354bc35b2422d865834b))
  * Check err.message on .vertrektijden error ([6fc519db](https://github.com/fvdm/nodejs-ns-api/commit/6fc519dbab9b240b28fce17286712c843f5d2554))
  * Add .vertrektijden error test ([b159081e](https://github.com/fvdm/nodejs-ns-api/commit/b159081e47a18507eab16b11280cdda4dfd832c2))
  * Use test() alias instead of dotest.test() ([81784da7](https://github.com/fvdm/nodejs-ns-api/commit/81784da7758664730f1ce808dd48a959e6ac1137))
  * Add config.timeout test ([c9c558d2](https://github.com/fvdm/nodejs-ns-api/commit/c9c558d2766c2884a296e4effe8e6e461618327f))
  * Run all tests even without user/pass ([ad426f66](https://github.com/fvdm/nodejs-ns-api/commit/ad426f6652b885545973481b0fb6c5a84499fe7a))
* **script:** No need to check for user/pass ([e961140f](https://github.com/fvdm/nodejs-ns-api/commit/e961140fa77714c93a7dd9dc238d305834a3f682))
* **config:** Removed node v0.12 from Travis CI ([1f88a049](https://github.com/fvdm/nodejs-ns-api/commit/1f88a049ff41e8ba8595986fbb4279103e49416e))
* **fix:** Fixed eslint operator-linebreak before ([bfe6d713](https://github.com/fvdm/nodejs-ns-api/commit/bfe6d71336a65cb3b1ebf0d15d1cb2a6d9c125fe))

#### 2.0.1 (2016-5-29)

##### Chores

* **package:**
  * More npm keywords ([3a17805f](https://github.com/fvdm/nodejs-ns-api/commit/3a17805fc7bc6260f593514f67587a149d463725))
  * Update versions ([6a0dd7a1](https://github.com/fvdm/nodejs-ns-api/commit/6a0dd7a1615ad9b59ebf28ec7ce681b6fc3654d1))
* **gitignore:** Add .*_history logfiles ([78726d65](https://github.com/fvdm/nodejs-ns-api/commit/78726d65fa001fb318c356fd586fb609df7a1467))

##### Documentation Changes

* **badges:** Add npm version for changelog ([13ee0c7d](https://github.com/fvdm/nodejs-ns-api/commit/13ee0c7d995a7f1a8d2e05f498f23f9141fc0818))
* **readme:** Deeplink Gemnasium badge to dependencies tab ([3a4c18c4](https://github.com/fvdm/nodejs-ns-api/commit/3a4c18c4f8ffef12e173dbaeee0fbbaf66e9d902))

##### Other Changes

* **undefined:**
  * add node v6 to Travis config ([931476f0](https://github.com/fvdm/nodejs-ns-api/commit/931476f0aa45276c7f6a9aec5b1a787065b15fd9))
  * added dependencies badge ([5efedbea](https://github.com/fvdm/nodejs-ns-api/commit/5efedbea452ec3699d7b9489f8cd39fd15ab2ebb))
  * always run both test commands ([c3062307](https://github.com/fvdm/nodejs-ns-api/commit/c3062307871c5d54a44ec8c1ccc7aad4fbc8f0db))

##### Tests

* **runner:** Check credentials after basic tests ([e03707af](https://github.com/fvdm/nodejs-ns-api/commit/e03707af4c189171ac662a507ac63ec7bf55fc0f))

