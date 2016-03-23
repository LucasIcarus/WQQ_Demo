module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({

        // read the package.json
        pkg: grunt.file.readJSON('package.json'),

        // others
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'css', src: '**.min.css', dest: 'dist/css', filter: 'isFile'},
                    {expand: true, cwd: 'js', src: '**.min.js', dest: 'dist/js', filter: 'isFile'},
                    {expand: true, cwd: 'img_build', src: '**.*', dest: 'dist/img_build', filter: 'isFile'},
                ]
            }
        },
        sass: {
            compile: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'sass/main.scss'
                }
            },
            minified: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/main.min.css': 'sass/main.scss'
                }
            }
        },
        banner: '/*!\n' +
        ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['css/main.css', 'css/main.min.css', 'js/main.min.js']
                }
            }
        },
        uglify: {
            main: {
                options: {
                    mangle: true
                },
                files: {
                    'js/main.min.js': 'js/main.js'
                }
            }
        },
        imagemin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['**/*.{png,jpg,gif,jpeg}'],
                    dest: 'img_build'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhiteSpace: true
                },
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/main.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['sass/main.scss'],
                tasks: ['sass:compile'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // load the plugins
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // custom task(s)
    grunt.registerTask(
        'build',
        'release to the dist',
        ['usebanner','uglify','sass:minified','imagemin','htmlmin','copy']
    );

    // default task(s)
    grunt.registerTask('default', ['copy']);
};