/**
 * routesPermission hook
 */

var lazy = require("lazy.js");

module.exports = function (sails) {
  function findRoute (route) {
    return function(routePattern) {
      var routeMatcher = new RegExp(routePattern.replace(/:[^\s/]+/g, "([\\w-]+)"));
      var match = route.match(routeMatcher);
      return (match!==null)? true: false;
    };
  }

  function permissionRoutes (route, cb) {
    var posResult = lazy(sails.permissions.routesRE).find(findRoute(route));
    return (posResult)? cb(null, sails.permissions.restrictions[posResult]):
      cb(sails.errorhandler.create("unauthorized", "Route not found in permissions"));
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
