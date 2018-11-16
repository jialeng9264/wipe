// gruntfile.js
//模块化导入函数
module.exports = function(grunt){
    //所有插件的配置信息
    grunt.initConfig({
        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),
        //gulify插件的配置信息
        uglify:{
        	options:{
        		banner:'/*!<%= pkg.name %> <%= pkg.version %> 发布日期：<%=grunt.template.today("yyy-mm-dd")%>*/',
        	},
        	build:{
        		src:"src/js/wipe.js",
        		dest:"dist/js/wipe-<%= pkg.version %>.min.js"
        	}
        },
        cssmin:{
        	options:{
        		mergeIntoShorthands:false,
        		roundingPrecision:-1
        	},
        	target:{
        		files:[{
        			expand:true,
        			cwd:'src/css',
        			src:['*.css','!*.min.css'],
        			dest:'dist/css',
        			ext:'.min.css'
        		}]
        	}
        },
        clean:{
        	dest:['dist/*','sample/js/*']
        },
        jshint:{
        	test:['src/js/wipe.js'],
        	options:{
        		jshintrc:'.jshintrc'
        	}
        },
        copy:{
            js: {expand: true, cwd: 'src/img/', src: '*.min.js', dest: 'sample/js/'}
        },
        replace:{
            example:{
                src:['sample/index.html'],
                overwrite:true,
                replacements:[
                {
                    from:/\d[\.]\d\[\.]\d/g,
                    to:'<%= pkg.version %>'
                },
                {
                    from:/hello\.css/g,
                    to:'hello.min.css'
                }
                ]
            }
        }
    });
    // 告诉grunt需要使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    //告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
    grunt.registerTask('default',['jshint','copy','clean','uglify','replace']);
};