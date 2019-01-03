let oConfig = false;
let p = false;

const handler = {
  /**
   * getter for an object property
   *
   * @param  {obj} obj Data point
   * @param  {str} prop Property name
   * @return {any}
   */
  get(obj, prop) {
    //If the code is trying to do toJSON() on the object
    if(prop === "toJSON")
      return obj

    //If the property is not part of this object we throw an error
    if (obj[prop] === undefined)
      throw new ReferenceError("Property does not exist.");

    //If the property is not an object we return it as is
    if (typeof obj[prop] !== "object")
      return obj[prop]

    //This is for all props that are not strings. return the whole object
    if (typeof prop !== "string")
      return new Proxy(obj, handler);

    //If the property is an object or an array we return it with the same proxy to avoid deeper changes
    return new Proxy(obj[prop], handler);
  },
  /**
   * getter for an object property
   *
   * @return {error} will always throw an error as it is forbidden to set any values
   */
  set() {
    throw new ReferenceError('not allowed to set values');
  }
};

/**
 * load config object
 *
 * @param  {obj} p_oConfig Config object
 * @return {obj} return Proxy object for this config
 */
const load = function(p_oConfig) {
  if (!p_oConfig === "undefined" || typeof p_oConfig !== "object")
    throw new Error('need to have an object as parameter, use get() if already set before');

  oConfig = p_oConfig;
  p = new Proxy(oConfig, handler);
  return p;
}

/**
 * retrieve config object
 *
 * @return {obj} return Proxy object for current loaded config
 */
const get = function() {
  if (!p)
    throw new Error('need to load an object, use load(object) to load it first');

  return p;
}

module.exports = {
  load,
  get
}
