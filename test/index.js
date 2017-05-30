require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]'
});

require('glob')
  .sync('**/*-test.js', {
    realpath: true,
    cwd: require('path').resolve(process.cwd(), 'test')
  })
  .forEach(require);
