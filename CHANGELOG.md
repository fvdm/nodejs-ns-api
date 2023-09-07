#### 4.1.2 (2023-08-30)

##### Chores

* **github:**
  *  Bump github/codeql-action from 1 to 2 ([#33](https://github.com/fvdm/nodejs-ns-api/pull/33)) ([66b69fb3](https://github.com/fvdm/nodejs-ns-api/commit/66b69fb3ffbee4cfa767e0a8dfc925bfe42e87b1))
  *  Bump actions/checkout from 2 to 3 ([#31](https://github.com/fvdm/nodejs-ns-api/pull/31)) ([7ffd07d3](https://github.com/fvdm/nodejs-ns-api/commit/7ffd07d3236a348da78a6a2f2bbae6c5a217f86f))
  *  Bump actions/setup-node from v2 to v3.0.0 ([#30](https://github.com/fvdm/nodejs-ns-api/pull/30)) ([f7009d1a](https://github.com/fvdm/nodejs-ns-api/commit/f7009d1a0c8cba9833834e451022b9424d7f33e9))

##### Refactors

*  No deps, minimum Node 18, cleanup ([#36](https://github.com/fvdm/nodejs-ns-api/pull/36)) ([8f7eb065](https://github.com/fvdm/nodejs-ns-api/commit/8f7eb065c966b8ab939e0e993582b78e69626a6c))

#### 4.1.1 (2021-10-06)

##### Chores

* **ci:**
  *  Fix Dependabit array ([5601b50c](https://github.com/fvdm/nodejs-ns-api/commit/5601b50cb762cad792991bbea4bdd0b63cb45447))
  *  Added Dependabot config ([ea37740a](https://github.com/fvdm/nodejs-ns-api/commit/ea37740ae37316f20cb5fa32e8249637b1836ac0))
* **package:**
  *  Update dependencies ([0f7bd3fe](https://github.com/fvdm/nodejs-ns-api/commit/0f7bd3fe1b6c8d3b0cdb92babd42f7fe2e8b3a80))
  *  Update RunKit example key ([829f9735](https://github.com/fvdm/nodejs-ns-api/commit/829f973565ed4d2ba6ce286e09dccc4c47ad6c94))

##### Refactors

*  doRequest now returns a promise ([59235338](https://github.com/fvdm/nodejs-ns-api/commit/59235338a4bba8b573ca93462950448219fb9d50))

##### Code Style Changes

*  Whitespace fixes ([3fb6a1de](https://github.com/fvdm/nodejs-ns-api/commit/3fb6a1dee8af72ecfe3eb7c1d41fbb1cbe44b07f))

##### Tests

* **config:**
  *  Modern ESLint config ([56a24ea0](https://github.com/fvdm/nodejs-ns-api/commit/56a24ea0514f6fc133bf35070feac92ac5b1a5a9))
  *  Run Github action every week ([b23fdd21](https://github.com/fvdm/nodejs-ns-api/commit/b23fdd216714f6e9002c4bae7e3a5f4334926ee6))
  *  Deleting dependabot ([e6b465f5](https://github.com/fvdm/nodejs-ns-api/commit/e6b465f518ed146df6c434af18ed26838d5a5754))
* **ci:**  Updated Github action ([a8e82c97](https://github.com/fvdm/nodejs-ns-api/commit/a8e82c9779a3d88b8d96355cefe1ec146379754d))
*  Change OV Fiets station to Utrecht ([5b18f571](https://github.com/fvdm/nodejs-ns-api/commit/5b18f57145887179c4ad8773148ee4bc20f1993b))

### 4.1.0 (2021-08-03)

##### Chores

* **license:**  Update link ([84833a69](https://github.com/fvdm/nodejs-ns-api/commit/84833a6935e090aa44c9f9e370d111cdd3ca24c8))
* **package:**
  *  Minor clean up ([aa49cf55](https://github.com/fvdm/nodejs-ns-api/commit/aa49cf55e097cd538c0d3cdcb2049db279193cc1))
  *  Update httpreq ([#28](https://github.com/fvdm/nodejs-ns-api/pull/28)) ([958df2e6](https://github.com/fvdm/nodejs-ns-api/commit/958df2e6c0897e2e730260c2d74317028ccfac0f))
  *  Minimum node v12 ([1da43ddc](https://github.com/fvdm/nodejs-ns-api/commit/1da43ddc857bf5a9125e6e8b6f320e613c2ead4b))
* **github:**
  *  Added Dependabot config ([0f3e3a15](https://github.com/fvdm/nodejs-ns-api/commit/0f3e3a15fdedef5b19f4291555c407dc47dd13ed))
  *  Update funding link ([5e19873b](https://github.com/fvdm/nodejs-ns-api/commit/5e19873b19e223028144530575421f91e9d3375d))

##### Documentation Changes

*  Add API docs url to getJourney ([9d8471dd](https://github.com/fvdm/nodejs-ns-api/commit/9d8471ddceb339bba3e42649d9145312ce4cba65))
*  Cleaner example ([e6b14ff8](https://github.com/fvdm/nodejs-ns-api/commit/e6b14ff898b12d7d75e61915256ae4084dcf75b2))
* **contrib:**  Removed file ([3a2b2dbb](https://github.com/fvdm/nodejs-ns-api/commit/3a2b2dbb2fc0f95b61e68c0ac99c547882373d80))
* **badges:**
  *  Replaced Travis with Github action ([0c0cdc0c](https://github.com/fvdm/nodejs-ns-api/commit/0c0cdc0c1046847539375361bd38a33f077d7b38))
  *  Update Travis url ([24893fef](https://github.com/fvdm/nodejs-ns-api/commit/24893fef8f9be0113c4e335866849e5cd14bdb5a))
  *  Removed Greenkeeper ([a7512d6d](https://github.com/fvdm/nodejs-ns-api/commit/a7512d6d36b1aa0c3cb5f709bc793c69f7d2abdd))

##### New Features

*  Add places methods ([#27](https://github.com/fvdm/nodejs-ns-api/pull/27)) ([980b7b17](https://github.com/fvdm/nodejs-ns-api/commit/980b7b17cc9d9b7b6cd624d4ec16c740973750db))
*  Added getJourney() ([aab25469](https://github.com/fvdm/nodejs-ns-api/commit/aab2546947bce2c79181f1e4bc728019a039c6bd))

##### Bug Fixes

*  Moved API error fallback to bottom ([298e9ecd](https://github.com/fvdm/nodejs-ns-api/commit/298e9ecd067d8382b98908b075ccf03b489425a7))
*  getPrices() changed response ([f59ae268](https://github.com/fvdm/nodejs-ns-api/commit/f59ae268e2cbb330fe5740017274f72eda8b3740))

##### Refactors

*  Update disruption endpoints [#24](https://github.com/fvdm/nodejs-ns-api/pull/24) ([#29](https://github.com/fvdm/nodejs-ns-api/pull/29)) ([e430df6b](https://github.com/fvdm/nodejs-ns-api/commit/e430df6b3ba940e4911b9d0bbab929641bfdf4d1))
*  Removed the try..finally from _request() ([5223259d](https://github.com/fvdm/nodejs-ns-api/commit/5223259db383991a6c28806ec43025f6924acc81))
*  Rewrite request handling ([337379e1](https://github.com/fvdm/nodejs-ns-api/commit/337379e1bebf8f8377db8e06699068471a6ada30))

##### Code Style Changes

*  Minor clean up ([20202037](https://github.com/fvdm/nodejs-ns-api/commit/20202037968c41494af4cd42166dfaffc8b0241c))
*  Fix comment typo ([850f7231](https://github.com/fvdm/nodejs-ns-api/commit/850f7231181427be0119b8197af66b666dda347a))
*  Clarify API errors in comments ([ef361e0f](https://github.com/fvdm/nodejs-ns-api/commit/ef361e0fe9e1b69dff03a2947d99c9bd313bcb8b))
*  Skip odd errors in coverage ([a63a26c6](https://github.com/fvdm/nodejs-ns-api/commit/a63a26c68a3ec7ecbe07fa41768b81fc55e480d7))
* **lint:**  Clean up whitespace ([4289ce90](https://github.com/fvdm/nodejs-ns-api/commit/4289ce9076c47b3c0b300b7fadd08dae36b57d55))

##### Tests

*  Added getDisruptions actual test ([1aff11d2](https://github.com/fvdm/nodejs-ns-api/commit/1aff11d26dcf4f305c7d16ccadec1ea1450dd4a4))
*  Fix errors ([277a771a](https://github.com/fvdm/nodejs-ns-api/commit/277a771a722749581304f24fe42876f1cdab5ada))
*  Improve testing and error handling ([8aed25f5](https://github.com/fvdm/nodejs-ns-api/commit/8aed25f592d3e4daed6ed12568d94078814f541c))
*  Update Travis CI node versions ([7afd99ec](https://github.com/fvdm/nodejs-ns-api/commit/7afd99ec95b7dc13c5b006b34c5c4a9c5b0be841))
* **config:**
  *  Fix ESLint hierarchy problem ([b2ef9013](https://github.com/fvdm/nodejs-ns-api/commit/b2ef90134b839ba6ecaeef24d0ffe1aaadc0bc9f))
  *  Map env vars in build action ([09fc5b75](https://github.com/fvdm/nodejs-ns-api/commit/09fc5b75c25e1e2bbdaa27be75829084307c307a))
  *  Added CodeQL action ([dc1939ff](https://github.com/fvdm/nodejs-ns-api/commit/dc1939ff777685eea7cabf18d6cebb33980b6c0e))
  *  Replaced Travis with Github action ([c54f5422](https://github.com/fvdm/nodejs-ns-api/commit/c54f54227aaaed0cd24f672d2652708131305bae))

#### 4.0.1 (2020-08-31)

##### Chores

* **package:**
  *  Update author info ([03856d12](https://github.com/fvdm/nodejs-ns-api/commit/03856d12f44955daaa1a096dccc26cf1be726f93))
  *  Update minimum node to v10 ([92a3bc4a](https://github.com/fvdm/nodejs-ns-api/commit/92a3bc4ae649fdab9e0ff8189cc5a32a88435ff8))
  *  Update dev deps ([c74c3b48](https://github.com/fvdm/nodejs-ns-api/commit/c74c3b4823e6e1ab24645fac9860062dddd21246))

##### Documentation Changes

*  Update author info ([a0e85371](https://github.com/fvdm/nodejs-ns-api/commit/a0e85371ce6b45ddacede71192abe4607d7afc74))

##### Bug Fixes

* **API:**
  *  getDisruptions actual must be explicit ([#23](https://github.com/fvdm/nodejs-ns-api/pull/23)) ([517cde9d](https://github.com/fvdm/nodejs-ns-api/commit/517cde9d6f2d6f67da4896e53e918da330655d85))
  *  getPrice payload was moved to root ([#23](https://github.com/fvdm/nodejs-ns-api/pull/23)) ([1caf0f52](https://github.com/fvdm/nodejs-ns-api/commit/1caf0f52d3455194f6b8c92bca2609b9446fcbc7))
  *  getArrivals dateTime format ([#23](https://github.com/fvdm/nodejs-ns-api/pull/23)) ([db3a49ac](https://github.com/fvdm/nodejs-ns-api/commit/db3a49ac475705238b56d5d14b28806ed818d4d1))

##### Tests

* **config:**
  *  Update Travis node versions ([8a92d788](https://github.com/fvdm/nodejs-ns-api/commit/8a92d788382f0deb60c52795f2fccc54405cd97b))
  *  Update Travis node versions and env ([6f3312eb](https://github.com/fvdm/nodejs-ns-api/commit/6f3312eb25ed0afbf1e0a9670c6b330e62310148))

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
