/**
 * @desc 所有文件发布到...
 * @param $0 保持以前的状态
 * @notice fis3 release -d 自定义path采用自定义路径时，注释此代码
 */
// fis.match('*', {
//     release: './static/$0'
// });

// 所有模板放到 tempalte 目录下
// fis.match('*.html', {
//     release: '/template/$0'
// });

// widget源码目录下的资源被标注为组件
// fis.match('/widget/**/*', {
//     isMod: true
// });

// widget下的 js 调用 jswrapper 进行自动化组件化封装
// fis.match('/widget/**/*.js', {
//     postprocessor: fis.plugin('jswrapper', {
//         type: 'commonjs'
//     })
// });

// test 目录下的原封不动产出到 test 目录下
// fis.match('/test/**/*', {
//     release: '$0'
// });

// npm install [-g] fis3-hook-module
fis.hook('module', {
    mode: 'amd',
    forwardDeclaration: true
});

fis.match('static/mod/*mod.*.js', {
    isMod: true
});

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true // 资源映射表内嵌
    })
});

// SCSS编译optimizer: fis.plugin('clean-css')
fis.match('*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('sass', {
        //fis-parser-sass option
    })
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {  //用来匹配 fis 的打包过程
  spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

// 加 hash
fis.match('*.{js,css,png}', {
  useHash: true
});

// 所有图片加 hash
// fis.match('image', {
//   useHash: true
// });

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});


//某些资源从构建中去除
// fis.set('project.ignore', [
//   'output/**',
//   'node_nodules/**',
//   '.git/**',
//   '.svn/**'
// ]);


/**
 * fis3 release -d [path] -wL
 * ctrl + c 退出监听
 */