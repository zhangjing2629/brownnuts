/**
 * @fileoverview lithe配置文件
 * @author liuluying@le.com
 */
(function(global, undef) {
     var basepath = 'http://' + 'js.letvcdn.com';

     var router =  {
        //routeStart
//routeEnd
     }
    var mod = {
        basepath:basepath + '/js/',
        alias: {
            'vue' : 'lib/vue/vue',
            'jquery' : 'lib/jquery/jquery' ,
            'moment' : 'lib/daterangepicker/moment'
        },
        router : router,
        middleware : function(id,path) {
            var prefix = 'dist/js/',currUrl;
            if(/\.js$/.test(id)) {
                currUrl =  router[prefix + id];       
            } else {
                currUrl =  router[prefix + id + '.js'];       
            }
            if(currUrl) {
                path = basepath + '/';
                id = currUrl.replace(path,'');
            }
            return {
                id:id,
                path:path
            }
        }
    };
    if (global.define && typeof window) {
        define('config', function() {
            return mod;
        });
    }else {
        module.exports = mod;
    }
})(this);
