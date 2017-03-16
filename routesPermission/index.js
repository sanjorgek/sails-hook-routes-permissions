/**
 * routesPermission hook
 */

module.exports = function (sails) {
  function permissionRoutes (route, cb) {
    for (var index in sails.permissions.routesRE) {
      if (sails.permissions.routesRE.hasOwnProperty(index)) {
        var routeRE = sails.permissions.routesRE[index];
        var routeMatcher = new RegExp(routeRE.replace(/:[^\s/]+/g, '([\\w-]+)'));
        var match = route.match(routeMatcher);
        if(match!==null) return cb(null, sails.permissions.restrictions[routeRE]);
      }
    }
    return cb(sails.errorhandler.create("unauthorized", "Route not found in permissions"));
  }
  
  return {
    
    defaults: {
      routesPermissions : {}
    },

    //configure: function(){},

    //routes: {
      //before: {},
      //after: {},
    //}
    
    // Run when sails loads-- be sure and call `next()`.
    initialize: function (next) {
      sails.after(["hook:orm:loaded", "hook:errorhandler:loaded"], function() {
        sails.permissions = {
          routesRE : Object.keys(sails.config.routesPermissions),
          restrictions : sails.config.routesPermissions,
          permissionRoutes : permissionRoutes
        };
        next();
      });
    }

  };
};
