module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    distTemp: 'dist/temp',
    templateCache: '<%= distTemp %>/populate_template_cache.js',

    concat: {
      jsModules: {
        src: ['src/**/*.module.js'],
        dest: '<%= distTemp %>/<%= pkg.name %>.modules.js',
        options: {
          banner: '(function() {\n',
          separator: '})();\n(function() {\n',
          footer: '})();'
        }
      },
      js: {
        src: ['src/**/*.js', '<%= templateCache %>', '!src/**/*.module.js'],
        dest: '<%= distTemp %>/<%= pkg.name %>.js',
        options: {
          banner: '(function() {\n',
          separator: '})();\n(function() {\n',
          footer: '})();'
        }
      },
      jsAll: {
        src: ['<%= concat.jsModules.dest %>', '<%= concat.js.dest %>'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      less: {
        src: ['src/assets/css/*.less', 'src/**/*.less'],
        dest: '<%= distTemp %>/<%= pkg.name %>.less'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.jsAll.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          angular: true,
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    html2js: {
      options: {
        base: 'src',
        module: '<%= pkg.moduleName %>.templates',
        singleModule: true,
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: false,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: ['src/**/*.tpl.html'],
        dest: '<%= templateCache %>'
      }
    },
    less: {
      main: {
        options: {
          compress: true
        },
        files: {
          'dist/<%= pkg.name %>.css': '<%= distTemp %>/<%= pkg.name %>.less'
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: 'index.html',    dest: 'dist/'},
          {src: 'manifest.json', dest: 'dist/'},
          {src: 'vendor/**/*.*', dest: 'dist/'},
        ],
      },
    },
    clean: {
      before: ['dist'],
      after: ['<%= distTemp %>']
    },
    watch: {
      files: ['<%= jshint.files %>', 'src/**/*.tpl.html', 'src/**/*.less', 'index.html'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['clean:before','jshint', 'html2js', 'concat', 'less', 'uglify', /*'clean:after',*/ 'copy', 'watch']);
};
