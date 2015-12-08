System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "npm:*": "node_modules/*",
    "tmp/*": "./.tmp/*",
    "bower:*": "bower_components/*"
  },

  packages: {
    "app": {
      "defaultExtension": "ts"
    }
  },

  meta: {
    'bower:jquery/dist/jquery.js': {
      format: 'global'
    },
    'bower:angular-translate/angular-translate.js': {
      format: 'cjs'
    },
    'bower:angular-translate-loader-static-files/angular-translate-loader-static-files.js': {
      format: 'cjs'
    },
    'bower:spin.js/spin.js': {
      format: 'global'
    },
    'bower:angular-spinner/angular-spinner.js': {
      format: 'global'
    },
    'bower:jqtree/tree.jquery.js': {
      format: 'global'
    },
    'bower:jsUri/Uri.js': {
      format: 'global'
    },
    'bower:angular-mocks/angular-mocks.js': {
      format: 'global'
    }
  },

  map: {
    "jquery": "bower:jquery/dist/jquery.js",

    "angular": "bower:angular/index.js",
    "angular-mocks": "bower:angular-mocks/angular-mocks.js",
    "angular-animate": "bower:angular-animate/index.js",
    "angular-sanitize": "bower:angular-sanitize/index.js",

    "angular-ui-bootstrap": "bower:angular-ui-bootstrap-bower/index.js",
    "angular-ui-grid": "bower:angular-ui-grid/ui-grid.js",
    "angular-ui-select": "bower:angular-ui-select/dist/select.js",
    "angular-ui-validate": "bower:adamas/js/systemjs/angular-ui-validate.js",

    "angular-translate": "bower:angular-translate/angular-translate.js",
    "angular-translate-loader-static-files": "bower:angular-translate-loader-static-files/angular-translate-loader-static-files.js",

    "angular-breadcrumb": "bower:adamas/js/systemjs/angular-breadcrumb.js",
    "angular-growl": "bower:adamas/js/systemjs/angular-growl.js",
    "adamas": "bower:adamas/js/systemjs/adamas.js",
    "jsuri": "bower:jsUri/Uri.js",
    "angular-jsuri": "bower:adamas/js/systemjs/angular-jsuri.js",
    "spin.js": "bower:spin.js/spin.js",
    "angular-spinner": "bower:angular-spinner/angular-spinner.js",


    "valdr": "bower:adamas/js/systemjs/valdr.js",
    "valdr-message": "bower:valdr/valdr-message.js",
    "pdfmake": "bower:pdfmake/build/pdfmake.js",
    "pdfmake-fonts": "bower:pdfmake/build/vfs_fonts.js",

    "ui-router": "bower:ui-router/release/angular-ui-router.js",
    "jqtree": "bower:jqtree/tree.jquery.js",
    "typescript": "npm:typescript/lib/typescript.js"
  }
});
