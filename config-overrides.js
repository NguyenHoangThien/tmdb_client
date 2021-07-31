const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@input-hover-border-color': 'black',
      '@border-color-base': 'rgba(0, 0, 0, 0.12)',
      '@input-height-base': '42px',
      '@primary-color': '#02B4E3',
    },
  }),
  addDecoratorsLegacy()
);
