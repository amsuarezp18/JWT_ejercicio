const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("basic")
.readAny("productos")
 
ac.grant("supervisor")
 .extend("basic")
 .readAny("productos")
 .updateAny("productos")
 
ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
 .createAny("productos")
 
return ac;
})();