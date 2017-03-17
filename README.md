# sails-hook-routes-permissions

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Build Status][build-image]][build-url]
  [![Code Climate][climate-image]][climate-url]
  [![Issue Count][issue-image]][issue-url]
  [![bitHound Overall Score][score-image]][score-url]
  [![bitHound Dependencies][dep-image]][dep-url]
  [![bitHound Dev Dependencies][devdep-image]][devdep-url]
  [![bitHound Code][code-image]][code-url]
  [![Codacy Badge][codacy-image]][codacy-url]

## About
A sails hook for multi-model auth

## Settings
Install

```
npm install sails-hook-routes-permissions
```

Define at `config/routesPermissions.js`

```js
module.exports.routesPermissions = {
  'post /categories/time_products': { //some method and url
    minLevel: 0, //add some validations
    owners: ['player'] //who can access
  },

  'get /categories/:id/available_timetable': {
    minLevel: 0,
    owners: ['player']
  }
}
```

And define some policie o middleware

```js
module.exports = function(req, res, next) {
  var fullPath = req.method.toLowerCase() + " " + req.url;
  sails.permissions.permissionRoutes(fullPath, function(err, routePermissions){
    if(err){
      // handle error
    }
    var accessKey = req.accessKey;  // define some access method
    var hasValidLevel = routePermissions.minLevel <= accessKey.level; //check your validations
    var hasPermission = routePermissions.owners.indexOf(req.ownerData.ownerModel) != -1; // check if had access
    if (hasPermission && hasValidLevel){
      return next();
    }else if (!hasPermission){
      //handle unauth access
    }
  });
};
```

[npm-image]: https://img.shields.io/npm/v/sails-hook-routes-permissions.svg
[npm-url]: https://npmjs.org/package/sails-hook-routes-permissions
[downloads-image]: https://img.shields.io/npm/dm/sails-hook-routes-permissions.svg
[downloads-url]: https://npmjs.org/package/sails-hook-routes-permissions
[build-image]: https://travis-ci.org/sanjorgek/sails-hook-routes-permissions.svg
[build-url]: https://travis-ci.org/sanjorgek/sails-hook-routes-permissions
[code-image]: https://www.bithound.io/github/sanjorgek/sails-hook-routes-permissions/badges/code.svg
[code-url]: https://www.bithound.io/github/sanjorgek/sails-hook-routes-permissions
[dep-image]: https://www.bithound.io/github/sanjorgek/sails-hook-routes-permissions/badges/dependencies.svg
[dep-url]: https://www.bithound.io/github/sanjorgek/sails-hook-routes-permissions/bithound/dependencies/npm
[devdep-image]: https://www.bithound.io/github/sanjorgek/sails-hook-routes-permissions/badges/devDependencies.svg
[devdep-url]: https://www.bithound.io/github/sanjorgek/sails-hook-routes-permissions/bithound/dependencies/npm
[score-image]: https://www.bithound.io/github/sanjorgek/sails-hook-routes-permissions/badges/score.svg
[score-url]: https://www.bithound.io/github/sanjorgek/sails-hook-routes-permissions
[issue-image]: https://codeclimate.com/github/sanjorgek/sails-hook-routes-permissions/badges/issue_count.svg
[issue-url]: https://codeclimate.com/github/sanjorgek/sails-hook-routes-permissions
[climate-image]: https://codeclimate.com/github/sanjorgek/sails-hook-routes-permissions/badges/gpa.svg
[climate-url]: https://codeclimate.com/github/sanjorgek/sails-hook-routes-permissions
[graph-image]: https://nodei.co/npm-dl/sails-hook-routes-permissions.png?months=6&height=1
[graph-url]: https://nodei.co/npm/sails-hook-routes-permissions/
[codacy-url]: https://www.codacy.com/app/sanjorgek/sails-hook-routes-permissions?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=sanjorgek/sails-hook-routes-permissions&amp;utm_campaign=Badge_Grade
[codacy-image]: https://api.codacy.com/project/badge/Grade/3b8065ab1f47443d9f0345ccf8ecbd94
