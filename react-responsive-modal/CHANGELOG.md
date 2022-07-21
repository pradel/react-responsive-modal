# Changelog

## [6.3.2](https://github.com/pradel/react-responsive-modal/compare/v6.3.1...v6.3.2) (2022-07-21)


### Miscellaneous

* fix publishing process ([2cec9a2](https://github.com/pradel/react-responsive-modal/commit/2cec9a28a4a2eff8de7de2d1550d0e9550824bbe))

### [6.3.1](https://www.github.com/pradel/react-responsive-modal/compare/v6.3.0...v6.3.1) (2022-04-25)


### Bug Fixes

* fix publishing process ([#492](https://www.github.com/pradel/react-responsive-modal/issues/492)) ([2ecd108](https://www.github.com/pradel/react-responsive-modal/commit/2ecd1084a0398a0ae0d7baa40b9b2b4e03f3d91c))

## [6.3.0](https://www.github.com/pradel/react-responsive-modal/compare/v6.2.0...v6.3.0) (2022-04-25)


### Features

* ability to specify id for container ([#489](https://www.github.com/pradel/react-responsive-modal/issues/489)) ([3e09b5c](https://www.github.com/pradel/react-responsive-modal/commit/3e09b5c668e5cbe6127c5b439d57a80a3d24bd33))

## [6.2.0](https://www.github.com/pradel/react-responsive-modal/compare/v6.1.0...v6.2.0) (2021-12-14)


### Features

* add optional reserveScrollBarGap ([#484](https://www.github.com/pradel/react-responsive-modal/issues/484)) ([69249f8](https://www.github.com/pradel/react-responsive-modal/commit/69249f8f97d02e4eaf07bedb52cb4ff1b1d4f636))

## [6.1.0](https://www.github.com/pradel/react-responsive-modal/compare/v6.0.1...v6.1.0) (2021-06-01)


### Features

* add options to set initial focus within modal ([#476](https://www.github.com/pradel/react-responsive-modal/issues/476)) ([5bdc362](https://www.github.com/pradel/react-responsive-modal/commit/5bdc362521a6db00030d723015c8abd2e76f19c7))


### Documentation

* fix typo in menu ([#473](https://www.github.com/pradel/react-responsive-modal/issues/473)) ([23cccc6](https://www.github.com/pradel/react-responsive-modal/commit/23cccc60a71342e3c122f968888118b911387056))

### [6.0.1](https://www.github.com/pradel/react-responsive-modal/compare/v6.0.0...v6.0.1) (2021-01-08)


### Bug Fixes

* **docs:** fix website dependencies ([222c6ed](https://www.github.com/pradel/react-responsive-modal/commit/222c6edef3851d2939a4fafa4d6c96e19ef35b1a))
* fix iOS problem with scroll not working in Safari ([#464](https://www.github.com/pradel/react-responsive-modal/issues/464)) ([0e38605](https://www.github.com/pradel/react-responsive-modal/commit/0e38605e37fa0e9d67ff5104e79fadfde5941bb0))
* fix release-script publishing script ([9347ad5](https://www.github.com/pradel/react-responsive-modal/commit/9347ad57d781aeca637b0527e89e34acd1cf6b3a))
* update changelogs path ([f6f3a65](https://www.github.com/pradel/react-responsive-modal/commit/f6f3a655b4d4a5ffc7f208684f439af9b20ef897))
* update README path ([fce1829](https://www.github.com/pradel/react-responsive-modal/commit/fce1829fe051ab5bef85811ad6d1d34d68bbfc5a))


### Miscellaneous

* remove unused dev dependencies ([38d2f1b](https://www.github.com/pradel/react-responsive-modal/commit/38d2f1bbda80641e857ce80ba71e995d8c44c438))
* upgrade yarn ([523536e](https://www.github.com/pradel/react-responsive-modal/commit/523536e783f82d69b8af0af9ec7dd2062af15349))
* uppdate release-please-action ([2172030](https://www.github.com/pradel/react-responsive-modal/commit/2172030427023c068644c71d8cbbe88c389ccf18))

## [6.0.0](https://www.github.com/pradel/react-responsive-modal/compare/v5.2.6...v6.0.0) (2020-11-15)


### ⚠ BREAKING CHANGES

* fix rendering issues in Safari, Firefox by changing the structure

### Features

* create E2E suite to test on real browser ([#449](https://www.github.com/pradel/react-responsive-modal/issues/449)) ([847ab1c](https://www.github.com/pradel/react-responsive-modal/commit/847ab1cac2044a6e11e3474f5fc34d7af69250bc))
* new documentation website ✨ ([#450](https://www.github.com/pradel/react-responsive-modal/issues/450)) ([3f620aa](https://www.github.com/pradel/react-responsive-modal/commit/3f620aa058c57ee251c968816a790a390edeba6e))
* switch project to monorepo ([#451](https://www.github.com/pradel/react-responsive-modal/issues/451)) ([ce59bad](https://www.github.com/pradel/react-responsive-modal/commit/ce59bad87178986bd1a87f80fd6a4489e066e614))
* upgrade focus-trap-js to support focus on radio elements ([#447](https://www.github.com/pradel/react-responsive-modal/issues/447)) ([d51f8e0](https://www.github.com/pradel/react-responsive-modal/commit/d51f8e06a81694b753d4e7777f5388bb05b69423))
* use body-scroll-lock instead of no-scroll ([#455](https://www.github.com/pradel/react-responsive-modal/issues/455)) ([033f901](https://www.github.com/pradel/react-responsive-modal/commit/033f9014b9951112da610435e0360f5ce463232b))


### Bug Fixes

* fix rendering issues in Safari, Firefox by changing the structure ([5727913](https://www.github.com/pradel/react-responsive-modal/commit/572791340fcc7b0f66e519fcbb7d4be9b998e088))


### Tests

* test that scroll is not blocked when blockScroll is false ([3d909b6](https://www.github.com/pradel/react-responsive-modal/commit/3d909b6c90261e6bd1a40de0a522ac4f85a487a8))
* test that scroll is unblocked when multiple modals are closed ([fba3593](https://www.github.com/pradel/react-responsive-modal/commit/fba35933ec6f270bbeb1fd779a6feef97b65bb82))
* test that scroll is unblocked when second modal has blockScroll set to false ([cf4b6b3](https://www.github.com/pradel/react-responsive-modal/commit/cf4b6b37ec55c24003d085cd5ad4d3bccc031bec))


### Miscellaneous

* delete `xmlns` prop from svg close icon ([#429](https://www.github.com/pradel/react-responsive-modal/issues/429)) ([8743327](https://www.github.com/pradel/react-responsive-modal/commit/87433278e10dc7077a7fddeaf6d2d088a3227bc9))
* use hook with modal manager ([#453](https://www.github.com/pradel/react-responsive-modal/issues/453)) ([b016ec4](https://www.github.com/pradel/react-responsive-modal/commit/b016ec41ff1208f0a56713c30734aae482abf3d6))


### Documentation

* **readme:** add integration tips ([4ad6d1d](https://www.github.com/pradel/react-responsive-modal/commit/4ad6d1d005fc441875cd680e4e42e1e0fb4b62cc))
* **readme:** remove dependencies badge ([5f7d0ad](https://www.github.com/pradel/react-responsive-modal/commit/5f7d0adc66783ed11b1bb0ed7610318c53dde17f))
* **readme:** remove example links ([9a06a62](https://www.github.com/pradel/react-responsive-modal/commit/9a06a62d7566380c74febf2b3d7a3e8b4268f71f))
* **readme:** update features ([ce05bd2](https://www.github.com/pradel/react-responsive-modal/commit/ce05bd2bab1605c14c4e63e8817bb81fd1aa35d4))

### [5.2.6](https://www.github.com/pradel/react-responsive-modal/compare/v5.2.5...v5.2.6) (2020-11-07)


### Miscellaneous

* fix publishing ([f024bd5](https://www.github.com/pradel/react-responsive-modal/commit/f024bd588ff315f440cc090eb90595d6f165fb98))

### [5.2.5](https://www.github.com/pradel/react-responsive-modal/compare/v5.2.4...v5.2.5) (2020-11-07)


### Miscellaneous

* fix build ([1a5f07c](https://www.github.com/pradel/react-responsive-modal/commit/1a5f07cb7a6f6682c01d487129309152e41b23c0))

### [5.2.4](https://www.github.com/pradel/react-responsive-modal/compare/v5.2.3...v5.2.4) (2020-11-07)


### Miscellaneous

* trigger release ([d14af23](https://www.github.com/pradel/react-responsive-modal/commit/d14af2334292d9aaf81385ccfdcd0b7ff506a7cb))

### [5.2.3](https://www.github.com/pradel/react-responsive-modal/compare/v5.2.2...v5.2.3) (2020-11-07)


### Miscellaneous

* upgrade dev dependencies ([6745a09](https://www.github.com/pradel/react-responsive-modal/commit/6745a09ddd26ac938f77615afc7ced8ff1703e62))

### [5.2.2](https://www.github.com/pradel/react-responsive-modal/compare/v5.2.1...v5.2.2) (2020-11-07)


### Bug Fixes

* fix closing modal via close icon ([#437](https://www.github.com/pradel/react-responsive-modal/issues/437)) ([f13ee4a](https://www.github.com/pradel/react-responsive-modal/commit/f13ee4abfce63b156f64a8cf5ea5ea50dfff4e19))


### Tests

* add tests for body scroll blocking ([#438](https://www.github.com/pradel/react-responsive-modal/issues/438)) ([f4077b8](https://www.github.com/pradel/react-responsive-modal/commit/f4077b8f0f24d9e4b12107d8ebe7382d5dafbfef))
