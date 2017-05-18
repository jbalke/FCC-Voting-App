!function(e){function t(r){if(n[r])return n[r].exports;var u=n[r]={exports:{},id:r,loaded:!1};return e[r].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var u=n(22),i=r(u),l=n(14),a=r(l),o=n(8),c=r(o),s=n(25),d=r(s),f=n(23),p=r(f),m=n(12),v=r(m),g="production"!==process.env.NODE_ENV?n(7):null;g&&g.load(),console.log(process.env),(0,v.default)(d.default);var _=(0,i.default)();c.default.connect(process.env.MONGODB_URI||process.env.MONGO_URI||process.env.MONGOLAB_URI),_.use("/",i.default.static(process.cwd()+"/public"));var E="development"!==process.env.NODE_ENV||process.env.DISABLE_WEBPACK?null:n(11);E&&E(_),_.use((0,p.default)({secret:process.env.SECRET_SESSION||"secretClementine",resave:!1,saveUninitialized:!0})),_.use(d.default.initialize()),_.use(d.default.session()),(0,a.default)(_,d.default);var h=process.env.PORT||8080;_.listen(h,function(e){e&&console.log(e),console.log("Node.js listening on port "+h+"...")})},function(e,t){e.exports=require("react")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(8),i=r(u),l=new u.Schema({twitter:{id:String,displayName:String,username:String},nbrClicks:{clicks:Number}});t.default=i.default.model("User",l)},function(e,t){"use strict";function n(e,t){return u({},e,{clicks:t,loading:void 0})}function r(e,t){return u({},e,{loading:t})}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i={clicks:0,loggedIn:!1};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments[1];switch(t.type){case"SET_CLICKS":return n(e,t.clicks);case"LOADING":return r(e,t.what);default:return e}};t.getUser=function(e){return e.user||{username:"guest"}},t.getClicks=function(e){return e.clicks||"0"},t.getLoggedIn=function(e){return e.loggedIn}},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("react-router")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function u(e){return{type:"SET_CLICKS",clicks:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.click=t.reset=void 0;var i=n(20),l=r(i);t.reset=function(){return function(e){e({type:"LOADING",what:"clicks"}),(0,l.default)("DELETE","/api/user/clicks").then(function(){(0,l.default)("GET","/api/user/clicks").then(function(t){var n=t.clicks;e(u(n))},function(e){console.log(e)})},function(e){console.log(e)})}},t.click=function(){return function(e){e({type:"LOADING",what:"clicks"}),(0,l.default)("POST","/api/user/clicks").then(function(){(0,l.default)("GET","/api/user/clicks").then(function(t){var n=t.clicks;e(u(n))},function(e){console.log(e)})},function(e){console.log(e)})}}},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("webpack")},function(e,t,n){"use strict";var r="production"!==process.env.NODE_ENV?n(7):null;r&&r.load(),e.exports={twitterAuth:{consumerKey:process.env.TWITTER_CONSUMER_KEY,consumerSecret:process.env.TWITTER_CONSUMER_SECRET,callbackURL:process.env.APP_URL+"auth/twitter/callback"}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var u=n(9),i=r(u),l=n(30),a=r(l),o=n(31),c=r(o),s=n(21),d=r(s);e.exports=function(e){var t=(0,i.default)(d.default);e.use((0,a.default)(t,{noInfo:!0,publicPath:d.default.output.publicPath})),e.use((0,c.default)(t))}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){e.serializeUser(function(e,t){t(null,e.id)}),e.deserializeUser(function(e,t){l.default.findById(e,function(e,n){t(e,n)})}),e.use(new u.Strategy({consumerKey:o.default.twitterAuth.consumerKey,consumerSecret:o.default.twitterAuth.consumerSecret,callbackURL:o.default.twitterAuth.callbackURL},function(e,t,n,r){process.nextTick(function(){l.default.findOne({"twitter.id":n.id},function(e,t){if(e)return r(e);if(t)return r(null,t);var u=new l.default;return u.twitter.id=n.id,u.twitter.username=n.username,u.twitter.displayName=n.displayName,u.nbrClicks.clicks=0,u.save(function(e){if(e)throw e;return r(null,u)}),!0})})}))};var u=n(26),i=n(2),l=r(i),a=n(10),o=r(a)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function u(){this.getClicks=function(e,t){l.default.findOne({"twitter.id":e.user.twitter.id},{_id:!1}).exec(function(e,n){if(e)throw e;t.json(n.nbrClicks)})},this.addClick=function(e,t){l.default.findOneAndUpdate({"twitter.id":e.user.twitter.id},{$inc:{"nbrClicks.clicks":1}}).exec(function(e,n){if(e)throw e;t.json(n.nbrClicks)})},this.resetClicks=function(e,t){l.default.findOneAndUpdate({"twitter.id":e.user.twitter.id},{"nbrClicks.clicks":0}).exec(function(e,n){if(e)throw e;t.json(n.nbrClicks)})}}var i=n(2),l=r(i);e.exports=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){function n(e,t,n){return e.isAuthenticated()?n():t.json({status:"forbidden"})}var r=new i.default;e.route("/api/user").get(function(e,t){return e.user&&e.user.twitter?t.json(e.user.twitter):t.json({unauth:!0})}),e.route("/auth/twitter").get(t.authenticate("twitter")),e.route("/auth/twitter/callback").get(t.authenticate("twitter",{successRedirect:"/",failureRedirect:"/login"})),e.route("/logout").get(function(e,t){e.logout(),t.redirect("/login")}),e.route("/api/user/clicks").get(n,r.getClicks).post(n,r.addClick).delete(n,r.resetClicks),e.route("/*").get(a.default)};var u=n(13),i=r(u),l=n(15),a=r(l)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(28),i=n(29),l=n(1),a=r(l),o=n(4),c=n(5),s=n(19),d=n(3),f=r(d),p=n(2),m=r(p),v=function(e,t,n,r){(0,c.match)({routes:n,location:t},function(t,n,i){if(t)e.status(500).send(t.message);else if(n)e.redirect(302,n.pathname+n.search);else if(i){var l=(0,u.renderToString)(a.default.createElement(o.Provider,{store:r},a.default.createElement(c.RouterContext,i))),s=r.getState();e.send('\n      <!doctype html>\n      <html>\n        <head>\n          <title>Clementine-React-Redux</title>\n          <link rel="stylesheet" href="/static/style.css" media="all">\n        </head>\n        <body>\n          <div id="appView">'+l+"</div>\n          <script>\n            window.__INITIAL_STATE__ = "+JSON.stringify(s)+'\n          </script>\n          <script src="/static/vendors.js"></script>\n          <script src="/static/bundle.js"></script>\n        </body>\n      </html>\n      ')}else e.status(404).send("Not found")})};t.default=function(e,t){if(!e.isAuthenticated()){if("/login"!==e.url)return t.redirect(302,"/login");var n={},r=(0,i.createStore)(f.default,n),u=(0,s.createRoutes)(r);return v(t,e.url,u,r)}var l=e.user.twitter;return"/login"===e.url?t.redirect(302,"/main"):(m.default.findOne({"twitter.id":l.id},function(n,r){if(n)return t.status(500).send(n.message);var u={counter:r.nbrClicks.clicks,loggedIn:!0,user:l},a=(0,i.createStore)(f.default,u),o=(0,s.createRoutes)(a);return v(t,e.url,o,a)}),null)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),i=r(u);t.default=function(){return i.default.createElement("div",{className:"container"},i.default.createElement("div",{className:"login"},i.default.createElement("img",{alt:"logo",src:"img/clementine_150.png"}),i.default.createElement("br",null),i.default.createElement("p",{className:"clementine-text"},"Clementine-React-Redux"),i.default.createElement("a",{href:"auth/twitter",className:"btn"},"Login")))}},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function u(e){return e&&e.__esModule?e:{default:e}}function i(e){return{user:(0,l.getUser)(e),clicks:(0,l.getClicks)(e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.MainContainer=t.MainComponent=void 0;var l=n(3),a=n(5),o=n(1),c=u(o),s=n(4),d=n(6),f=r(d),p=function(e){var t=e.click,n=e.reset,r=e.clicks,u=e.user;return c.default.createElement("div",null,c.default.createElement("header",null,c.default.createElement("p",null,"Welcome, ",c.default.createElement("span",{id:"display-name"},u.username),"!"),c.default.createElement(a.Link,{className:"menu",to:"/profile"},"Profile"),c.default.createElement("p",null,"|"),c.default.createElement("a",{className:"menu",href:"/logout"},"Logout")),c.default.createElement("div",{className:"container"},c.default.createElement("img",{alt:"logo",src:"img/clementine_150.png"}),c.default.createElement("br",null),c.default.createElement("p",{className:"clementine-text"},"Clementine.js")),c.default.createElement("div",{className:"container"},c.default.createElement("p",null,"You have clicked the button ",c.default.createElement("span",{id:"click-nbr"},r)," times."),c.default.createElement("br",null),c.default.createElement("div",{className:"btn-container"},c.default.createElement("button",{onClick:t,className:"btn"},"CLICK ME!"),c.default.createElement("button",{onClick:n,className:"btn"},"RESET"))))};p.propTypes={click:c.default.PropTypes.func.isRequired,reset:c.default.PropTypes.func.isRequired,clicks:c.default.PropTypes.oneOfType([c.default.PropTypes.string,c.default.PropTypes.number]).isRequired,user:c.default.PropTypes.object.isRequired};t.MainComponent=p,t.MainContainer=(0,s.connect)(i,f)(p)},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function u(e){return e&&e.__esModule?e:{default:e}}function i(e){return{user:(0,d.getUser)(e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.ProfileContainer=t.ProfileComponent=void 0;var l=n(1),a=u(l),o=n(4),c=n(6),s=r(c),d=n(3),f=n(5),p=function(e){var t=e.user;return a.default.createElement("div",{className:"container"},a.default.createElement("div",{className:"twitter-profile"},a.default.createElement("img",{src:"img/twitter_32px.png",alt:"twitter logo"}),a.default.createElement("p",null,a.default.createElement("span",null,"ID: "),a.default.createElement("span",{id:"profile-id",className:"profile-value"},t.id)),a.default.createElement("p",null,a.default.createElement("span",null,"Username: "),a.default.createElement("span",{id:"profile-username",className:"profile-value"},t.username)),a.default.createElement("p",null,a.default.createElement("span",null,"Display Name: "),a.default.createElement("span",{id:"display-name",className:"profile-value"},t.displayName)),a.default.createElement(f.Link,{className:"menu",to:"/main"},"Home"),a.default.createElement("p",{id:"menu-divide"},"|"),a.default.createElement("a",{className:"menu",href:"/logout"},"Logout")))};p.propTypes={user:a.default.PropTypes.object};t.ProfileComponent=p,t.ProfileContainer=(0,o.connect)(i,s)(p)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.createRoutes=void 0;var u=n(1),i=r(u),l=n(17),a=n(16),o=r(a),c=n(18),s=function(e){var t=e.children;return i.default.createElement("div",null,t)};s.propTypes={children:i.default.PropTypes.oneOfType([i.default.PropTypes.arrayOf(i.default.PropTypes.node),i.default.PropTypes.node])};t.createRoutes=function(e){var t=function(t,n){e.getState().loggedIn||n("/login")},n=function(t,n){e.getState().loggedIn&&n("/main")};return{path:"/",component:s,indexRoute:{component:l.MainContainer},childRoutes:[{path:"main",component:l.MainContainer,onEnterAuth:t},{path:"profile",component:c.ProfileContainer,onEnterAuth:t},{path:"login",component:o.default,onEnterUnauth:n}]}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return new Promise(function(n,r){var u=new XMLHttpRequest;u.onreadystatechange=function(){4===u.readyState&&(u.status/100===2?n(JSON.parse(u.response)):r(JSON.parse(u.response)))},u.open(e,t,!0),u.send()})}},function(e,t,n){(function(t){"use strict";var r=n(27),u=n(9),i=n(24);e.exports={devtool:"#source-map",entry:{app:["webpack-hot-middleware/client",r.join(t,"client","src","index.jsx")],vendors:["react","redux","react-redux","react-router","react-dom","redux-thunk"]},output:{path:r.join(t,"public","static"),filename:"bundle.js",publicPath:"/static/"},target:"web",plugins:[new u.optimize.OccurrenceOrderPlugin,new u.HotModuleReplacementPlugin,new u.NoErrorsPlugin,new u.optimize.CommonsChunkPlugin("vendors","vendors.js"),new i("style.css")],module:{loaders:[{test:/\.jsx?$/,loader:"react-hot",exclude:/node_modules/},{test:/\.jsx?$/,loader:"babel-loader",exclude:/node_modules/,query:{presets:["es2015","react"]}},{test:/\.scss$/,loader:i.extract("style-loader","css-loader","sass")},{test:/\.json$/,loaders:["json"]},{test:/\.(eot|woff|woff2|ttf|svg|png|jpg)$/,loader:"file-loader?name=[name].[ext]"}]}}}).call(t,"")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("extract-text-webpack-plugin")},function(e,t){e.exports=require("passport")},function(e,t){e.exports=require("passport-twitter")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("webpack-dev-middleware")},function(e,t){e.exports=require("webpack-hot-middleware")}]);