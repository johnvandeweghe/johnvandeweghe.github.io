// ==UserScript==
// @name        Kitten Scientists
// @description Add-on for the wonderful incremental browser game: https://kittensgame.com/web/
// @namespace   https://kitten-science.com/
// @icon        https://kitten-science.com/assets/images/organization-logo64.png
// @author      Oliver Salzburg <oliver.salzburg@gmail.com>
// @match       https://kittensgame.com/web/
// @match       https://kittensgame.com/beta/
// @match       https://kittensgame.com/alpha/
// @version     2.0.0-henry
// @homepage    https://github.com/kitten-science/kitten-scientists
// @supportURL  https://github.com/kitten-science/kitten-scientists/issues
// @updateURL   https://kitten-science.com/"fixed".js
// @grant       none
// ==/UserScript==
(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

  var _options, _upgrade, _baseBuilding, _building, _stage, _building2, _variant, _policy, _tech, _mission, _building3, _baseBuilding2, _building4, _stage2, _building5, _variant2, _resource, _building6, _building7, _variant3, _upgrade2, _building8, _variant4, _race, _race2, _require, _upgrade3, _resource2, _variant5, _resource3, _nextId;
  function isNil(subject) {
    return subject === null || subject === void 0;
  }
  function is(subject, Prototype) {
    return !isNil(subject) && subject instanceof Prototype;
  }
  class UnexpectedNilError extends Error {
    constructor(message = "unexpected nil value") {
      super(message);
    }
  }
  function mustExist(subject, errorMessage) {
    if (isNil(subject)) {
      throw new UnexpectedNilError(errorMessage);
    }
    return subject;
  }
  function coalesceArray(nilables, to) {
    const result = new Array();
    for (const nilable of nilables) {
      if (!isNil(nilable)) {
        result.push(nilable);
      } else if (!isNil(to)) {
        result.push(to);
      }
    }
    return result;
  }
  const redirectErrorsToConsole = (console2) => {
    const printErrorsToConsole = (error) => {
      console2.error(error);
    };
    return printErrorsToConsole;
  };
  var debug_1;
  var hasRequiredDebug;
  function requireDebug() {
    if (hasRequiredDebug) return debug_1;
    hasRequiredDebug = 1;
    const debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    debug_1 = debug;
    return debug_1;
  }
  var constants;
  var hasRequiredConstants;
  function requireConstants() {
    if (hasRequiredConstants) return constants;
    hasRequiredConstants = 1;
    const SEMVER_SPEC_VERSION = "2.0.0";
    const MAX_LENGTH = 256;
    const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    const MAX_SAFE_COMPONENT_LENGTH = 16;
    const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    const RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    constants = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
    return constants;
  }
  var re = { exports: {} };
  var hasRequiredRe;
  function requireRe() {
    if (hasRequiredRe) return re.exports;
    hasRequiredRe = 1;
    (function(module, exports) {
      const {
        MAX_SAFE_COMPONENT_LENGTH,
        MAX_SAFE_BUILD_LENGTH,
        MAX_LENGTH
      } = requireConstants();
      const debug = requireDebug();
      exports = module.exports = {};
      const re2 = exports.re = [];
      const safeRe = exports.safeRe = [];
      const src = exports.src = [];
      const safeSrc = exports.safeSrc = [];
      const t = exports.t = {};
      let R = 0;
      const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
      const safeRegexReplacements = [
        ["\\s", 1],
        ["\\d", MAX_LENGTH],
        [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
      ];
      const makeSafeRegex = (value) => {
        for (const [token, max] of safeRegexReplacements) {
          value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
        }
        return value;
      };
      const createToken = (name, value, isGlobal) => {
        const safe = makeSafeRegex(value);
        const index = R++;
        debug(name, index, value);
        t[name] = index;
        src[index] = value;
        safeSrc[index] = safe;
        re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
        safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
      };
      createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
      createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
      createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
      createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
      createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
      createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
      createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
      createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
      createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
      createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
      createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
      createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
      createToken("FULL", `^${src[t.FULLPLAIN]}$`);
      createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
      createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
      createToken("GTLT", "((?:<|>)?=?)");
      createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
      createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
      createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
      createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
      createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
      createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
      createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
      createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
      createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
      createToken("COERCERTL", src[t.COERCE], true);
      createToken("COERCERTLFULL", src[t.COERCEFULL], true);
      createToken("LONETILDE", "(?:~>?)");
      createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
      exports.tildeTrimReplace = "$1~";
      createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
      createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
      createToken("LONECARET", "(?:\\^)");
      createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
      exports.caretTrimReplace = "$1^";
      createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
      createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
      createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
      createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
      createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
      exports.comparatorTrimReplace = "$1$2$3";
      createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
      createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
      createToken("STAR", "(<|>)?=?\\s*\\*");
      createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
      createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
    })(re, re.exports);
    return re.exports;
  }
  var parseOptions_1;
  var hasRequiredParseOptions;
  function requireParseOptions() {
    if (hasRequiredParseOptions) return parseOptions_1;
    hasRequiredParseOptions = 1;
    const looseOption = Object.freeze({ loose: true });
    const emptyOpts = Object.freeze({});
    const parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    parseOptions_1 = parseOptions;
    return parseOptions_1;
  }
  var identifiers;
  var hasRequiredIdentifiers;
  function requireIdentifiers() {
    if (hasRequiredIdentifiers) return identifiers;
    hasRequiredIdentifiers = 1;
    const numeric = /^[0-9]+$/;
    const compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    identifiers = {
      compareIdentifiers,
      rcompareIdentifiers
    };
    return identifiers;
  }
  var semver;
  var hasRequiredSemver;
  function requireSemver() {
    if (hasRequiredSemver) return semver;
    hasRequiredSemver = 1;
    const debug = requireDebug();
    const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
    const { safeRe: re2, safeSrc: src, t } = requireRe();
    const parseOptions = requireParseOptions();
    const { compareIdentifiers } = requireIdentifiers();
    class SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re2[t.LOOSE] : re2[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const r = new RegExp(`^${this.options.loose ? src[t.PRERELEASELOOSE] : src[t.PRERELEASE]}$`);
            const match2 = `-${identifier}`.match(r);
            if (!match2 || match2[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    }
    semver = SemVer;
    return semver;
  }
  var compare_1;
  var hasRequiredCompare;
  function requireCompare() {
    if (hasRequiredCompare) return compare_1;
    hasRequiredCompare = 1;
    const SemVer = requireSemver();
    const compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    compare_1 = compare;
    return compare_1;
  }
  var gt_1;
  var hasRequiredGt;
  function requireGt() {
    if (hasRequiredGt) return gt_1;
    hasRequiredGt = 1;
    const compare = requireCompare();
    const gt = (a, b, loose) => compare(a, b, loose) > 0;
    gt_1 = gt;
    return gt_1;
  }
  requireGt();
  class AbstractError extends Error {
    constructor(code, message, status) {
      super(message);
      __publicField(this, "status");
      __publicField(this, "code");
      this.code = code;
      this.name = "AbstractError";
      this.status = status;
      if (typeof Error.captureStackTrace !== "undefined") {
        Error.captureStackTrace(this, AbstractError);
      }
    }
    static isAbstractError(error, allowForeignModule = true) {
      if (error instanceof AbstractError) {
        return true;
      }
      if (allowForeignModule) {
        const errorRecord = error;
        if (Object(error) === error && "code" in errorRecord && typeof errorRecord.code === "string") {
          const codedError = error;
          if (codedError.code.match(/^ERR_OS_/)) {
            return true;
          }
        }
      }
      return false;
    }
  }
  class InternalError extends AbstractError {
    constructor(message, status = 500) {
      super("ERR_OS_INTERNAL", message, status);
      this.name = "InternalError";
      if (typeof Error.captureStackTrace !== "undefined") {
        Error.captureStackTrace(this, InternalError);
      }
    }
    static fromError(error) {
      const internalError = new InternalError(error.message);
      Object.assign(internalError, error, new InternalError(error.message));
      internalError.stack = error.stack;
      return internalError;
    }
  }
  class UnknownError extends AbstractError {
    constructor(message, status = 500) {
      super("ERR_OS_UNKNOWN", message, status);
      this.name = "UnknownError";
      if (typeof Error.captureStackTrace !== "undefined") {
        Error.captureStackTrace(this, UnknownError);
      }
    }
  }
  const isError = (subject) => {
    return subject instanceof Error || Object.prototype.toString.call(subject) === "[object Error]";
  };
  const unknownToError = (subject) => {
    if (AbstractError.isAbstractError(subject)) {
      return subject;
    }
    if (isError(subject)) {
      return InternalError.fromError(subject);
    }
    return new UnknownError(String(subject));
  };
  const measure = (context) => {
    const entry = performance.now();
    return [context(), performance.now() - entry];
  };
  const measureAsync = async (context) => {
    const entry = performance.now();
    return [await context(), performance.now() - entry];
  };
  class TabManager {
    constructor(host, name) {
      __publicField(this, "_host");
      __publicField(this, "tab");
      this._host = host;
      const tab = this._host.game.tabs.find((subject) => subject.tabId === name);
      if (isNil(tab)) {
        throw new Error(`Unable to find tab ${name}`);
      }
      this.tab = tab;
      this.render();
    }
    render() {
      if (this._host.game.ui.activeTabId !== this.tab.tabId) {
        this.tab.render();
      }
      return this;
    }
  }
  const difference = (a, b) => {
    return a.filter((x) => !b.includes(x));
  };
  function cdebug(...args) {
    console.debug("👩‍🔬", ...args);
  }
  function cinfo(...args) {
    console.info("👩‍🔬", ...args);
  }
  function cwarn(...args) {
    console.warn("👩‍🔬", ...args);
  }
  function cerror(...args) {
    console.error("👩‍🔬", ...args);
  }
  function objectEntries(subject) {
    return Object.entries(subject);
  }
  function consumeEntriesPedantic(subject, source, consumer) {
    if (isNil(source)) {
      cwarn("No source data was provided.");
      return subject;
    }
    for (const [key, value] of objectEntries(subject)) {
      if (!(key in source)) {
        cinfo(`Entry '${key}' is missing in source. Using default value.`);
      }
      consumer(value, source[key]);
    }
    for (const [key] of objectEntries(source)) {
      if (!(key in subject)) {
        cwarn(
          `Entry '${key}' was found in source, but it is not expected by the subject schema. This entry will be ignored.`
        );
      }
    }
    return subject;
  }
  class Unique {
    constructor(elem) {
      __publicField(this, "_elem");
      this._elem = structuredClone(elem);
    }
    unwrap() {
      return structuredClone(this._elem);
    }
    replace(elem) {
      this._elem = structuredClone(elem);
    }
    toJSON() {
      return this.unwrap();
    }
  }
  function ucfirst(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  function roundToTwo(input) {
    return Math.round(input * 100) / 100;
  }
  function negativeOneToInfinity(value) {
    return value === -1 ? Number.POSITIVE_INFINITY : value;
  }
  class BulkPurchaseHelper {
    constructor(host, workshopManager) {
      __publicField(this, "_host");
      __publicField(this, "_workshopManager");
      this._host = host;
      this._workshopManager = workshopManager;
    }
    bulk(builds, metaData, sectionTrigger, sourceTab) {
      const buildsPerformed = [];
      const potentialBuilds = [];
      let counter = 0;
      for (const [name, build] of objectEntries(builds)) {
        const trigger = Engine.evaluateSubSectionTrigger(sectionTrigger, build.trigger);
        const buildMetaData = mustExist(metaData[name]);
        if (!build.enabled || trigger < 0) {
          continue;
        }
        if ("tHidden" in buildMetaData && buildMetaData.tHidden === true) {
          continue;
        }
        if ("rHidden" in buildMetaData && buildMetaData.rHidden === true) {
          continue;
        }
        if (buildMetaData.unlocked === false) {
          continue;
        }
        if (!isNil(build.max) && -1 < build.max && build.max <= buildMetaData.val) {
          continue;
        }
        if (name === "cryochambers" && (mustExist(this._host.game.time.getVSU("usedCryochambers")).val > 0 || this._host.game.bld.getBuildingExt("chronosphere").meta.val <= buildMetaData.val)) {
          continue;
        }
        if (name === "ressourceRetrieval" && buildMetaData.val >= 100) {
          continue;
        }
        const prices = mustExist(
          this._isStagedBuild(buildMetaData) ? buildMetaData.stages[buildMetaData.stage].prices : buildMetaData.prices
        );
        const priceRatio = this.getPriceRatio(buildMetaData, sourceTab);
        if (!this.singleBuildPossible(buildMetaData, prices, priceRatio, sourceTab)) {
          continue;
        }
        const requiredMaterials = prices.map((price) => this._workshopManager.getResource(price.name)).filter((material) => 0 < material.maxValue);
        const allMaterialsAboveTrigger = requiredMaterials.filter((material) => material.value / material.maxValue < trigger).length === 0;
        if (allMaterialsAboveTrigger) {
          if (this._isStagedBuild(buildMetaData) && typeof build.stage !== "undefined" && build.stage !== buildMetaData.stage) {
            continue;
          }
          const itemPrices = [];
          const pricesDiscount = this._host.game.getLimitedDR(
            this._host.game.getEffect(`${name}CostReduction`),
            1
          );
          const priceModifier = 1 - pricesDiscount;
          for (const price of prices) {
            const resPriceDiscount = this._host.game.getLimitedDR(
              this._host.game.getEffect(`${price.name}CostReduction`),
              1
            );
            const resPriceModifier = 1 - resPriceDiscount;
            itemPrices.push({
              val: price.val * priceModifier * resPriceModifier,
              name: price.name
            });
          }
          buildsPerformed.push({
            count: 0,
            id: name,
            label: build.label,
            name: build.baseBuilding ?? build.building,
            stage: build.stage,
            variant: build.variant
          });
          potentialBuilds.push({
            id: name,
            name: build.baseBuilding ?? build.building,
            count: 0,
            spot: counter,
            prices: itemPrices,
            priceRatio,
            source: sourceTab,
            limit: build.max || 0,
            val: buildMetaData.val
          });
          counter++;
        }
      }
      if (potentialBuilds.length === 0) {
        return [];
      }
      const currentResourcePool = {};
      for (const res of this._host.game.resPool.resources) {
        currentResourcePool[res.name] = this._workshopManager.getValueAvailable(res.name);
      }
      let iterations = 0;
      const buildsCommitted = new Array();
      while (iterations < 1e5) {
        const candidatesThisIteration = difference(potentialBuilds, buildsCommitted);
        let buildThisIteration = 0;
        const committedThisIteration = [];
        let tempPool = { ...currentResourcePool };
        for (const committedBuild of buildsCommitted) {
          const possibleInstances = this._precalculateBuilds(
            {
              ...committedBuild,
              limit: committedBuild.val + committedBuild.count
            },
            metaData,
            tempPool
          );
          tempPool = possibleInstances.remainingResources;
        }
        for (const potentialBuild of candidatesThisIteration) {
          const targetInstanceCount = potentialBuild.count + 1;
          const possibleInstances = this._precalculateBuilds(
            {
              ...potentialBuild,
              limit: Math.min(
                negativeOneToInfinity(potentialBuild.limit),
                potentialBuild.val + targetInstanceCount
              )
            },
            metaData,
            tempPool
          );
          if (possibleInstances.count < targetInstanceCount) {
            committedThisIteration.push(potentialBuild);
            continue;
          }
          potentialBuild.count = targetInstanceCount;
          tempPool = possibleInstances.remainingResources;
          buildThisIteration++;
        }
        buildsCommitted.push(...committedThisIteration);
        iterations++;
        if (buildThisIteration === 0) {
          break;
        }
      }
      cdebug(`Took '${iterations}' iterations to evaluate bulk build request.`);
      for (const potentialBuild of potentialBuilds) {
        const performedBuild = mustExist(
          buildsPerformed.find((build) => build.id === potentialBuild.id)
        );
        performedBuild.count = potentialBuild.count;
      }
      return buildsPerformed;
    }
    _precalculateBuilds(buildCacheItem, metaData, resources = {}) {
      let buildsPossible = 0;
      const tempPool = Object.assign({}, resources);
      const buildMetaData = mustExist(metaData[buildCacheItem.id]);
      const prices = buildCacheItem.prices;
      const priceRatio = buildCacheItem.priceRatio;
      const source = buildCacheItem.source;
      let maxItemsBuilt = false;
      if (prices.length === 0) {
        return { count: 0, remainingResources: tempPool };
      }
      while (!maxItemsBuilt) {
        for (let priceIndex = 0; priceIndex < prices.length; priceIndex++) {
          let spaceOil = false;
          let cryoKarma = false;
          let oilPrice = Number.POSITIVE_INFINITY;
          let karmaPrice = Number.POSITIVE_INFINITY;
          if (source === "Space" && prices[priceIndex].name === "oil") {
            spaceOil = true;
            const oilReductionRatio = this._host.game.getEffect("oilReductionRatio");
            oilPrice = prices[priceIndex].val * (1 - this._host.game.getLimitedDR(oilReductionRatio, 0.75));
          } else if (buildCacheItem.id === "cryochambers" && prices[priceIndex].name === "karma") {
            cryoKarma = true;
            const burnedParagonRatio = this._host.game.prestige.getBurnedParagonRatio();
            karmaPrice = prices[priceIndex].val * (1 - this._host.game.getLimitedDR(0.01 * burnedParagonRatio, 1));
          }
          if (spaceOil) {
            maxItemsBuilt = tempPool.oil < oilPrice * 1.05 ** (buildsPossible + buildMetaData.val);
          } else if (cryoKarma) {
            maxItemsBuilt = tempPool.karma < karmaPrice * priceRatio ** (buildsPossible + buildMetaData.val);
          } else {
            maxItemsBuilt = tempPool[prices[priceIndex].name] < prices[priceIndex].val * priceRatio ** (buildsPossible + buildMetaData.val);
          }
          if (maxItemsBuilt || "noStackable" in buildMetaData && buildMetaData.noStackable && buildsPossible + buildMetaData.val >= 1 || buildCacheItem.id === "ressourceRetrieval" && buildsPossible + buildMetaData.val >= 100 || buildCacheItem.id === "cryochambers" && this._host.game.bld.getBuildingExt("chronosphere").meta.val <= buildsPossible + buildMetaData.val) {
            for (let priceIndex2 = 0; priceIndex2 < priceIndex; priceIndex2++) {
              if (source === "Space" && prices[priceIndex2].name === "oil") {
                const oilReductionRatio = this._host.game.getEffect("oilReductionRatio");
                const oilPriceRefund = prices[priceIndex2].val * (1 - this._host.game.getLimitedDR(oilReductionRatio, 0.75));
                tempPool.oil += oilPriceRefund * 1.05 ** (buildsPossible + buildMetaData.val);
              } else if (buildCacheItem.id === "cryochambers" && prices[priceIndex2].name === "karma") {
                const burnedParagonRatio = this._host.game.prestige.getBurnedParagonRatio();
                const karmaPriceRefund = prices[priceIndex2].val * (1 - this._host.game.getLimitedDR(0.01 * burnedParagonRatio, 1));
                tempPool.karma += karmaPriceRefund * priceRatio ** (buildsPossible + buildMetaData.val);
              } else {
                const refundVal = prices[priceIndex2].val * priceRatio ** (buildsPossible + buildMetaData.val);
                tempPool[prices[priceIndex2].name] += prices[priceIndex2].name === "void" ? Math.ceil(refundVal) : refundVal;
              }
            }
            if (buildCacheItem.limit && buildCacheItem.limit !== -1) {
              buildsPossible = Math.max(
                0,
                Math.min(buildsPossible, buildCacheItem.limit - buildCacheItem.val)
              );
            }
            return { count: buildsPossible, remainingResources: tempPool };
          }
          if (spaceOil) {
            tempPool.oil -= oilPrice * 1.05 ** (buildsPossible + buildMetaData.val);
          } else if (cryoKarma) {
            tempPool.karma -= karmaPrice * priceRatio ** (buildsPossible + buildMetaData.val);
          } else {
            const newPriceValue = prices[priceIndex].val * priceRatio ** (buildsPossible + buildMetaData.val);
            tempPool[prices[priceIndex].name] -= prices[priceIndex].name === "void" ? Math.ceil(newPriceValue) : newPriceValue;
          }
        }
        ++buildsPossible;
      }
      return { count: buildsPossible, remainingResources: tempPool };
    }
    construct(model, button2, amount) {
      const meta = model.metadata;
      let counter = 0;
      let amountCalculated = amount;
      const vsMeta = meta;
      if (!isNil(vsMeta.limitBuild) && vsMeta.limitBuild - vsMeta.val < amountCalculated) {
        amountCalculated = vsMeta.limitBuild - vsMeta.val;
      }
      if (model.enabled && button2.controller.hasResources(model) || this._host.game.devMode) {
        while (button2.controller.hasResources(model) && amountCalculated > 0) {
          model.prices = button2.controller.getPrices(model);
          button2.controller.payPrice(model);
          button2.controller.incrementValue(model);
          counter++;
          amountCalculated--;
        }
        if (vsMeta.breakIronWill) {
          this._host.game.ironWill = false;
        }
        if (meta.unlocks) {
          this._host.game.unlock(meta.unlocks);
        }
        if (meta.upgrades) {
          this._host.game.upgrade(meta.upgrades);
        }
      }
      return counter;
    }
    _isStagedBuild(data) {
      return "stage" in data && "stages" in data && !isNil(data.stage) && !isNil(data.stages);
    }
    getPriceRatio(data, source) {
      const ratio = this._isStagedBuild(data) ? data.priceRatio || data.stages[data.stage].priceRatio : data.priceRatio ?? 0;
      let ratioDiff = 0;
      if (source && source === "Bonfire") {
        ratioDiff = this._host.game.getEffect(`${data.name}PriceRatio`) + this._host.game.getEffect("priceRatio") + this._host.game.getEffect("mapPriceReduction");
        ratioDiff = this._host.game.getLimitedDR(ratioDiff, ratio - 1);
      }
      return ratio + ratioDiff;
    }
    singleBuildPossible(build, prices, priceRatio, source) {
      const pricesDiscount = this._host.game.getLimitedDR(
        this._host.game.getEffect(`${build.name}CostReduction`),
        1
      );
      const priceModifier = 1 - pricesDiscount;
      for (const price of prices) {
        const resourcePriceDiscount = this._host.game.getLimitedDR(
          this._host.game.getEffect(`${price.name}CostReduction`),
          1
        );
        const resourcePriceModifier = 1 - resourcePriceDiscount;
        const finalResourcePrice = price.val * priceModifier * resourcePriceModifier;
        if (source && source === "Space" && price.name === "oil") {
          const oilModifier = this._host.game.getLimitedDR(
            this._host.game.getEffect("oilReductionRatio"),
            0.75
          );
          const oilPrice = finalResourcePrice * (1 - oilModifier);
          if (this._workshopManager.getValueAvailable("oil") < oilPrice * 1.05 ** build.val) {
            return false;
          }
        } else if (build.name === "cryochambers" && price.name === "karma") {
          const karmaModifier = this._host.game.getLimitedDR(
            0.01 * this._host.game.prestige.getBurnedParagonRatio(),
            1
          );
          const karmaPrice = finalResourcePrice * (1 - karmaModifier);
          if (this._workshopManager.getValueAvailable("karma") < karmaPrice * priceRatio ** build.val) {
            return false;
          }
        } else {
          if (this._workshopManager.getValueAvailable(price.name) < finalResourcePrice * priceRatio ** build.val) {
            return false;
          }
        }
      }
      return true;
    }
  }
  const Buildings = [
    "academy",
    "accelerator",
    "aiCore",
    "amphitheatre",
    "aqueduct",
    "barn",
    "biolab",
    "brewery",
    "calciner",
    "chapel",
    "chronosphere",
    "factory",
    "field",
    "harbor",
    "hut",
    "library",
    "logHouse",
    "lumberMill",
    "magneto",
    "mansion",
    "mine",
    "mint",
    "observatory",
    "oilWell",
    "pasture",
    "quarry",
    "reactor",
    "smelter",
    "steamworks",
    "temple",
    "tradepost",
    "unicornPasture",
    "warehouse",
    "workshop",
    "zebraForge",
    "zebraOutpost",
    "zebraWorkshop",
    "ziggurat"
  ];
  const StagedBuildings = [
    "broadcasttower",
    "dataCenter",
    "hydroplant",
    "solarfarm",
    "spaceport"
  ];
  var UnicornItemVariant = ((UnicornItemVariant2) => {
    UnicornItemVariant2["Cryptotheology"] = "c";
    UnicornItemVariant2["OrderOfTheSun"] = "s";
    UnicornItemVariant2["Ziggurat"] = "z";
    UnicornItemVariant2["UnicornPasture"] = "zp";
    return UnicornItemVariant2;
  })(UnicornItemVariant || {});
  const ReligionUpgrades = [
    "apocripha",
    "basilica",
    "goldenSpire",
    "scholasticism",
    "solarRevolution",
    "solarchant",
    "stainedGlass",
    "sunAltar",
    "templars",
    "transcendence"
  ];
  const TranscendenceUpgrades = [
    "blackCore",
    "blackLibrary",
    "blackNexus",
    "blackObelisk",
    "blackRadiance",
    "blazar",
    "darkNova",
    "holyGenocide",
    "mausoleum",
    "singularity"
  ];
  const ZiggurathUpgrades = [
    "blackPyramid",
    "ivoryCitadel",
    "ivoryTower",
    "marker",
    "skyPalace",
    "sunspire",
    "unicornGraveyard",
    "unicornNecropolis",
    "unicornTomb",
    "unicornUtopia"
  ];
  const Policies = [
    "authocracy",
    "bigStickPolicy",
    "carnivale",
    "cityOnAHill",
    "clearCutting",
    "communism",
    "conservation",
    "cryochamberExtraction",
    "culturalExchange",
    "diplomacy",
    "dragonRelationsAstrologers",
    "dragonRelationsDynamicists",
    "dragonRelationsPhysicists",
    "environmentalism",
    "epicurianism",
    "expansionism",
    "extravagance",
    "fascism",
    "frugality",
    "fullIndustrialization",
    "griffinRelationsMachinists",
    "griffinRelationsMetallurgists",
    "griffinRelationsScouts",
    "isolationism",
    "knowledgeSharing",
    "liberalism",
    "liberty",
    "lizardRelationsDiplomats",
    "lizardRelationsEcologists",
    "lizardRelationsPriests",
    "militarizeSpace",
    "monarchy",
    "mysticism",
    "nagaRelationsArchitects",
    "nagaRelationsCultists",
    "nagaRelationsMasons",
    "necrocracy",
    "openWoodlands",
    "outerSpaceTreaty",
    "radicalXenophobia",
    "rationality",
    "rationing",
    "republic",
    "scientificCommunism",
    "sharkRelationsBotanists",
    "sharkRelationsMerchants",
    "sharkRelationsScribes",
    "siphoning",
    "socialism",
    "spiderRelationsChemists",
    "spiderRelationsGeologists",
    "spiderRelationsPaleontologists",
    "stoicism",
    "stripMining",
    "sustainability",
    "technocracy",
    "terraformingInsight",
    "theocracy",
    "tradition",
    "transkittenism",
    "zebraRelationsAppeasement",
    "zebraRelationsBellicosity"
  ];
  const TechnologiesIgnored = ["brewery"];
  const Technologies = [
    "acoustics",
    "advExogeology",
    "agriculture",
    "ai",
    "animal",
    "antimatter",
    "archeology",
    "archery",
    "architecture",
    "artificialGravity",
    "astronomy",
    "biochemistry",
    "biology",
    "blackchain",
    "calendar",
    "chemistry",
    "chronophysics",
    "civil",
    "combustion",
    "construction",
    "cryptotheology",
    "currency",
    "dimensionalPhysics",
    "drama",
    "ecology",
    "electricity",
    "electronics",
    "engineering",
    "exogeology",
    "exogeophysics",
    "genetics",
    "hydroponics",
    "industrialization",
    "machinery",
    "math",
    "mechanization",
    "metal",
    "metalurgy",
    "metaphysics",
    "mining",
    "nanotechnology",
    "navigation",
    "nuclearFission",
    "oilProcessing",
    "orbitalEngineering",
    "paradoxalKnowledge",
    "particlePhysics",
    "philosophy",
    "physics",
    "quantumCryptography",
    "robotics",
    "rocketry",
    "sattelites",
    "steel",
    "superconductors",
    "tachyonTheory",
    "terraformation",
    "theology",
    "thorium",
    "voidSpace",
    "writing"
  ];
  const Missions = [
    "centaurusSystemMission",
    "charonMission",
    "duneMission",
    "furthestRingMission",
    "heliosMission",
    "kairoMission",
    "moonMission",
    "orbitalLaunch",
    "piscineMission",
    "rorschachMission",
    "terminusMission",
    "umbraMission",
    "yarnMission"
  ];
  const SpaceBuildings = [
    "containmentChamber",
    "cryostation",
    "entangler",
    "heatsink",
    "hrHarvester",
    "hydrofracturer",
    "hydroponics",
    "moltenCore",
    "moonBase",
    "moonOutpost",
    "orbitalArray",
    "planetCracker",
    "researchVessel",
    "sattelite",
    "spaceBeacon",
    "spaceElevator",
    "spaceStation",
    "spiceRefinery",
    "sunforge",
    "sunlifter",
    "tectonic",
    "terraformingStation"
  ];
  var TimeItemVariant = ((TimeItemVariant2) => {
    TimeItemVariant2["Chronoforge"] = "chrono";
    TimeItemVariant2["VoidSpace"] = "void";
    return TimeItemVariant2;
  })(TimeItemVariant || {});
  const ChronoForgeUpgrades = [
    "blastFurnace",
    "ressourceRetrieval",
    "temporalAccelerator",
    "temporalBattery",
    "temporalImpedance",
    "temporalPress",
    "timeBoiler"
  ];
  const VoidSpaceUpgrades = [
    "cryochambers",
    "usedCryochambers",
    "voidHoover",
    "voidRift",
    "chronocontrol",
    "voidResonator"
  ];
  const Races = [
    "dragons",
    "griffins",
    "nagas",
    "leviathans",
    "lizards",
    "sharks",
    "spiders",
    "zebras"
  ];
  const Upgrades = [
    "advancedAutomation",
    "advancedRefinement",
    "aiBases",
    "aiEngineers",
    "alloyArmor",
    "alloyAxe",
    "alloyBarns",
    "alloySaw",
    "alloyWarehouses",
    "amBases",
    "amDrive",
    "amFission",
    "amReactors",
    "amReactorsMK2",
    "assistance",
    "astrolabe",
    "astrophysicists",
    "augumentation",
    "automatedPlants",
    "barges",
    "biofuel",
    "bolas",
    "cadSystems",
    "caravanserai",
    "carbonSequestration",
    "cargoShips",
    "celestialMechanics",
    "chronoEngineers",
    "chronoforge",
    "coalFurnace",
    "coldFusion",
    "combustionEngine",
    "compositeBow",
    "concreteBarns",
    "concreteHuts",
    "concreteWarehouses",
    "crossbow",
    "cryocomputing",
    "darkEnergy",
    "deepMining",
    "distorsion",
    "electrolyticSmelting",
    "eludiumCracker",
    "eludiumHuts",
    "eludiumReflectors",
    "energyRifts",
    "enrichedThorium",
    "enrichedUranium",
    "factoryAutomation",
    "factoryLogistics",
    "factoryOptimization",
    "factoryProcessing",
    "factoryRobotics",
    "fluidizedReactors",
    "fluxCondensator",
    "fuelInjectors",
    "geodesy",
    "gmo",
    "goldOre",
    "hubbleTelescope",
    "huntingArmor",
    "hydroPlantTurbines",
    "internet",
    "invisibleBlackHand",
    "ironAxes",
    "ironHoes",
    "ironwood",
    "lhc",
    "logistics",
    "longRangeSpaceships",
    "machineLearning",
    "mineralAxes",
    "mineralHoes",
    "miningDrill",
    "mWReactor",
    "nanosuits",
    "neuralNetworks",
    "nuclearPlants",
    "nuclearSmelters",
    "offsetPress",
    "oilDistillation",
    "oilRefinery",
    "orbitalGeodesy",
    "oxidation",
    "photolithography",
    "photovoltaic",
    "pneumaticPress",
    "printingPress",
    "pumpjack",
    "pyrolysis",
    "qdot",
    "railgun",
    "reactorVessel",
    "refrigeration",
    "register",
    "reinforcedBarns",
    "reinforcedSaw",
    "reinforcedWarehouses",
    "relicStation",
    "rotaryKiln",
    "satelliteRadio",
    "satnav",
    "seti",
    "silos",
    "solarSatellites",
    "spaceEngineers",
    "spaceManufacturing",
    "spiceNavigation",
    "starlink",
    "stasisChambers",
    "steelArmor",
    "steelAxe",
    "steelPlants",
    "steelSaw",
    "stoneBarns",
    "storageBunkers",
    "strenghtenBuild",
    "tachyonAccelerators",
    "thinFilm",
    "thoriumEngine",
    "thoriumReactors",
    "titaniumAxe",
    "titaniumBarns",
    "titaniumMirrors",
    "titaniumSaw",
    "titaniumWarehouses",
    "turnSmoothly",
    "unicornSelection",
    "unobtainiumAxe",
    "unobtainiumDrill",
    "unobtainiumHuts",
    "unobtainiumReflectors",
    "unobtainiumSaw",
    "uplink",
    "voidAspiration",
    "voidEnergy",
    "voidReactors"
  ];
  const Seasons = ["autumn", "spring", "summer", "winter"];
  const Cycles = [
    "charon",
    "umbra",
    "yarn",
    "helios",
    "cath",
    "redmoon",
    "dune",
    "piscine",
    "terminus",
    "kairo"
  ];
  const ResourcesCraftable = [
    "alloy",
    "beam",
    "bloodstone",
    "blueprint",
    "compedium",
    "concrate",
    "eludium",
    "gear",
    "kerosene",
    "manuscript",
    "megalith",
    "parchment",
    "plate",
    "scaffold",
    "ship",
    "slab",
    "steel",
    "tanker",
    "tMythril",
    "thorium",
    "wood"
  ];
  const Resources = [
    ...ResourcesCraftable,
    "alicorn",
    "antimatter",
    "blackcoin",
    "burnedParagon",
    "catnip",
    "coal",
    "culture",
    "elderBox",
    "faith",
    "furs",
    "gflops",
    "gold",
    "hashrates",
    "iron",
    "ivory",
    "karma",
    "kittens",
    "manpower",
    "minerals",
    "necrocorn",
    "oil",
    "paragon",
    "relic",
    "science",
    "sorrow",
    "spice",
    "starchart",
    "tears",
    "temporalFlux",
    "timeCrystal",
    "titanium",
    "unicorns",
    "unobtainium",
    "uranium",
    "void",
    "wrappingPaper",
    "zebras"
  ];
  const Jobs = [
    "any",
    "engineer",
    "farmer",
    "geologist",
    "hunter",
    "miner",
    "priest",
    "scholar",
    "woodcutter"
  ];
  const Traits = [
    "chemist",
    "engineer",
    "manager",
    "metallurgist",
    "merchant",
    "none",
    "scientist",
    "wise"
  ];
  class Setting {
    constructor(enabled = false) {
      __publicField(this, "enabled");
      this.enabled = enabled;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      this.enabled = setting2.enabled ?? this.enabled;
    }
    serialize() {
      return this;
    }
  }
  class SettingLimited extends Setting {
    constructor(enabled = false, limited = false) {
      super(enabled);
      __publicField(this, "limited");
      this.limited = limited;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.limited = setting2.limited ?? this.limited;
    }
  }
  class SettingTrigger extends Setting {
    constructor(enabled = false, trigger = -1) {
      super(enabled);
      __publicField(this, "trigger");
      this.trigger = trigger;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.trigger = setting2.trigger ?? this.trigger;
    }
  }
  class SettingThreshold extends Setting {
    constructor(enabled = false, threshold = 1) {
      super(enabled);
      __publicField(this, "trigger");
      this.trigger = threshold;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.trigger = setting2.trigger ?? this.trigger;
    }
  }
  class SettingMax extends Setting {
    constructor(enabled = false, max = 0) {
      super(enabled);
      __publicField(this, "max");
      this.max = max;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.max = setting2.max ?? this.max;
    }
  }
  class SettingLimitedMax extends SettingLimited {
    constructor(enabled = false, limited = false, max = 0) {
      super(enabled, limited);
      __publicField(this, "max");
      this.max = max;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.max = setting2.max ?? this.max;
    }
  }
  class SettingLimitedMaxTrigger extends SettingLimitedMax {
    constructor(enabled = false, limited = false, max = 0, trigger = -1) {
      super(enabled, limited, max);
      __publicField(this, "trigger");
      this.trigger = trigger;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.trigger = setting2.trigger ?? this.trigger;
    }
  }
  class SettingLimitedTrigger extends SettingLimited {
    constructor(enabled = false, limited = false, trigger = -1) {
      super(enabled, limited);
      __publicField(this, "trigger");
      this.trigger = trigger;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.trigger = setting2.trigger ?? this.trigger;
    }
  }
  class SettingTriggerMax extends SettingTrigger {
    constructor(enabled = false, trigger = 1, max = 0) {
      super(enabled, trigger);
      __publicField(this, "max");
      this.max = max;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.max = setting2.max ?? this.max;
    }
  }
  class SettingThresholdMax extends SettingThreshold {
    constructor(enabled = false, trigger = 1, max = 0) {
      super(enabled, trigger);
      __publicField(this, "max");
      this.max = max;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.max = setting2.max ?? this.max;
    }
  }
  class SettingOptions {
    constructor(selected, options = new Array()) {
      __privateAdd(this, _options);
      __publicField(this, "selected");
      if (isNil(options.find((option) => option.value === selected))) {
        throw new Error("Provided selected value is not in provided options.");
      }
      this.selected = selected;
      __privateSet(this, _options, options);
    }
    get options() {
      return __privateGet(this, _options);
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      this.selected = setting2.selected ?? this.selected;
    }
  }
  _options = new WeakMap();
  class SettingBuySellThreshold extends SettingThreshold {
    constructor(enabled = false, buy = 950, sell = 1e3, trigger = 1) {
      super(enabled, trigger);
      __publicField(this, "buy");
      __publicField(this, "sell");
      this.buy = buy;
      this.sell = sell;
    }
    load(setting2) {
      if (isNil(setting2)) {
        return;
      }
      super.load(setting2);
      this.buy = setting2.buy ?? this.buy;
      this.sell = setting2.sell ?? this.sell;
    }
  }
  class BuildingUpgradeSetting extends Setting {
    constructor(upgrade, enabled = false) {
      super(enabled);
      __privateAdd(this, _upgrade);
      __privateSet(this, _upgrade, upgrade);
    }
    get upgrade() {
      return __privateGet(this, _upgrade);
    }
  }
  _upgrade = new WeakMap();
  class BuildingUpgradeSettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = this.initBuildings();
    }
    initBuildings() {
      const items = {};
      for (const item of StagedBuildings) {
        items[item] = new BuildingUpgradeSetting(item);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
      });
    }
  }
  class BonfireBuildingSetting extends SettingTriggerMax {
    constructor(building, enabled = false, trigger = -1, max = 0, baseStage) {
      super(enabled, trigger, max);
      __privateAdd(this, _baseBuilding);
      __privateAdd(this, _building);
      __privateAdd(this, _stage, 0);
      __privateSet(this, _building, building);
      if (baseStage) {
        __privateSet(this, _stage, 1);
        __privateSet(this, _baseBuilding, baseStage);
      }
    }
    get baseBuilding() {
      return __privateGet(this, _baseBuilding);
    }
    get building() {
      return __privateGet(this, _building);
    }
    get stage() {
      return __privateGet(this, _stage);
    }
  }
  _baseBuilding = new WeakMap();
  _building = new WeakMap();
  _stage = new WeakMap();
  class BonfireSettings extends SettingTrigger {
    constructor(enabled = false, trigger = -1, gatherCatnip = new Setting(), turnOnSteamworks = new Setting(), turnOnMagnetos = new Setting(), turnOnReactors = new Setting(), upgradeBuildings = new BuildingUpgradeSettings()) {
      super(enabled, trigger);
      __publicField(this, "buildings");
      __publicField(this, "gatherCatnip");
      __publicField(this, "turnOnMagnetos");
      __publicField(this, "turnOnSteamworks");
      __publicField(this, "turnOnReactors");
      __publicField(this, "upgradeBuildings");
      this.buildings = this.initBuildings();
      this.gatherCatnip = gatherCatnip;
      this.turnOnSteamworks = turnOnSteamworks;
      this.turnOnMagnetos = turnOnMagnetos;
      this.turnOnReactors = turnOnReactors;
      this.upgradeBuildings = upgradeBuildings;
    }
    initBuildings() {
      const baseStage = {
        broadcasttower: "amphitheatre",
        dataCenter: "library",
        hydroplant: "aqueduct",
        solarfarm: "pasture",
        spaceport: "warehouse"
      };
      const items = {};
      for (const item of Buildings) {
        if (item === "unicornPasture") {
          continue;
        }
        items[item] = new BonfireBuildingSetting(item);
      }
      for (const item of StagedBuildings) {
        items[item] = new BonfireBuildingSetting(item, false, -1, 0, baseStage[item]);
      }
      return items;
    }
    load(settings) {
      var _a, _b, _c, _d;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.max = (item == null ? void 0 : item.max) ?? building.max;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
      this.gatherCatnip.enabled = ((_a = settings.gatherCatnip) == null ? void 0 : _a.enabled) ?? this.gatherCatnip.enabled;
      this.turnOnSteamworks.enabled = ((_b = settings.turnOnSteamworks) == null ? void 0 : _b.enabled) ?? this.turnOnSteamworks.enabled;
      this.turnOnMagnetos.enabled = ((_c = settings.turnOnMagnetos) == null ? void 0 : _c.enabled) ?? this.turnOnMagnetos.enabled;
      this.turnOnReactors.enabled = ((_d = settings.turnOnReactors) == null ? void 0 : _d.enabled) ?? this.turnOnReactors.enabled;
      this.upgradeBuildings.load(settings.upgradeBuildings);
    }
  }
  class BonfireManager {
    constructor(host, workshopManager, settings = new BonfireSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bulkManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Bonfire");
      this._workshopManager = workshopManager;
      this._bulkManager = new BulkPurchaseHelper(this._host, this._workshopManager);
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.manager.render();
      this.autoBuild(context);
      this.autoMisc(context);
    }
    autoBuild(context, builds = this.settings.buildings) {
      const bulkManager = this._bulkManager;
      const metaData = {};
      for (const build of Object.values(builds)) {
        metaData[build.building] = this.getBuild(
          build.baseBuilding ?? build.building
        ).meta;
      }
      const sectionTrigger = this.settings.trigger;
      const buildList = bulkManager.bulk(builds, metaData, sectionTrigger, "Bonfire");
      for (const build of buildList.filter((item) => 0 < item.count)) {
        this.build(build.name || build.id, build.stage, build.count);
        context.requestGameUiRefresh = true;
      }
    }
    autoUpgrade(context) {
      var _a, _b;
      const pastures = this._host.game.bld.getBuildingExt("pasture").meta.stage === 0 ? this._host.game.bld.getBuildingExt("pasture").meta.val : 0;
      const aqueducts = this._host.game.bld.getBuildingExt("aqueduct").meta.stage === 0 ? this._host.game.bld.getBuildingExt("aqueduct").meta.val : 0;
      const pastureMeta = this._host.game.bld.getBuildingExt("pasture").meta;
      if (this.settings.upgradeBuildings.buildings.solarfarm.enabled && pastureMeta.unlocked && pastureMeta.stage === 0 && mustExist(pastureMeta.stages)[1].stageUnlocked) {
        if (this._workshopManager.getPotentialCatnip(true, 0, aqueducts) > 0) {
          const prices = mustExist(pastureMeta.stages)[1].prices;
          if (this._bulkManager.singleBuildPossible(pastureMeta, prices, 1)) {
            const button2 = this.getBuildButton("pasture", 0);
            if (!isNil(button2 == null ? void 0 : button2.model)) {
              button2.controller.sellInternal(button2.model, 0);
              pastureMeta.on = 0;
              pastureMeta.val = 0;
              pastureMeta.stage = 1;
              this._host.engine.iactivity("upgrade.building.pasture", [], "ks-upgrade");
              this._host.game.ui.render();
              this.build("pasture", 1, 1);
              context.requestGameUiRefresh = true;
            }
          }
        }
      }
      const aqueductMeta = this._host.game.bld.getBuildingExt("aqueduct").meta;
      if (this.settings.upgradeBuildings.buildings.hydroplant.enabled && aqueductMeta.unlocked && aqueductMeta.stage === 0 && mustExist(aqueductMeta.stages)[1].stageUnlocked) {
        if (this._workshopManager.getPotentialCatnip(true, pastures, 0) > 0) {
          const prices = mustExist(aqueductMeta.stages)[1].prices;
          if (this._bulkManager.singleBuildPossible(aqueductMeta, prices, 1)) {
            const button2 = this.getBuildButton("aqueduct", 0);
            if (!isNil(button2 == null ? void 0 : button2.model)) {
              button2.controller.sellInternal(button2.model, 0);
              aqueductMeta.on = 0;
              aqueductMeta.val = 0;
              aqueductMeta.stage = 1;
              (_a = aqueductMeta.calculateEffects) == null ? void 0 : _a.call(aqueductMeta, aqueductMeta, this._host.game);
              this._host.engine.iactivity("upgrade.building.aqueduct", [], "ks-upgrade");
              this._host.game.ui.render();
              this.build("aqueduct", 1, 1);
              context.requestGameUiRefresh = true;
            }
          }
        }
      }
      const libraryMeta = this._host.game.bld.getBuildingExt("library").meta;
      if (this.settings.upgradeBuildings.buildings.dataCenter.enabled && libraryMeta.unlocked && libraryMeta.stage === 0 && mustExist(libraryMeta.stages)[1].stageUnlocked) {
        let energyConsumptionRate = this._host.game.workshop.get("cryocomputing").researched ? 1 : 2;
        if (this._host.game.challenges.currentChallenge === "energy") {
          energyConsumptionRate *= 2;
        }
        let libToDat = 3;
        if (this._host.game.workshop.get("uplink").researched) {
          libToDat *= 1 + this._host.game.bld.getBuildingExt("biolab").meta.val * this._host.game.getEffect("uplinkDCRatio");
        }
        if (this._host.game.workshop.get("machineLearning").researched) {
          libToDat *= 1 + this._host.game.bld.getBuildingExt("aiCore").meta.on * this._host.game.getEffect("dataCenterAIRatio");
        }
        if (this._host.game.resPool.energyProd >= this._host.game.resPool.energyCons + energyConsumptionRate * libraryMeta.val / libToDat) {
          const prices = mustExist(libraryMeta.stages)[1].prices;
          if (this._bulkManager.singleBuildPossible(libraryMeta, prices, 1)) {
            const button2 = mustExist(this.getBuildButton("library", 0));
            if (isNil(button2.model)) {
              return;
            }
            button2.controller.sellInternal(button2.model, 0);
            libraryMeta.on = 0;
            libraryMeta.val = 0;
            libraryMeta.stage = 1;
            (_b = libraryMeta.calculateEffects) == null ? void 0 : _b.call(libraryMeta, libraryMeta, this._host.game);
            this._host.engine.iactivity("upgrade.building.library", [], "ks-upgrade");
            this._host.game.ui.render();
            this.build("library", 1, 1);
            context.requestGameUiRefresh = true;
            return;
          }
        }
      }
      const warehouseMeta = this._host.game.bld.getBuildingExt("warehouse").meta;
      if (this.settings.upgradeBuildings.buildings.spaceport.enabled && warehouseMeta.unlocked && warehouseMeta.stage === 0 && mustExist(warehouseMeta.stages)[1].stageUnlocked) {
        const prices = mustExist(warehouseMeta.stages)[1].prices;
        if (this._bulkManager.singleBuildPossible(warehouseMeta, prices, 1)) {
          const button2 = this.getBuildButton("warehouse", 0);
          if (!isNil(button2 == null ? void 0 : button2.model)) {
            button2.controller.sellInternal(button2.model, 0);
            warehouseMeta.on = 0;
            warehouseMeta.val = 0;
            warehouseMeta.stage = 1;
            this._host.engine.iactivity("upgrade.building.warehouse", [], "ks-upgrade");
            this._host.game.ui.render();
            this.build("warehouse", 1, 1);
            context.requestGameUiRefresh = true;
            return;
          }
        }
      }
      const amphitheatreMeta = this._host.game.bld.getBuildingExt("amphitheatre").meta;
      if (this.settings.upgradeBuildings.buildings.broadcasttower.enabled && amphitheatreMeta.unlocked && amphitheatreMeta.stage === 0 && mustExist(amphitheatreMeta.stages)[1].stageUnlocked) {
        const prices = mustExist(amphitheatreMeta.stages)[1].prices;
        if (this._bulkManager.singleBuildPossible(amphitheatreMeta, prices, 1)) {
          const button2 = this.getBuildButton("amphitheatre", 0);
          if (!isNil(button2 == null ? void 0 : button2.model)) {
            button2.controller.sellInternal(button2.model, 0);
            amphitheatreMeta.on = 0;
            amphitheatreMeta.val = 0;
            amphitheatreMeta.stage = 1;
            this._host.engine.iactivity("upgrade.building.amphitheatre", [], "ks-upgrade");
            this._host.game.ui.render();
            this.build("amphitheatre", 1, 1);
            context.requestGameUiRefresh = true;
          }
        }
      }
    }
    autoMisc(context) {
      if (this.settings.turnOnSteamworks.enabled) {
        const steamworks = this._host.game.bld.getBuildingExt("steamworks");
        if (steamworks.meta.val && steamworks.meta.on === 0) {
          const button2 = mustExist(this.getBuildButton("steamworks"));
          if (isNil(button2.model)) {
            return;
          }
          button2.controller.onAll(button2.model);
        }
      }
      if (this.settings.turnOnMagnetos.enabled) {
        const magnetos = this._host.game.bld.getBuildingExt("magneto");
        if (magnetos.meta.val && magnetos.meta.on < magnetos.meta.val) {
          const button2 = mustExist(this.getBuildButton("magneto"));
          if (isNil(button2.model)) {
            return;
          }
          button2.controller.onAll(button2.model);
        }
      }
      if (this.settings.turnOnReactors.enabled) {
        const reactors = this._host.game.bld.getBuildingExt("reactor");
        if (reactors.meta.val && reactors.meta.on < reactors.meta.val) {
          const button2 = mustExist(this.getBuildButton("reactor"));
          if (isNil(button2.model)) {
            return;
          }
          button2.controller.onAll(button2.model);
        }
      }
      if (this.settings.upgradeBuildings.enabled) {
        this.autoUpgrade(context);
      }
      if (this.settings.gatherCatnip.enabled) {
        this.autoGather();
      }
    }
    autoGather() {
      const controller = new classes.game.ui.GatherCatnipButtonController(this._host.game);
      for (let clicks = 0; clicks < Math.floor(this._host.engine.settings.interval / 20); ++clicks) {
        controller.buyItem(null, null);
      }
    }
    build(name, stage, amount) {
      let amountCalculated = amount;
      const build = this.getBuild(name);
      const button2 = this.getBuildButton(name, stage);
      if (!(button2 == null ? void 0 : button2.model)) {
        return;
      }
      if (!button2.model.enabled) {
        return;
      }
      const amountTemp = amountCalculated;
      const label2 = this._getBuildLabel(build.meta, stage);
      amountCalculated = this._bulkManager.construct(button2.model, button2, amountCalculated);
      if (amountCalculated !== amountTemp) {
        cwarn(`${label2} Amount ordered: ${amountTemp} Amount Constructed: ${amountCalculated}`);
      }
      this._host.engine.storeForSummary(label2, amountCalculated, "build");
      if (amountCalculated === 1) {
        this._host.engine.iactivity("act.build", [label2], "ks-build");
      } else {
        this._host.engine.iactivity(
          "act.builds",
          [label2, this._host.renderAbsolute(amountCalculated)],
          "ks-build"
        );
      }
    }
    _getBuildLabel(meta, stage) {
      return meta.stages && !isNil(stage) ? meta.stages[stage].label : mustExist(meta.label);
    }
    getBuild(name) {
      return this._host.game.bld.getBuildingExt(name);
    }
    getBuildButton(name, stage) {
      const buttons = this.manager.tab.children;
      const build = this.getBuild(name);
      const label2 = this._getBuildLabel(build.meta, stage);
      return buttons.find((button2) => {
        var _a;
        return ((_a = button2.model) == null ? void 0 : _a.options.name).startsWith(label2);
      }) ?? null;
    }
  }
  const UnicornItems = [
    "ivoryCitadel",
    "ivoryTower",
    "skyPalace",
    "sunspire",
    "unicornPasture",
    "unicornTomb",
    "unicornUtopia"
  ];
  const ReligionOptions = [
    "sacrificeUnicorns",
    "sacrificeAlicorns",
    "refineTears",
    "refineTimeCrystals",
    "transcend",
    "adore",
    "autoPraise"
  ];
  class ReligionSettingsItem extends SettingTriggerMax {
    constructor(building, variant, enabled = false) {
      super(enabled);
      __privateAdd(this, _building2);
      __privateAdd(this, _variant);
      __privateSet(this, _building2, building);
      __privateSet(this, _variant, variant);
    }
    get building() {
      return __privateGet(this, _building2);
    }
    get variant() {
      return __privateGet(this, _variant);
    }
  }
  _building2 = new WeakMap();
  _variant = new WeakMap();
  class ReligionSettings extends SettingTrigger {
    constructor(enabled = false, trigger = -1, bestUnicornBuilding = new Setting(), sacrificeAlicorns = new SettingThreshold(false, -1), sacrificeUnicorns = new SettingThreshold(false, -1), refineTears = new SettingThreshold(false, -1), refineTimeCrystals = new SettingThreshold(false, -1), autoPraise = new SettingTrigger(false, 1), adore = new SettingTrigger(false, 1), transcend = new Setting()) {
      super(enabled, trigger);
      __publicField(this, "buildings");
      __publicField(this, "bestUnicornBuilding");
      __publicField(this, "bestUnicornBuildingCurrent");
      __publicField(this, "sacrificeAlicorns");
      __publicField(this, "sacrificeUnicorns");
      __publicField(this, "refineTears");
      __publicField(this, "refineTimeCrystals");
      __publicField(this, "autoPraise");
      __publicField(this, "adore");
      __publicField(this, "transcend");
      this.buildings = this.initBuildings();
      this.bestUnicornBuilding = bestUnicornBuilding;
      this.sacrificeAlicorns = sacrificeAlicorns;
      this.sacrificeUnicorns = sacrificeUnicorns;
      this.refineTears = refineTears;
      this.refineTimeCrystals = refineTimeCrystals;
      this.autoPraise = autoPraise;
      this.adore = adore;
      this.transcend = transcend;
      this.bestUnicornBuildingCurrent = null;
    }
    initBuildings() {
      const items = {};
      for (const item of ReligionUpgrades) {
        items[item] = new ReligionSettingsItem(item, UnicornItemVariant.OrderOfTheSun);
      }
      for (const item of TranscendenceUpgrades) {
        items[item] = new ReligionSettingsItem(item, UnicornItemVariant.Cryptotheology);
      }
      for (const item of ZiggurathUpgrades) {
        items[item] = new ReligionSettingsItem(item, UnicornItemVariant.Ziggurat);
      }
      items.unicornPasture = new ReligionSettingsItem(
        "unicornPasture",
        UnicornItemVariant.UnicornPasture
      );
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.max = (item == null ? void 0 : item.max) ?? building.max;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
      this.bestUnicornBuilding.load(settings.bestUnicornBuilding);
      this.sacrificeAlicorns.load(settings.sacrificeAlicorns);
      this.sacrificeUnicorns.load(settings.sacrificeUnicorns);
      this.refineTears.load(settings.refineTears);
      this.refineTimeCrystals.load(settings.refineTimeCrystals);
      this.autoPraise.load(settings.autoPraise);
      this.adore.load(settings.adore);
      this.transcend.load(settings.transcend);
      this.bestUnicornBuildingCurrent = settings.bestUnicornBuildingCurrent ?? this.bestUnicornBuildingCurrent;
    }
  }
  class ReligionManager {
    constructor(host, bonfireManager, workshopManager, settings = new ReligionSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bulkManager");
      __publicField(this, "_bonfireManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Religion");
      this._workshopManager = workshopManager;
      this._bulkManager = new BulkPurchaseHelper(this._host, this._workshopManager);
      this._bonfireManager = bonfireManager;
    }
    async tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.manager.render();
      this._autoBuild(context);
      if (this.settings.sacrificeUnicorns.enabled) {
        await this._autoSacrificeUnicorns();
      }
      if (this.settings.sacrificeAlicorns.enabled) {
        await this._autoSacrificeAlicorns(context);
      }
      if (this.settings.refineTears.enabled) {
        this._autoTears(context);
      }
      if (this.settings.refineTimeCrystals.enabled) {
        await this._autoTCs(context);
      }
      this._autoTAP();
    }
    _autoBuild(context) {
      if (this.settings.bestUnicornBuilding.enabled) {
        this._buildBestUnicornBuilding();
        this._buildNonUnicornBuildings(context);
      } else {
        const builds = Object.fromEntries(
          Object.entries(this.settings.buildings).filter(
            ([, building]) => building.variant !== UnicornItemVariant.UnicornPasture
          )
        );
        const maxPastures = negativeOneToInfinity(this.settings.buildings.unicornPasture.max);
        const meta = this._host.game.bld.getBuildingExt("unicornPasture").meta;
        if (this.settings.buildings.unicornPasture.enabled && meta.val < maxPastures) {
          this._bonfireManager.autoBuild(context, {
            unicornPasture: new BonfireBuildingSetting(
              "unicornPasture",
              this.settings.buildings.unicornPasture.enabled,
              this.settings.buildings.unicornPasture.max
            )
          });
        }
        this._buildReligionBuildings(context, builds);
      }
    }
    _buildBestUnicornBuilding() {
      const bestUnicornBuilding = this.getBestUnicornBuilding();
      if (this.settings.bestUnicornBuildingCurrent !== bestUnicornBuilding) {
        this.settings.bestUnicornBuildingCurrent = bestUnicornBuilding;
        this._host.refreshUi();
      }
      if (this.settings.bestUnicornBuildingCurrent === null) {
        return;
      }
      const sectionTrigger = this.settings.trigger;
      if (this.settings.bestUnicornBuildingCurrent === "unicornPasture") {
        this._bonfireManager.build(this.settings.bestUnicornBuildingCurrent, 0, 1);
      } else {
        const buildingButton = this._getBuildButton(
          this.settings.bestUnicornBuildingCurrent,
          UnicornItemVariant.Ziggurat
        );
        if (isNil(buildingButton == null ? void 0 : buildingButton.model)) {
          return;
        }
        let tearsNeeded = 0;
        const priceTears = mustExist(buildingButton.model.prices).find(
          (subject) => subject.name === "tears"
        );
        if (!isNil(priceTears)) {
          tearsNeeded = priceTears.val;
        }
        const tearsAvailableForUse = this._workshopManager.getValue("tears") - this._workshopManager.getStock("tears");
        if (!isNil(this._host.game.religionTab.sacrificeBtn) && tearsAvailableForUse < tearsNeeded) {
          const maxSacrifice = Math.floor(
            (this._workshopManager.getValue("unicorns") - this._workshopManager.getStock("unicorns")) / 2500
          );
          const needSacrifice = Math.ceil(
            (tearsNeeded - tearsAvailableForUse) / this._host.game.bld.getBuildingExt("ziggurat").meta.on
          );
          if (needSacrifice < maxSacrifice && !isNil(this._host.game.religionTab.sacrificeBtn.model)) {
            this._host.game.religionTab.sacrificeBtn.controller._transform(
              this._host.game.religionTab.sacrificeBtn.model,
              needSacrifice
            );
          } else {
            return;
          }
        }
        const buildRequest = {
          [this.settings.bestUnicornBuildingCurrent]: this.settings.buildings[this.settings.bestUnicornBuildingCurrent]
        };
        const build = this._bulkManager.bulk(
          buildRequest,
          this.getBuildMetaData(buildRequest),
          sectionTrigger,
          "Religion"
        );
        if (0 < build.length && 0 < build[0].count) {
          this.build(this.settings.bestUnicornBuildingCurrent, UnicornItemVariant.Ziggurat, 1);
        }
      }
    }
    _buildNonUnicornBuildings(context) {
      const alreadyHandled = [...UnicornItems];
      const builds = Object.fromEntries(
        Object.entries(this.settings.buildings).filter(
          ([, building]) => !alreadyHandled.includes(building.building)
        )
      );
      this._buildReligionBuildings(context, builds);
    }
    _buildReligionBuildings(context, builds) {
      this.manager.render();
      const metaData = this.getBuildMetaData(builds);
      const sectionTrigger = this.settings.trigger;
      const buildList = this._bulkManager.bulk(builds, metaData, sectionTrigger, "Religion");
      for (const build of buildList) {
        if (0 < build.count) {
          this.build(
            build.id,
            mustExist(build.variant),
            build.count
          );
          context.requestGameUiRefresh = true;
        }
      }
    }
    getBestUnicornBuilding() {
      var _a, _b, _c;
      const pastureButton = this._bonfireManager.getBuildButton("unicornPasture");
      if (pastureButton === null) {
        return null;
      }
      const validBuildings = [...UnicornItems].filter(
        (item) => item !== "unicornPasture"
      );
      const unicornsPerSecondBase = this._host.game.getEffect("unicornsPerTickBase") * this._host.game.getTicksPerSecondUI();
      const globalRatio = this._host.game.getEffect("unicornsGlobalRatio") + 1;
      const religionRatio = this._host.game.getEffect("unicornsRatioReligion") + 1;
      const paragonRatio = this._host.game.prestige.getParagonProductionRatio() + 1;
      const faithBonus = this._host.game.religion.getSolarRevolutionRatio() + 1;
      const currentCycleIndex = this._host.game.calendar.cycle;
      const currentCycle = this._host.game.calendar.cycles[currentCycleIndex];
      let cycleBonus = 1;
      if (currentCycle.festivalEffects.unicorns !== void 0) {
        if (this._host.game.prestige.getPerk("numeromancy").researched && this._host.game.calendar.festivalDays) {
          cycleBonus = currentCycle.festivalEffects.unicorns;
        }
      }
      const unicornsPerSecond = unicornsPerSecondBase * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;
      const ziggurathRatio = Math.max(this._host.game.bld.getBuildingExt("ziggurat").meta.on, 1);
      const baseUnicornsPerRift = 500 * (1 + this._host.game.getEffect("unicornsRatioReligion") * 0.1);
      let riftChanceRatio = 1;
      if (this._host.game.prestige.getPerk("unicornmancy").researched) {
        riftChanceRatio *= 1.1;
      }
      const unicornRiftChange = this._host.game.getEffect("riftChance") * riftChanceRatio / (1e4 * 2) * baseUnicornsPerRift;
      let bestAmortization = Number.POSITIVE_INFINITY;
      let bestBuilding = null;
      const unicornsPerTickBase = mustExist(
        (_a = this._host.game.bld.getBuildingExt("unicornPasture").meta.effects) == null ? void 0 : _a.unicornsPerTickBase
      );
      const pastureProduction = unicornsPerTickBase * this._host.game.getTicksPerSecondUI() * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;
      const pastureAmortization = mustExist((_b = pastureButton.model) == null ? void 0 : _b.prices)[0].val / pastureProduction;
      if (pastureAmortization < bestAmortization) {
        bestAmortization = pastureAmortization;
        bestBuilding = "unicornPasture";
      }
      for (const button2 of this.manager.tab.zgUpgradeButtons) {
        if (validBuildings.includes(button2.id) && ((_c = button2.model) == null ? void 0 : _c.visible)) {
          let unicornPrice = 0;
          for (const price of mustExist(button2.model.prices)) {
            if (price.name === "unicorns") {
              unicornPrice += price.val;
            }
            if (price.name === "tears") {
              unicornPrice += price.val * 2500 / ziggurathRatio;
            }
          }
          const buildingInfo = mustExist(this._host.game.religion.getZU(button2.id));
          let religionBonus = religionRatio;
          let riftChance = this._host.game.getEffect("riftChance");
          for (const effect in buildingInfo.effects) {
            if (effect === "unicornsRatioReligion") {
              religionBonus += mustExist(buildingInfo.effects.unicornsRatioReligion);
            }
            if (effect === "riftChance") {
              riftChance += mustExist(buildingInfo.effects.riftChance);
            }
          }
          const unicornsPerRift = 500 * ((religionBonus - 1) * 0.1 + 1);
          let riftBonus = riftChance * riftChanceRatio / (1e4 * 2) * unicornsPerRift;
          riftBonus -= unicornRiftChange;
          let buildingProduction = unicornsPerSecondBase * globalRatio * religionBonus * paragonRatio * faithBonus * cycleBonus;
          buildingProduction -= unicornsPerSecond;
          buildingProduction += riftBonus;
          const amortization = unicornPrice / buildingProduction;
          if (amortization < bestAmortization) {
            if (0 < riftBonus || religionRatio < religionBonus && 0 < unicornPrice) {
              bestAmortization = amortization;
              bestBuilding = button2.id;
            }
          }
        }
      }
      return bestBuilding;
    }
    build(name, variant, amount) {
      let amountCalculated = amount;
      const build = this.getBuild(name, variant);
      if (build === null) {
        throw new Error(`Unable to build '${name}'. Build information not available.`);
      }
      const button2 = this._getBuildButton(name, variant);
      if (!(button2 == null ? void 0 : button2.model)) {
        return;
      }
      if (!button2.model.enabled) {
        return;
      }
      const amountTemp = amountCalculated;
      const label2 = build.label;
      amountCalculated = this._bulkManager.construct(button2.model, button2, amountCalculated);
      if (amountCalculated !== amountTemp) {
        cwarn(`${label2} Amount ordered: ${amountTemp} Amount Constructed: ${amountCalculated}`);
      }
      if (variant === UnicornItemVariant.OrderOfTheSun) {
        this._host.engine.storeForSummary(label2, amountCalculated, "faith");
        if (amountCalculated === 1) {
          this._host.engine.iactivity("act.sun.discover", [label2], "ks-faith");
        } else {
          this._host.engine.iactivity(
            "act.sun.discovers",
            [label2, this._host.renderAbsolute(amountCalculated)],
            "ks-faith"
          );
        }
      } else {
        this._host.engine.storeForSummary(label2, amountCalculated, "build");
        if (amountCalculated === 1) {
          this._host.engine.iactivity("act.build", [label2], "ks-build");
        } else {
          this._host.engine.iactivity(
            "act.builds",
            [label2, this._host.renderAbsolute(amountCalculated)],
            "ks-build"
          );
        }
      }
    }
    getBuildMetaData(builds) {
      const metaData = {};
      for (const build of Object.values(builds)) {
        const buildInfo = this.getBuild(build.building, build.variant);
        if (buildInfo === null) {
          continue;
        }
        metaData[build.building] = buildInfo;
        const buildMetaData = mustExist(metaData[build.building]);
        if (!this._getBuildButton(build.building, build.variant)) {
          buildMetaData.rHidden = true;
        } else {
          const model = mustExist(this._getBuildButton(build.building, build.variant)).model;
          const panel = build.variant === UnicornItemVariant.Cryptotheology ? this._host.game.science.get("cryptotheology").researched : true;
          buildMetaData.rHidden = !((model == null ? void 0 : model.visible) && model.enabled && panel);
        }
      }
      return metaData;
    }
    getBuild(name, variant) {
      switch (variant) {
        case UnicornItemVariant.Ziggurat:
          return this._host.game.religion.getZU(name) ?? null;
        case UnicornItemVariant.OrderOfTheSun:
          return this._host.game.religion.getRU(name) ?? null;
        case UnicornItemVariant.Cryptotheology:
          return this._host.game.religion.getTU(name) ?? null;
      }
      return null;
    }
    _getBuildButton(name, variant) {
      let buttons;
      switch (variant) {
        case UnicornItemVariant.Ziggurat:
          buttons = this.manager.tab.zgUpgradeButtons;
          break;
        case UnicornItemVariant.OrderOfTheSun:
          buttons = this.manager.tab.rUpgradeButtons;
          break;
        case UnicornItemVariant.Cryptotheology:
          buttons = this.manager.tab.children[0].children[0].children;
          break;
        default:
          throw new Error(`Invalid variant '${variant}'`);
      }
      if (buttons.length === 0) {
        return null;
      }
      return buttons.find((button2) => button2.id === name) ?? null;
    }
    _transformBtnSacrificeHelper(available, total, controller, model) {
      const conversionPercentage = available / total;
      const percentageInverse = 1 / conversionPercentage;
      const customController = new classes.ui.religion.TransformBtnController(
        game,
        controller.controllerOpts
      );
      const link = customController._newLink(model, percentageInverse);
      return new Promise((resolve) => {
        link.handler(new Event("decoy"), resolve);
      });
    }
    async _autoSacrificeUnicorns() {
      const unicorns = this._workshopManager.getResource("unicorns");
      const available = this._workshopManager.getValueAvailable("unicorns");
      if (!isNil(this._host.game.religionTab.sacrificeBtn) && this.settings.sacrificeUnicorns.trigger <= available && this.settings.sacrificeUnicorns.trigger <= unicorns.value) {
        const controller = this._host.game.religionTab.sacrificeBtn.controller;
        const model = this._host.game.religionTab.sacrificeBtn.model;
        if (isNil(model)) {
          return;
        }
        await this._transformBtnSacrificeHelper(available, unicorns.value, controller, model);
        const availableNow = this._workshopManager.getValueAvailable("unicorns");
        const cost = available - availableNow;
        this._host.engine.iactivity(
          "act.sacrificeUnicorns",
          [this._host.game.getDisplayValueExt(cost)],
          "ks-faith"
        );
        this._host.engine.storeForSummary(
          this._host.engine.i18n("$resources.unicorns.title"),
          cost,
          "refine"
        );
      }
    }
    async _autoSacrificeAlicorns(context) {
      const alicorns = this._workshopManager.getResource("alicorn");
      const available = this._workshopManager.getValueAvailable("alicorn");
      if (!isNil(this._host.game.religionTab.sacrificeAlicornsBtn) && this.settings.sacrificeAlicorns.trigger <= available && this.settings.sacrificeAlicorns.trigger <= alicorns.value) {
        this._host.game.religionTab.sacrificeAlicornsBtn.render();
        const controller = this._host.game.religionTab.sacrificeAlicornsBtn.controller;
        const model = this._host.game.religionTab.sacrificeAlicornsBtn.model;
        if (isNil(model)) {
          context.requestGameUiRefresh = true;
          return;
        }
        await this._transformBtnSacrificeHelper(available, alicorns.value, controller, model);
        const availableNow = this._workshopManager.getValueAvailable("alicorn");
        const cost = available - availableNow;
        this._host.engine.iactivity(
          "act.sacrificeAlicorns",
          [this._host.game.getDisplayValueExt(cost)],
          "ks-faith"
        );
        this._host.engine.storeForSummary(
          this._host.engine.i18n("$resources.alicorn.title"),
          cost,
          "refine"
        );
      }
    }
    _autoTears(context) {
      const tears = this._workshopManager.getResource("tears");
      const available = this._workshopManager.getValueAvailable("tears");
      const sorrow = this._workshopManager.getResource("sorrow");
      if (!isNil(this._host.game.religionTab.refineBtn) && this.settings.refineTears.trigger <= available && this.settings.refineTears.trigger <= tears.value && sorrow.value < sorrow.maxValue) {
        const availableForConversion = available - this.settings.refineTears.trigger;
        if (availableForConversion < 1e4) {
          return;
        }
        const controller = this._host.game.religionTab.refineBtn.controller;
        const model = this._host.game.religionTab.refineBtn.model;
        if (isNil(model)) {
          context.requestGameUiRefresh = true;
          return;
        }
        controller.buyItem(model, new Event("decoy"), availableForConversion);
        const availableNow = this._workshopManager.getValueAvailable("tears");
        const cost = available - availableNow;
        this._host.engine.iactivity(
          "act.refineTears",
          [this._host.game.getDisplayValueExt(cost)],
          "ks-faith"
        );
        this._host.engine.storeForSummary(
          this._host.engine.i18n("$resources.tears.title"),
          cost,
          "refine"
        );
      }
    }
    async _autoTCs(context) {
      const timeCrystals = this._workshopManager.getResource("timeCrystal");
      const available = this._workshopManager.getValueAvailable("timeCrystal");
      if (!isNil(this._host.game.religionTab.refineTCBtn) && this.settings.refineTimeCrystals.trigger <= available && this.settings.refineTimeCrystals.trigger <= timeCrystals.value) {
        const controller = this._host.game.religionTab.refineTCBtn.controller;
        const model = this._host.game.religionTab.refineTCBtn.model;
        if (isNil(model)) {
          context.requestGameUiRefresh = true;
          return;
        }
        await this._transformBtnSacrificeHelper(available, timeCrystals.value, controller, model);
        const availableNow = this._workshopManager.getValueAvailable("timeCrystal");
        const cost = available - availableNow;
        this._host.engine.iactivity(
          "act.refineTCs",
          [this._host.game.getDisplayValueExt(cost)],
          "ks-faith"
        );
        this._host.engine.storeForSummary(
          this._host.engine.i18n("$resources.timeCrystal.title"),
          cost,
          "refine"
        );
      }
    }
    _autoTAP() {
      const faith = this._workshopManager.getResource("faith");
      const faithLevel = faith.value / faith.maxValue;
      if (this.settings.transcend.enabled && this.settings.autoPraise.trigger - 0.02 <= faithLevel) {
        this._autoTranscend();
      }
      if (this.settings.autoPraise.trigger <= faithLevel) {
        if (this.settings.adore.enabled && mustExist(this._host.game.religion.getRU("apocripha")).on) {
          this._autoAdore(this.settings.adore.trigger);
        }
        if (this.settings.autoPraise.enabled) {
          this._autoPraise();
        }
      }
    }
    _autoAdore(trigger) {
      const faith = this._workshopManager.getResource("faith");
      const worship = this._host.game.religion.faith;
      const epiphany = this._host.game.religion.faithRatio;
      const transcendenceReached = mustExist(this._host.game.religion.getRU("transcendence")).on;
      const transcendenceTierCurrent = transcendenceReached ? this._host.game.religion.transcendenceTier : 0;
      const maxSolarRevolution = 10 + this._host.game.getEffect("solarRevolutionLimit");
      const triggerSolarRevolution = maxSolarRevolution * trigger;
      const epiphanyIncrease = worship / 1e6 * transcendenceTierCurrent * transcendenceTierCurrent * 1.01;
      const epiphanyAfterAdore = epiphany + epiphanyIncrease;
      const worshipAfterAdore = 0.01 + faith.value * (1 + this._host.game.getUnlimitedDR(epiphanyAfterAdore, 0.1) * 0.1);
      const solarRevolutionAfterAdore = this._host.game.getLimitedDR(
        this._host.game.getUnlimitedDR(worshipAfterAdore, 1e3) / 100,
        maxSolarRevolution
      );
      if (triggerSolarRevolution <= solarRevolutionAfterAdore) {
        this._host.game.religion._resetFaithInternal(1.01);
        this._host.engine.iactivity(
          "act.adore",
          [
            this._host.game.getDisplayValueExt(worship),
            this._host.game.getDisplayValueExt(epiphanyIncrease)
          ],
          "ks-adore"
        );
        this._host.engine.storeForSummary("adore", epiphanyIncrease);
      }
    }
    _autoTranscend() {
      let epiphany = this._host.game.religion.faithRatio;
      const transcendenceReached = mustExist(this._host.game.religion.getRU("transcendence")).on;
      let transcendenceTierCurrent = transcendenceReached ? this._host.game.religion.transcendenceTier : 0;
      if (transcendenceReached) {
        const adoreIncreaseRatio = ((transcendenceTierCurrent + 2) / (transcendenceTierCurrent + 1)) ** 2;
        const needNextLevel = this._host.game.religion._getTranscendTotalPrice(transcendenceTierCurrent + 1) - this._host.game.religion._getTranscendTotalPrice(transcendenceTierCurrent);
        const x = needNextLevel;
        const k = adoreIncreaseRatio;
        const epiphanyRecommend = (1 - k + Math.sqrt(80 * (k * k - 1) * x + (k - 1) * (k - 1))) * k / (40 * (k + 1) * (k + 1) * (k - 1)) + x + x / (k * k - 1);
        if (epiphanyRecommend <= epiphany) {
          this._host.game.religion.faithRatio -= needNextLevel;
          this._host.game.religion.tcratio += needNextLevel;
          this._host.game.religion.transcendenceTier += 1;
          const atheism = mustExist(this._host.game.challenges.getChallenge("atheism"));
          atheism.calculateEffects(atheism, this._host.game);
          const blackObelisk = mustExist(this._host.game.religion.getTU("blackObelisk"));
          blackObelisk.calculateEffects(blackObelisk, this._host.game);
          this._host.game.msg(
            this._host.engine.i18n("$religion.transcend.msg.success", [
              this._host.game.religion.transcendenceTier
            ])
          );
          epiphany = this._host.game.religion.faithRatio;
          transcendenceTierCurrent = this._host.game.religion.transcendenceTier;
          this._host.engine.iactivity(
            "act.transcend",
            [this._host.game.getDisplayValueExt(needNextLevel), transcendenceTierCurrent],
            "ks-transcend"
          );
          this._host.engine.storeForSummary("transcend", 1);
        }
      }
    }
    _autoPraise() {
      const faith = this._workshopManager.getResource("faith");
      const apocryphaBonus = this._host.game.religion.getApocryphaBonus();
      const worshipIncrease = faith.value * (1 + apocryphaBonus);
      this._host.engine.storeForSummary("praise", worshipIncrease);
      this._host.engine.iactivity(
        "act.praise",
        [
          this._host.game.getDisplayValueExt(faith.value),
          this._host.game.getDisplayValueExt(worshipIncrease)
        ],
        "ks-praise"
      );
      this._host.game.religion.praise();
    }
  }
  class UpgradeManager {
    constructor(host) {
      __publicField(this, "_host");
      this._host = host;
    }
    async upgrade(upgrade, variant) {
      const button2 = this._getUpgradeButton(upgrade, variant);
      if (!button2 || !button2.model) {
        return false;
      }
      if (!button2.model.enabled) {
        cwarn(`${button2.model.name} Upgrade request on disabled button!`);
        button2.render();
        return false;
      }
      const controller = variant === "policy" ? new classes.ui.PolicyBtnController(this._host.game) : new com.nuclearunicorn.game.ui.TechButtonController(this._host.game);
      this._host.game.opts.noConfirm = true;
      const success = await UpgradeManager.skipConfirm(
        () => new Promise((resolve) => {
          const buyResult = controller.buyItem(button2.model, new MouseEvent("click"));
          if (buyResult.def !== void 0) {
            buyResult.def.then(resolve);
          } else {
            resolve(buyResult.itemBought);
          }
        })
      );
      if (!success) {
        return false;
      }
      const label2 = upgrade.label;
      if (variant === "workshop") {
        this._host.engine.storeForSummary(label2, 1, "upgrade");
        this._host.engine.iactivity("upgrade.upgrade", [label2], "ks-upgrade");
      } else if (variant === "policy") {
        this._host.engine.iactivity("upgrade.policy", [label2]);
      } else if (variant === "science") {
        this._host.engine.storeForSummary(label2, 1, "research");
        this._host.engine.iactivity("upgrade.tech", [label2], "ks-research");
      }
      return true;
    }
    static async skipConfirm(action) {
      const originalConfirm = game.ui.confirm;
      try {
        game.ui.confirm = () => true;
        return await action();
      } finally {
        game.ui.confirm = originalConfirm;
      }
    }
    _getUpgradeButton(upgrade, variant) {
      let buttons;
      if (variant === "workshop") {
        buttons = this.manager.tab.buttons;
      } else if (variant === "policy") {
        buttons = this.manager.tab.policyPanel.children;
      } else if (variant === "science") {
        buttons = this.manager.tab.buttons;
      }
      return (buttons == null ? void 0 : buttons.find((button2) => button2.id === upgrade.name)) ?? null;
    }
  }
  const sleep = (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration));
  };
  const FallbackLocale = "en-US";
  const TIMEOUT_DEFAULT = 2 * 60 * 1e3;
  const TIMEOUT_OVERRIDE = "localStorage" in globalThis && !isNil(localStorage["ks.timeout"]) ? Number(localStorage["ks.timeout"]) : void 0;
  class UserScriptLoader {
    constructor() {
      __publicField(this, "_gameStartSignal");
      __publicField(this, "_gameStartSignalResolver");
      __publicField(this, "_possibleEngineState");
    }
    static tryEngineStateFromSaveData(saveDataKey, saveData) {
      const saveDataProxy = saveData;
      if (!(saveDataKey in saveDataProxy)) {
        cdebug(`Failed: \`${saveDataKey}\` not found in save data.`);
        return void 0;
      }
      const ksData = saveDataProxy.ks;
      if (!("state" in ksData)) {
        cdebug(`Failed: \`${saveDataKey}.state\` not found in save data.`);
        return void 0;
      }
      const state = ksData.state;
      if (!Array.isArray(state)) {
        cdebug(`Failed: \`${saveDataKey}.state\` not \`Array\`.`);
        return void 0;
      }
      return state[0];
    }
    async waitForGame(UserScript, saveDataKey, timeout = TIMEOUT_OVERRIDE ?? TIMEOUT_DEFAULT) {
      if (UserScriptLoader._isGameLoaded()) {
        const game2 = mustExist(UserScriptLoader.window.game);
        const i18nEngine = mustExist(UserScriptLoader.window.$I);
        const gameLanguage = localStorage["com.nuclearunicorn.kittengame.language"];
        return new UserScript(game2, i18nEngine, gameLanguage, this._possibleEngineState);
      }
      const signals = [sleep(2e3)];
      if (isNil(this._gameStartSignal) && typeof UserScriptLoader.window.dojo !== "undefined") {
        this._gameStartSignal = new Promise((resolve) => {
          this._gameStartSignalResolver = resolve;
        });
        const subGameStart = UserScriptLoader.window.dojo.subscribe("game/start", () => {
          cdebug(`'game/start' signal caught. Fast-tracking script load for '${saveDataKey}'...`);
          mustExist(this._gameStartSignalResolver)(true);
          UserScriptLoader.window.dojo.unsubscribe(subGameStart);
        });
        if (saveDataKey !== void 0) {
          const subServerLoad = UserScriptLoader.window.dojo.subscribe(
            "server/load",
            (saveData) => {
              cinfo(
                `'server/load' signal caught. Looking for script state with key '${saveDataKey}' in save data...`
              );
              const state = UserScriptLoader.tryEngineStateFromSaveData(saveDataKey, saveData);
              if (!state) {
                cinfo(
                  `The Kittens Game save data did not contain a script state for '${saveDataKey}'.`
                );
                return;
              }
              cinfo(
                `Found key '${saveDataKey}'! Provided save data will be used as seed for next script instance.`
              );
              this._possibleEngineState = state;
              UserScriptLoader.window.dojo.unsubscribe(subServerLoad);
            }
          );
        }
      }
      if (!isNil(this._gameStartSignal)) {
        signals.push(this._gameStartSignal);
      }
      if (timeout < 0) {
        throw new Error(
          "Unable to find game. Giving up. Maybe the game is not exported at `window.game`?"
        );
      }
      cdebug(`Waiting for game... (timeout: ${Math.round(timeout / 1e3)}s)`);
      await Promise.race(signals);
      return this.waitForGame(UserScript, saveDataKey, timeout - 2e3);
    }
    static _isGameLoaded() {
      return !isNil(UserScriptLoader.window.game) && !Object.prototype.toString.apply(UserScriptLoader.window.game).includes("HTMLDivElement");
    }
    static get window() {
      try {
        return mustExist(unsafeWindow);
      } catch (_error) {
        return window;
      }
    }
  }
  class PolicySetting extends Setting {
    constructor(policy, enabled = false) {
      super(enabled);
      __privateAdd(this, _policy);
      __privateSet(this, _policy, policy);
    }
    get policy() {
      return __privateGet(this, _policy);
    }
  }
  _policy = new WeakMap();
  class PolicySettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "policies");
      this.policies = this.initPolicies();
    }
    initPolicies() {
      const items = {};
      for (const item of Policies) {
        items[item] = new PolicySetting(item);
      }
      return items;
    }
    static validateGame(game2, settings) {
      const inSettings = Object.keys(settings.policies);
      const inGame = game2.science.policies.map((policy) => policy.name);
      const missingInSettings = difference(inGame, inSettings);
      const redundantInSettings = difference(inSettings, inGame);
      for (const policy of missingInSettings) {
        cwarn(`The policy '${policy}' is not tracked in Kitten Scientists!`);
      }
      for (const policy of redundantInSettings) {
        cwarn(`The policy '${policy}' is not a policy in Kittens Game!`);
      }
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.policies, settings.policies, (policy, item) => {
        policy.enabled = (item == null ? void 0 : item.enabled) ?? policy.enabled;
      });
    }
  }
  class TechSetting extends SettingTrigger {
    constructor(tech, enabled = false) {
      super(enabled, -1);
      __privateAdd(this, _tech);
      __privateSet(this, _tech, tech);
    }
    get tech() {
      return __privateGet(this, _tech);
    }
  }
  _tech = new WeakMap();
  class TechSettings extends SettingTrigger {
    constructor(enabled = false) {
      super(enabled, 0);
      __publicField(this, "techs");
      this.techs = this.initTechs();
    }
    initTechs() {
      const items = {};
      for (const item of Technologies) {
        items[item] = new TechSetting(item);
      }
      return items;
    }
    static validateGame(game2, settings) {
      const inSettings = Object.keys(settings.techs);
      const inGame = game2.science.techs.map((tech) => tech.name);
      const missingInSettings = difference(inGame, inSettings);
      const redundantInSettings = difference(inSettings, inGame);
      for (const tech of missingInSettings) {
        if (TechnologiesIgnored.includes(tech)) {
          continue;
        }
        cwarn(`The technology '${tech}' is not tracked in Kitten Scientists!`);
      }
      for (const tech of redundantInSettings) {
        if (TechnologiesIgnored.includes(tech)) {
          cinfo(`The technology '${tech}' is a technology in Kittens Game, but it's no longer used.`);
          continue;
        }
        cwarn(`The technology '${tech}' is not a technology in Kittens Game!`);
      }
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.techs, settings.techs, (tech, item) => {
        tech.enabled = (item == null ? void 0 : item.enabled) ?? tech.enabled;
        tech.trigger = (item == null ? void 0 : item.trigger) ?? tech.trigger;
      });
    }
  }
  class ScienceSettings extends Setting {
    constructor(enabled = false, policies = new PolicySettings(), techs = new TechSettings(), observe = new Setting()) {
      super(enabled);
      __publicField(this, "policies");
      __publicField(this, "techs");
      __publicField(this, "observe");
      this.policies = policies;
      this.techs = techs;
      this.observe = observe;
    }
    static validateGame(game2, settings) {
      PolicySettings.validateGame(game2, settings.policies);
      TechSettings.validateGame(game2, settings.techs);
    }
    load(settings) {
      var _a;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.policies.load(settings.policies);
      this.techs.load(settings.techs);
      this.observe.enabled = ((_a = settings.observe) == null ? void 0 : _a.enabled) ?? this.observe.enabled;
    }
  }
  class ScienceManager extends UpgradeManager {
    constructor(host, workshopManager, settings = new ScienceSettings()) {
      super(host);
      __publicField(this, "manager");
      __publicField(this, "settings");
      __publicField(this, "_workshopManager");
      this.settings = settings;
      this.manager = new TabManager(this._host, "Science");
      this._workshopManager = workshopManager;
    }
    async tick(_context) {
      if (!this.settings.enabled) {
        return;
      }
      this.manager.render();
      if (this.settings.techs.enabled && this._host.game.tabs[2].visible) {
        await this.autoUnlock();
      }
      if (this.settings.policies.enabled && this._host.game.tabs[2].visible) {
        await this.autoPolicy();
      }
      if (this.settings.observe.enabled) {
        this.observeStars();
      }
    }
    async autoUnlock() {
      const techs = this._host.game.science.techs;
      const toUnlock = new Array();
      workLoop: for (const setting2 of Object.values(this.settings.techs.techs)) {
        if (!setting2.enabled) {
          continue;
        }
        const tech = techs.find((subject) => subject.name === setting2.tech);
        if (isNil(tech)) {
          cerror(`Tech '${setting2.tech}' not found in game!`);
          continue;
        }
        if (tech.researched || !tech.unlocked) {
          continue;
        }
        let prices = UserScriptLoader.window.dojo.clone(tech.prices);
        prices = this._host.game.village.getEffectLeader("scientist", prices);
        for (const price of prices) {
          const available = this._workshopManager.getValueAvailable(price.name);
          const resource = this._workshopManager.getResource(price.name);
          const trigger = Engine.evaluateSubSectionTrigger(
            this.settings.techs.trigger,
            setting2.trigger
          );
          if (trigger < 0 || available < resource.maxValue * trigger || available < price.val) {
            continue workLoop;
          }
        }
        toUnlock.push(tech);
      }
      for (const item of toUnlock) {
        await this.upgrade(item, "science");
      }
    }
    async autoPolicy() {
      const policies = this._host.game.science.policies;
      const toUnlock = new Array();
      for (const setting2 of Object.values(this.settings.policies.policies)) {
        if (!setting2.enabled) {
          continue;
        }
        const targetPolicy = policies.find((subject) => subject.name === setting2.policy);
        if (isNil(targetPolicy)) {
          cerror(`Policy '${setting2.policy}' not found in game!`);
          continue;
        }
        if (!targetPolicy.researched && !targetPolicy.blocked && targetPolicy.unlocked) {
          if (targetPolicy.requiredLeaderJob === void 0 || this._host.game.village.leader !== null && this._host.game.village.leader.job === targetPolicy.requiredLeaderJob) {
            toUnlock.push(targetPolicy);
          }
        }
      }
      for (const item of toUnlock) {
        await this.upgrade(item, "policy");
      }
    }
    observeStars() {
      if (this._host.game.calendar.observeBtn !== null) {
        this._host.game.calendar.observeHandler();
        this._host.engine.iactivity("act.observe", [], "ks-star");
        this._host.engine.storeForSummary("stars", 1);
      }
    }
  }
  class MissionSetting extends Setting {
    constructor(mission, enabled = false) {
      super(enabled);
      __privateAdd(this, _mission);
      __privateSet(this, _mission, mission);
    }
    get mission() {
      return __privateGet(this, _mission);
    }
  }
  _mission = new WeakMap();
  class MissionSettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "missions");
      this.missions = this.initMissions();
    }
    initMissions() {
      const items = {};
      for (const item of Missions) {
        items[item] = new MissionSetting(item);
      }
      return items;
    }
    static validateGame(game2, settings) {
      const inSettings = Object.keys(settings.missions);
      const inGame = game2.space.programs.map((program) => program.name);
      const missingInSettings = difference(inGame, inSettings);
      const redundantInSettings = difference(inSettings, inGame);
      for (const mission of missingInSettings) {
        cwarn(`The space mission '${mission}' is not tracked in Kitten Scientists!`);
      }
      for (const mission of redundantInSettings) {
        cwarn(`The space mission '${mission}' is not a space mission in Kittens Game!`);
      }
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.missions, settings.missions, (mission, item) => {
        mission.enabled = (item == null ? void 0 : item.enabled) ?? mission.enabled;
      });
    }
  }
  class SpaceBuildingSetting extends SettingTriggerMax {
    constructor(building) {
      super();
      __privateAdd(this, _building3);
      __privateSet(this, _building3, building);
    }
    get building() {
      return __privateGet(this, _building3);
    }
  }
  _building3 = new WeakMap();
  class SpaceSettings extends SettingTrigger {
    constructor(enabled = false, trigger = -1, unlockMissions = new MissionSettings()) {
      super(enabled, trigger);
      __publicField(this, "buildings");
      __publicField(this, "unlockMissions");
      this.buildings = this.initBuildings();
      this.unlockMissions = unlockMissions;
    }
    initBuildings() {
      const items = {};
      for (const item of SpaceBuildings) {
        items[item] = new SpaceBuildingSetting(item);
      }
      return items;
    }
    static validateGame(game2, settings) {
      MissionSettings.validateGame(game2, settings.unlockMissions);
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.max = (item == null ? void 0 : item.max) ?? building.max;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
      this.unlockMissions.load(settings.unlockMissions);
    }
  }
  class SpaceManager {
    constructor(host, workshopManager, settings = new SpaceSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bulkManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Space");
      this._workshopManager = workshopManager;
      this._bulkManager = new BulkPurchaseHelper(this._host, this._workshopManager);
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.manager.render();
      this.autoBuild(context);
      if (this.settings.unlockMissions.enabled) {
        this.autoUnlock(context);
      }
    }
    autoBuild(context, builds = this.settings.buildings) {
      const bulkManager = this._bulkManager;
      const sectionTrigger = this.settings.trigger;
      const metaData = {};
      for (const build of Object.values(builds)) {
        metaData[build.building] = this.getBuild(build.building);
      }
      const buildList = bulkManager.bulk(builds, metaData, sectionTrigger, "Space");
      for (const build of buildList) {
        if (build.count <= 0) {
          continue;
        }
        if (0 === this.build(build.id, build.count)) {
          continue;
        }
        context.requestGameUiRefresh = true;
      }
    }
    autoUnlock(context) {
      var _a, _b;
      if (!this._host.game.tabs[6].visible) {
        return;
      }
      const missions = this._host.game.space.meta[0].meta;
      missionLoop: for (let i = 0; i < missions.length; i++) {
        if (0 < missions[i].val || !missions[i].unlocked || !this.settings.unlockMissions.missions[missions[i].name].enabled) {
          continue;
        }
        const model = (_a = this.manager.tab.GCPanel) == null ? void 0 : _a.children[i];
        if (isNil(model)) {
          return;
        }
        const prices = mustExist((_b = model.model) == null ? void 0 : _b.prices);
        for (const resource of prices) {
          if (this._workshopManager.getValueAvailable(resource.name) < resource.val) {
            continue missionLoop;
          }
        }
        model.domNode.click();
        context.requestGameUiRefresh = true;
        if (i === 7 || i === 12) {
          this._host.engine.iactivity("upgrade.space.mission", [missions[i].label], "ks-upgrade");
        } else {
          this._host.engine.iactivity("upgrade.space", [missions[i].label], "ks-upgrade");
        }
      }
    }
    build(name, amount) {
      let amountCalculated = amount;
      const build = this.getBuild(name);
      const button2 = this._getBuildButton(name);
      if (!build.unlocked || !(button2 == null ? void 0 : button2.model) || !this.settings.buildings[name].enabled) {
        return 0;
      }
      if (!button2.model.enabled) {
        return 0;
      }
      const amountTemp = amountCalculated;
      const label2 = build.label;
      amountCalculated = this._bulkManager.construct(button2.model, button2, amountCalculated);
      if (amountCalculated !== amountTemp) {
        cwarn(`${label2} Amount ordered: ${amountTemp} Amount Constructed: ${amountCalculated}`);
      }
      this._host.engine.storeForSummary(label2, amountCalculated, "build");
      if (amountCalculated === 1) {
        this._host.engine.iactivity("act.build", [label2], "ks-build");
      } else {
        this._host.engine.iactivity(
          "act.builds",
          [label2, this._host.renderAbsolute(amountCalculated)],
          "ks-build"
        );
      }
      return amountCalculated;
    }
    getBuild(name) {
      return this._host.game.space.getBuilding(name);
    }
    _getBuildButton(id) {
      const panels = this.manager.tab.planetPanels;
      if (isNil(panels)) {
        return null;
      }
      for (const panel of panels) {
        const button2 = panel.children.find((child) => child.id === id);
        if (!isNil(button2)) {
          return button2;
        }
      }
      return null;
    }
  }
  class ResetBonfireBuildingSetting extends SettingThreshold {
    constructor(building, enabled = false, threshold = -1, baseStage) {
      super(enabled, threshold);
      __privateAdd(this, _baseBuilding2);
      __privateAdd(this, _building4);
      __privateAdd(this, _stage2, 0);
      __privateSet(this, _building4, building);
      if (baseStage) {
        __privateSet(this, _stage2, 1);
        __privateSet(this, _baseBuilding2, baseStage);
      }
    }
    get baseBuilding() {
      return __privateGet(this, _baseBuilding2);
    }
    get building() {
      return __privateGet(this, _building4);
    }
    get stage() {
      return __privateGet(this, _stage2);
    }
  }
  _baseBuilding2 = new WeakMap();
  _building4 = new WeakMap();
  _stage2 = new WeakMap();
  class ResetBonfireSettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = this.initBuildings();
    }
    initBuildings() {
      const baseStage = {
        broadcasttower: "amphitheatre",
        dataCenter: "library",
        hydroplant: "aqueduct",
        solarfarm: "pasture",
        spaceport: "warehouse"
      };
      const items = {};
      for (const item of Buildings) {
        if (item === "unicornPasture") {
          continue;
        }
        items[item] = new ResetBonfireBuildingSetting(item);
      }
      for (const item of StagedBuildings) {
        items[item] = new ResetBonfireBuildingSetting(item, false, -1, baseStage[item]);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
    }
  }
  class ResetReligionBuildingSetting extends SettingThreshold {
    constructor(building, variant, enabled = false, threshold = -1) {
      super(enabled, threshold);
      __privateAdd(this, _building5);
      __privateAdd(this, _variant2);
      __privateSet(this, _building5, building);
      __privateSet(this, _variant2, variant);
    }
    get building() {
      return __privateGet(this, _building5);
    }
    get variant() {
      return __privateGet(this, _variant2);
    }
  }
  _building5 = new WeakMap();
  _variant2 = new WeakMap();
  class ResetReligionSettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = this.initBuildings();
    }
    initBuildings() {
      const items = {};
      for (const item of ReligionUpgrades) {
        items[item] = new ResetReligionBuildingSetting(item, UnicornItemVariant.OrderOfTheSun);
      }
      for (const item of TranscendenceUpgrades) {
        items[item] = new ResetReligionBuildingSetting(item, UnicornItemVariant.Cryptotheology);
      }
      for (const item of ZiggurathUpgrades) {
        items[item] = new ResetReligionBuildingSetting(item, UnicornItemVariant.Ziggurat);
      }
      items.unicornPasture = new ResetReligionBuildingSetting(
        "unicornPasture",
        UnicornItemVariant.UnicornPasture
      );
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
    }
  }
  class ResetResourcesSettingsItem extends SettingThreshold {
    constructor(resource, enabled = false, threshold = -1) {
      super(enabled, threshold);
      __privateAdd(this, _resource);
      __privateSet(this, _resource, resource);
    }
    get resource() {
      return __privateGet(this, _resource);
    }
  }
  _resource = new WeakMap();
  class ResetResourcesSettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "resources");
      this.resources = this.initResources();
    }
    initResources() {
      const items = {};
      for (const item of Resources) {
        items[item] = new ResetResourcesSettingsItem(item);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.resources, settings.resources, (resource, item) => {
        resource.enabled = (item == null ? void 0 : item.enabled) ?? resource.enabled;
        resource.trigger = (item == null ? void 0 : item.trigger) ?? resource.trigger;
      });
    }
  }
  class ResetSpaceBuildingSetting extends SettingThreshold {
    constructor(building, enabled = false, threshold = -1) {
      super(enabled, threshold);
      __privateAdd(this, _building6);
      __privateSet(this, _building6, building);
    }
    get building() {
      return __privateGet(this, _building6);
    }
  }
  _building6 = new WeakMap();
  class ResetSpaceSettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = this.initBuildings();
    }
    initBuildings() {
      const items = {};
      for (const item of SpaceBuildings) {
        items[item] = new ResetSpaceBuildingSetting(item);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
    }
  }
  class ResetTimeBuildingSetting extends SettingThreshold {
    constructor(id, variant, enabled = false, threshold = -1) {
      super(enabled, threshold);
      __privateAdd(this, _building7);
      __privateAdd(this, _variant3);
      __privateSet(this, _building7, id);
      __privateSet(this, _variant3, variant);
    }
    get building() {
      return __privateGet(this, _building7);
    }
    get variant() {
      return __privateGet(this, _variant3);
    }
  }
  _building7 = new WeakMap();
  _variant3 = new WeakMap();
  class ResetTimeSettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "buildings");
      this.buildings = this.initBuildings();
    }
    initBuildings() {
      const items = {};
      for (const item of ChronoForgeUpgrades) {
        items[item] = new ResetTimeBuildingSetting(item, TimeItemVariant.Chronoforge);
      }
      for (const item of VoidSpaceUpgrades) {
        if (item === "usedCryochambers") {
          continue;
        }
        items[item] = new ResetTimeBuildingSetting(item, TimeItemVariant.VoidSpace);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
    }
  }
  class ResetUpgradeSettingsItem extends Setting {
    constructor(upgrade, enabled = false) {
      super(enabled);
      __privateAdd(this, _upgrade2);
      __privateSet(this, _upgrade2, upgrade);
    }
    get upgrade() {
      return __privateGet(this, _upgrade2);
    }
  }
  _upgrade2 = new WeakMap();
  class ResetUpgradeSettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "upgrades");
      this.upgrades = this.initUpgrades();
    }
    initUpgrades() {
      const items = {};
      for (const item of Upgrades) {
        items[item] = new ResetUpgradeSettingsItem(item);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.upgrades, settings.upgrades, (upgrade, item) => {
        upgrade.enabled = (item == null ? void 0 : item.enabled) ?? upgrade.enabled;
      });
    }
  }
  class ResetSettings extends Setting {
    constructor(enabled = false, bonfire = new ResetBonfireSettings(), religion = new ResetReligionSettings(), resources = new ResetResourcesSettings(), space = new ResetSpaceSettings(), time = new ResetTimeSettings(), upgrades = new ResetUpgradeSettings()) {
      super(enabled);
      __publicField(this, "bonfire");
      __publicField(this, "religion");
      __publicField(this, "resources");
      __publicField(this, "space");
      __publicField(this, "time");
      __publicField(this, "upgrades");
      this.bonfire = bonfire;
      this.religion = religion;
      this.resources = resources;
      this.space = space;
      this.time = time;
      this.upgrades = upgrades;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.bonfire.load(settings.bonfire);
      this.religion.load(settings.religion);
      this.resources.load(settings.resources);
      this.space.load(settings.space);
      this.time.load(settings.time);
      this.upgrades.load(settings.upgrades);
    }
  }
  class TimeSkipHeatSettings extends SettingTrigger {
    constructor(activeHeatTransferStatus = new Setting()) {
      super(false, 1);
      __publicField(this, "cycles");
      __publicField(this, "activeHeatTransferStatus");
      this.cycles = this.initCycles();
      this.activeHeatTransferStatus = activeHeatTransferStatus;
    }
    initCycles() {
      const items = {};
      for (const item of Cycles) {
        items[item] = new Setting();
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.cycles, settings.cycles, (cycle, item) => {
        cycle.enabled = (item == null ? void 0 : item.enabled) ?? cycle.enabled;
      });
      this.activeHeatTransferStatus.load(settings.activeHeatTransferStatus);
    }
  }
  class TimeSkipSettings extends SettingThresholdMax {
    constructor(ignoreOverheat = new Setting(), activeHeatTransfer = new TimeSkipHeatSettings()) {
      super(false, 5);
      __publicField(this, "cycles");
      __publicField(this, "seasons");
      __publicField(this, "activeHeatTransfer");
      __publicField(this, "ignoreOverheat");
      this.cycles = this.initCycles();
      this.seasons = this.initSeason();
      this.activeHeatTransfer = activeHeatTransfer;
      this.ignoreOverheat = ignoreOverheat;
    }
    initCycles() {
      const items = {};
      for (const item of Cycles) {
        items[item] = new Setting();
      }
      return items;
    }
    initSeason() {
      const items = {};
      for (const item of Seasons) {
        items[item] = new Setting();
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.cycles, settings.cycles, (cycle, item) => {
        cycle.enabled = (item == null ? void 0 : item.enabled) ?? cycle.enabled;
      });
      consumeEntriesPedantic(this.seasons, settings.seasons, (season, item) => {
        season.enabled = (item == null ? void 0 : item.enabled) ?? season.enabled;
      });
      this.ignoreOverheat.load(settings.ignoreOverheat);
      this.activeHeatTransfer.load(settings.activeHeatTransfer);
    }
  }
  class TimeControlSettings extends Setting {
    constructor(enabled = false, accelerateTime = new SettingTrigger(false, 1), reset2 = new ResetSettings(), timeSkip = new TimeSkipSettings()) {
      super(enabled);
      __publicField(this, "accelerateTime");
      __publicField(this, "timeSkip");
      __publicField(this, "reset");
      this.accelerateTime = accelerateTime;
      this.reset = reset2;
      this.timeSkip = timeSkip;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.accelerateTime.load(settings.accelerateTime);
      this.reset.load(settings.reset);
      this.timeSkip.load(settings.timeSkip);
    }
  }
  class TimeControlManager {
    constructor(host, bonfireManager, religionManager, spaceManager, workshopManager, settings = new TimeControlSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bonfireManager");
      __publicField(this, "_religionManager");
      __publicField(this, "_spaceManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Time");
      this._bonfireManager = bonfireManager;
      this._religionManager = religionManager;
      this._spaceManager = spaceManager;
      this._workshopManager = workshopManager;
    }
    async tick(_context) {
      if (!this.settings.enabled) {
        return;
      }
      if (this.settings.accelerateTime.enabled) {
        this.accelerateTime();
      }
      if (this.settings.timeSkip.enabled) {
        this.timeSkip();
      }
      if (this.settings.reset.enabled) {
        await this.autoReset(this._host.engine);
      }
    }
    async autoReset(engine) {
      if (this._host.game.challenges.currentChallenge) {
        return;
      }
      const checkedList = [];
      const checkList = [];
      const check = (buttons) => {
        if (checkList.length !== 0) {
          for (const button2 of buttons) {
            if (isNil(button2.model)) {
              continue;
            }
            const name = button2.model.metadata.name;
            const index = checkList.indexOf(name);
            if (index !== -1) {
              checkList.splice(index, 1);
              if (this._host.game.resPool.hasRes(mustExist(button2.model.prices))) {
                return true;
              }
            }
          }
        }
        return false;
      };
      for (const [name, entry] of objectEntries(this.settings.reset.bonfire.buildings))
        if (entry.enabled) {
          let bld;
          try {
            bld = this._host.game.bld.getBuildingExt(name);
          } catch (_error) {
            bld = null;
          }
          if (isNil(bld)) {
            continue;
          }
          checkedList.push({
            name: bld.meta.label ?? mustExist(bld.meta.stages)[mustExist(bld.meta.stage)].label,
            trigger: entry.trigger,
            val: bld.meta.val
          });
          if (0 < entry.trigger) {
            if (bld.meta.val < entry.trigger) {
              return;
            }
          } else {
            checkList.push(name);
          }
        }
      const unicornPasture = this.settings.reset.religion.buildings.unicornPasture;
      if (unicornPasture.enabled) {
        const bld = this._host.game.bld.getBuildingExt("unicornPasture");
        checkedList.push({
          name: mustExist(bld.meta.label),
          trigger: unicornPasture.trigger,
          val: bld.meta.val
        });
        if (0 < unicornPasture.trigger) {
          if (bld.meta.val < unicornPasture.trigger) {
            return;
          }
        } else {
          checkList.push("unicornPasture");
        }
      }
      if (check(
        this._bonfireManager.manager.tab.children
      ) || checkList.length) {
        return;
      }
      for (const [name, entry] of objectEntries(this.settings.reset.space.buildings)) {
        if (entry.enabled) {
          const bld = this._host.game.space.getBuilding(name);
          checkedList.push({ name: bld.label, trigger: entry.trigger, val: bld.val });
          if (0 < entry.trigger) {
            if (bld.val < entry.trigger) {
              return;
            }
          } else {
            checkList.push(name);
          }
        }
      }
      if (checkList.length === 0) {
        const panels = mustExist(this._spaceManager.manager.tab.planetPanels);
        for (const panel of panels) {
          for (const panelButton of panel.children) {
            const model = panelButton.model;
            const name = model.metadata.name;
            const index = checkList.indexOf(name);
            if (index !== -1) {
              checkList.splice(index, 1);
              if (this._host.game.resPool.hasRes(mustExist(model.prices))) {
                break;
              }
            }
          }
        }
      }
      if (checkList.length) {
        return;
      }
      for (const [name, entry] of objectEntries(this.settings.reset.religion.buildings)) {
        if (!entry.enabled) {
          continue;
        }
        const bld = mustExist(this._religionManager.getBuild(name, entry.variant));
        checkedList.push({ name: bld.label, trigger: entry.trigger, val: bld.val });
        if (0 < entry.trigger) {
          if (bld.val < entry.trigger) {
            return;
          }
        } else {
          checkList.push(name);
        }
      }
      if (check(
        this._religionManager.manager.tab.zgUpgradeButtons
      ) || check(
        this._religionManager.manager.tab.rUpgradeButtons
      ) || check(
        this._religionManager.manager.tab.children[0].children[0].children
      ) || checkList.length) {
        return;
      }
      for (const [name, entry] of objectEntries(this.settings.reset.time.buildings)) {
        if (entry.enabled) {
          const bld = mustExist(this.getBuild(name, entry.variant));
          checkedList.push({ name: bld.label, trigger: entry.trigger, val: bld.val });
          if (0 < entry.trigger) {
            if (bld.val < entry.trigger) {
              return;
            }
          } else {
            checkList.push(name);
          }
        }
      }
      if (check(
        this.manager.tab.children[2].children[0].children
      ) || check(
        this.manager.tab.children[3].children[0].children
      ) || checkList.length) {
        return;
      }
      for (const [name, entry] of objectEntries(this.settings.reset.resources.resources)) {
        if (entry.enabled) {
          const res = mustExist(this._host.game.resPool.get(name));
          checkedList.push({
            name: this._host.engine.i18n(`$resources.${entry.resource}.title`),
            trigger: entry.trigger,
            val: res.value
          });
          if (res.value < entry.trigger) {
            return;
          }
        }
      }
      for (const [, entry] of objectEntries(this.settings.reset.upgrades.upgrades)) {
        if (entry.enabled) {
          const upgrade = mustExist(
            this._host.game.workshop.upgrades.find((subject) => subject.name === entry.upgrade)
          );
          checkedList.push({ name: upgrade.label, trigger: 1, val: upgrade.researched ? 1 : 0 });
          if (!upgrade.researched) {
            return;
          }
        }
      }
      engine.stop(false);
      const sleep2 = async (time = 1500) => {
        return new Promise((resolve, reject) => {
          if (!this._host.engine.settings.enabled) {
            reject(new Error("canceled by player"));
            return;
          }
          setTimeout(resolve, time);
        });
      };
      try {
        for (const checked2 of checkedList) {
          await sleep2(500);
          this._host.engine.imessage("reset.check", [
            checked2.name,
            this._host.game.getDisplayValueExt(checked2.trigger),
            this._host.game.getDisplayValueExt(checked2.val)
          ]);
        }
        await sleep2(0);
        this._host.engine.imessage("reset.checked");
        await sleep2();
        this._host.engine.iactivity("reset.tip");
        await sleep2();
        this._host.engine.imessage("reset.countdown.10");
        await sleep2(2e3);
        this._host.engine.imessage("reset.countdown.9");
        await sleep2();
        this._host.engine.imessage("reset.countdown.8");
        await sleep2();
        this._host.engine.imessage("reset.countdown.7");
        await sleep2();
        this._host.engine.imessage("reset.countdown.6");
        await sleep2();
        this._host.engine.imessage("reset.countdown.5");
        await sleep2();
        this._host.engine.imessage("reset.countdown.4");
        await sleep2();
        this._host.engine.imessage("reset.countdown.3");
        await sleep2();
        this._host.engine.imessage("reset.countdown.2");
        await sleep2();
        this._host.engine.imessage("reset.countdown.1");
        await sleep2();
        this._host.engine.imessage("reset.countdown.0");
        await sleep2();
        this._host.engine.iactivity("reset.last.message");
        await sleep2();
      } catch (_error) {
        this._host.engine.imessage("reset.cancel.message");
        this._host.engine.iactivity("reset.cancel.activity");
        return;
      }
      for (let challengeIndex = 0; challengeIndex < this._host.game.challenges.challenges.length; challengeIndex++) {
        this._host.game.challenges.challenges[challengeIndex].pending = false;
      }
      this._host.game.resetAutomatic();
    }
    accelerateTime() {
      const temporalFluxAvailable = this._workshopManager.getValueAvailable("temporalFlux");
      if (temporalFluxAvailable <= 0) {
        if (this._host.game.time.isAccelerated) {
          this._host.game.time.isAccelerated = false;
        }
        return;
      }
      if (this._host.game.time.isAccelerated) {
        return;
      }
      const temporalFlux = this._host.game.resPool.get("temporalFlux");
      if (temporalFlux.maxValue * this.settings.accelerateTime.trigger <= temporalFlux.value) {
        this._host.game.time.isAccelerated = true;
        this._host.engine.iactivity("act.accelerate", [], "ks-accelerate");
        this._host.engine.storeForSummary("accelerate", 1);
      }
    }
    timeSkip() {
      if (!this._host.game.workshop.get("chronoforge").researched) {
        return;
      }
      if (this._host.game.calendar.day < 0) {
        return;
      }
      const shatterCostIncreaseChallenge = this._host.game.getEffect("shatterCostIncreaseChallenge");
      const timeCrystalsAvailable = this._workshopManager.getValueAvailable("timeCrystal");
      if (timeCrystalsAvailable < this.settings.timeSkip.trigger || timeCrystalsAvailable < 1 + shatterCostIncreaseChallenge) {
        return;
      }
      const shatterVoidCost = this._host.game.getEffect("shatterVoidCost");
      const voidAvailable = this._workshopManager.getValueAvailable("void");
      if (voidAvailable < shatterVoidCost) {
        return;
      }
      const season = this._host.game.calendar.season;
      if (!this.settings.timeSkip.seasons[this._host.game.calendar.seasons[season].name].enabled) {
        return;
      }
      const currentCycle = this._host.game.calendar.cycle;
      if (!this.settings.timeSkip.cycles[Cycles[currentCycle]].enabled) {
        return;
      }
      const heatMax = this._host.game.getEffect("heatMax");
      const heatNow = this._host.game.time.heat;
      if (!this.settings.timeSkip.ignoreOverheat.enabled) {
        if (heatMax <= heatNow) {
          return;
        }
      }
      const factor = this._host.game.challenges.getChallenge("1000Years").researched ? 5 : 10;
      let maxSkipsActiveHeatTransfer = Number.POSITIVE_INFINITY;
      if (!this.settings.timeSkip.ignoreOverheat.enabled && this.settings.timeSkip.activeHeatTransfer.enabled) {
        const heatPerTick = this._host.game.getEffect("heatPerTick");
        const ticksPerSecond = this._host.game.ticksPerSecond;
        if (this.settings.timeSkip.activeHeatTransfer.activeHeatTransferStatus.enabled) {
          if (heatNow <= heatMax * this.settings.timeSkip.activeHeatTransfer.trigger) {
            this.settings.timeSkip.activeHeatTransfer.activeHeatTransferStatus.enabled = false;
            this._host.refreshUi();
            this._host.engine.iactivity("act.time.activeHeatTransferEnd", [], "ks-timeSkip");
          }
          const temporalFluxProduction = this._host.game.getEffect("temporalFluxProduction");
          const daysPerYear = (this._host.game.calendar.daysPerSeason + 10 + this._host.game.getEffect("temporalParadoxDay")) * this._host.game.calendar.seasonsPerYear;
          const ticksPerDay = this._host.game.calendar.ticksPerDay;
          const daysPerTicks = (1 + this._host.game.timeAccelerationRatio()) / ticksPerDay;
          const ticksPerYear = daysPerYear / daysPerTicks;
          const temporalFlux = this._host.game.resPool.get("temporalFlux");
          const fluxEnabled = temporalFlux.maxValue > ticksPerYear;
          const flux = temporalFlux.value < ticksPerYear;
          if (!season && this._host.game.calendar.day < 10 && temporalFluxProduction > factor / heatPerTick && this.settings.accelerateTime.enabled && fluxEnabled && flux) {
            maxSkipsActiveHeatTransfer = Math.ceil(
              (ticksPerYear + ticksPerDay * 10 - temporalFlux.value) / temporalFluxProduction
            );
            this._host.engine.iactivity("act.time.getTemporalFlux", [], "ks-timeSkip");
            this._host.engine.storeForSummary("time.getTemporalFlux", 1);
          } else if (this.settings.timeSkip.activeHeatTransfer.cycles[Cycles[currentCycle]].enabled) {
            return;
          } else {
            maxSkipsActiveHeatTransfer = this._host.game.calendar.yearsPerCycle - this._host.game.calendar.cycleYear;
          }
        } else if (heatNow >= heatMax - heatPerTick * ticksPerSecond * 10) {
          this.settings.timeSkip.activeHeatTransfer.activeHeatTransferStatus.enabled = true;
          this._host.refreshUi();
          this._host.engine.iactivity("act.time.activeHeatTransferStart", [], "ks-timeSkip");
          this._host.engine.storeForSummary("time.activeHeatTransferStart", 1);
        }
      }
      const maxSkips = negativeOneToInfinity(this.settings.timeSkip.max);
      let canSkip = Math.floor(
        Math.min(
          this.settings.timeSkip.ignoreOverheat.enabled ? Number.POSITIVE_INFINITY : (heatMax - heatNow) / factor,
          maxSkips,
          maxSkipsActiveHeatTransfer,
          timeCrystalsAvailable / (1 + shatterCostIncreaseChallenge),
          0 < shatterVoidCost ? voidAvailable / shatterVoidCost : Number.POSITIVE_INFINITY
        )
      );
      let willSkip = 0;
      const yearsPerCycle = this._host.game.calendar.yearsPerCycle;
      const remainingYearsCurrentCycle = yearsPerCycle - this._host.game.calendar.cycleYear;
      const cyclesPerEra = this._host.game.calendar.cyclesPerEra;
      if (canSkip < remainingYearsCurrentCycle) {
        willSkip = canSkip;
      } else {
        willSkip += remainingYearsCurrentCycle;
        canSkip -= remainingYearsCurrentCycle;
        let skipCycles = 1;
        while (yearsPerCycle < canSkip && this.settings.timeSkip.cycles[Cycles[(currentCycle + skipCycles) % cyclesPerEra]].enabled) {
          willSkip += yearsPerCycle;
          canSkip -= yearsPerCycle;
          skipCycles += 1;
        }
        if (this.settings.timeSkip.cycles[Cycles[(currentCycle + skipCycles) % cyclesPerEra]].enabled && 0 < canSkip) {
          willSkip += canSkip;
        }
      }
      if (0 < willSkip) {
        const shatter = this._host.game.timeTab.cfPanel.children[0].children[0];
        if (isNil(shatter.model)) {
          return;
        }
        this._host.engine.iactivity("act.time.skip", [willSkip], "ks-timeSkip");
        shatter.controller.doShatterAmt(shatter.model, willSkip);
        this._host.engine.storeForSummary("time.skip", willSkip);
      }
    }
    getBuild(name, variant) {
      if (variant === TimeItemVariant.Chronoforge) {
        return this._host.game.time.getCFU(name);
      }
      return this._host.game.time.getVSU(name);
    }
  }
  class TimeSettingsItem extends SettingTriggerMax {
    constructor(building, variant, enabled = false) {
      super(enabled);
      __privateAdd(this, _building8);
      __privateAdd(this, _variant4);
      __privateSet(this, _building8, building);
      __privateSet(this, _variant4, variant);
    }
    get building() {
      return __privateGet(this, _building8);
    }
    get variant() {
      return __privateGet(this, _variant4);
    }
  }
  _building8 = new WeakMap();
  _variant4 = new WeakMap();
  class TimeSettings extends SettingTrigger {
    constructor(enabled = false, trigger = -1, fixCryochambers = new Setting()) {
      super(enabled, trigger);
      __publicField(this, "buildings");
      __publicField(this, "fixCryochambers");
      this.buildings = this.initBuildings();
      this.fixCryochambers = fixCryochambers;
    }
    initBuildings() {
      const items = {};
      for (const item of ChronoForgeUpgrades) {
        items[item] = new TimeSettingsItem(item, TimeItemVariant.Chronoforge);
      }
      for (const item of VoidSpaceUpgrades) {
        if (item === "usedCryochambers") {
          continue;
        }
        items[item] = new TimeSettingsItem(item, TimeItemVariant.VoidSpace);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.buildings, settings.buildings, (building, item) => {
        building.enabled = (item == null ? void 0 : item.enabled) ?? building.enabled;
        building.max = (item == null ? void 0 : item.max) ?? building.max;
        building.trigger = (item == null ? void 0 : item.trigger) ?? building.trigger;
      });
      this.fixCryochambers.load(settings.fixCryochambers);
    }
  }
  class TimeManager {
    constructor(host, workshopManager, settings = new TimeSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_bulkManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Time");
      this._bulkManager = new BulkPurchaseHelper(this._host, workshopManager);
      this._workshopManager = workshopManager;
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.manager.render();
      this.autoBuild(context);
      if (this.settings.fixCryochambers.enabled) {
        this.fixCryochambers();
      }
    }
    autoBuild(context, builds = this.settings.buildings) {
      const bulkManager = this._bulkManager;
      const sectionTrigger = this.settings.trigger;
      const metaData = {};
      for (const build of Object.values(builds)) {
        const buildMeta = this.getBuild(build.building, build.variant);
        metaData[build.building] = mustExist(buildMeta);
        const buildButton = this.getBuildButton(build.building, build.variant);
        if (isNil(buildButton)) {
          continue;
        }
        const model = buildButton.model;
        const panel = build.variant === TimeItemVariant.Chronoforge ? this.manager.tab.cfPanel : this.manager.tab.vsPanel;
        const buildingMetaData = mustExist(metaData[build.building]);
        buildingMetaData.tHidden = !(model == null ? void 0 : model.visible) || !model.enabled || !panel.visible;
      }
      const buildList = bulkManager.bulk(builds, metaData, sectionTrigger, "Time");
      for (const build of buildList) {
        if (build.count > 0) {
          this.build(
            build.id,
            build.variant,
            build.count
          );
          context.requestGameUiRefresh = true;
        }
      }
    }
    build(name, variant, amount) {
      var _a;
      let amountCalculated = amount;
      const build = mustExist(this.getBuild(name, variant));
      const button2 = this.getBuildButton(name, variant);
      if (!button2 || !((_a = button2.model) == null ? void 0 : _a.enabled)) {
        return;
      }
      const amountTemp = amountCalculated;
      const label2 = build.label;
      amountCalculated = this._bulkManager.construct(button2.model, button2, amountCalculated);
      if (amountCalculated !== amountTemp) {
        cwarn(`${label2} Amount ordered: ${amountTemp} Amount Constructed: ${amountCalculated}`);
      }
      this._host.engine.storeForSummary(label2, amountCalculated, "build");
      if (amountCalculated === 1) {
        this._host.engine.iactivity("act.build", [label2], "ks-build");
      } else {
        this._host.engine.iactivity(
          "act.builds",
          [label2, this._host.renderAbsolute(amountCalculated)],
          "ks-build"
        );
      }
    }
    getBuild(name, variant) {
      if (variant === TimeItemVariant.Chronoforge) {
        return this._host.game.time.getCFU(name);
      }
      return this._host.game.time.getVSU(name);
    }
    getBuildButton(name, variant) {
      let buttons;
      if (variant === TimeItemVariant.Chronoforge) {
        buttons = this.manager.tab.children[2].children[0].children;
      } else {
        buttons = this.manager.tab.children[3].children[0].children;
      }
      return buttons.find((button2) => button2.id === name) ?? null;
    }
    fixCryochambers() {
      if (this._host.game.time.getVSU("usedCryochambers").val < 1) {
        return;
      }
      const prices = mustExist(this._host.game.time.getVSU("usedCryochambers").fixPrices);
      for (const price of prices) {
        const available = this._workshopManager.getValueAvailable(price.name);
        if (available < price.val) {
          return;
        }
      }
      const btn = this.manager.tab.vsPanel.children[0].children[0];
      let fixed = 0;
      let fixHappened;
      do {
        fixHappened = false;
        btn.controller.buyItem(
          btn.model,
          new MouseEvent("click"),
          (didHappen) => {
            fixHappened = didHappen;
            fixed += didHappen ? 1 : 0;
          }
        );
      } while (fixHappened);
      if (0 < fixed) {
        this._host.engine.iactivity("act.fix.cry", [this._host.renderAbsolute(fixed)], "ks-fixCry");
        this._host.engine.storeForSummary("fix.cry", fixed);
      }
    }
  }
  class EmbassySetting extends SettingMax {
    constructor(race, enabled = false) {
      super(enabled);
      __privateAdd(this, _race);
      __privateSet(this, _race, race);
    }
    get race() {
      return __privateGet(this, _race);
    }
  }
  _race = new WeakMap();
  class EmbassySettings extends SettingTrigger {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "races");
      this.races = this.initRaces();
    }
    initRaces() {
      const items = {};
      for (const item of Races) {
        items[item] = new EmbassySetting(item);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.races, settings.races, (race, item) => {
        race.enabled = (item == null ? void 0 : item.enabled) ?? race.enabled;
        race.max = (item == null ? void 0 : item.max) ?? race.max;
      });
    }
  }
  class TradeSettingsItem extends SettingLimitedTrigger {
    constructor(race, enabled, limited, summer, autumn, winter, spring, require2 = false) {
      super(enabled, limited);
      __privateAdd(this, _race2);
      __publicField(this, "seasons");
      __privateAdd(this, _require);
      __privateSet(this, _race2, race);
      this.seasons = {
        summer: new Setting(summer),
        autumn: new Setting(autumn),
        winter: new Setting(winter),
        spring: new Setting(spring)
      };
      __privateSet(this, _require, require2);
    }
    get race() {
      return __privateGet(this, _race2);
    }
    get require() {
      return __privateGet(this, _require);
    }
  }
  _race2 = new WeakMap();
  _require = new WeakMap();
  class TradeSettings extends SettingTrigger {
    constructor(enabled = false, trigger = 1, buildEmbassies = new EmbassySettings(), feedLeviathans = new Setting(), tradeBlackcoin = new SettingBuySellThreshold(false, 1090, 1095, 1e4), unlockRaces = new Setting()) {
      super(enabled, trigger);
      __publicField(this, "races");
      __publicField(this, "feedLeviathans");
      __publicField(this, "buildEmbassies");
      __publicField(this, "tradeBlackcoin");
      __publicField(this, "unlockRaces");
      this.races = this.initRaces();
      this.buildEmbassies = buildEmbassies;
      this.feedLeviathans = feedLeviathans;
      this.tradeBlackcoin = tradeBlackcoin;
      this.unlockRaces = unlockRaces;
    }
    initRaces() {
      const defaultRequire = {
        dragons: "titanium",
        griffins: "wood",
        leviathans: "unobtainium",
        lizards: "minerals",
        sharks: "iron"
      };
      const items = {};
      for (const item of Races) {
        const require2 = defaultRequire[item] ?? false;
        items[item] = new TradeSettingsItem(item, false, false, false, false, false, false, require2);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.races, settings.races, (race, item) => {
        race.enabled = (item == null ? void 0 : item.enabled) ?? race.enabled;
        race.limited = (item == null ? void 0 : item.limited) ?? race.limited;
        race.trigger = (item == null ? void 0 : item.trigger) ?? race.trigger;
        race.seasons.autumn.enabled = (item == null ? void 0 : item.seasons.autumn.enabled) ?? race.seasons.autumn.enabled;
        race.seasons.spring.enabled = (item == null ? void 0 : item.seasons.spring.enabled) ?? race.seasons.spring.enabled;
        race.seasons.summer.enabled = (item == null ? void 0 : item.seasons.summer.enabled) ?? race.seasons.summer.enabled;
        race.seasons.winter.enabled = (item == null ? void 0 : item.seasons.winter.enabled) ?? race.seasons.winter.enabled;
      });
      this.buildEmbassies.load(settings.buildEmbassies);
      this.feedLeviathans.load(settings.feedLeviathans);
      this.tradeBlackcoin.load(settings.tradeBlackcoin);
      this.unlockRaces.load(settings.unlockRaces);
    }
  }
  class TradeManager {
    constructor(host, workshopManager, settings = new TradeSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Trade");
      this._workshopManager = workshopManager;
    }
    tick(context) {
      if (!this.settings.enabled) {
        return;
      }
      this.manager.render();
      this.autoTrade();
      if (this.settings.unlockRaces.enabled) {
        this.autoUnlock(context);
      }
      if (this.settings.buildEmbassies.enabled) {
        this.autoBuildEmbassies(context);
      }
      if (this.settings.feedLeviathans.enabled) {
        this.autoFeedElders();
      }
      if (this.settings.tradeBlackcoin.enabled) {
        this.autoTradeBlackcoin();
      }
    }
    autoTrade(cacheManager) {
      var _a;
      const catpower = this._workshopManager.getResource("manpower");
      const gold = this._workshopManager.getResource("gold");
      const sectionTrigger = this.settings.trigger;
      if (!this.singleTradePossible(sectionTrigger, catpower, gold)) {
        return;
      }
      const trades = [];
      const season = this._host.game.calendar.getCurSeason().name;
      for (const trade of Object.values(this.settings.races)) {
        const race = this.getRace(trade.race);
        const trigger = Engine.evaluateSubSectionTrigger(sectionTrigger, trade.trigger);
        if (trigger < 0 || !trade.enabled || !trade.seasons[season].enabled || !race.unlocked || !this.singleTradePossible(sectionTrigger, catpower, gold, trade)) {
          continue;
        }
        const button2 = this.getTradeButton(race.name);
        if (!((_a = button2 == null ? void 0 : button2.model) == null ? void 0 : _a.enabled)) {
          continue;
        }
        const require2 = trade.require ? this._workshopManager.getResource(trade.require) : false;
        const profitable = this.getProfitability(trade.race);
        if (trade.limited && profitable) {
          trades.push(trade.race);
        } else if (!require2 || trigger <= require2.value / require2.maxValue) {
          trades.push(trade.race);
        }
      }
      if (trades.length === 0) {
        return;
      }
      let maxTrades = this.getLowestTradeAmount(null, true, false);
      if (maxTrades < 1) {
        return;
      }
      const maxByRace = [];
      for (let tradeIndex = 0; tradeIndex < trades.length; tradeIndex++) {
        const race = trades[tradeIndex];
        const tradeSettings = this.settings.races[race];
        const require2 = !tradeSettings.require ? false : this._workshopManager.getResource(tradeSettings.require);
        const trigger = Engine.evaluateSubSectionTrigger(sectionTrigger, tradeSettings.trigger);
        const trigConditions = (!require2 || trigger <= require2.value / require2.maxValue) && trigger <= gold.value / gold.maxValue;
        const tradePos = this.getLowestTradeAmount(race, tradeSettings.limited, trigConditions);
        if (tradePos < 1) {
          trades.splice(tradeIndex, 1);
          tradeIndex--;
          continue;
        }
        maxByRace.push(tradePos);
      }
      if (trades.length === 0) {
        return;
      }
      const tradesDone = {};
      while (0 < trades.length && 1 <= maxTrades) {
        if (maxTrades < trades.length) {
          const randomRaceIndex = Math.floor(Math.random() * trades.length);
          const tradeIndex2 = trades[randomRaceIndex];
          if (isNil(tradesDone[tradeIndex2])) {
            tradesDone[tradeIndex2] = 0;
          }
          tradesDone[tradeIndex2] += 1;
          maxTrades -= 1;
          trades.splice(randomRaceIndex, 1);
          maxByRace.splice(randomRaceIndex, 1);
          continue;
        }
        let minTrades = Math.floor(maxTrades / trades.length);
        let minTradeIndex = 0;
        const tradeIndex = trades[minTradeIndex];
        for (let tradeIndex2 = 0; tradeIndex2 < trades.length; ++tradeIndex2) {
          if (maxByRace[tradeIndex2] < minTrades) {
            minTrades = maxByRace[tradeIndex2];
            minTradeIndex = tradeIndex2;
          }
        }
        if (isNil(tradesDone[tradeIndex])) {
          tradesDone[tradeIndex] = 0;
        }
        tradesDone[tradeIndex] += minTrades;
        maxTrades -= minTrades;
        trades.splice(minTradeIndex, 1);
        maxByRace.splice(minTradeIndex, 1);
      }
      if (Object.values(tradesDone).length === 0) {
        return;
      }
      const tradeNet = {};
      for (const [name, amount] of objectEntries(tradesDone)) {
        const race = this.getRace(name);
        const materials = this.getMaterials(name);
        for (const [mat, matAmount] of objectEntries(materials)) {
          if (!tradeNet[mat]) {
            tradeNet[mat] = 0;
          }
          tradeNet[mat] -= matAmount * amount;
        }
        const meanOutput = this.getAverageTrade(race);
        for (const [out, outValue] of objectEntries(meanOutput)) {
          const res = this._workshopManager.getResource(out);
          if (!tradeNet[out]) {
            tradeNet[out] = 0;
          }
          tradeNet[out] += res.maxValue > 0 ? Math.min(
            mustExist(meanOutput[out]) * mustExist(tradesDone[name]),
            Math.max(res.maxValue - res.value, 0)
          ) : outValue * mustExist(tradesDone[name]);
        }
      }
      if (!isNil(cacheManager)) {
        cacheManager.pushToCache({
          materials: tradeNet,
          timeStamp: this._host.game.timer.ticksTotal
        });
      }
      for (const [name, count] of objectEntries(tradesDone)) {
        if (0 < count) {
          this.trade(name, count);
        }
      }
    }
    autoBuildEmbassies(context) {
      var _a;
      if (!this._host.game.diplomacy.races[0].embassyPrices) {
        return;
      }
      const culture = this._workshopManager.getResource("culture");
      let cultureVal = 0;
      const trigger = this.settings.buildEmbassies.trigger;
      if (culture.value / culture.maxValue < trigger) {
        return;
      }
      const racePanels = this._host.game.diplomacyTab.racePanels;
      cultureVal = this._workshopManager.getValueAvailable("culture");
      const embassyBulk = {};
      const bulkTracker = [];
      for (let panelIndex = 0; panelIndex < racePanels.length; panelIndex++) {
        if (!racePanels[panelIndex].embassyButton) {
          continue;
        }
        const name = racePanels[panelIndex].race.name;
        const race = this._host.game.diplomacy.get(name);
        const max = negativeOneToInfinity(this.settings.buildEmbassies.races[name].max);
        if (!this.settings.buildEmbassies.races[name].enabled || max <= race.embassyLevel || !race.unlocked) {
          continue;
        }
        embassyBulk[name] = {
          val: 0,
          max,
          basePrice: mustExist((_a = race.embassyPrices) == null ? void 0 : _a[0]).val,
          currentEm: race.embassyLevel,
          priceSum: 0,
          race
        };
        bulkTracker.push(name);
      }
      if (bulkTracker.length === 0) {
        return;
      }
      while (bulkTracker.length > 0) {
        for (let raceIndex = 0; raceIndex < bulkTracker.length; raceIndex++) {
          const name = bulkTracker[raceIndex];
          const emBulk = mustExist(embassyBulk[name]);
          if (emBulk.max <= emBulk.currentEm + emBulk.val) {
            bulkTracker.splice(raceIndex, 1);
            --raceIndex;
            continue;
          }
          const nextPrice = emBulk.basePrice * 1.15 ** (emBulk.currentEm + emBulk.val);
          if (nextPrice <= cultureVal) {
            cultureVal -= nextPrice;
            emBulk.priceSum += nextPrice;
            emBulk.val += 1;
            context.requestGameUiRefresh = true;
          } else {
            bulkTracker.splice(raceIndex, 1);
            --raceIndex;
          }
        }
      }
      for (const [, emBulk] of objectEntries(embassyBulk)) {
        if (emBulk.val === 0) {
          continue;
        }
        cultureVal = this._workshopManager.getValueAvailable("culture");
        if (cultureVal < emBulk.priceSum) {
          cwarn("Something has gone horribly wrong.", emBulk.priceSum, cultureVal);
        }
        this._workshopManager.getResource("culture").value -= emBulk.priceSum;
        emBulk.race.embassyLevel += emBulk.val;
        this._host.engine.storeForSummary("embassy", emBulk.val);
        if (emBulk.val !== 1) {
          this._host.engine.iactivity("build.embassies", [emBulk.val, emBulk.race.title], "ks-build");
        } else {
          this._host.engine.iactivity("build.embassy", [emBulk.val, emBulk.race.title], "ks-build");
        }
      }
    }
    autoFeedElders() {
      const leviathanInfo = this._host.game.diplomacy.get("leviathans");
      const necrocorns = this._host.game.resPool.get("necrocorn");
      if (!leviathanInfo.unlocked || necrocorns.value === 0) {
        return;
      }
      if (1 <= necrocorns.value) {
        if (leviathanInfo.energy < this._host.game.diplomacy.getMarkerCap()) {
          this._host.game.diplomacy.feedElders();
          this._host.engine.iactivity("act.feed");
          this._host.engine.storeForSummary("feed", 1);
        }
      } else {
        if (0.25 * (1 + this._host.game.getEffect("corruptionBoostRatio")) < 1) {
          this._host.engine.storeForSummary("feed", necrocorns.value);
          this._host.game.diplomacy.feedElders();
          this._host.engine.iactivity("dispose.necrocorn");
        }
      }
    }
    autoUnlock(context) {
      if (!this._host.game.tabs[4].visible) {
        return;
      }
      const maxRaces = this._host.game.diplomacy.get("leviathans").unlocked ? 8 : 7;
      if (this._host.game.diplomacyTab.racePanels.length < maxRaces) {
        let manpower = this._workshopManager.getValueAvailable("manpower");
        if (!this._host.game.diplomacy.get("lizards").unlocked) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            context.requestGameUiRefresh = true;
          }
        }
        if (!this._host.game.diplomacy.get("sharks").unlocked) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            context.requestGameUiRefresh = true;
          }
        }
        if (!this._host.game.diplomacy.get("griffins").unlocked) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            context.requestGameUiRefresh = true;
          }
        }
        if (!this._host.game.diplomacy.get("nagas").unlocked && this._host.game.resPool.get("culture").value >= 1500) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            context.requestGameUiRefresh = true;
          }
        }
        if (!this._host.game.diplomacy.get("zebras").unlocked && this._host.game.resPool.get("ship").value >= 1) {
          if (manpower >= 1e3) {
            this._host.game.resPool.get("manpower").value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            context.requestGameUiRefresh = true;
          }
        }
        if (!this._host.game.diplomacy.get("spiders").unlocked && mustExist(this._host.game.resPool.get("ship")).value >= 100 && mustExist(this._host.game.resPool.get("science")).maxValue > 125e3) {
          if (manpower >= 1e3) {
            mustExist(this._host.game.resPool.get("manpower")).value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            context.requestGameUiRefresh = true;
          }
        }
        if (!this._host.game.diplomacy.get("dragons").unlocked && this._host.game.science.get("nuclearFission").researched) {
          if (manpower >= 1e3) {
            mustExist(this._host.game.resPool.get("manpower")).value -= 1e3;
            const unlockedRace = this._host.game.diplomacy.unlockRandomRace();
            this._host.engine.iactivity("upgrade.race", [unlockedRace.title], "ks-upgrade");
            manpower -= 1e3;
            context.requestGameUiRefresh = true;
          }
        }
      }
    }
    autoTradeBlackcoin() {
      const coinPrice = this._host.game.calendar.cryptoPrice;
      const relicsInitial = this._host.game.resPool.get("relic").value;
      const coinsInitial = this._host.game.resPool.get("blackcoin").value;
      let coinsExchanged = 0;
      let relicsExchanged = 0;
      if (coinPrice < this.settings.tradeBlackcoin.buy && this.settings.tradeBlackcoin.trigger < relicsInitial) {
        this._host.game.diplomacy.buyBcoin();
        const currentCoin = this._host.game.resPool.get("blackcoin").value;
        coinsExchanged = Math.round(currentCoin - coinsInitial);
        this._host.engine.iactivity("act.blackcoin.buy", [this._host.renderAbsolute(coinsExchanged)]);
      } else if (coinPrice > this.settings.tradeBlackcoin.sell && 0 < this._host.game.resPool.get("blackcoin").value) {
        this._host.game.diplomacy.sellBcoin();
        const relicsCurrent = mustExist(this._host.game.resPool.get("relic")).value;
        relicsExchanged = Math.round(relicsCurrent - relicsInitial);
        this._host.engine.iactivity("act.blackcoin.sell", [
          this._host.renderAbsolute(relicsExchanged)
        ]);
      }
    }
    trade(name, amount) {
      var _a;
      const race = this.getRace(name);
      const button2 = this.getTradeButton(race.name);
      if (!((_a = button2 == null ? void 0 : button2.model) == null ? void 0 : _a.enabled) || !this.settings.races[name].enabled) {
        cwarn(
          "KS trade checks are not functioning properly, please create an issue on the github page."
        );
      }
      this._host.game.diplomacy.tradeMultiple(race, amount);
      this._host.engine.storeForSummary(race.title, amount, "trade");
      this._host.engine.iactivity(
        "act.trade",
        [this._host.renderAbsolute(amount), ucfirst(race.title)],
        "ks-trade"
      );
    }
    getProfitability(name) {
      const race = this.getRace(name);
      let cost = 0;
      const materials = this.getMaterials(name);
      for (const [mat, amount] of objectEntries(materials)) {
        const tick = this._workshopManager.getTickVal(this._workshopManager.getResource(mat));
        if (tick === "ignore") {
          continue;
        }
        if (tick <= 0) {
          return false;
        }
        cost += amount / tick;
      }
      let profit = 0;
      const output = this.getAverageTrade(race);
      for (const [prod, amount] of objectEntries(output)) {
        const resource = this._workshopManager.getResource(prod);
        const tick = this._workshopManager.getTickVal(resource);
        if (tick === "ignore") {
          continue;
        }
        if (tick <= 0) {
          return true;
        }
        profit += 0 < resource.maxValue ? Math.min(amount, Math.max(resource.maxValue - resource.value, 0)) / tick : amount / tick;
      }
      return cost <= profit;
    }
    getAverageTrade(race) {
      const standingRatio = this._host.game.getEffect("standingRatio") + this._host.game.diplomacy.calculateStandingFromPolicies(race.name, this._host.game);
      const raceRatio = 1 + race.energy * 0.02;
      const tradeRatio = 1 + this._host.game.diplomacy.getTradeRatio() + this._host.game.diplomacy.calculateTradeBonusFromPolicies(race.name, this._host.game);
      const failedRatio = race.standing < 0 ? race.standing + standingRatio : 0;
      const successRatio = 0 < failedRatio ? 1 + failedRatio : 1;
      const bonusRatio = 0 < race.standing ? Math.min(race.standing + standingRatio / 2, 1) : 0;
      const output = {};
      for (const item of race.sells) {
        if (!this._isValidTrade(item, race)) {
          output[item.name] = 0;
          continue;
        }
        let mean = 0;
        const tradeChance = race.embassyPrices ? item.chance * (1 + this._host.game.getLimitedDR(0.01 * race.embassyLevel, 0.75)) : item.chance;
        if (race.name === "zebras" && item.name === "titanium") {
          const shipCount = this._host.game.resPool.get("ship").value;
          const titaniumProbability = Math.min(0.15 + shipCount * 35e-4, 1);
          const titaniumRatio = 1 + shipCount / 50;
          mean = 1.5 * titaniumRatio * (successRatio * titaniumProbability);
        } else {
          const seasionRatio = !item.seasons ? 1 : 1 + item.seasons[this._host.game.calendar.getCurSeason().name];
          const normBought = (successRatio - bonusRatio) * Math.min(tradeChance / 100, 1);
          const normBonus = bonusRatio * Math.min(tradeChance / 100, 1);
          mean = (normBought + 1.25 * normBonus) * item.value * raceRatio * seasionRatio * tradeRatio;
        }
        output[item.name] = mean;
      }
      const spiceChance = race.embassyPrices ? 0.35 * (1 + 0.01 * race.embassyLevel) : 0.35;
      const spiceTradeAmount = successRatio * Math.min(spiceChance, 1);
      output.spice = 25 * spiceTradeAmount + 50 * spiceTradeAmount * tradeRatio / 2;
      output.blueprint = 0.1 * successRatio;
      return output;
    }
    _isValidTrade(item, race) {
      return !(item.minLevel && race.embassyLevel < item.minLevel) && (this._host.game.resPool.get(item.name).unlocked || item.name === "titanium" || item.name === "uranium" || race.name === "leviathans");
    }
    getLowestTradeAmount(name, _limited, _trigConditions) {
      let amount = void 0;
      const materials = this.getMaterials(name);
      let total = void 0;
      for (const [resource, required] of objectEntries(materials)) {
        if (resource === "manpower") {
          let manpowerCost = required;
          if (this._host.game.challenges.isActive("postApocalypse")) {
            manpowerCost = required * (1 + this._host.game.bld.getPollutionLevel());
          }
          total = this._workshopManager.getValueAvailable(resource) / manpowerCost;
        } else if (resource === "gold") {
          let goldCost = required;
          if (this._host.game.challenges.isActive("postApocalypse")) {
            goldCost = required * (1 + this._host.game.bld.getPollutionLevel());
          }
          total = this._workshopManager.getValueAvailable(resource) / goldCost;
        } else {
          total = this._workshopManager.getValueAvailable(resource) / required;
        }
        amount = amount === void 0 || total < amount ? total : amount;
      }
      amount = Math.floor(amount ?? 0);
      if (amount === 0) {
        return 0;
      }
      if (name === null || name === "leviathans") {
        return amount;
      }
      const race = this.getRace(name);
      let highestCapacity = 0;
      const tradeOutput = this.getAverageTrade(race);
      for (const item of race.sells) {
        const resource = this._workshopManager.getResource(item.name);
        let max = 0;
        if (!resource.maxValue) {
          continue;
        }
        max = mustExist(tradeOutput[item.name]);
        const capacity = Math.max((resource.maxValue - resource.value) / max, 0);
        highestCapacity = capacity < highestCapacity ? highestCapacity : capacity;
      }
      highestCapacity = Math.ceil(highestCapacity);
      if (highestCapacity === 0) {
        return 0;
      }
      amount = highestCapacity < amount ? Math.max(highestCapacity - 1, 1) : amount;
      return Math.floor(amount);
    }
    getMaterials(race = null) {
      const materials = {
        manpower: 50 - this._host.game.getEffect("tradeCatpowerDiscount"),
        gold: 15 - this._host.game.getEffect("tradeGoldDiscount")
      };
      if (isNil(race)) {
        return materials;
      }
      const prices = this.getRace(race).buys;
      for (const price of prices) {
        materials[price.name] = price.val;
      }
      return materials;
    }
    getRace(name) {
      const raceInfo = this._host.game.diplomacy.get(name);
      if (isNil(raceInfo)) {
        throw new Error(`Unable to retrieve race '${name}'`);
      }
      return raceInfo;
    }
    getTradeButton(race) {
      const panel = this.manager.tab.racePanels.find((subject) => subject.race.name === race);
      return (panel == null ? void 0 : panel.tradeBtn) ?? null;
    }
    singleTradePossible(sectionTrigger, catpower, gold, trade) {
      const trigger = trade ? Engine.evaluateSubSectionTrigger(sectionTrigger, trade.trigger) : sectionTrigger;
      if (trigger < 0 && trade === void 0) {
        return true;
      }
      if (trigger < 0 && trade !== void 0) {
        return false;
      }
      if (catpower.value / catpower.maxValue < trigger || gold.value / gold.maxValue < trigger) {
        return false;
      }
      const materials = this.getMaterials(trade == null ? void 0 : trade.race);
      for (const [resource, amount] of objectEntries(materials)) {
        if (this._workshopManager.getValueAvailable(resource) < amount) {
          return false;
        }
      }
      return true;
    }
  }
  class MaterialsCache {
    constructor(host) {
      __publicField(this, "_host");
      __publicField(this, "_cache", new Array());
      __publicField(this, "_cacheSum", {});
      this._host = host;
    }
    pushToCache(data) {
      this._cache.push(data);
      for (const [mat, amount] of objectEntries(data.materials)) {
        if (!this._cacheSum[mat]) {
          this._cacheSum[mat] = 0;
        }
        this._cacheSum[mat] += amount;
      }
      for (let cacheIndex = 0; cacheIndex < this._cache.length; ++cacheIndex) {
        const oldData = this._cache[cacheIndex];
        if (this._cache.length > 1e4) {
          const oldMaterials = oldData.materials;
          for (const [mat, amount] of objectEntries(oldMaterials)) {
            if (!this._cacheSum[mat]) {
              this._cacheSum[mat] = 0;
            }
            this._cacheSum[mat] -= amount;
          }
          this._cache.shift();
          cacheIndex--;
        } else {
          return;
        }
      }
    }
    getResValue(resource) {
      if (this._cache.length === 0 || !this._cacheSum[resource]) {
        return 0;
      }
      const currentTick = this._host.game.timer.ticksTotal;
      const startingTick = this._cache[0].timeStamp;
      return this._cacheSum[resource] / (currentTick - startingTick);
    }
  }
  class ElectLeaderSettings extends Setting {
    constructor(enabled = false, job = new SettingOptions(
      "any",
      Jobs.map((item) => {
        return { label: "", value: item };
      })
    ), trait = new SettingOptions(
      "none",
      Traits.map((item) => {
        return { label: "", value: item };
      })
    )) {
      super(enabled);
      __publicField(this, "job");
      __publicField(this, "trait");
      this.job = job;
      this.trait = trait;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.job.load(settings.job);
      this.trait.load(settings.trait);
    }
  }
  class VillageSettings extends Setting {
    constructor(enabled = false, holdFestivals = new Setting(), hunt = new SettingTrigger(false, 0.98), promoteKittens = new SettingTrigger(false, 1), promoteLeader = new Setting(), electLeader = new ElectLeaderSettings()) {
      super(enabled);
      __publicField(this, "jobs");
      __publicField(this, "holdFestivals");
      __publicField(this, "hunt");
      __publicField(this, "promoteKittens");
      __publicField(this, "promoteLeader");
      __publicField(this, "electLeader");
      this.jobs = this.initJobs();
      this.holdFestivals = holdFestivals;
      this.hunt = hunt;
      this.promoteKittens = promoteKittens;
      this.promoteLeader = promoteLeader;
      this.electLeader = electLeader;
    }
    initJobs() {
      const items = {};
      for (const item of Jobs) {
        items[item] = new SettingMax(false, -1);
      }
      return items;
    }
    load(settings) {
      var _a, _b, _c;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.jobs, settings.jobs, (job, item) => {
        job.enabled = (item == null ? void 0 : item.enabled) ?? job.enabled;
        job.max = (item == null ? void 0 : item.max) ?? job.max;
      });
      this.holdFestivals.enabled = ((_a = settings.holdFestivals) == null ? void 0 : _a.enabled) ?? this.holdFestivals.enabled;
      this.hunt.load(settings.hunt);
      this.promoteKittens.enabled = ((_b = settings.promoteKittens) == null ? void 0 : _b.enabled) ?? this.promoteKittens.enabled;
      this.promoteLeader.enabled = ((_c = settings.promoteLeader) == null ? void 0 : _c.enabled) ?? this.promoteLeader.enabled;
      this.electLeader.load(settings.electLeader);
    }
  }
  class VillageManager {
    constructor(host, workshopManager, settings = new VillageSettings()) {
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "manager");
      __publicField(this, "_cacheManager");
      __publicField(this, "_workshopManager");
      this._host = host;
      this.settings = settings;
      this.manager = new TabManager(this._host, "Village");
      this._cacheManager = new MaterialsCache(this._host);
      this._workshopManager = workshopManager;
    }
    tick(_context) {
      if (!this.settings.enabled) {
        return;
      }
      this.autoDistributeKittens();
      if (this.settings.hunt.enabled) {
        this.autoHunt(this._cacheManager);
      }
      if (this.settings.holdFestivals.enabled) {
        this.autoFestival(this._cacheManager);
      }
      if (this.settings.electLeader.enabled) {
        this.autoElect();
      }
      if (this.settings.promoteLeader.enabled) {
        this.autoPromoteLeader();
      }
      if (this.settings.promoteKittens.enabled) {
        this.autoPromoteKittens();
      }
    }
    autoDistributeKittens() {
      const freeKittens = this._host.game.village.getFreeKittens();
      if (!freeKittens) {
        return;
      }
      for (let assignedKitten = 0; assignedKitten < freeKittens; ++assignedKitten) {
        const jobsNotCapped = new Array();
        for (const job of this._host.game.village.jobs) {
          const enabled = this.settings.jobs[job.name].enabled;
          const unlocked = job.unlocked;
          if (!enabled || !unlocked) {
            continue;
          }
          const maxKittensInJob = this._host.game.village.getJobLimit(job.name);
          const maxKittensToAssign = negativeOneToInfinity(this.settings.jobs[job.name].max);
          const kittensInJob = job.value;
          if (kittensInJob < maxKittensInJob && kittensInJob < maxKittensToAssign) {
            jobsNotCapped.push({ job, count: kittensInJob, toCap: maxKittensInJob - kittensInJob });
          }
        }
        if (!jobsNotCapped.length) {
          return;
        }
        const noFarmersAssigned = !isNil(
          jobsNotCapped.find((job) => job.job.name === "farmer" && job.count === 0)
        );
        jobsNotCapped.sort((a, b) => a.count - b.count);
        const jobName = noFarmersAssigned ? "farmer" : jobsNotCapped[0].job.name;
        this._host.game.village.assignJob(this._host.game.village.getJob(jobName), 1);
        this.manager.render();
        this._host.engine.iactivity(
          "act.distribute",
          [this._host.engine.i18n(`$village.job.${jobName}`)],
          "ks-distribute"
        );
      }
      this._host.engine.storeForSummary("distribute", freeKittens);
    }
    autoElect() {
      const kittens = this._host.game.village.sim.kittens;
      const leader = this._host.game.village.leader;
      const job = this.settings.electLeader.job.selected;
      const trait = this.settings.electLeader.trait.selected;
      const leaderCandidates = kittens.filter(
        (kitten) => (kitten.job === job || job === "any") && kitten.trait.name === trait
      );
      if (leaderCandidates.length === 0) {
        return;
      }
      leaderCandidates.sort((a, b) => b.rank - a.rank);
      const bestLeader = leaderCandidates[0];
      if (!isNil(leader)) {
        if (leader.trait.name === trait && (leader.job === job || job === "any") && bestLeader.rank <= leader.rank) {
          return;
        }
      }
      this._host.game.village.makeLeader(bestLeader);
      this._host.engine.iactivity("act.elect");
    }
    autoPromoteKittens() {
      const gold = this._workshopManager.getResource("gold");
      if (this.settings.promoteKittens.trigger < gold.value / gold.maxValue) {
        return;
      }
      for (let kittenIndex = 0; kittenIndex < this._host.game.village.sim.kittens.length; kittenIndex++) {
        let tier = -1;
        const engineerSpeciality = this._host.game.village.sim.kittens[kittenIndex].engineerSpeciality;
        if (isNil(engineerSpeciality)) {
          continue;
        }
        tier = mustExist(this._host.game.workshop.getCraft(engineerSpeciality)).tier;
        if (tier <= this._host.game.village.sim.kittens[kittenIndex].rank) {
          continue;
        }
        this._host.game.village.promoteKittens();
        return;
      }
    }
    autoPromoteLeader() {
      var _a, _b;
      if (this._host.game.science.get("civil").researched && this._host.game.village.leader !== null) {
        const leader = this._host.game.village.leader;
        const rank = leader.rank;
        const gold = this._workshopManager.getResource("gold");
        const goldStock = this._workshopManager.getStock("gold");
        if (this._host.game.village.sim.goldToPromote(rank, rank + 1, gold.value - goldStock)[0] && this._host.game.village.sim.promote(leader, rank + 1) === 1) {
          this._host.engine.iactivity("act.promote", [rank + 1], "ks-promote");
          (_a = this._host.game.villageTab.censusPanel) == null ? void 0 : _a.census.renderGovernment(
            this._host.game.villageTab.censusPanel.census
          );
          (_b = this._host.game.villageTab.censusPanel) == null ? void 0 : _b.census.update();
          this._host.engine.storeForSummary("promote", 1);
        }
      }
    }
    autoHunt(cacheManager) {
      const manpower = this._workshopManager.getResource("manpower");
      const trigger = this.settings.hunt.trigger;
      if (manpower.value < 100 || this._host.game.challenges.isActive("pacifism")) {
        return;
      }
      if (trigger <= manpower.value / manpower.maxValue && 100 <= manpower.value) {
        const huntCount = Math.floor(manpower.value / 100);
        this._host.engine.storeForSummary("hunt", huntCount);
        this._host.engine.iactivity("act.hunt", [this._host.renderAbsolute(huntCount)], "ks-hunt");
        const averageOutput = this._workshopManager.getAverageHunt();
        const trueOutput = {};
        for (const [out, outValue] of objectEntries(averageOutput)) {
          const res = this._workshopManager.getResource(out);
          trueOutput[out] = 0 < res.maxValue ? Math.min(outValue * huntCount, Math.max(res.maxValue - res.value, 0)) : outValue * huntCount;
        }
        if (!isNil(cacheManager)) {
          cacheManager.pushToCache({
            materials: trueOutput,
            timeStamp: this._host.game.timer.ticksTotal
          });
        }
        this._host.game.village.huntAll();
      }
    }
    autoFestival(cacheManager) {
      var _a;
      if (!this._host.game.science.get("drama").researched || 400 < this._host.game.calendar.festivalDays) {
        return;
      }
      if (!this._host.game.prestige.getPerk("carnivals").researched && 0 < this._host.game.calendar.festivalDays) {
        return;
      }
      const craftManager = this._workshopManager;
      if (craftManager.getValueAvailable("manpower") < 1500 || craftManager.getValueAvailable("culture") < 5e3 || craftManager.getValueAvailable("parchment") < 2500) {
        return;
      }
      const catpowProfitable = 4e3 * craftManager.getTickVal(
        craftManager.getResource("manpower"),
        cacheManager,
        true
      ) > 1500;
      const cultureProfitable = 4e3 * craftManager.getTickVal(
        craftManager.getResource("culture"),
        cacheManager,
        true
      ) > 5e3;
      const parchProfitable = 4e3 * craftManager.getTickVal(
        craftManager.getResource("parchment"),
        cacheManager,
        true
      ) > 2500;
      if (!catpowProfitable && !cultureProfitable && !parchProfitable) {
        return;
      }
      this.manager.render();
      if ((_a = this._host.game.villageTab.festivalBtn.model) == null ? void 0 : _a.enabled) {
        const beforeDays = this._host.game.calendar.festivalDays;
        this._host.game.villageTab.festivalBtn.onClick();
        this._host.engine.storeForSummary("festival");
        if (beforeDays > 0) {
          this._host.engine.iactivity("festival.extend", [], "ks-festival");
        } else {
          this._host.engine.iactivity("festival.hold", [], "ks-festival");
        }
      }
    }
  }
  class UpgradeSettingsItem extends SettingTrigger {
    constructor(upgrade, enabled = false) {
      super(enabled, -1);
      __privateAdd(this, _upgrade3);
      __privateSet(this, _upgrade3, upgrade);
    }
    get upgrade() {
      return __privateGet(this, _upgrade3);
    }
  }
  _upgrade3 = new WeakMap();
  class UpgradeSettings extends SettingTrigger {
    constructor(enabled = false) {
      super(enabled, 0);
      __publicField(this, "upgrades");
      this.upgrades = this.initUpgrades();
    }
    initUpgrades() {
      const items = {};
      for (const item of Upgrades) {
        items[item] = new UpgradeSettingsItem(item);
      }
      return items;
    }
    static validateGame(game2, settings) {
      const inSettings = Object.keys(settings.upgrades);
      const inGame = game2.workshop.upgrades.map((upgrade) => upgrade.name);
      const missingInSettings = difference(inGame, inSettings);
      const redundantInSettings = difference(inSettings, inGame);
      for (const upgrade of missingInSettings) {
        cwarn(`The workshop upgrade '${upgrade}' is not tracked in Kitten Scientists!`);
      }
      for (const upgrade of redundantInSettings) {
        cwarn(`The workshop upgrade '${upgrade}' is not an upgrade in Kittens Game!`);
      }
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.upgrades, settings.upgrades, (upgrade, item) => {
        upgrade.enabled = (item == null ? void 0 : item.enabled) ?? upgrade.enabled;
        upgrade.trigger = (item == null ? void 0 : item.trigger) ?? upgrade.trigger;
      });
    }
  }
  class CraftSettingsItem extends SettingLimitedMaxTrigger {
    constructor(resource, enabled = false, limited = true) {
      super(enabled, limited);
      __privateAdd(this, _resource2);
      __privateSet(this, _resource2, resource);
    }
    get resource() {
      return __privateGet(this, _resource2);
    }
  }
  _resource2 = new WeakMap();
  class WorkshopSettings extends SettingTrigger {
    constructor(enabled = false, trigger = 0.95, unlockUpgrades = new UpgradeSettings(), shipOverride = new Setting()) {
      super(enabled, trigger);
      __publicField(this, "resources");
      __publicField(this, "shipOverride");
      __publicField(this, "unlockUpgrades");
      this.resources = this.initResources();
      this.shipOverride = shipOverride;
      this.unlockUpgrades = unlockUpgrades;
    }
    initResources() {
      const items = {};
      for (const item of ResourcesCraftable) {
        items[item] = new CraftSettingsItem(item);
      }
      return items;
    }
    static validateGame(game2, settings) {
      const inSettings = Object.keys(settings.resources);
      const inGame = game2.workshop.crafts.map((craft) => craft.name);
      const missingInSettings = difference(inGame, inSettings);
      const redundantInSettings = difference(inSettings, inGame);
      for (const craft of missingInSettings) {
        cwarn(`The workshop craft '${craft}' is not tracked in Kitten Scientists!`);
      }
      for (const craft of redundantInSettings) {
        cwarn(`The workshop craft '${craft}' is not an upgrade in Kittens Game!`);
      }
      UpgradeSettings.validateGame(game2, settings.unlockUpgrades);
    }
    load(settings) {
      var _a;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.resources, settings.resources, (resource, item) => {
        resource.enabled = (item == null ? void 0 : item.enabled) ?? resource.enabled;
        resource.limited = (item == null ? void 0 : item.limited) ?? resource.limited;
        resource.max = (item == null ? void 0 : item.max) ?? resource.max;
        resource.trigger = (item == null ? void 0 : item.trigger) ?? resource.trigger;
      });
      this.unlockUpgrades.load(settings.unlockUpgrades);
      this.shipOverride.enabled = ((_a = settings.shipOverride) == null ? void 0 : _a.enabled) ?? this.shipOverride.enabled;
    }
  }
  class WorkshopManager extends UpgradeManager {
    constructor(host, settings = new WorkshopSettings()) {
      super(host);
      __publicField(this, "settings");
      __publicField(this, "manager");
      this.settings = settings;
      this.manager = new TabManager(this._host, "Workshop");
    }
    tick(_context) {
      if (!this.settings.enabled) {
        return Promise.resolve();
      }
      this.autoCraft();
      this.refreshStock();
      if (this.settings.unlockUpgrades.enabled) {
        this.manager.render();
        return this.autoUnlock();
      }
      return Promise.resolve();
    }
    async autoUnlock() {
      if (!this._host.game.workshopTab.visible) {
        return;
      }
      const upgrades = this._host.game.workshop.upgrades;
      const toUnlock = new Array();
      workLoop: for (const setting2 of Object.values(this.settings.unlockUpgrades.upgrades)) {
        if (!setting2.enabled) {
          continue;
        }
        const upgrade = upgrades.find((subject) => subject.name === setting2.upgrade);
        if (isNil(upgrade)) {
          cerror(`Upgrade '${setting2.upgrade}' not found in game!`);
          continue;
        }
        if (upgrade.researched || !upgrade.unlocked) {
          continue;
        }
        let prices = UserScriptLoader.window.dojo.clone(upgrade.prices);
        prices = this._host.game.village.getEffectLeader("scientist", prices);
        for (const price of prices) {
          const available = this.getValueAvailable(price.name);
          const resource = this.getResource(price.name);
          const trigger = Engine.evaluateSubSectionTrigger(
            this.settings.unlockUpgrades.trigger,
            setting2.trigger
          );
          if (trigger < 0 || available < resource.maxValue * trigger || available < price.val) {
            continue workLoop;
          }
        }
        toUnlock.push(upgrade);
      }
      for (const item of toUnlock) {
        await this.upgrade(item, "workshop");
      }
    }
    autoCraft(crafts = this.settings.resources) {
      const craftRequests = /* @__PURE__ */ new Map();
      const sectionTrigger = this.settings.trigger;
      for (const craft of Object.values(crafts)) {
        const trigger = Engine.evaluateSubSectionTrigger(sectionTrigger, craft.trigger);
        if (trigger < 0 || !craft.enabled) {
          continue;
        }
        const current = !craft.max ? false : this.getResource(craft.resource);
        const max = negativeOneToInfinity(craft.max);
        if (current && max < current.value) {
          continue;
        }
        if (!this.singleCraftPossible(craft.resource)) {
          continue;
        }
        const materials = Object.keys(this.getMaterials(craft.resource));
        const requiredMaterials = materials.map((material) => this.getResource(material)).filter((material) => 0 < material.maxValue);
        const allMaterialsAboveTrigger = requiredMaterials.filter((material) => material.value / material.maxValue < trigger).length === 0;
        if (!allMaterialsAboveTrigger) {
          continue;
        }
        craftRequests.set(craft, {
          countRequested: 1,
          materials: materials.map((material) => ({
            resource: material,
            consume: 0
          }))
        });
      }
      if (craftRequests.size < 1) {
        return;
      }
      const billOfMaterials = /* @__PURE__ */ new Map();
      for (const [craft, request] of craftRequests) {
        for (const material of request.materials) {
          if (!billOfMaterials.has(material.resource)) {
            billOfMaterials.set(material.resource, new Array());
          }
          const consumers = mustExist(billOfMaterials.get(material.resource));
          consumers.push(craft.resource);
        }
      }
      for (const [, request] of craftRequests) {
        for (const material of request.materials) {
          const available = this.getValueAvailable(material.resource);
          material.consume = available / mustExist(billOfMaterials.get(material.resource)).length;
        }
      }
      for (const [craft, request] of craftRequests) {
        const materials = this.getMaterials(craft.resource);
        let amount = Number.MAX_VALUE;
        for (const material of request.materials) {
          const materialAmount = mustExist(materials[material.resource]);
          const materialResource = this.getResource(material.resource);
          if (!craft.limited || craft.resource === "ship" && this.settings.shipOverride.enabled && this.getResource("ship").value < 243) {
            amount = Math.min(amount, material.consume / materialAmount);
            continue;
          }
          const ratio = this._host.game.getResCraftRatio(craft.resource);
          const availableSource = this.getValueAvailable(material.resource) / mustExist(billOfMaterials.get(material.resource)).length;
          const availableTarget2 = this.getValueAvailable(craft.resource);
          const recipeRequires = materialAmount;
          const recipeProduces2 = 1 + ratio;
          const craftsPossible = availableSource / recipeRequires;
          const craftsDone = availableTarget2 / recipeProduces2;
          const orderDone = Math.max(0, Math.floor(Math.log(craftsDone) / Math.LN10 + 1e-9));
          amount = Math.min(
            amount,
            Math.min(
              craftsPossible - (0 < materialResource.maxValue && materialResource.maxValue <= materialResource.value ? 0 : craftsDone),
              10 ** (orderDone + 1)
            ),
            material.consume / materialAmount
          );
        }
        const availableTarget = this.getValueAvailable(craft.resource);
        const recipeProduces = 1 + this._host.game.getResCraftRatio(craft.resource);
        const craftsMaxLimit = Number.MAX_VALUE / recipeProduces - availableTarget / recipeProduces;
        amount = Math.min(amount, craftsMaxLimit);
        request.countRequested = Math.max(
          0,
          craft.max === -1 ? amount : Math.min(amount, (craft.max - availableTarget) / recipeProduces)
        );
      }
      for (const [craft, request] of craftRequests) {
        if (request.countRequested < 1) {
          continue;
        }
        this.craft(craft.resource, request.countRequested);
      }
    }
    craft(name, amount) {
      let amountCalculated = Math.floor(amount);
      if (amountCalculated < 1) {
        return;
      }
      if (!this._canCraft(name, amountCalculated)) {
        return;
      }
      const craft = this.getCraft(name);
      const ratio = this._host.game.getResCraftRatio(craft.name);
      this._host.game.craft(craft.name, amountCalculated);
      const resourceName = mustExist(this._host.game.resPool.get(name)).title;
      amountCalculated = Number.parseFloat((amountCalculated * (1 + ratio)).toFixed(2));
      this._host.engine.storeForSummary(resourceName, amountCalculated, "craft");
      this._host.engine.iactivity(
        "act.craft",
        [this._host.game.getDisplayValueExt(amountCalculated), resourceName],
        "ks-craft"
      );
    }
    _canCraft(name, amount) {
      if (!this._host.game.workshopTab.visible && name !== "wood") {
        return false;
      }
      const craft = this.getCraft(name);
      const enabled = mustExist(this.settings.resources[name]).enabled;
      let result = false;
      if (craft.unlocked && enabled) {
        result = true;
        const prices = this._host.game.workshop.getCraftPrice(craft);
        for (const price of prices) {
          const value = this.getValueAvailable(price.name);
          if (value < price.val * amount) {
            result = false;
          }
        }
      }
      return result;
    }
    getCraft(name) {
      const craft = this._host.game.workshop.getCraft(name);
      if (!craft) {
        throw new Error(`Unable to find craft '${name}'`);
      }
      return craft;
    }
    singleCraftPossible(name) {
      if (!this._host.game.workshopTab.visible && name !== "wood") {
        return false;
      }
      const materials = this.getMaterials(name);
      for (const [material, amount] of objectEntries(materials)) {
        if (this.getValueAvailable(material) < amount) {
          return false;
        }
      }
      return true;
    }
    getMaterials(name) {
      const materials = {};
      const craft = this.getCraft(name);
      const prices = this._host.game.workshop.getCraftPrice(craft);
      for (const price of prices) {
        materials[price.name] = price.val;
      }
      return materials;
    }
    getTickVal(resource, cacheManager, preTrade = void 0) {
      let production = this._host.game.getResourcePerTick(resource.name, true);
      if (resource.craftable) {
        let minProd = Number.MAX_VALUE;
        const materials = this.getMaterials(resource.name);
        for (const [mat, amount] of objectEntries(materials)) {
          const rat = (1 + this._host.game.getResCraftRatio(resource.name)) / amount;
          const addProd = this.getTickVal(this.getResource(mat));
          if (addProd === "ignore") {
            continue;
          }
          minProd = Math.min(addProd * rat, minProd);
        }
        production += minProd !== Number.MAX_VALUE ? minProd : 0;
      }
      if (production <= 0 && (resource.name === "spice" || resource.name === "blueprint")) {
        return "ignore";
      }
      if (!preTrade && !isNil(cacheManager)) {
        production += cacheManager.getResValue(resource.name);
      }
      return production;
    }
    getAverageHunt() {
      const output = {};
      const hunterRatio = this._host.game.getEffect("hunterRatio") + this._host.game.village.getEffectLeader("manager", 0);
      output.furs = 40 + 32.5 * hunterRatio;
      output.ivory = 50 * Math.min(0.225 + 0.01 * hunterRatio, 0.5) + 40 * hunterRatio * Math.min(0.225 + 0.01 * hunterRatio, 0.5);
      output.unicorns = 0.05;
      if (this.getValue("zebras") >= 10) {
        output.bloodstone = this.getValue("bloodstone") === 0 ? 0.05 : 5e-4;
      }
      if (this._host.game.ironWill && this._host.game.workshop.get("goldOre").researched) {
        output.gold = 0.625 + 0.625 * hunterRatio;
      }
      return output;
    }
    getResource(name) {
      const res = this._host.game.resPool.get(name);
      if (isNil(res)) {
        throw new Error(`Unable to find resource ${name}`);
      }
      return res;
    }
    getValue(name) {
      return this.getResource(name).value;
    }
    getStock(name) {
      const resource = this._host.engine.settings.resources.resources[name];
      const stock = resource.enabled ? resource.stock : 0;
      return stock;
    }
    getConsume(name) {
      const resource = this._host.engine.settings.resources.resources[name];
      const consume = resource.enabled ? resource.consume : 1;
      return consume;
    }
    getValueAvailable(name) {
      let stock = this.getStock(name);
      if ("catnip" === name) {
        const pastureMeta = this._host.game.bld.getBuildingExt("pasture").meta;
        const aqueductMeta = this._host.game.bld.getBuildingExt("aqueduct").meta;
        const pastures = pastureMeta.stage === 0 ? pastureMeta.val : 0;
        const aqueducts = aqueductMeta.stage === 0 ? aqueductMeta.val : 0;
        const resPerTick = this.getPotentialCatnip(true, pastures, aqueducts);
        if (resPerTick < 0) {
          stock -= resPerTick * 202 * 5;
        }
      }
      let value = this.getValue(name);
      value = Math.max(value - stock, 0);
      const consume = this.getConsume(name);
      return value * consume;
    }
    getPotentialCatnip(worstWeather, pastures, aqueducts) {
      let productionField = this._host.game.getEffect("catnipPerTickBase");
      if (worstWeather) {
        productionField *= 0.1;
        productionField *= 1 + this._host.game.getLimitedDR(this._host.game.getEffect("coldHarshness"), 1);
      } else {
        productionField *= this._host.game.calendar.getWeatherMod({ name: "catnip" }) + this._host.game.calendar.getCurSeason().modifiers.catnip;
      }
      if (this._host.game.science.getPolicy("communism").researched) {
        productionField = 0;
      }
      const resourceProduction = this._host.game.village.getResProduction();
      const productionVillager = resourceProduction.catnip ? resourceProduction.catnip * (1 + this._host.game.getEffect("catnipJobRatio")) : 0;
      let baseProd = productionField + productionVillager;
      let hydroponics = this._host.game.space.getBuilding("hydroponics").val;
      if (this._host.game.prestige.meta[0].meta[21].researched) {
        if (this._host.game.calendar.cycle === 2) {
          hydroponics *= 2;
        }
        if (this._host.game.calendar.cycle === 7) {
          hydroponics *= 0.5;
        }
      }
      baseProd *= 1 + 0.03 * aqueducts + 0.025 * hydroponics;
      const isWinterComing = this._host.game.challenges.currentChallenge === "winterIsComing";
      const paragonBonus = isWinterComing ? 0 : this._host.game.prestige.getParagonProductionRatio();
      baseProd *= 1 + paragonBonus;
      baseProd *= 1 + this._host.game.religion.getSolarRevolutionRatio();
      if (!this._host.game.opts.disableCMBR) {
        baseProd *= 1 + this._host.game.getCMBRBonus();
      }
      baseProd = mustExist(
        this._host.game.calendar.cycleEffectsFestival({ catnip: baseProd }).catnip
      );
      let baseDemand = this._host.game.village.getResConsumption().catnip;
      const unicornPastures = this._host.game.bld.getBuildingExt("unicornPasture").meta.val;
      baseDemand *= 1 + this._host.game.getLimitedDR(pastures * -5e-3 + unicornPastures * -15e-4, 1);
      if (this._host.game.village.sim.kittens.length > 0 && this._host.game.village.happiness > 1) {
        const happyCon = this._host.game.village.happiness - 1;
        const catnipDemandWorkerRatioGlobal = this._host.game.getEffect(
          "catnipDemandWorkerRatioGlobal"
        );
        if (this._host.game.challenges.currentChallenge === "anarchy") {
          baseDemand *= 1 + happyCon * (1 + catnipDemandWorkerRatioGlobal);
        } else {
          baseDemand *= 1 + happyCon * (1 + catnipDemandWorkerRatioGlobal) * (1 - this._host.game.village.getFreeKittens() / this._host.game.village.sim.kittens.length);
        }
      }
      baseProd += baseDemand;
      baseProd += this._host.game.getResourcePerTickConvertion("catnip");
      return baseProd;
    }
    refreshStock() {
      for (const [name, resource] of objectEntries(this._host.engine.settings.resources.resources)) {
        const resourceCells = [
          ...$(`#game .res-row.resource_${name} .res-cell.resAmount`),
          ...$(`#game .res-row.resource_${name} .res-cell.resource-value`)
        ];
        if (!resource.enabled || resource.stock === 0) {
          for (const resourceCell of resourceCells) {
            resourceCell.classList.remove("ks-stock-above", "ks-stock-below");
          }
          continue;
        }
        const isBelow = this._host.game.resPool.get(name).value < resource.stock;
        for (const resourceCell of resourceCells) {
          resourceCell.classList.add(isBelow ? "ks-stock-below" : "ks-stock-above");
          resourceCell.classList.remove(isBelow ? "ks-stock-above" : "ks-stock-below");
        }
      }
    }
  }
  __publicField(WorkshopManager, "DEFAULT_CONSUME_RATE", 1);
  class ActivitySummary {
    constructor(host) {
      __publicField(this, "_host");
      __publicField(this, "_lastday");
      __publicField(this, "_lastyear");
      __publicField(this, "_sections", /* @__PURE__ */ new Map());
      this._host = host;
      this.resetActivity();
    }
    resetActivity() {
      this._sections = /* @__PURE__ */ new Map();
      this._lastday = this._host.game.calendar.day;
      this._lastyear = this._host.game.calendar.year;
    }
    storeActivity(name, amount = 1, section = "other") {
      if (!this._sections.has(section)) {
        this._sections.set(section, /* @__PURE__ */ new Map());
      }
      const summarySection = mustExist(this._sections.get(section));
      if (!summarySection.has(name)) {
        summarySection.set(name, 0);
      }
      summarySection.set(name, mustExist(summarySection.get(name)) + amount);
    }
    renderSummary() {
      const summary = new Array();
      if (this._sections.has("other")) {
        const section = mustExist(this._sections.get("other"));
        section.forEach(
          (amount, name) => summary.push(
            this._host.engine.i18n(`summary.${name}`, [
              this._host.game.getDisplayValueExt(amount)
            ])
          )
        );
      }
      if (this._sections.has("research")) {
        const section = mustExist(this._sections.get("research"));
        section.forEach((_amount, name) => {
          summary.push(this._host.engine.i18n("summary.tech", [ucfirst(name)]));
        });
      }
      if (this._sections.has("upgrade")) {
        const section = mustExist(this._sections.get("upgrade"));
        section.forEach((_amount, name) => {
          summary.push(this._host.engine.i18n("summary.upgrade", [ucfirst(name)]));
        });
      }
      if (this._sections.has("build")) {
        const section = mustExist(this._sections.get("build"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.building", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._sections.has("refine")) {
        const section = mustExist(this._sections.get("refine"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.refine", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._sections.has("faith")) {
        const section = mustExist(this._sections.get("faith"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.sun", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._sections.has("craft")) {
        const section = mustExist(this._sections.get("craft"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.craft", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._sections.has("trade")) {
        const section = mustExist(this._sections.get("trade"));
        section.forEach((amount, name) => {
          summary.push(
            this._host.engine.i18n("summary.trade", [
              this._host.game.getDisplayValueExt(amount),
              ucfirst(name)
            ])
          );
        });
      }
      if (this._lastday && this._lastyear) {
        let years = this._host.game.calendar.year - this._lastyear;
        let days = this._host.game.calendar.day - this._lastday;
        if (days < 0) {
          years -= 1;
          days += 400;
        }
        let duration = "";
        if (years > 0) {
          duration += `${years} `;
          duration += years === 1 ? this._host.engine.i18n("summary.year") : this._host.engine.i18n("summary.years");
        }
        if (days >= 0) {
          if (years > 0) duration += this._host.engine.i18n("summary.separator");
          duration += `${roundToTwo(days)} `;
          duration += days === 1 ? this._host.engine.i18n("summary.day") : this._host.engine.i18n("summary.days");
        }
        summary.push(this._host.engine.i18n("summary.head", [duration]));
      }
      return summary;
    }
  }
  const copy$3 = "Copy";
  const reset$3 = "Reset";
  const update$3 = "Update";
  const enUS$1 = {
    "act.accelerate": "Accelerate time!",
    "act.adore": "Adore the galaxy! Accumulated {0} worship to {1} epiphany",
    "act.blackcoin.buy": "Kittens sold your Relics and bought {0} Blackcoins",
    "act.blackcoin.sell": "Kittens sold your Blackcoins and bought {0} Relics",
    "act.build": "Kittens have built a new {0}",
    "act.builds": "Kittens have built a new {0} {1} times",
    "act.craft": "Kittens have crafted {0} {1}",
    "act.distribute": "Distributed a kitten to {0}",
    "act.elect": "Kittens have elected a new leader.",
    "act.feed": "Kittens fed the Elders. The elders are pleased",
    "act.fix.cry": "Kittens fixed {0} Cryochambers",
    "act.hunt": "Sent kittens on {0} hunts",
    "act.observe": "Kitten Scientists have observed a star",
    "act.praise": "Praised the sun! Accumulated {0} faith to {1} worship",
    "act.promote": "Kittens' leader has been promoted to rank {0}",
    "act.refineTCs": "Refined {0} time crystals",
    "act.refineTears": "Refined {0} tears into BLS",
    "act.sacrificeAlicorns": "Sacrificed {0} alicorns",
    "act.sacrificeUnicorns": "Sacrificed {0} unicorns",
    "act.sun.discover": "Kittens have discovered {0}",
    "act.sun.discovers": "Kittens have discovered {0} {1} times",
    "act.time.activeHeatTransferEnd": "End active Heat Transfer",
    "act.time.activeHeatTransferStart": "Start active Heat Transfer",
    "act.time.getTemporalFlux": "Burn crystals to obtain time flux to maintain time acceleration",
    "act.time.skip": "Kittens combust a time crystal, {0} years skipped!",
    "act.trade": "Kittens have traded {0} times with {1}",
    "act.transcend": "Spent {0} epiphany, Transcended to T-level: {1}",
    "blackcoin.buy.prompt": "Enter at which price you want to stop buying blackcoins.",
    "blackcoin.buy.promptExplainer": "Blackcoin price always rises from 800 to 1100 (roughly), then it crashes. You usually want to buy until shortly before you sell.",
    "blackcoin.buy.promptTitle": "Buy Limit for Blackcoins (Current: {0})",
    "blackcoin.buy.title": "Buy Blackcoins until price reaches {0}",
    "blackcoin.buy.trigger": "buying Blackcoins (in relics)",
    "blackcoin.buy": "Buy Limit: {0}",
    "blackcoin.sell.prompt": "Enter at which price you want to sell all your blackcoins.",
    "blackcoin.sell.promptExplainer": "Blackcoin price always rises from 800 to 1100 (roughly), then it crashes. You usually want to sell close to the highest possible price.",
    "blackcoin.sell.promptTitle": "Sell Order for Blackcoins (Current: {0})",
    "blackcoin.sell.title": "Sell Blackcoins when price reaches {0}",
    "blackcoin.sell": "Sell Order: {0}",
    "build.embassies": "Built {0} embassies for {1}",
    "build.embassy": "Built {0} embassy for {1}",
    copy: copy$3,
    "craft.limited": "Crafting {0}: limited to be proportional to cost ratio",
    "craft.unlimited": "Crafting {0}: unlimited",
    "delete": "Delete",
    "dispose.necrocorn": "Kittens disposed of inefficient necrocorns",
    "festival.extend": "Kittens extend the festival",
    "festival.hold": "Kittens begin holding a festival",
    "filter.accelerate": "Tempus Fugit",
    "filter.adore": "Adoring",
    "filter.allKG": "All KG log entries.",
    "filter.build": "Building",
    "filter.craft": "Crafting",
    "filter.disable": "Disabled {0} log messages",
    "filter.distribute": "Distribute",
    "filter.enable": "Enabled {0} log messages",
    "filter.explainer": "Disabled items are hidden from the log.",
    "filter.faith": "Order of the Sun",
    "filter.festival": "Festivals",
    "filter.hunt": "Hunting",
    "filter.misc": "Miscellaneous",
    "filter.praise": "Praising",
    "filter.promote": "Promote leader",
    "filter.research": "Researching",
    "filter.star": "Astronomical Events",
    "filter.timeSkip": "Time Skip",
    "filter.trade": "Trading",
    "filter.transcend": "Transcend",
    "filter.upgrade": "Upgrading",
    "option.accelerate": "Tempus Fugit",
    "option.autofeed": "Feed Leviathans",
    "option.catnip": "Gather Catnip",
    "option.crypto": "Trade Blackcoin",
    "option.elect.job.any": "Any",
    "option.elect.job": "Job",
    "option.elect.trait": "Trait",
    "option.elect": "Elect leader",
    "option.embassies": "Build Embassies",
    "option.faith.adore": "Adore the Galaxy",
    "option.faith.autoPraise": "Praise the Sun",
    "option.faith.best.unicorn": "Automate Build Order",
    "option.faith.refineTears": "Refine Tears",
    "option.faith.refineTimeCrystals": "Refine TCs",
    "option.faith.sacrificeAlicorns": "Sacrifice Alicorns",
    "option.faith.sacrificeUnicorns": "Sacrifice Unicorns",
    "option.faith.transcend": "Transcend",
    "option.festival": "Hold festivals",
    "option.fix.cry": "Fix Cryochamber",
    "option.hunt": "Hunt",
    "option.magnetos": "Turn on Magnetos",
    "option.observe": "Observe Astro Events",
    "option.praise": "Praise the Sun",
    "option.promote": "Promote leader",
    "option.promotekittens": "Promote kittens",
    "option.reactors": "Turn on Reactors",
    "option.shipOverride": "Force Ships to 243",
    "option.steamworks": "Turn on Steamworks",
    "option.time.activeHeatTransfer": "Active Heat Transfer",
    "option.time.reset": "Reset Timeline (Danger!)",
    "option.time.skip.ignoreOverheat": "Ignore overheat",
    "option.time.skip": "Time Skip",
    "reset.after": "Nice to meet you, the cute Kitten Scientists will serve you",
    "reset.cancel.activity": "Meoston, We Have a Problem",
    "reset.cancel.message": "Timeline Reset canceled",
    "reset.check": "Trigger for {0}: {1}, you have {2}",
    "reset.checked": "All conditions are met, the timeline will restart in the next few seconds!",
    "reset.countdown.0": "0 - Temporal rifts opened!",
    "reset.countdown.1": "1 - Time engine start",
    "reset.countdown.10": "10 - Harvesting catnip",
    "reset.countdown.2": "2 - Boosting the chronoforge",
    "reset.countdown.3": "3 - Opening temporal rifts",
    "reset.countdown.4": "4 - Turning off satellite",
    "reset.countdown.5": "5 - Melting blackcoins",
    "reset.countdown.6": "6 - Starting time engines",
    "reset.countdown.7": "7 - Disassembling railguns",
    "reset.countdown.8": "8 - Releasing lizards",
    "reset.countdown.9": "9 - Sacrificing unicorns",
    "reset.last.message": "See you next poincaré recurrence",
    "reset.tip": 'You can cancel this reset by disabling "Enable Kitten Scientists" at the top of the settings.',
    reset: reset$3,
    "resources.consume.prompt": "Enter how much of the resource you want automations to consume as a percentage between 0.0 and 100.0.",
    "resources.consume.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "resources.consume.promptTitle": "Consumption Share for {0} (Current: {1})",
    "resources.consume.set": "Consume rate for {0}",
    "resources.consume.title": "Consuming {0} of {1}",
    "resources.consume.titleZero": "Not consuming {0}",
    "resources.consume": "Consume: {0}",
    "resources.stock.prompt": "Enter how much of the resource you always want to keep in stock.",
    "resources.stock.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "resources.stock.promptTitle": "Stock value for {0} (Current: {1})",
    "resources.stock.title": "Keeping {0} {1} in stock",
    "resources.stock.titleInfinite": "Keeping all {0} in stock",
    "resources.stock.titleZero": "Not keeping any {0} in stock",
    "state.compress": "Compress copied Kittens Game saves",
    "state.confirmDestruction": "Are you sure?",
    "state.copied.game": "Save '{0}' copied to clipboard.",
    "state.copied.gameCurrent": "Current save copied to clipboard.",
    "state.copied.state": "State '{0}' copied to clipboard.",
    "state.copied.stateCurrent": "Current state copied to clipboard.",
    "state.copy.game": "Copy this save to the clipboard.",
    "state.copy.gameCurrent": "Copy the entire Kittens Game save (includes KS settings) to the clipboard.",
    "state.copy.state": "Copy these settings to the clipboard.",
    "state.copy.stateCurrent": "Copy the current Kitten Scientists settings to the clipboard.",
    "state.delete.game": "Delete this save.",
    "state.delete.state": "Delete these settings.",
    "state.deleted.game": "Save '{0}' deleted.",
    "state.deleted.state": "State '{0}' deleted.",
    "state.edit.game": "Change the name of this save.",
    "state.edit.state": "Change the name of these settings.",
    "state.exportAll": "Backup",
    "state.exportAllTitle": "Stores all local states in a single file and downloads it.",
    "state.import": "Import settings/saves",
    "state.imported.game": "Save imported.",
    "state.imported.state": "State imported.",
    "state.importTitle": "Paste a save or settings from your clipboard.\nContents will be automatically detected and handled accordingly.",
    "state.loaded.game": "Save '{0}' loaded.",
    "state.loaded.state": "State '{0}' loaded.",
    "state.loadPrompt": "Paste your (un/compressed) save or settings here:",
    "state.local": "Local storage management",
    "state.localGames": "Kittens Game Saves",
    "state.localStates": "Kitten Scientists Settings",
    "state.new": "New",
    "state.noConfirm": "Don't ask for confirmation",
    "state.store": "Store",
    "state.stored.game": "Save stored.",
    "state.stored.state": "State stored.",
    "state.storeFactory": "Create a new state from factory defaults.",
    "state.storeGame.prompt": "Provide a label for this save:",
    "state.storeGame": "Create a new save from the current game.",
    "state.storeState.prompt": "Provide a label for this state:",
    "state.storeState": "Create a new state from current settings.",
    "state.title": "State Management",
    "state.unlabeledGame": "unlabeled save",
    "state.unlabeledState": "unlabeled state",
    "state.update.game": "Save the current game into this slot.",
    "state.update.state": "Save the current settings into this slot.",
    "state.updated.game": "Save '{0}' updated.",
    "state.updated.state": "State '{0}' updated.",
    "status.auto.disable": "Disabled Auto {0}",
    "status.auto.enable": "Enabled Auto {0}",
    "status.ks.disable": "Disabling the Kitten Scientists!",
    "status.ks.enable": "Enabling the Kitten Scientists!",
    "status.ks.init": "Kitten Scientists initialized.",
    "status.ks.upgrade": "Kitten Scientists {0} (ours is {1}) is available at {2}.",
    "status.reset.check.disable": "Disabled check {0} before Reset Timeline",
    "status.reset.check.enable": "Enabled check {0} before Reset Timeline",
    "status.resource.disable": "Disabled {0} resource management",
    "status.resource.enable": "Enabled {0} resource management",
    "status.sub.disable": "Disabled {0}",
    "status.sub.enable": "Enabled {0}",
    "summary.accelerate": "Accelerated time {0} times",
    "summary.adore": "Accumulated {0} epiphany by adoring the galaxy",
    "summary.building": "Built {0} {1}",
    "summary.craft": "Crafted {0} {1}",
    "summary.day": "day",
    "summary.days": "days",
    "summary.distribute": "Helped {0} kittens find a job",
    "summary.embassy": "Built {0} embassies",
    "summary.feed": "Fed the elders {0} necrocorns",
    "summary.festival": "Held {0} festivals",
    "summary.fix.cry": "Fixed {0} cryochambers",
    "summary.head": "Summary of the last {0}",
    "summary.hunt": "Sent adorable kitten hunters on {0} hunts",
    "summary.praise": "Accumulated {0} worship by praising the sun",
    "summary.promote": "Promoted our leader {0} times",
    "summary.refine": "Refined {0} {1}",
    "summary.separator": " and ",
    "summary.show": "Show activity",
    "summary.stars": "Observed {0} stars",
    "summary.sun": "Discovered {0} {1}",
    "summary.tech": "Researched {0}",
    "summary.time.activeHeatTransferStart": "Active Heat Transfer {0} times",
    "summary.time.getTemporalFlux": "Burn crystal to gain time flux {0} times",
    "summary.time.reset.content": "Gained {0} Karma.<br>Gained {1} Paragon",
    "summary.time.reset.title": "Summary of the last {0} timelines",
    "summary.time.skip": "Skipped {0} years",
    "summary.trade": "Traded {0} times with {1}",
    "summary.transcend": "Transcended {0} times",
    "summary.upgrade": "Upgraded {0}",
    "summary.year": "year",
    "summary.years": "years",
    "time.heatTransfer.cycle.disable": "Disabled active heat transfer in cycle {0}",
    "time.heatTransfer.cycle.enable": "Enabled active heat transfer in cycle {0}",
    "time.skip.cycle.disable": "Disabled time skip in cycle {0} and disallow skip over this cycle",
    "time.skip.cycle.enable": "Enabled time skip in cycle {0} and allow skip over this cycle",
    "time.skip.season.disable": "Disabled time skip in the {0}",
    "time.skip.season.enable": "Enabled time skip in the {0}",
    "trade.limited": "Trading with {0}: limited to only occur when profitable based off relative production time",
    "trade.season.disable": "Disabled trading with {0} in the {1}",
    "trade.season.enable": "Enabled trading with {0} in the {1}",
    "trade.seasons": "seasons",
    "trade.unlimited": "Trading with {0}: unlimited",
    "ui.additional": "Additional options",
    "ui.build": "Bonfire",
    "ui.close": "close",
    "ui.craft.resources": "Resources",
    "ui.craft": "Workshop",
    "ui.cycles": "cycles",
    "ui.disable.all": "Disable all options in this list.",
    "ui.distribute": "Village",
    "ui.enable.all": "Enable all options in this list.",
    "ui.engine": "Enable Kitten Scientists",
    "ui.faith": "Religion",
    "ui.filter": "Log Filters",
    "ui.infinity": "∞",
    "ui.internals.interval.prompt": "Enter the new amount of milliseconds as an absolute value between 0 and Infinity.",
    "ui.internals.interval.promptExplainer": "All notations that the game supports are accepted. If you set the limit to 0, Kitten Scientists will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.internals.interval.promptTitle": "Kitten Scientists Execution Interval (Current: {0})",
    "ui.internals.interval": "Interval: {0}",
    "ui.internals": "Internals",
    "ui.itemsHide": "Collapse section",
    "ui.itemsShow": "Expand section",
    "ui.ksColumn": "Display KS in fourth column in UI",
    "ui.language": "Language",
    "ui.limit": "Limited",
    "ui.limited.off": "Unlimited",
    "ui.limited.on": "Eco Mode",
    "ui.max.build.prompt": "Limit for {0} (Current: {1})",
    "ui.max.build.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.max.build.title": "Build {0} {1}",
    "ui.max.build.titleInfinite": "Never stop building {0}",
    "ui.max.build.titleZero": "Don't build {0}",
    "ui.max.craft.prompt": "Enter the new limit of how many {0} to craft as an absolute value between 0 and Infinity.",
    "ui.max.craft.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.max.craft.promptTitle": "Limit for Crafting {0} (Current: {1})",
    "ui.max.craft.title": "Craft {0} {1}",
    "ui.max.craft.titleInfinite": "Never stop crafting {0}",
    "ui.max.craft.titleZero": "Don't craft {0}",
    "ui.max.distribute.prompt": "Enter the new amount of kittens to assign as {0} as an absolute value between 0 and Infinity.",
    "ui.max.distribute.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.max.distribute.promptTitle": "Assign Max. Kittens as {0} (Current: {1})",
    "ui.max.distribute.title": "Assign {0} kittens as {1}",
    "ui.max.distribute.titleInfinite": "Assign as many kittens as possible as {0}",
    "ui.max.distribute.titleZero": "Don't assign any kittens as {0}",
    "ui.max.embassy.title": "Build {0} embassy for {1}",
    "ui.max.embassy.titleInfinite": "Never stop building embassies for {0}",
    "ui.max.embassy.titleZero": "Don't build embassies for {0}",
    "ui.max.prompt.absolute": "Enter the new limit as an absolute value between 0 and Infinity.",
    "ui.max.prompt.float": "Enter the new limit as an absolute value between 0.0 and Infinity.",
    "ui.max.set": "Maximum for {0}",
    "ui.max.timeSkip.prompt": "Enter the new amount of years as an absolute value between 0 and Infinity.",
    "ui.max.timeSkip.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.max.timeSkip.promptTitle": "Max. Years to skip (Current: {0})",
    "ui.max.timeSkip.title": "Skip {0} years at once",
    "ui.max.timeSkip.titleInfinite": "Skip as many years as possible",
    "ui.max.timeSkip.titleZero": "Don't skip time",
    "ui.max": "Max: {0}",
    "ui.maximum": "Maximum",
    "ui.min": "Min: {0}",
    "ui.options": "Options",
    "ui.reset": "Reset list options to default configuration.",
    "ui.resources": "Resource Control",
    "ui.space": "Space",
    "ui.time": "Time",
    "ui.timeCtrl": "Time Control",
    "ui.trade": "Trade",
    "ui.trigger.accelerateTime.prompt": "Enter the new temporal flux storage level at which to enable Tempus Fugit as a percentage between 0.0 and 100.0.",
    "ui.trigger.accelerateTime.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.accelerateTime.promptTitle": "Trigger to Accelerate Time (Current: {0})",
    "ui.trigger.activeHeatTransfer.prompt": "Enter the new temporal heat storage level at which to enable heat transfer as a percentage between 0.0 and 100.0.",
    "ui.trigger.activeHeatTransfer.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.activeHeatTransfer.promptTitle": "Trigger for Heat Transfer (Current: {0})",
    "ui.trigger.build.blocked": "∞\n🛈 The {0} section has no trigger set. This build will not be triggered!",
    "ui.trigger.build.inherited": "inherited from section",
    "ui.trigger.build.prompt": "Trigger for {0} (Current: {1})",
    "ui.trigger.build.promptExplainer": "If you submit an empty value, or a negative value, the section trigger is used instead. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.crypto.prompt": "Enter the new relic storage level at which to trade blackcoin as an absolute value between 0.0 and Infinity.",
    "ui.trigger.crypto.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.crypto.promptTitle": "Trigger to Trade Blackcoin (Current: {0})",
    "ui.trigger.embassies.prompt": "Enter the new culture storage level at which to build embassies as a percentage between 0.0 and 100.0.",
    "ui.trigger.embassies.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.embassies.promptTitle": "Trigger to Build Embassies (Current: {0})",
    "ui.trigger.hunt.prompt": "Trigger for Hunting (Current: {0})",
    "ui.trigger.hunt.promptExplainer": "If you submit a negative value, hunting will be disabled. If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.inactive": "inactive",
    "ui.trigger.promoteKittens.prompt": "Enter the new gold storage level at which to promote kittens as a percentage between 0.0 and 100.0.",
    "ui.trigger.promoteKittens.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.promoteKittens.promptTitle": "Trigger to Promote Kittens (Current: {0})",
    "ui.trigger.prompt.absolute": "Enter the new trigger value as an absolute value between 0 and Infinity.",
    "ui.trigger.prompt.float": "Enter the new trigger value as an absolute value between 0.0 and Infinity.",
    "ui.trigger.prompt.percentage": "Enter the new trigger value as a percentage between 0.0 and 100.0.",
    "ui.trigger.reset.promptExplainer": "If you submit a negative value, the item will be disabled. If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.section.blocked": "∞\n🛈 The {0} section has no trigger set. This automation will not be triggered!",
    "ui.trigger.section.inactive": "∞ (nothing is triggered automatically)",
    "ui.trigger.section.inherited": "inherited from section",
    "ui.trigger.section.prompt": "Trigger for section {0} (Current: {1})",
    "ui.trigger.section.promptExplainer": "If you submit an empty value, or a negative value, the section trigger will be set to infinity (∞). Individual automations in this section need to have their own trigger set to be activated.\nIf you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.section": "Section default trigger: {0}",
    "ui.trigger.setinteger.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.setinteger": "Enter a new trigger value for {0}. Should be in the range from 0 up to any number. -1 means infinity.",
    "ui.trigger.setpercentage.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.setpercentage": "Enter a new trigger value for {0}. Should be in the range from 0 to 100.",
    "ui.trigger.timeSkip.prompt": "Enter the new amount of Time Crystals at which to skip time as an absolute value between 1 and Infinity.",
    "ui.trigger.timeSkip.promptExplainer": "If you submit a negative value, time skipping will be disabled. If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.timeSkip.promptTitle": "Trigger for Time Skip (Current: {0})",
    "ui.trigger": "Trigger: {0}",
    "ui.upgrade.buildings": "Upgrade buildings",
    "ui.upgrade.missions": "Start missions",
    "ui.upgrade.policies": "Research policies",
    "ui.upgrade.races": "Explore new races",
    "ui.upgrade.techs": "Research technologies",
    "ui.upgrade.upgrades": "Research upgrades",
    "ui.upgrade": "Science",
    "ui.upgrades": "Upgrades",
    update: update$3,
    "upgrade.building.amphitheatre": "Upgraded amphitheatres to broadcast towers!",
    "upgrade.building.aqueduct": "Upgraded aqueducts to hydro plants!",
    "upgrade.building.library": "Upgraded libraries to data centers!",
    "upgrade.building.pasture": "Upgraded pastures to solar farms!",
    "upgrade.building.warehouse": "Upgraded warehouses to spaceports!",
    "upgrade.policy": "Kittens have passed {0}",
    "upgrade.race": "Kittens met the {0}",
    "upgrade.space.mission": "Kittens conducted a mission to {0}",
    "upgrade.space": "Kittens conducted a {0}",
    "upgrade.tech": "Kittens have bought the tech {0}",
    "upgrade.upgrade": "Kittens have bought the upgrade {0}"
  };
  const copy$2 = "Kopieren";
  const reset$2 = "Zurücksetzen";
  const update$2 = "Aktualisieren";
  const deDE = {
    "act.accelerate": "Zeit beschleunigen!",
    "act.adore": "Verehre die Galaxie! Kumulierte {0} Anbetung zu {1} Offenbarung",
    "act.blackcoin.buy": "Kätzchen haben deine Relikte verkauft und {0} Blackcoins gekauft",
    "act.blackcoin.sell": "Kätzchen haben deine Blackcoins verkauft und {0} Relikte gekauft",
    "act.build": "Kätzchen haben ein neues {0} gebaut",
    "act.builds": "Kätzchen haben ein neues {0} {1} Mal gebaut",
    "act.craft": "Kätzchen haben {0} {1} hergestellt",
    "act.distribute": "Ein Kätzchen an {0} verteilt",
    "act.elect": "Kätzchen haben einen neuen Anführer gewählt.",
    "act.feed": "Kätzchen haben die Ältesten gefüttert. Die Ältesten sind zufrieden",
    "act.fix.cry": "Kätzchen haben {0} Kryokammern repariert",
    "act.hunt": "Kätzchen auf {0} Jagden entsendet",
    "act.observe": "Kitten Scientists haben einen Stern beobachtet",
    "act.praise": "Die Sonne gelobt! {0} Glaube zu {1} Anbetung kumuliert",
    "act.promote": "Der Anführer der Kätzchen wurde zum Rang {0} befördert",
    "act.refineTCs": "{0} Zeit-Kristalle verfeinert",
    "act.refineTears": "{0} Tränen zu STF verfeinert",
    "act.sacrificeAlicorns": "{0} Alihörner geopfert",
    "act.sacrificeUnicorns": "{0} Einhörner geopfert",
    "act.sun.discover": "Kätzchen haben {0} entdeckt",
    "act.sun.discovers": "Kätzchen haben {0} {1} mal entdeckt",
    "act.time.activeHeatTransferEnd": "Aktiver Wärmetransfer beendet",
    "act.time.activeHeatTransferStart": "Starte aktiven Wärmetransfer",
    "act.time.getTemporalFlux": "Verbrennt Kristalle, um Flux zur Erhaltung der Zeitbeschleunigung zu bekommen",
    "act.time.skip": "Kätzchen verbrennen einen Zeit-Kristall, {0} Jahre übersprungen!",
    "act.trade": "Kätzchen haben {0} mal mit {1} gehandelt",
    "act.transcend": "{0} Offenbarung ausgegeben, auf T-Level {1} aufgestiegen",
    "blackcoin.buy.prompt": "Gib den Preis ein, ab welchem du keine Blackcoins mehr kaufen möchtest.",
    "blackcoin.buy.promptExplainer": "Der Blackcoin-Preis steigt immer von 800 auf 1100 (ungefähr), dann stürzt er ab. Du möchtest normalerweise bis kurz vor dem Verkauf einkaufen.",
    "blackcoin.buy.promptTitle": "Kauf-Limit für Blackcoins (Aktuell: {0})",
    "blackcoin.buy.title": "Blackcoins kaufen bis der Preis {0} erreicht",
    "blackcoin.buy.trigger": "kaufe Blackcoins (in Relikten)",
    "blackcoin.buy": "Kauf-Limit: {0}",
    "blackcoin.sell.prompt": "Gib den Preis ein, zu welchem du deine Blackcoins verkaufen möchtest.",
    "blackcoin.sell.promptExplainer": "Der Blackcoin-Preis steigt immer von 800 auf 1100 (ungefähr), dann stürzt er ab. Du möchtest normalerweise nahe dem höchstmöglichen Preis verkaufen.",
    "blackcoin.sell.promptTitle": "Verkauf-Order für Blackcoins (Aktuell: {0})",
    "blackcoin.sell.title": "Blackcoins verkaufen, wenn der Preis {0} erreicht",
    "blackcoin.sell": "Verkauf-Order: {0}",
    "build.embassies": "{0} Botschaften für {1} gebaut",
    "build.embassy": "{0} Botschaft für {1} gebaut",
    copy: copy$2,
    "craft.limited": "Herstellen von {0}: im Verhältnis zum Kostenverhältnis begrenzt",
    "craft.unlimited": "Herstellung von {0}: unbegrenzt",
    "delete": "Löschen",
    "dispose.necrocorn": "Kätzchen haben ineffiziente Necrocorns entsorgt",
    "festival.extend": "Kätzchen haben das Festival verlängert",
    "festival.hold": "Kätzchen fangen an, ein Festival abzuhalten",
    "filter.accelerate": "Tempus Fugit",
    "filter.adore": "Bewundern",
    "filter.allKG": "Alle KG Protokollnachrichten.",
    "filter.build": "Bauen",
    "filter.craft": "Herstellen",
    "filter.disable": "{0} Protokollnachrichten deaktiviert",
    "filter.distribute": "Verteilen",
    "filter.enable": "{0} Protokollnachrichten aktiviert",
    "filter.explainer": "Deaktivierte Nachrichtentypen erscheinen nicht im Protokoll.",
    "filter.faith": "Orden der Sonne",
    "filter.festival": "Festivals",
    "filter.hunt": "Jagen",
    "filter.misc": "Diverses",
    "filter.praise": "Bewundern",
    "filter.promote": "Anführer befördern",
    "filter.research": "Erforschen",
    "filter.star": "Astronomische Ereignisse",
    "filter.timeSkip": "Zeitsprung",
    "filter.trade": "Handeln",
    "filter.transcend": "Transzendenz",
    "filter.upgrade": "Verbesserungen",
    "option.accelerate": "Tempus Fugit",
    "option.autofeed": "Leviathane füttern",
    "option.catnip": "Katzenminze sammeln",
    "option.crypto": "Blackcoin handeln",
    "option.elect.job.any": "Beliebig",
    "option.elect.job": "Beruf",
    "option.elect.trait": "Eigenschaft",
    "option.elect": "Anführer benennen",
    "option.embassies": "Botschaften bauen",
    "option.faith.adore": "Bewundere die Galaxie",
    "option.faith.autoPraise": "Lobe die Sonne",
    "option.faith.best.unicorn": "Reihenfolge automatisch optimieren",
    "option.faith.refineTears": "Tränen verfeinern",
    "option.faith.refineTimeCrystals": "ZKs verfeinern",
    "option.faith.sacrificeAlicorns": "Alihörner opfern",
    "option.faith.sacrificeUnicorns": "Einhörner opfern",
    "option.faith.transcend": "Transzendenz",
    "option.festival": "Festivals veranstalten",
    "option.fix.cry": "Kryokammern reparieren",
    "option.hunt": "Jagen",
    "option.magnetos": "Magnetos einschalten",
    "option.observe": "Astro-Ereignisse beobachten",
    "option.praise": "Lobe die Sonne",
    "option.promote": "Anführer befördern",
    "option.promotekittens": "Kätzchen befördern",
    "option.reactors": "Reaktoren einschalten",
    "option.shipOverride": "Erzwinge 243 Schiffe",
    "option.steamworks": "Dampfmaschinen einschalten",
    "option.time.activeHeatTransfer": "Aktiver Wärmetransfer",
    "option.time.reset": "Zeitleiste zurücksetzen (Gefahr!)",
    "option.time.skip.ignoreOverheat": "Überhitzen ignorieren",
    "option.time.skip": "Zeitsprung",
    "reset.after": "Schön, dich kennenzulernen, die niedlichen Kitten Scientists werden dir dienen",
    "reset.cancel.activity": "Miauston, wir haben ein Problem",
    "reset.cancel.message": "Zeitleiste zurücksetzen abgebrochen",
    "reset.check": "Auslöser für {0}: {1}, du hast {2}",
    "reset.checked": "Alle Bedingungen sind erfüllt, die Zeitlinie wird in den nächsten Sekunden neu gestartet!",
    "reset.countdown.0": "0 - Temporale Risse geöffnet!",
    "reset.countdown.1": "1 - Start der Zeitmaschine",
    "reset.countdown.10": "10 - Katzenminzeernte",
    "reset.countdown.2": "2 - Chronoschmiede wird beschleunigt",
    "reset.countdown.3": "3 - Zeit-Risse werden geöffnet",
    "reset.countdown.4": "4 - Satellit wird ausgeschaltet",
    "reset.countdown.5": "5 - Schmelze Blackcoins",
    "reset.countdown.6": "6 - Zeit-Motoren werden gestartet",
    "reset.countdown.7": "7 - Strahlenkanonen werden demontiert",
    "reset.countdown.8": "8 - Freisetzung von Echsen",
    "reset.countdown.9": "9 - Opfere Einhörner",
    "reset.last.message": "Wir sehen uns bei der nächsten poincaréschen Wiederkehr",
    "reset.tip": 'Du kannst diesen Neustart abbrechen, indem du "Kitten Scientists aktivieren" oben in den Einstellungen deaktivierst.',
    reset: reset$2,
    "resources.consume.prompt": "Gib ein wie viel von der Ressource von Automatisierungen verbraucht werden darf. Der Wert sollte zwischen 0,0 und 100,0 liegen.",
    "resources.consume.promptExplainer": "Wenn du einen leeren oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hättest.",
    "resources.consume.promptTitle": "Verbrauchsanteil für {0} (Aktuell: {1})",
    "resources.consume.set": "Verbrauchs-Rate für {0}",
    "resources.consume.title": "Verbraucht {0} von {1}",
    "resources.consume.titleZero": "{0} werden nicht verbraucht",
    "resources.consume": "Verbrauch: {0}",
    "resources.stock.prompt": "Gib ein wie viel von der Ressource jederzeit im Lager bleiben soll.",
    "resources.stock.promptExplainer": "Alle Notationen, die das Spiel unterstützt werden, akzeptiert. Wenn du gar nichts, oder einen negativen Wert eingibst, wird die Grenze auf unendlich gesetzt. Wenn du die Grenze auf 0 setzt, wird Zeit Überspringen deaktiviert. Wenn du einen ungültigen Wert eingibst, wird das genauso behandelt als ob du Abbrechen gedrückt hättest.",
    "resources.stock.promptTitle": "Mindest-Lagerbestand von {0} (Aktuell: {1})",
    "resources.stock.title": "{0} {1} werden auf Lager gehalten",
    "resources.stock.titleInfinite": "Alle {0} werden auf Lager gehalten",
    "resources.stock.titleZero": "{0} werden nicht auf Lager gehalten",
    "state.compress": "Kopierte Kittens Game Spielstände komprimieren",
    "state.confirmDestruction": "Bist du sicher?",
    "state.copied.game": "Spielstand '{0}' in die Zwischenablage kopiert.",
    "state.copied.gameCurrent": "Aktueller Spielstand in Zwischenablage kopiert.",
    "state.copied.state": "Zustand '{0}' in Zwischenablage kopiert.",
    "state.copied.stateCurrent": "Aktueller Zustand wurde in die Zwischenablage kopiert.",
    "state.copy.game": "Diesen Spielstand in die Zwischenablage kopieren.",
    "state.copy.gameCurrent": "Kopiere den gesamten Kittens Game Spielstand (inklusive KS-Einstellungen) in die Zwischenablage.",
    "state.copy.state": "Diese Einstellungen in die Zwischenablage kopieren.",
    "state.copy.stateCurrent": "Kopiere die aktuellen Kitten Scientists Einstellungen in die Zwischenablage.",
    "state.delete.game": "Diesen Spielstand löschen.",
    "state.delete.state": "Diese Einstellungen löschen.",
    "state.deleted.game": "Spielstand '{0}' gelöscht.",
    "state.deleted.state": "Zustand '{0}' gelöscht.",
    "state.edit.game": "Ändere den Namen von diesem Spielstand.",
    "state.edit.state": "Ändere den Namen von diesen Einstellungen.",
    "state.exportAll": "Export",
    "state.exportAllTitle": "Speichert alle lokalen Zustände in einer Datei und lädt sie herunter.",
    "state.import": "Einstellungen/Spielstände importieren",
    "state.imported.game": "Spielstand importiert.",
    "state.imported.state": "Zustand importiert.",
    "state.importTitle": "Füge ein Spielstand oder Einstellungen aus deiner Zwischenablage ein.\nInhalte werden automatisch erkannt und entsprechend behandelt.",
    "state.loaded.game": "Spielstand '{0}' geladen.",
    "state.loaded.state": "Zustand '{0}' geladen.",
    "state.loadPrompt": "Füge deinen (un/komprimierten) Spielstand oder deine Einstellungen hier ein:",
    "state.local": "Lokale Speicherverwaltung",
    "state.localGames": "Kittens Game Spielstände",
    "state.localStates": "Kitten Scientists Einstellungen",
    "state.new": "Neu",
    "state.noConfirm": "Nicht nach Bestätigung fragen",
    "state.store": "Speichern",
    "state.stored.game": "Spielstand gespeichert.",
    "state.stored.state": "Zustand gespeichert.",
    "state.storeFactory": "Neuen Zustand aus Werkseinstellungen erstellen.",
    "state.storeGame.prompt": "Gib eine Beschreibung für diesen Spielstand ein:",
    "state.storeGame": "Neuen Spielstand vom aktuellen Spiel erstellen.",
    "state.storeState.prompt": "Gib eine Beschreibung für diesen Zustand ein:",
    "state.storeState": "Erstelle einen neuen Zustand aus den aktuellen Einstellungen.",
    "state.title": "Zustandsverwaltung",
    "state.unlabeledGame": "unbeschriftetes Spiel",
    "state.unlabeledState": "unbeschrifteter Zustand",
    "state.update.game": "Speichere das aktuelle Spiel in diesem Slot.",
    "state.update.state": "Speichere die aktuellen Einstellungen in diesem Slot.",
    "state.updated.game": "Spielstand '{0}' aktualisiert.",
    "state.updated.state": "Zustand '{0}' aktualisiert.",
    "status.auto.disable": "Auto {0} deaktiviert",
    "status.auto.enable": "Auto {0} aktiviert",
    "status.ks.disable": "Deaktiviere die Kitten Scientists!",
    "status.ks.enable": "Aktiviere die Kitten Scientists!",
    "status.ks.init": "Kitten Scientists initialisiert.",
    "status.ks.upgrade": "Kitten Scientists {0} (unsere ist {1}) ist unter {2} verfügbar.",
    "status.reset.check.disable": "Überprüfung von {0} vor dem Zurücksetzen der Zeitlinie deaktiviert",
    "status.reset.check.enable": "Überprüfung von {0} vor dem Zurücksetzen der Zeitlinie aktiviert",
    "status.resource.disable": "{0} Ressourcenverwaltung deaktiviert",
    "status.resource.enable": "{0} Ressourcenverwaltung aktiviert",
    "status.sub.disable": "{0} deaktiviert",
    "status.sub.enable": "{0} aktiviert",
    "summary.accelerate": "Zeit {0} Mal beschleunigt",
    "summary.adore": "{0} Offenbarung durch das Bewundern der Galaxie akkumuliert",
    "summary.building": "{0} {1} gebaut",
    "summary.craft": "{0} {1} hergestellt",
    "summary.day": "Tag",
    "summary.days": "Tage",
    "summary.distribute": "{0} Kätzchen geholfen einen Beruf zu finden",
    "summary.embassy": "{0} Botschaften gebaut",
    "summary.feed": "{0} Necrocorns an die Ältesten verfüttert",
    "summary.festival": "{0} Festivals veranstaltet",
    "summary.fix.cry": "{0} Kryokammern repariert",
    "summary.head": "Zusammenfassung der letzten {0}",
    "summary.hunt": "Niedliche Jäger Kätzchen auf {0} Jagden versandt",
    "summary.praise": "{0} Anbetung durch Loben der Sonne akkumuliert",
    "summary.promote": "Unseren Anführer {0} mal befördert",
    "summary.refine": "{0} {1} verfeinert",
    "summary.separator": " und ",
    "summary.show": "Aktivitäten anzeigen",
    "summary.stars": "{0} Sterne beobachtet",
    "summary.sun": "{0} {1} entdeckt",
    "summary.tech": "{0} erforscht",
    "summary.time.activeHeatTransferStart": "Aktive Wärmeübertragung {0} mal",
    "summary.time.getTemporalFlux": "{0} Mal Kristalle verbrannt, um Zeit Flux zu generieren",
    "summary.time.reset.content": "{0} Karma erhalten.<br>{1} Paragon erhalten",
    "summary.time.reset.title": "Zusammenfassung der letzten {0} Zeitleisten",
    "summary.time.skip": "{0} Jahre übersprungen",
    "summary.trade": "{0} mal mit {1} gehandelt",
    "summary.transcend": "{0} mal aufgestiegen",
    "summary.upgrade": "{0} verbessert",
    "summary.year": "Jahr",
    "summary.years": "Jahre",
    "time.heatTransfer.cycle.disable": "Aktiver Wärmetransfer im Zyklus {0} deaktiviert",
    "time.heatTransfer.cycle.enable": "Aktiver Wärmetransfer im Zyklus {0} aktiviert",
    "time.skip.cycle.disable": "Zeitsprung im Zyklus {0} und Überspringen über diesen Zyklus verboten",
    "time.skip.cycle.enable": "Zeitsprung im Zyklus {0} und Überspringen über diesen Zyklus erlaubt",
    "time.skip.season.disable": "Zeitsprung in {0} deaktiviert",
    "time.skip.season.enable": "Zeitsprung in {0} aktiviert",
    "trade.limited": "Handel mit {0}: limitiert auf nur, wenn profitabel auf Basis der relativen Produktionszeit",
    "trade.season.disable": "Handel mit {0} in {1} deaktiviert",
    "trade.season.enable": "Handel mit {0} in {1} aktiviert",
    "trade.seasons": "Jahreszeiten",
    "trade.unlimited": "Handel mit {0}: unbegrenzt",
    "ui.additional": "Weitere Optionen",
    "ui.build": "Lagerfeuer",
    "ui.close": "schließen",
    "ui.craft.resources": "Ressourcen",
    "ui.craft": "Werkstatt",
    "ui.cycles": "Zyklen",
    "ui.disable.all": "Alle Optionen in dieser Liste deaktivieren.",
    "ui.distribute": "Dorf",
    "ui.enable.all": "Alle Optionen in dieser Liste aktivieren.",
    "ui.engine": "Kitten Scientists aktivieren",
    "ui.faith": "Religion",
    "ui.filter": "Protokollfilter",
    "ui.infinity": "∞",
    "ui.internals.interval.prompt": "Gib die neue Anzahl an Millisekunden als absoluten Wert zwischen 0 und unendlich ein.",
    "ui.internals.interval.promptExplainer": "Alle Notationen, die das Spiel unterstützt werden, akzeptiert. Wenn du die Grenze auf 0 setzt, werden die Kitten Scientists deaktiviert. Wenn du einen ungültigen Wert eingibst, wird das genauso behandelt als ob du Abbrechen gedrückt hättest.",
    "ui.internals.interval.promptTitle": "Kitten Scientists Ausführungsintervall (Aktuell: {0})",
    "ui.internals.interval": "Intervall: {0}",
    "ui.internals": "Intern",
    "ui.itemsHide": "Abschnitt einklappen",
    "ui.itemsShow": "Abschnitt ausklappen",
    "ui.ksColumn": "KS in vierter Spalte im UI anzeigen",
    "ui.language": "Sprache",
    "ui.limit": "Begrenzt",
    "ui.limited.off": "Unbegrenzt",
    "ui.limited.on": "Öko-Modus",
    "ui.max.build.prompt": "Grenze für {0} (Aktuell: {1})",
    "ui.max.build.promptExplainer": "Alle Notationen, die das Spiel unterstützt werden, akzeptiert. Wenn du gar nichts, oder einen negativen Wert eingibst, wird die Grenze auf unendlich gesetzt. Wenn du die Grenze auf 0 setzt, wird Zeit Überspringen deaktiviert. Wenn du einen ungültigen Wert eingibst, wird das genauso behandelt als ob du Abbrechen gedrückt hättest.",
    "ui.max.build.title": "Baue {0} {1}",
    "ui.max.build.titleInfinite": "Nie aufhören {0} zu bauen",
    "ui.max.build.titleZero": "{0} nicht bauen",
    "ui.max.craft.prompt": "Gib die neue Grenze zum Herstellen von {0} als absoluten Wert zwischen 0 und unendlich ein.",
    "ui.max.craft.promptExplainer": "Alle Notationen, die das Spiel unterstützt werden, akzeptiert. Wenn du gar nichts, oder einen negativen Wert eingibst, wird die Grenze auf unendlich gesetzt. Wenn du die Grenze auf 0 setzt, wird Zeit Überspringen deaktiviert. Wenn du einen ungültigen Wert eingibst, wird das genauso behandelt als ob du Abbrechen gedrückt hättest.",
    "ui.max.craft.promptTitle": "Grenze für Herstellen von {0} (Aktuell: {1})",
    "ui.max.craft.title": "{0} {1} herstellen",
    "ui.max.craft.titleInfinite": "Nie aufhören {0} herzustellen",
    "ui.max.craft.titleZero": "{0} nicht herstellen",
    "ui.max.distribute.prompt": "Gib die neue Anzahl an Kätzchen im {0} Beruf als absoluten Wert zwischen 0 und unendlich ein.",
    "ui.max.distribute.promptExplainer": "Alle Notationen, die das Spiel unterstützt werden, akzeptiert. Wenn du gar nichts, oder einen negativen Wert eingibst, wird die Grenze auf unendlich gesetzt. Wenn du die Grenze auf 0 setzt, wird Zeit Überspringen deaktiviert. Wenn du einen ungültigen Wert eingibst, wird das genauso behandelt als ob du Abbrechen gedrückt hättest.",
    "ui.max.distribute.promptTitle": "Max. Kätzchen als {0} zuweisen (Aktuell: {1})",
    "ui.max.distribute.title": "{0} Kätzchen als {1} zuweisen",
    "ui.max.distribute.titleInfinite": "So viele Kätzchen wie möglich als {0} zuweisen",
    "ui.max.distribute.titleZero": "Keine Kätzchen als {0} zuweisen",
    "ui.max.embassy.title": "Baue {0} Botschaften für {1}",
    "ui.max.embassy.titleInfinite": "Nie aufhören Botschaften für {0} zu bauen",
    "ui.max.embassy.titleZero": "Keine Botschaften für {0} bauen",
    "ui.max.prompt.absolute": "Gib die neue Grenze als absoluten Wert zwischen 0 und unendlich ein.",
    "ui.max.prompt.float": "Gib die neue Grenze als absoluten Wert zwischen 0,0 und unendlich ein.",
    "ui.max.set": "Maximum für {0}",
    "ui.max.timeSkip.prompt": "Gib die neue Anzahl an Jahren als absoluten Wert zwischen 0 und unendlich ein.",
    "ui.max.timeSkip.promptExplainer": "Alle Notationen, die das Spiel unterstützt werden, akzeptiert. Wenn du gar nichts, oder einen negativen Wert eingibst, wird die Grenze auf unendlich gesetzt. Wenn du die Grenze auf 0 setzt, wird Zeit Überspringen deaktiviert. Wenn du einen ungültigen Wert eingibst, wird das genauso behandelt als ob du Abbrechen gedrückt hättest.",
    "ui.max.timeSkip.promptTitle": "Max. Jahre zum Überspringen (Aktuell: {0})",
    "ui.max.timeSkip.title": "{0} Jahre auf einmal überspringen",
    "ui.max.timeSkip.titleInfinite": "So viele Jahre wie möglich überspringen",
    "ui.max.timeSkip.titleZero": "Keine Zeit überspringen",
    "ui.max": "Max: {0}",
    "ui.maximum": "Maximum",
    "ui.min": "Min. {0}",
    "ui.options": "Optionen",
    "ui.reset": "Optionen in der Liste auf Standardkonfiguration zurücksetzen.",
    "ui.resources": "Ressourcensteuerung",
    "ui.space": "Weltraum",
    "ui.time": "Zeit",
    "ui.timeCtrl": "Zeitsteuerung",
    "ui.trade": "Handel",
    "ui.trigger.accelerateTime.prompt": "Gib den neuen Lagerbestand von Temporalem Flux, bei welchem Tempus Fugit aktiviert werden soll, als Prozentzahl ein. Der Wert sollte zwischen 0,0 und 100,0 liegen.",
    "ui.trigger.accelerateTime.promptExplainer": "Wenn du einen leeren oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hättest.",
    "ui.trigger.accelerateTime.promptTitle": "Auslöser zur Zeit-Beschleunigung (Aktuell: {0})",
    "ui.trigger.activeHeatTransfer.prompt": "Gib den neuen Stand von Chronohitze, bei welchem aktiver Wärmetransfer aktiviert werden sollen, als Prozentzahl ein. Der Wert sollte zwischen 0,0 und 100,0 liegen.",
    "ui.trigger.activeHeatTransfer.promptExplainer": "Wenn du einen leeren oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hättest.",
    "ui.trigger.activeHeatTransfer.promptTitle": "Auslöser für Wärmetransfer (Aktuell: {0})",
    "ui.trigger.build.blocked": "∞\n🛈 Der Abschnitt {0} hat keinen Auslöser gesetzt. Diese Option wird nie ausgelöst!",
    "ui.trigger.build.inherited": "von Abschnitt übernommen",
    "ui.trigger.build.prompt": "Auslöser für {0} (Aktuell: {1})",
    "ui.trigger.build.promptExplainer": 'Wenn du gar nichts, oder eine negative Zahl eingibst, wird der Auslöser des Abschnitts geerbt. Ungültige Eingaben werden so behandelt als ob du "Abbrechen" drückst.',
    "ui.trigger.crypto.prompt": "Gib den neuen Lagerbestand von Relikten, bei welchem Blackcoins gehandelt werden sollen, als absoluten Wert zwischen 0,0 und unendlich ein.",
    "ui.trigger.crypto.promptExplainer": "Wenn du einen leeren oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hättest.",
    "ui.trigger.crypto.promptTitle": "Auslöser um Blackcoin zu handeln (Aktuell: {0})",
    "ui.trigger.embassies.prompt": "Gib den neuen Lagerbestand von Kultur, bei welchem Botschaften gebaut werden sollen, als Prozentzahl ein. Der Wert sollte zwischen 0,0 und 100,0 liegen.",
    "ui.trigger.embassies.promptExplainer": "Wenn du einen leeren oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hättest.",
    "ui.trigger.embassies.promptTitle": "Auslöser für den Bau von Botschaften (Aktuell: {0})",
    "ui.trigger.hunt.prompt": "Auslöser für Jagd (Aktuell: {0})",
    "ui.trigger.hunt.promptExplainer": "Wenn du einen negativen Wert eingibst, wird Jagen deaktiviert. Wenn du einen leeren Wert oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hast.",
    "ui.trigger.inactive": "inaktiv",
    "ui.trigger.promoteKittens.prompt": "Gib den neuen Lagerbestand von Gold, bei welchem Kätzchen befördert werden sollen, als Prozentzahl ein. Der Wert sollte zwischen 0,0 und 100,0 liegen.",
    "ui.trigger.promoteKittens.promptExplainer": "Wenn du einen leeren oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hättest.",
    "ui.trigger.promoteKittens.promptTitle": "Auslöser um Kätzchen zu befördern (Aktuell: {0})",
    "ui.trigger.prompt.absolute": "Gib den neuen Auslöser als absoluten Wert zwischen 0 und unendlich ein.",
    "ui.trigger.prompt.float": "Gib den neuen Auslöser als absoluten Wert zwischen 0,0 und unendlich ein.",
    "ui.trigger.prompt.percentage": "Gib den neuen Auslöser als Prozentzahl zwischen 0,0 und 100,0 ein.",
    "ui.trigger.reset.promptExplainer": "Wenn du einen negativen Wert eingibst, wird die Option deaktiviert. Wenn du einen leeren Wert oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hast.",
    "ui.trigger.section.blocked": "∞\n🛈 The {0} section has no trigger set. This automation will not be triggered!",
    "ui.trigger.section.inactive": "∞ (nothing is triggered automatically)",
    "ui.trigger.section.inherited": "von Abschnitt übernommen",
    "ui.trigger.section.prompt": "Auslöser für Abschnitt {0} (Aktuell: {1})",
    "ui.trigger.section.promptExplainer": "If you submit an empty value, or a negative value, the section trigger will be set to infinity (∞). Individual automations in this section need to have their own trigger set to be activated.\nIf you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.section": "Abschnitt Standard-Auslöser: {0}",
    "ui.trigger.setinteger.promptExplainer": "Wenn du einen leeren oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hättest.",
    "ui.trigger.setinteger": "Gib einen neuen Auslöser für {0} ein. Sollte im Bereich von 0 bis zu einer beliebigen Zahl liegen. -1 bedeutet unendlich.",
    "ui.trigger.setpercentage.promptExplainer": "Wenn du einen leeren oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hättest.",
    "ui.trigger.setpercentage": "Geben Sie einen neuen Auslöser für {0} ein. Sollte im Bereich von 0 bis 100 liegen.",
    "ui.trigger.timeSkip.prompt": "Gib die neue Menge an Zeitkristallen ein, bei welcher Zeit übersprungen werden soll. Der Wert sollte zwischen 1 und unendlich liegen.",
    "ui.trigger.timeSkip.promptExplainer": "Wenn du einen negativen Wert eingibst, werden Zeit-Sprünge deaktiviert. Wenn du einen leeren Wert oder einen ungültigen Wert eingibst, wird das so behandelt, als ob du Abbrechen gedrückt hast.",
    "ui.trigger.timeSkip.promptTitle": "Auslöser für Zeitsprung (Aktuell: {0})",
    "ui.trigger": "Auslöser: {0}",
    "ui.upgrade.buildings": "Gebäude verbessern",
    "ui.upgrade.missions": "Missionen starten",
    "ui.upgrade.policies": "Politik erforschen",
    "ui.upgrade.races": "Neue Völker erforschen",
    "ui.upgrade.techs": "Technologien erforschen",
    "ui.upgrade.upgrades": "Verbesserungen erforschen",
    "ui.upgrade": "Wissenschaft",
    "ui.upgrades": "Verbesserungen",
    update: update$2,
    "upgrade.building.amphitheatre": "Amphitheater zu Sendetürmen verbessert!",
    "upgrade.building.aqueduct": "Aquädukte zu Wasserwerken verbessert!",
    "upgrade.building.library": "Bibliotheken zu Rechenzentren verbessert!",
    "upgrade.building.pasture": "Weiden zu Solarfarmen verbessert!",
    "upgrade.building.warehouse": "Lagerhäuser zu Raumhäfen verbessert!",
    "upgrade.policy": "Kätzchen haben {0} veranlasst",
    "upgrade.race": "Kätzchen haben die {0} getroffen",
    "upgrade.space.mission": "Kätzchen haben eine Mission zu {0} durchgeführt",
    "upgrade.space": "Kätzchen haben {0} durchgeführt",
    "upgrade.tech": "Kätzchen haben die Technologie {0} gekauft",
    "upgrade.upgrade": "Kätzchen haben die Verbesserung {0} gekauft"
  };
  const copy$1 = "Copy";
  const reset$1 = "Reset";
  const update$1 = "Update";
  const heIL = {
    "act.accelerate": "האץ את הזמן!",
    "act.adore": "העריץ את הגלקסיה! נאסף {0} פולחן ל-{1} תגלית",
    "act.blackcoin.buy": "Kittens sold your Relics and bought {0} Blackcoins",
    "act.blackcoin.sell": "Kittens sold your Blackcoins and bought {0} Relics",
    "act.build": "חתלתולים בנו {0} חדש",
    "act.builds": "חתלתולים בנו {0} חדש {1} פעמים",
    "act.craft": "חתלתולים יצרו {0} {1}",
    "act.distribute": "הופץ חתלתול ל-{0}",
    "act.elect": "חתלתולים בחרו מנהיג חדש.",
    "act.feed": "חתלתולים האכילו את העתיקים. העתיקים מרוצים",
    "act.fix.cry": "חתלתולים תיקנו {0} תאי קריו",
    "act.hunt": "נשלחו חתלתולים {0} פעמים לציד",
    "act.observe": "מדעניתלתול צפו בכוכב",
    "act.praise": "הריעו לשמש! נצבר {0} אמונה עבור {1} פולחן",
    "act.promote": "מנהיג החתלתולים קודם לדרגה {0}",
    "act.refineTCs": "זוקקו {0} בדולחי זמן",
    "act.refineTears": "Refined {0} tears into BLS",
    "act.sacrificeAlicorns": "הוקרבו {0} מכונפי קרן",
    "act.sacrificeUnicorns": "Sacrificed {0} unicorns",
    "act.sun.discover": "חתותולים גילו {0}",
    "act.sun.discovers": "חתלתולים גילו {0} {1} פעמים",
    "act.time.activeHeatTransferEnd": "End active Heat Transfer",
    "act.time.activeHeatTransferStart": "Start active Heat Transfer",
    "act.time.getTemporalFlux": "Burn crystals to obtain time flux to maintain time acceleration",
    "act.time.skip": "חתלתולים שרפו בדולח זמן, ופסחו על {0} שנים!",
    "act.trade": "חתלתולים סחרו {0} פעמים עם {1}",
    "act.transcend": "נוצל {0} תגלית, התעלה לרמת התעלות: {1}",
    "blackcoin.buy.prompt": "Enter at which price you want to stop buying blackcoins.",
    "blackcoin.buy.promptExplainer": "Blackcoin price always rises from 800 to 1100 (roughly), then it crashes. You usually want to buy until shortly before you sell.",
    "blackcoin.buy.promptTitle": "Buy Limit for Blackcoins (Current: {0})",
    "blackcoin.buy.title": "Buy Blackcoins until price reaches {0}",
    "blackcoin.buy.trigger": "קונה מטבעותשחור (בשרידים)",
    "blackcoin.buy": "Buy Limit: {0}",
    "blackcoin.sell.prompt": "Enter at which price you want to sell all your blackcoins.",
    "blackcoin.sell.promptExplainer": "Blackcoin price always rises from 800 to 1100 (roughly), then it crashes. You usually want to sell close to the highest possible price.",
    "blackcoin.sell.promptTitle": "Sell Order for Blackcoins (Current: {0})",
    "blackcoin.sell.title": "Sell Blackcoins when price reaches {0}",
    "blackcoin.sell": "Sell Order: {0}",
    "build.embassies": "נבנו {0} שגרירויות של {1}",
    "build.embassy": "נבנו {0} שגרירויות של {1}",
    copy: copy$1,
    "craft.limited": "יוצר {0}: מוגבל לעלות היחסית",
    "craft.unlimited": "יוצר {0}: ללא הגבלה",
    "delete": "Delete",
    "dispose.necrocorn": "חתלתולים נפטרו מאלמתי קרן לא יעילים",
    "festival.extend": "חתלתולים האריכו את החגיגה",
    "festival.hold": "חתלתולים החלו לערוך חגיגה",
    "filter.accelerate": "הזמן עובר לו",
    "filter.adore": "מעריץ",
    "filter.allKG": "All KG log entries.",
    "filter.build": "בנייה",
    "filter.craft": "יצירה",
    "filter.disable": "נכבו {0} רשומות",
    "filter.distribute": "חלוקה",
    "filter.enable": "Enabled {0} log messages",
    "filter.explainer": "Disabled items are hidden from the log.",
    "filter.faith": "מסדר השמש",
    "filter.festival": "חגיגות",
    "filter.hunt": "ציד",
    "filter.misc": "שונות",
    "filter.praise": "הילול",
    "filter.promote": "העלאות דרגה",
    "filter.research": "חקר",
    "filter.star": "אירועים אסטרונומיים",
    "filter.timeSkip": "קפיצת זמן",
    "filter.trade": "סחר",
    "filter.transcend": "עילוי",
    "filter.upgrade": "שדרוג",
    "option.accelerate": "הזמן עובר לו",
    "option.autofeed": "האכל לוויתנים",
    "option.catnip": "Gather Catnip",
    "option.crypto": "סחור במטבעשחור",
    "option.elect.job.any": "Any",
    "option.elect.job": "Job",
    "option.elect.trait": "Trait",
    "option.elect": "בחר מנהיג",
    "option.embassies": "בנה שגרירויות",
    "option.faith.adore": "הערץ את הגלקסיה",
    "option.faith.autoPraise": "הלל את השמש",
    "option.faith.best.unicorn": "Automate Build Order",
    "option.faith.refineTears": "זקק דמעות",
    "option.faith.refineTimeCrystals": "זקק TCים",
    "option.faith.sacrificeAlicorns": "הקרב מכונפי קרן",
    "option.faith.sacrificeUnicorns": "Sacrifice Unicorns",
    "option.faith.transcend": "עילוי",
    "option.festival": "ארגן חגיגות",
    "option.fix.cry": "תקן תאי קריו",
    "option.hunt": "צוד",
    "option.magnetos": "הפעל מגנטוים",
    "option.observe": "צפה באירועים אסטרונומיים",
    "option.praise": "הלל את השמש",
    "option.promote": "העלאות דרגה",
    "option.promotekittens": "העלה את דרגת החתלתולים",
    "option.reactors": "Turn on Reactors",
    "option.shipOverride": "הכרח ספינות ל-243",
    "option.steamworks": "הפעל את מנוע הקיטור",
    "option.time.activeHeatTransfer": "Active Heat Transfer",
    "option.time.reset": "אתחל מחדש את ציר הזמן (סכנה!)",
    "option.time.skip.ignoreOverheat": "Ignore overheat",
    "option.time.skip": "קפיצת זמן",
    "reset.after": "Nice to meet you, the cute Kitten Scientists will serve you",
    "reset.cancel.activity": "מאוסטון, יש לנו בעיה",
    "reset.cancel.message": "אתחול ציר הזמן בוטל",
    "reset.check": "Trigger for {0}: {1}, you have {2}",
    "reset.checked": "All conditions are met, the timeline will restart in the next few seconds!",
    "reset.countdown.0": "0 - Temporal rifts opened!",
    "reset.countdown.1": "1 - Time engine start",
    "reset.countdown.10": "10 - קוצר נפית חתולים",
    "reset.countdown.2": "2 - Boosting the chronoforge",
    "reset.countdown.3": "3 - Opening temporal rifts",
    "reset.countdown.4": "4 - Turning off satellite",
    "reset.countdown.5": "5 - Melting blackcoins",
    "reset.countdown.6": "6 - Starting time engines",
    "reset.countdown.7": "7 - Disassembling railguns",
    "reset.countdown.8": "8 - Releasing lizards",
    "reset.countdown.9": "9 - Sacrificing unicorns",
    "reset.last.message": "נתראה בהישנות פואנקרה הבאה",
    "reset.tip": 'You can cancel this reset by disabling "Enable Kitten Scientists" at the top of the settings.',
    reset: reset$1,
    "resources.consume.prompt": "Enter how much of the resource you want automations to consume as a percentage between 0.0 and 100.0.",
    "resources.consume.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "resources.consume.promptTitle": "Consumption Share for {0} (Current: {1})",
    "resources.consume.set": "קצב צריכה עבור {0}",
    "resources.consume.title": "Consuming {0} of {1}",
    "resources.consume.titleZero": "Not consuming {0}",
    "resources.consume": "צרוך: {0}",
    "resources.stock.prompt": "Enter how much of the resource you always want to keep in stock.",
    "resources.stock.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "resources.stock.promptTitle": "Stock value for {0} (Current: {1})",
    "resources.stock.title": "Keeping {0} {1} in stock",
    "resources.stock.titleInfinite": "Keeping all {0} in stock",
    "resources.stock.titleZero": "Not keeping any {0} in stock",
    "state.compress": "Compress data",
    "state.confirmDestruction": "האם אתה בטוח?",
    "state.copied.game": "Save '{0}' copied to clipboard.",
    "state.copied.gameCurrent": "Current save copied to clipboard.",
    "state.copied.state": "State '{0}' copied to clipboard.",
    "state.copied.stateCurrent": "Current state copied to clipboard.",
    "state.copy.game": "Copy this save to the clipboard.",
    "state.copy.gameCurrent": "Copy the entire Kittens Game save (includes KS settings) to the clipboard.",
    "state.copy.state": "Copy these settings to the clipboard.",
    "state.copy.stateCurrent": "Copy the current Kitten Scientists settings to the clipboard.",
    "state.delete.game": "Delete this save.",
    "state.delete.state": "Delete these settings.",
    "state.deleted.game": "Save '{0}' deleted.",
    "state.deleted.state": "State '{0}' deleted.",
    "state.edit.game": "Change the name of this save.",
    "state.edit.state": "Change the name of these settings.",
    "state.exportAll": "Backup",
    "state.exportAllTitle": "Stores all local states in a single file and downloads it.",
    "state.import": "Import from clipboard",
    "state.imported.game": "Save imported.",
    "state.imported.state": "State imported.",
    "state.importTitle": "Paste a save or settings from your clipboard.\nContents will be automatically detected and handled accordingly.",
    "state.loaded.game": "Save '{0}' loaded.",
    "state.loaded.state": "State '{0}' loaded.",
    "state.loadPrompt": "Paste your (un/compressed) save or settings here:",
    "state.local": "Local states",
    "state.localGames": "Kittens Game Saves",
    "state.localStates": "Kitten Scientists Settings",
    "state.new": "New",
    "state.noConfirm": "Do NOT confirm destructive actions. (Danger!)",
    "state.store": "Store",
    "state.stored.game": "Save stored.",
    "state.stored.state": "State stored.",
    "state.storeFactory": "Create a new state from factory defaults.",
    "state.storeGame.prompt": "Provide a label for this save:",
    "state.storeGame": "Create a new save from the current game.",
    "state.storeState.prompt": "Provide a label for this state:",
    "state.storeState": "Create a new state from current settings.",
    "state.title": "State Management",
    "state.unlabeledGame": "unlabeled save",
    "state.unlabeledState": "unlabeled state",
    "state.update.game": "Save the current game into this slot.",
    "state.update.state": "Save the current settings into this slot.",
    "state.updated.game": "Save '{0}' updated.",
    "state.updated.state": "State '{0}' updated.",
    "status.auto.disable": "Disabled Auto {0}",
    "status.auto.enable": "Enabled Auto {0}",
    "status.ks.disable": "מבטל את המדעניתלתול!",
    "status.ks.enable": "מאפשר את המדעניתלתול!",
    "status.ks.init": "Kitten Scientists initialized.",
    "status.ks.upgrade": "Kitten Scientists {0} (ours is {1}) is available at {2}.",
    "status.reset.check.disable": "Disabled check {0} before Reset Timeline",
    "status.reset.check.enable": "Enabled check {0} before Reset Timeline",
    "status.resource.disable": "כבה ניהול משאבי {0}",
    "status.resource.enable": "הפעל ניהול משאבי {0}",
    "status.sub.disable": "{0} הושבת",
    "status.sub.enable": "{0} אופשר",
    "summary.accelerate": "הזמן הועץ {0} פעמים",
    "summary.adore": "נצבר {0} תגלית על ידי הערצת הגלקסיה",
    "summary.building": "נבנה {0} {1}",
    "summary.craft": "נוצר {0} {1}",
    "summary.day": "יום",
    "summary.days": "ימים",
    "summary.distribute": "עזרת ל-{0} חתלתולים למצוא עבודה",
    "summary.embassy": "נבנו {0} שגרירויות",
    "summary.feed": "האכלת את הוותיקים {0} אלמתי קרן",
    "summary.festival": "אורגנו {0} חגיגות",
    "summary.fix.cry": "תוקנו {0} תאי קריו",
    "summary.head": "תקציר {0} האחרונים",
    "summary.hunt": "צידיתלתול יצאו לצוד {0} פעמים",
    "summary.praise": "נצבר {0} פולחן על ידי הילול השמש",
    "summary.promote": "המנהיג קודם {0} פעמים",
    "summary.refine": "זוקק {0} {1}",
    "summary.separator": " ועוד ",
    "summary.show": "הצג פעילות",
    "summary.stars": "נצפו {0} כוכבים",
    "summary.sun": "התגלו {0} {1}",
    "summary.tech": "נחקרו {0}",
    "summary.time.activeHeatTransferStart": "Active Heat Transfer {0} times",
    "summary.time.getTemporalFlux": "Burn crystal to gain time flux {0} times",
    "summary.time.reset.content": "נאסף {0} קרמה.<br>נאסף {1} מופת",
    "summary.time.reset.title": "סיכום {0} צירי הזמן האחרונים",
    "summary.time.skip": "{0} שנים נפסחו",
    "summary.trade": "סחרת {0} פעמים עם {1}",
    "summary.transcend": "התעלית {0} פעמים",
    "summary.upgrade": "שודרג {0}",
    "summary.year": "שנה",
    "summary.years": "שנים",
    "time.heatTransfer.cycle.disable": "Disabled active heat transfer in cycle {0}",
    "time.heatTransfer.cycle.enable": "Enabled active heat transfer in cycle {0}",
    "time.skip.cycle.disable": "Disabled time skip in cycle {0} and disallow skip over this cycle",
    "time.skip.cycle.enable": "Enabled time skip in cycle {0} and allow skip over this cycle",
    "time.skip.season.disable": "Disabled time skip in the {0}",
    "time.skip.season.enable": "Enabled time skip in the {0}",
    "trade.limited": "סחר עם {0}: מוגבל רק כאשר זה רווחי ביחס לזמן ייצור",
    "trade.season.disable": "בוטל הסחר עם {0} עבור {1}",
    "trade.season.enable": "אופשר הסחר עם {0} עבור {1}",
    "trade.seasons": "עונות",
    "trade.unlimited": "סחר עם {0}: ללא הגבלה",
    "ui.additional": "Additional options",
    "ui.build": "מדורה",
    "ui.close": "סגור",
    "ui.craft.resources": "משאבים",
    "ui.craft": "סדנא",
    "ui.cycles": "מחזורים",
    "ui.disable.all": "Disable all options in this list.",
    "ui.distribute": "כפר",
    "ui.enable.all": "Enable all options in this list.",
    "ui.engine": "Enable Kitten Scientists",
    "ui.faith": "דת",
    "ui.filter": "סנני רשומות",
    "ui.infinity": "∞",
    "ui.internals.interval.prompt": "Enter the new amount of milliseconds as an absolute value between 0 and Infinity.",
    "ui.internals.interval.promptExplainer": "All notations that the game supports are accepted. If you set the limit to 0, Kitten Scientists will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.internals.interval.promptTitle": "Kitten Scientists Execution Interval (Current: {0})",
    "ui.internals.interval": "Interval: {0}",
    "ui.internals": "Internals",
    "ui.itemsHide": "Collapse section",
    "ui.itemsShow": "Expand section",
    "ui.ksColumn": "Display in fourth column",
    "ui.language": "Language",
    "ui.limit": "מוגבל",
    "ui.limited.off": "Unlimited",
    "ui.limited.on": "Eco Mode",
    "ui.max.build.prompt": "Limit for {0} (Current: {1})",
    "ui.max.build.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.max.build.title": "Build {0} {1}",
    "ui.max.build.titleInfinite": "Never stop building {0}",
    "ui.max.build.titleZero": "Don't build {0}",
    "ui.max.craft.prompt": "Enter the new limit of how many {0} to craft as an absolute value between 0 and Infinity.",
    "ui.max.craft.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.max.craft.promptTitle": "Limit for Crafting {0} (Current: {1})",
    "ui.max.craft.title": "Craft {0} {1}",
    "ui.max.craft.titleInfinite": "Never stop crafting {0}",
    "ui.max.craft.titleZero": "Don't craft {0}",
    "ui.max.distribute.prompt": "Enter the new amount of kittens to assign as {0} as an absolute value between 0 and Infinity.",
    "ui.max.distribute.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.max.distribute.promptTitle": "Assign Max. Kittens as {0} (Current: {1})",
    "ui.max.distribute.title": "Assign {0} kittens as {1}",
    "ui.max.distribute.titleInfinite": "Assign as many kittens as possible as {0}",
    "ui.max.distribute.titleZero": "Don't assign any kittens as {0}",
    "ui.max.embassy.title": "Build {0} embassy for {1}",
    "ui.max.embassy.titleInfinite": "Never stop building embassies for {0}",
    "ui.max.embassy.titleZero": "Don't build embassies for {0}",
    "ui.max.prompt.absolute": "Enter the new limit as an absolute value between 0 and Infinity.",
    "ui.max.prompt.float": "Enter the new limit as an absolute value between 0.0 and Infinity.",
    "ui.max.set": "מירבי עבור {0}",
    "ui.max.timeSkip.prompt": "Enter the new amount of years as an absolute value between 0 and Infinity.",
    "ui.max.timeSkip.promptExplainer": "All notations that the game supports are accepted. If you submit an empty value, or a negative value, the limit will be set to infinity. If you set the limit to 0, this option will be automatically disabled. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.max.timeSkip.promptTitle": "Max. Years to skip (Current: {0})",
    "ui.max.timeSkip.title": "Skip {0} years at once",
    "ui.max.timeSkip.titleInfinite": "Skip as many years as possible",
    "ui.max.timeSkip.titleZero": "Don't skip time",
    "ui.max": "מירבי: {0}",
    "ui.maximum": "מירבי",
    "ui.min": "מינימלי: {0}",
    "ui.options": "אפשרויות",
    "ui.reset": "Reset list options to default configuration.",
    "ui.resources": "בקרת משאבים",
    "ui.space": "חלל",
    "ui.time": "זמן",
    "ui.timeCtrl": "שליטה בזמן",
    "ui.trade": "סחר",
    "ui.trigger.accelerateTime.prompt": "Enter the new temporal flux storage level at which to enable Tempus Fugit as a percentage between 0.0 and 100.0.",
    "ui.trigger.accelerateTime.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.accelerateTime.promptTitle": "Trigger to Accelerate Time (Current: {0})",
    "ui.trigger.activeHeatTransfer.prompt": "Enter the new temporal heat storage level at which to enable heat transfer as a percentage between 0.0 and 100.0.",
    "ui.trigger.activeHeatTransfer.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.activeHeatTransfer.promptTitle": "Trigger for Heat Transfer (Current: {0})",
    "ui.trigger.build.blocked": "∞\n🛈 The {0} section has no trigger set. This build will not be triggered!",
    "ui.trigger.build.inherited": "inherited from section",
    "ui.trigger.build.prompt": "Trigger for {0} (Current: {1})",
    "ui.trigger.build.promptExplainer": "If you submit an empty value, or a negative value, the section trigger is used instead. If you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.crypto.prompt": "Enter the new relic storage level at which to trade blackcoin as an absolute value between 0.0 and Infinity.",
    "ui.trigger.crypto.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.crypto.promptTitle": "Trigger to Trade Blackcoin (Current: {0})",
    "ui.trigger.embassies.prompt": "Enter the new culture storage level at which to build embassies as a percentage between 0.0 and 100.0.",
    "ui.trigger.embassies.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.embassies.promptTitle": "Trigger to Build Embassies (Current: {0})",
    "ui.trigger.hunt.prompt": "Trigger for Hunting (Current: {0})",
    "ui.trigger.hunt.promptExplainer": "If you submit a negative value, hunting will be disabled. If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.inactive": "inactive",
    "ui.trigger.promoteKittens.prompt": "Enter the new gold storage level at which to promote kittens as a percentage between 0.0 and 100.0.",
    "ui.trigger.promoteKittens.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.promoteKittens.promptTitle": "Trigger to Promote Kittens (Current: {0})",
    "ui.trigger.prompt.absolute": "Enter the new trigger value as an absolute value between 0 and Infinity.",
    "ui.trigger.prompt.float": "Enter the new trigger value as an absolute value between 0.0 and Infinity.",
    "ui.trigger.prompt.percentage": "Enter the new trigger value as a percentage between 0.0 and 100.0.",
    "ui.trigger.reset.promptExplainer": "If you submit a negative value, the item will be disabled. If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.section.blocked": "∞\n🛈 The {0} section has no trigger set. This automation will not be triggered!",
    "ui.trigger.section.inactive": "∞ (nothing is triggered automatically)",
    "ui.trigger.section.inherited": "inherited from section",
    "ui.trigger.section.prompt": "Trigger for section {0} (Current: {1})",
    "ui.trigger.section.promptExplainer": "If you submit an empty value, or a negative value, the section trigger will be set to infinity (∞). Individual automations in this section need to have their own trigger set to be activated.\nIf you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.section": "Section default trigger: {0}",
    "ui.trigger.setinteger.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.setinteger": "Enter a new trigger value for {0}. Should be in the range from 0 up to any number. -1 means infinity.",
    "ui.trigger.setpercentage.promptExplainer": "If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.setpercentage": "Enter a new trigger value for {0}. Should be in the range from 0 to 100.",
    "ui.trigger.timeSkip.prompt": "Enter the new amount of Time Crystals at which to skip time as an absolute value between 1 and Infinity.",
    "ui.trigger.timeSkip.promptExplainer": "If you submit a negative value, time skipping will be disabled. If you submit an empty value, or an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.timeSkip.promptTitle": "Trigger for Time Skip (Current: {0})",
    "ui.trigger": "מפעיל: {0}",
    "ui.upgrade.buildings": "שדרג בניינים",
    "ui.upgrade.missions": "התחל משימות",
    "ui.upgrade.policies": "פוליסת מחקר",
    "ui.upgrade.races": "גלה גזעים חדשים",
    "ui.upgrade.techs": "חקור טכנולוגיות",
    "ui.upgrade.upgrades": "חקור שדרוגים",
    "ui.upgrade": "מדע",
    "ui.upgrades": "Upgrades",
    update: update$1,
    "upgrade.building.amphitheatre": "אמפיטאטראות שודרגו למגדלי שידור!",
    "upgrade.building.aqueduct": "אקוודוקטים שודרגו למפעלי מים!",
    "upgrade.building.library": "ספריות שודרגו למרכזיות מידע!",
    "upgrade.building.pasture": "אדמות חקלאיות שודרגו לשדות קולטני שמש!",
    "upgrade.building.warehouse": "Upgraded warehouses to spaceports!",
    "upgrade.policy": "חתלתולים העבירו {0}",
    "upgrade.race": "חתלתולים פגשו את {0}",
    "upgrade.space.mission": "חתלתולים ביצעו משימה אל {0}",
    "upgrade.space": "חתלתולים ביצעו {0}",
    "upgrade.tech": "חתלתולים קנו את הטכנולוגיה {0}",
    "upgrade.upgrade": "חתלתולים קנו את השדרוג {0}"
  };
  const copy = "复制";
  const reset = "重置";
  const update = "更新";
  const zhCN$1 = {
    "act.accelerate": "固有时制御，二倍速!",
    "act.adore": "赞美群星! 转化 {0} 虔诚为 {1} 顿悟",
    "act.blackcoin.buy": "小猫出售遗物并买入 {0} 黑币",
    "act.blackcoin.sell": "小猫出售黑币并买入了 {0} 遗物",
    "act.build": "小猫建造了一个 {0}",
    "act.builds": "小猫建造了 {1} 个新的 {0}",
    "act.craft": "小猫制作了 {0} {1}",
    "act.distribute": "分配一只猫猫成为 {0}",
    "act.elect": "小猫选出了一位新领导人",
    "act.feed": "小猫向上古神献上祭品。上古神很高兴",
    "act.fix.cry": "小猫修复了 {0} 个冷冻仓",
    "act.hunt": "派出 {0} 波小猫去打猎",
    "act.observe": "小猫珂学家观测到一颗流星",
    "act.praise": "赞美太阳! 转化 {0} 信仰为 {1} 虔诚",
    "act.promote": "领袖被提拔到 {0} 级",
    "act.refineTCs": "精炼 {0} 时间水晶",
    "act.refineTears": "将 {0} 泪水提炼成黑色眼泪",
    "act.sacrificeAlicorns": "献祭了 {0} 只天角兽",
    "act.sacrificeUnicorns": "已献祭的独角兽数：{0}",
    "act.sun.discover": "小猫在 {0} 方面获得顿悟",
    "act.sun.discovers": "小猫在 {0} 方面获得 {1} 次顿悟",
    "act.time.activeHeatTransferEnd": "主动散热完成",
    "act.time.activeHeatTransferStart": "开始主动散热",
    "act.time.getTemporalFlux": "烧水晶获取时间通量以维持时间加速",
    "act.time.skip": "燃烧时间水晶, 跳过接下来的 {0} 年!",
    "act.trade": "小猫与 {1} 交易 {0} 次",
    "act.transcend": "消耗 {0} 顿悟，达到超越 {1}",
    "blackcoin.buy.prompt": "输入您想要停止购买黑币的价格。",
    "blackcoin.buy.promptExplainer": "黑币价格总是从 800 上涨到 1100 (大致)，然后暴跌。你通常应该一直买入直到卖出前不久。",
    "blackcoin.buy.promptTitle": "黑币购买限额 (当前：{0})",
    "blackcoin.buy.title": "购买黑币直至价格达到 {0}",
    "blackcoin.buy.trigger": "购买黑币(遗迹)",
    "blackcoin.buy": "买入单价：{0}",
    "blackcoin.sell.prompt": "输入您想要出售所有黑币的价格。",
    "blackcoin.sell.promptExplainer": "黑币价格总是从 800 上涨到 1100 (大致)，然后暴跌。你通常希望以接近最高价的价格出售。",
    "blackcoin.sell.promptTitle": "黑币卖单 (当前：{0})",
    "blackcoin.sell.title": "当价格达到 {0} 时出售黑币",
    "blackcoin.sell": "卖出单价：{0}",
    "build.embassies": "在 {1} 设立了 {0} 个大使馆",
    "build.embassy": "在 {1} 设立了 {0} 个大使馆",
    copy,
    "craft.limited": "制作 {0} 受库存消耗比率的限制",
    "craft.unlimited": "制作 {0} 不受限制",
    "delete": "删除",
    "dispose.necrocorn": "小猫处理掉了影响效率的多余死灵兽",
    "festival.extend": "小猫延长了节日",
    "festival.hold": "小猫开始举办节日",
    "filter.accelerate": "时间加速",
    "filter.adore": "赞美群星",
    "filter.allKG": "所有游戏日志",
    "filter.build": "建筑",
    "filter.craft": "工艺",
    "filter.disable": "过滤 {0} 日志消息",
    "filter.distribute": "猫口分配",
    "filter.enable": "启用 {0} 日志消息",
    "filter.explainer": "已禁用的项目不会显示在日志中。",
    "filter.faith": "太阳秩序",
    "filter.festival": "节日",
    "filter.hunt": "狩猎",
    "filter.misc": "杂项",
    "filter.praise": "赞美太阳",
    "filter.promote": "提拔领袖",
    "filter.research": "研究",
    "filter.star": "天文事件",
    "filter.timeSkip": "时间跳转",
    "filter.trade": "贸易",
    "filter.transcend": "超越",
    "filter.upgrade": "升级",
    "option.accelerate": "时间加速",
    "option.autofeed": "献祭上古神",
    "option.catnip": "采集猫薄荷",
    "option.crypto": "黑币交易",
    "option.elect.job.any": "任何",
    "option.elect.job": "工作",
    "option.elect.trait": "特质",
    "option.elect": "选择领导人",
    "option.embassies": "建造大使馆",
    "option.faith.adore": "赞美群星",
    "option.faith.autoPraise": "赞美太阳",
    "option.faith.best.unicorn": "优先最佳独角兽建筑",
    "option.faith.refineTears": "提炼眼泪",
    "option.faith.refineTimeCrystals": "精炼时间水晶",
    "option.faith.sacrificeAlicorns": "献祭天角兽",
    "option.faith.sacrificeUnicorns": "献祭独角兽",
    "option.faith.transcend": "自动超越",
    "option.festival": "举办节日",
    "option.fix.cry": "修复冷冻仓",
    "option.hunt": "狩猎",
    "option.magnetos": "开启磁电机",
    "option.observe": "观测天文事件",
    "option.praise": "赞美太阳",
    "option.promote": "提拔领袖",
    "option.promotekittens": "提拔小猫",
    "option.reactors": "开启反应堆",
    "option.shipOverride": "强制243船",
    "option.steamworks": "启动蒸汽工房",
    "option.time.activeHeatTransfer": "主动散热",
    "option.time.reset": "重启时间线 (危险!)",
    "option.time.skip.ignoreOverheat": "忽略过热",
    "option.time.skip": "时间跳转",
    "reset.after": "初次见面，可爱的猫猫科学家为您服务",
    "reset.cancel.activity": "喵斯顿，我们有麻烦了",
    "reset.cancel.message": "重启时间线计划取消",
    "reset.check": "{0} 的触发值: {1}, 现在共有 {2}",
    "reset.checked": "所有条件都已满足，时间线将在几秒后重启!",
    "reset.countdown.0": "&nbsp;0 - 时空裂缝已打开!",
    "reset.countdown.1": "&nbsp;1 - 时间引擎已启动!",
    "reset.countdown.10": "&nbsp;10 - 正在收获猫薄荷",
    "reset.countdown.2": "&nbsp;2 - 正在启动时间锻造",
    "reset.countdown.3": "&nbsp;3 - 正在打开时空裂隙",
    "reset.countdown.4": "&nbsp;4 - 正在关闭卫星",
    "reset.countdown.5": "&nbsp;5 - 正在融化黑币",
    "reset.countdown.6": "&nbsp;6 - 正在启动时间引擎",
    "reset.countdown.7": "&nbsp;7 - 正在拆解电磁炮",
    "reset.countdown.8": "&nbsp;8 - 正在放生蜥蜴",
    "reset.countdown.9": "&nbsp;9 - 正在献祭独角兽",
    "reset.last.message": "我们下个庞加莱回归再见",
    "reset.tip": "您可以通过在设置顶部禁用“启用小猫珂学家”选项来取消此重置。",
    reset,
    "resources.consume.prompt": "输入您希望自动化消耗的资源量，以 0.0 到 100.0 之间的百分比表示。",
    "resources.consume.promptExplainer": "如果您提交一个空值或者一个无效值，则被视为您点击了取消。",
    "resources.consume.promptTitle": "{0} 的消耗份额 (当前：{1})",
    "resources.consume.set": "设置 {0} 的消耗率",
    "resources.consume.title": "消耗 {0} 的 {1}",
    "resources.consume.titleZero": "不消耗 {0}",
    "resources.consume": "消耗率: {0}",
    "resources.stock.prompt": "输入您希望始终保留的资源库存量。",
    "resources.stock.promptExplainer": "游戏支持的所有符号均可接受。如果您提交空值或负值，限制将设置为无穷大。如果您将限制设置为 0，此选项将自动禁用。如果您提交无效值，将被视为您点击了“取消”。",
    "resources.stock.promptTitle": "{0} 的库存值 (当前：{1})",
    "resources.stock.title": "保持 {0} {1} 库存",
    "resources.stock.titleInfinite": "保持所有 {0} 库存",
    "resources.stock.titleZero": "不保留任何 {0} 库存",
    "state.compress": "压缩数据",
    "state.confirmDestruction": "你确定吗？",
    "state.copied.game": "保存“{0}”复制到剪贴板。",
    "state.copied.gameCurrent": "当前保存已复制到剪贴板。",
    "state.copied.state": "状态“{0}”已复制到剪贴板。",
    "state.copied.stateCurrent": "当前状态已复制到剪贴板。",
    "state.copy.game": "将此保存复制到剪贴板。",
    "state.copy.gameCurrent": "将整个小猫游戏保存 (包括 KS 设置) 复制到剪贴板。",
    "state.copy.state": "将这些设置复制到剪贴板。",
    "state.copy.stateCurrent": "将当前的 Kitten Scientists 设置复制到剪贴板。",
    "state.delete.game": "删除此保存。",
    "state.delete.state": "删除这些设置。",
    "state.deleted.game": "保存“{0}”已删除。",
    "state.deleted.state": "状态“{0}”已删除。",
    "state.edit.game": "更改此保存的名称。",
    "state.edit.state": "更改这些设置的名称。",
    "state.exportAll": "备份",
    "state.exportAllTitle": "将所有本地状态存储在单个文件中并下载。",
    "state.import": "从剪贴板导入",
    "state.imported.game": "保存导入。",
    "state.imported.state": "状态导入。",
    "state.importTitle": "从剪贴板粘贴保存或设置。\n内容将被自动检测并进行相应处理。",
    "state.loaded.game": "已加载保存“{0}”。",
    "state.loaded.state": "已加载状态“{0}”。",
    "state.loadPrompt": "在此处粘贴您的 (未压缩的) 保存或设置：",
    "state.local": "本地状态",
    "state.localGames": "小猫游戏保存",
    "state.localStates": "小猫科学家设置",
    "state.new": "新的",
    "state.noConfirm": "不要求确认",
    "state.store": "储存",
    "state.stored.game": "保存储存。",
    "state.stored.state": "状态储存。",
    "state.storeFactory": "根据出厂默认设置创建新状态。",
    "state.storeGame.prompt": "为此次保存提供标签：",
    "state.storeGame": "从当前游戏中创建一个新的保存。",
    "state.storeState.prompt": "为该状态提供标签：",
    "state.storeState": "根据当前设置创建一个新状态。",
    "state.title": "状态管理器",
    "state.unlabeledGame": "未标记的保存",
    "state.unlabeledState": "未标记状态",
    "state.update.game": "将当前游戏保存到此位置。",
    "state.update.state": "将当前设置保存到此槽中。",
    "state.updated.game": "保存'{0}'已更新。",
    "state.updated.state": "状态“{0}”已更新。",
    "status.auto.disable": "禁用自动化 {0}",
    "status.auto.enable": "启用自动化 {0}",
    "status.ks.disable": "太敬业了，该歇了",
    "status.ks.enable": "神说，要有猫猫珂学家!",
    "status.ks.init": "小猫珂学家已初始化。",
    "status.ks.upgrade": "小猫珂学家 (当前版本:{1}) {0} 可在这里获取：{2} 。",
    "status.reset.check.disable": "在重启时间线前不检查 {0}",
    "status.reset.check.enable": "在重启时间线前检查 {0}",
    "status.resource.disable": "禁用 {0} 资源管理",
    "status.resource.enable": "启用 {0} 资源管理",
    "status.sub.disable": "禁用 {0}",
    "status.sub.enable": "启用 {0}",
    "summary.accelerate": "加速时间 {0} 次",
    "summary.adore": "通过赞美群星积累了 {0} 顿悟",
    "summary.building": "建造了 {0} 个 {1}",
    "summary.craft": "制作了 {0} 个 {1}",
    "summary.day": "天",
    "summary.days": "天",
    "summary.distribute": "帮助 {0} 只猫猫找到工作",
    "summary.embassy": "设立了 {0} 个大使馆",
    "summary.feed": "向上古神献祭 {0} 只死灵兽",
    "summary.festival": "举办了 {0} 次节日",
    "summary.fix.cry": "修复了 {0} 个冷冻仓",
    "summary.head": "过去 {0} 的总结",
    "summary.hunt": "派出了 {0} 批可爱的小猫猎人",
    "summary.praise": "通过赞美太阳积累了 {0} 虔诚",
    "summary.promote": "提拔领袖 {0} 次",
    "summary.refine": "已精炼 {0} {1}",
    "summary.separator": " ",
    "summary.show": "总结",
    "summary.stars": "观测了 {0} 颗流星",
    "summary.sun": "在 {1} 方面顿悟 {0} 次",
    "summary.tech": "掌握了 {0}",
    "summary.time.activeHeatTransferStart": "主动散热 {0} 次",
    "summary.time.getTemporalFlux": "烧水晶获取时间通量 {0} 次",
    "summary.time.reset.content": "获得 {0} 业.<br>获得 {1} 领导力",
    "summary.time.reset.title": "过去 {0} 个时间线的总结",
    "summary.time.skip": "跳过 {0} 年",
    "summary.trade": "与 {1} 贸易了 {0} 次",
    "summary.transcend": "超越了 {0} 次",
    "summary.upgrade": "发明了 {0}",
    "summary.year": "年",
    "summary.years": "年",
    "time.heatTransfer.cycle.disable": "停止在 {0} 主动散热",
    "time.heatTransfer.cycle.enable": "启用在 {0} 主动散热",
    "time.skip.cycle.disable": "停止在 {0} 跳转时间并禁止跳过该周期",
    "time.skip.cycle.enable": "启用在 {0} 跳转时间并允许跳过该周期",
    "time.skip.season.disable": "停止在 {0} 跳转时间",
    "time.skip.season.enable": "启用在 {0} 跳转时间",
    "trade.limited": "与 {0} 的交易限制为比产量更优时才会触发",
    "trade.season.disable": "停止在 {1} 与 {0} 的交易",
    "trade.season.enable": "启用在 {1} 与 {0} 的交易",
    "trade.seasons": "季节",
    "trade.unlimited": "取消与 {0} 交易的限制",
    "ui.additional": "附加选项",
    "ui.build": "营火",
    "ui.close": "关闭",
    "ui.craft.resources": "资源",
    "ui.craft": "工艺",
    "ui.cycles": "周期",
    "ui.disable.all": "全部禁用",
    "ui.distribute": "猫力资源",
    "ui.enable.all": "全部启用",
    "ui.engine": "启用小猫珂学家",
    "ui.faith": "宗教",
    "ui.filter": "日志过滤",
    "ui.infinity": "∞",
    "ui.internals.interval.prompt": "输入新的毫秒数作为 0 到无穷大之间的绝对值。",
    "ui.internals.interval.promptExplainer": "游戏支持的所有符号均可接受。如果您将限制设置为 0，Kitten Scientists 将自动禁用。如果您提交了无效值，则将被视为您点击了“取消”。",
    "ui.internals.interval.promptTitle": "小猫科学家执行间隔 (当前：{0})",
    "ui.internals.interval": "运行间隔(ms): {0}",
    "ui.internals": "小喵设置",
    "ui.itemsHide": "隐藏选项",
    "ui.itemsShow": "显示选项",
    "ui.ksColumn": "显示在第四栏",
    "ui.language": "语言",
    "ui.limit": "限制",
    "ui.limited.off": "无限",
    "ui.limited.on": "环保模式",
    "ui.max.build.prompt": "{0} 的限制 (当前：{1})",
    "ui.max.build.promptExplainer": "游戏支持的所有符号均可接受。如果您提交空值或负值，限制将设置为无穷大。如果您将限制设置为 0，此选项将自动禁用。如果您提交无效值，将被视为您点击了“取消”。",
    "ui.max.build.title": "构建 {0} {1}",
    "ui.max.build.titleInfinite": "永不停止建设{0}",
    "ui.max.build.titleZero": "不要构建{0}",
    "ui.max.craft.prompt": "输入要制作的 {0} 数量的新限制，以 0 到无穷大之间的绝对值表示。",
    "ui.max.craft.promptExplainer": "游戏支持的所有符号均可接受。如果您提交空值或负值，限制将设置为无穷大。如果您将限制设置为 0，此选项将自动禁用。如果您提交无效值，将被视为您点击了“取消”。",
    "ui.max.craft.promptTitle": "制作限制 {0} (当前：{1})",
    "ui.max.craft.title": "制造 {0} {1}",
    "ui.max.craft.titleInfinite": "永不停止创造{0}",
    "ui.max.craft.titleZero": "不要制造 {0}",
    "ui.max.distribute.prompt": "输入要分配的新小猫数量 {0}，作为 0 到无穷大之间的绝对值。",
    "ui.max.distribute.promptExplainer": "游戏支持的所有符号均可接受。如果您提交空值或负值，限制将设置为无穷大。如果您将限制设置为 0，此选项将自动禁用。如果您提交无效值，将被视为您点击了“取消”。",
    "ui.max.distribute.promptTitle": "将最大小猫数量指定为 {0} (当前：{1})",
    "ui.max.distribute.title": "将 {0} 只小猫指定为 {1}",
    "ui.max.distribute.titleInfinite": "分配尽可能多的小猫作为{0}",
    "ui.max.distribute.titleZero": "不将任何小猫指定为{0}",
    "ui.max.embassy.title": "为{1}建造{0}大使馆",
    "ui.max.embassy.titleInfinite": "永不停止为{0}修建大使馆",
    "ui.max.embassy.titleZero": "不要为{0}建造大使馆",
    "ui.max.prompt.absolute": "输入新的限制作为 0 到无穷大之间的绝对值。",
    "ui.max.prompt.float": "输入新的限制作为 0.0 和无穷大之间的绝对值。",
    "ui.max.set": "设置 {0} 的最大值",
    "ui.max.timeSkip.prompt": "输入新的年数作为 0 至无穷大之间的绝对值。",
    "ui.max.timeSkip.promptExplainer": "游戏支持的所有符号均可接受。如果您提交空值或负值，限制将设置为无穷大。如果您将限制设置为 0，此选项将自动禁用。如果您提交无效值，将被视为您点击了“取消”。",
    "ui.max.timeSkip.promptTitle": "最多跳过年份 (当前：{0})",
    "ui.max.timeSkip.title": "一次跳过 {0} 年",
    "ui.max.timeSkip.titleInfinite": "跳过尽可能多的年份",
    "ui.max.timeSkip.titleZero": "不要跳过时间",
    "ui.max": "最大值：{0}",
    "ui.maximum": "上限",
    "ui.min": "最小值 {0}",
    "ui.options": "选项",
    "ui.reset": "恢复至默认",
    "ui.resources": "资源控制",
    "ui.space": "太空",
    "ui.time": "时间",
    "ui.timeCtrl": "时间操纵",
    "ui.trade": "贸易",
    "ui.trigger.accelerateTime.prompt": "输入启用 Tempus Fugit 的新时间通量存储级别，以 0.0 至 100.0 之间的百分比表示。",
    "ui.trigger.accelerateTime.promptExplainer": "如果您提交一个空值或者一个无效值，则被视为您点击了取消。",
    "ui.trigger.accelerateTime.promptTitle": "加速时间的触发值 (当前：{0})",
    "ui.trigger.activeHeatTransfer.prompt": "输入新的启用热传递的时间热存储量，以 0.0 到 100.0 之间的百分比表示。",
    "ui.trigger.activeHeatTransfer.promptExplainer": "如果您提交一个空值或者一个无效值，则被视为您点击了取消。",
    "ui.trigger.activeHeatTransfer.promptTitle": "热传递触发值 (当前：{0})",
    "ui.trigger.build.blocked": "∞\n🛈 {0} 部分未设置触发值。此构建不会被触发！",
    "ui.trigger.build.inherited": "继承自部分",
    "ui.trigger.build.prompt": "{0} 的触发值 (当前：{1})",
    "ui.trigger.build.promptExplainer": "如果您提交了空值或负值，则将使用部分触发值。如果您提交了无效值，则将被视为您点击了“取消”。",
    "ui.trigger.crypto.prompt": "输入交易黑币的新文物存储级别，以 0.0 到 Infinity 之间的绝对值表示。",
    "ui.trigger.crypto.promptExplainer": "如果您提交一个空值或者一个无效值，则被视为您点击了取消。",
    "ui.trigger.crypto.promptTitle": "触发黑币交易 (当前：{0})",
    "ui.trigger.embassies.prompt": "以 0.0 至 100.0 之间的百分比输入建造大使馆的新文化存储级别。",
    "ui.trigger.embassies.promptExplainer": "如果您提交一个空值或者一个无效值，则被视为您点击了取消。",
    "ui.trigger.embassies.promptTitle": "建立大使馆的触发值 (当前：{0})",
    "ui.trigger.hunt.prompt": "狩猎触发值 (当前：{0})",
    "ui.trigger.hunt.promptExplainer": "如果您提交了负值，则搜索将被禁用。如果您提交了空值或无效值，则将被视为您点击了“取消”。",
    "ui.trigger.inactive": "不活跃",
    "ui.trigger.promoteKittens.prompt": "输入新的可用于升级小猫的黄金库存量，以 0.0 到 100.0 之间的百分比表示。",
    "ui.trigger.promoteKittens.promptExplainer": "如果您提交一个空值或者一个无效值，则被视为您点击了取消。",
    "ui.trigger.promoteKittens.promptTitle": "小猫促销触发值 (当前：{0})",
    "ui.trigger.prompt.absolute": "输入新的触发值作为 0 到无穷大之间的绝对值。",
    "ui.trigger.prompt.float": "输入新的触发值作为 0.0 到无穷大之间的绝对值。",
    "ui.trigger.prompt.percentage": "以 0.0 至 100.0 之间的百分比形式输入新的触发值。",
    "ui.trigger.reset.promptExplainer": "如果您提交了负值，则该项目将被禁用。如果您提交了空值或无效值，则将被视为您点击了“取消”。",
    "ui.trigger.section.blocked": "∞\n🛈 The {0} section has no trigger set. This automation will not be triggered!",
    "ui.trigger.section.inactive": "∞ (nothing is triggered automatically)",
    "ui.trigger.section.inherited": "继承自部分",
    "ui.trigger.section.prompt": "{0} 部分的触发值 (当前：{1})",
    "ui.trigger.section.promptExplainer": "If you submit an empty value, or a negative value, the section trigger will be set to infinity (∞). Individual automations in this section need to have their own trigger set to be activated.\nIf you submit an invalid value, it will be treated as if you hit Cancel.",
    "ui.trigger.section": "部分默认触发值：{0}",
    "ui.trigger.setinteger.promptExplainer": "如果您提交一个空值或者一个无效值，则被视为您点击了取消。",
    "ui.trigger.setinteger": "输入 {0} 的新触发值。范围应在 0 到任意数字之间。-1表示无穷大。",
    "ui.trigger.setpercentage.promptExplainer": "如果您提交一个空值或者一个无效值，则被视为您点击了取消。",
    "ui.trigger.setpercentage": "输入新的 {0} 触发值，取值范围为 0 到 100 的小数。",
    "ui.trigger.timeSkip.prompt": "输入跳过时间所需的时间水晶的新数量，以 1 到无穷大之间的绝对值表示。",
    "ui.trigger.timeSkip.promptExplainer": "如果您提交了负值，时间跳过将被禁用。如果您提交了空值或无效值，它将被视为您点击了“取消”。",
    "ui.trigger.timeSkip.promptTitle": "时间跳跃触发值 (当前：{0})",
    "ui.trigger": "触发值：{0}",
    "ui.upgrade.buildings": "升级建筑",
    "ui.upgrade.missions": "探索星球",
    "ui.upgrade.policies": "政策",
    "ui.upgrade.races": "探险队出发!",
    "ui.upgrade.techs": "科技",
    "ui.upgrade.upgrades": "升级",
    "ui.upgrade": "升级",
    "ui.upgrades": "升级",
    update,
    "upgrade.building.amphitheatre": "剧场 升级为 广播塔!",
    "upgrade.building.aqueduct": "水渠 升级为 水电站!",
    "upgrade.building.library": "图书馆 升级为 数据中心!",
    "upgrade.building.pasture": "牧场 升级为 太阳能发电站!",
    "upgrade.building.warehouse": "已将仓库升级为太空港！",
    "upgrade.policy": "小猫通过了 {0} 法案",
    "upgrade.race": "小猫遇到了 {0}",
    "upgrade.space.mission": "小猫执行了 {0} 的任务",
    "upgrade.space": "小猫执行了 {0}",
    "upgrade.tech": "小猫掌握了 {0}",
    "upgrade.upgrade": "小猫发明了 {0}"
  };
  var LogFilterItemVariant = ((LogFilterItemVariant2) => {
    LogFilterItemVariant2["build"] = "ks-activity type_ks-build";
    LogFilterItemVariant2["craft"] = "ks-activity type_ks-craft";
    LogFilterItemVariant2["upgrade"] = "ks-activity type_ks-upgrade";
    LogFilterItemVariant2["research"] = "ks-activity type_ks-research";
    LogFilterItemVariant2["trade"] = "ks-activity type_ks-trade";
    LogFilterItemVariant2["hunt"] = "ks-activity type_ks-hunt";
    LogFilterItemVariant2["praise"] = "ks-activity type_ks-praise";
    LogFilterItemVariant2["adore"] = "ks-activity type_ks-adore";
    LogFilterItemVariant2["transcend"] = "ks-activity type_ks-transcend";
    LogFilterItemVariant2["faith"] = "ks-activity type_ks-faith";
    LogFilterItemVariant2["accelerate"] = "ks-activity type_ks-accelerate";
    LogFilterItemVariant2["timeSkip"] = "ks-activity type_ks-timeSkip";
    LogFilterItemVariant2["festival"] = "ks-activity type_ks-festival";
    LogFilterItemVariant2["star"] = "ks-activity type_ks-star";
    LogFilterItemVariant2["distribute"] = "ks-activity type_ks-distribute";
    LogFilterItemVariant2["promote"] = "ks-activity type_ks-promote";
    LogFilterItemVariant2["misc"] = "ks-activity";
    return LogFilterItemVariant2;
  })(LogFilterItemVariant || {});
  const FilterItems = [
    "accelerate",
    "adore",
    "build",
    "craft",
    "distribute",
    "faith",
    "festival",
    "hunt",
    "misc",
    "praise",
    "promote",
    "research",
    "star",
    "timeSkip",
    "trade",
    "transcend",
    "upgrade"
  ];
  class LogFilterSettingsItem extends Setting {
    constructor(variant) {
      super(true);
      __privateAdd(this, _variant5);
      __privateSet(this, _variant5, variant);
    }
    get variant() {
      return __privateGet(this, _variant5);
    }
  }
  _variant5 = new WeakMap();
  class LogFilterSettings extends Setting {
    constructor(enabled = false, disableKGLog = new Setting(true)) {
      super(enabled);
      __publicField(this, "filters");
      __publicField(this, "disableKGLog");
      this.filters = this.initFilters();
      this.disableKGLog = disableKGLog;
    }
    initFilters() {
      const items = {};
      for (const item of FilterItems) {
        items[item] = new LogFilterSettingsItem(LogFilterItemVariant[item]);
      }
      return items;
    }
    load(settings) {
      var _a;
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.filters, settings.filters, (filter, item) => {
        filter.enabled = (item == null ? void 0 : item.enabled) ?? filter.enabled;
      });
      this.disableKGLog.enabled = ((_a = settings.disableKGLog) == null ? void 0 : _a.enabled) ?? this.disableKGLog.enabled;
    }
  }
  class ResourcesSettingsItem extends Setting {
    constructor(resource, enabled = false, consume = WorkshopManager.DEFAULT_CONSUME_RATE, stock = 0) {
      super(enabled);
      __privateAdd(this, _resource3);
      __publicField(this, "consume");
      __publicField(this, "stock", 0);
      __privateSet(this, _resource3, resource);
      this.consume = consume;
      this.stock = stock;
    }
    get resource() {
      return __privateGet(this, _resource3);
    }
  }
  _resource3 = new WeakMap();
  class ResourcesSettings extends Setting {
    constructor(enabled = false) {
      super(enabled);
      __publicField(this, "resources");
      this.resources = this.initResources();
    }
    initResources() {
      const items = {};
      for (const item of Resources) {
        items[item] = new ResourcesSettingsItem(item);
      }
      return items;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      consumeEntriesPedantic(this.resources, settings.resources, (resource, item) => {
        resource.enabled = (item == null ? void 0 : item.enabled) ?? resource.enabled;
        resource.consume = (item == null ? void 0 : item.consume) ?? resource.consume;
        resource.stock = (item == null ? void 0 : item.stock) ?? resource.stock;
      });
    }
  }
  class StateSettings extends Setting {
    constructor(noConfirm = new Setting(), compress = new Setting(true)) {
      super(true);
      __publicField(this, "noConfirm");
      __publicField(this, "compress");
      this.noConfirm = noConfirm;
      this.compress = compress;
    }
    load(settings) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      this.noConfirm.load(settings.noConfirm);
      this.compress.load(settings.compress);
    }
  }
  class EngineSettings extends Setting {
    constructor(enabled = false, filters = new LogFilterSettings(), resources = new ResourcesSettings(), states = new StateSettings(), language = FallbackLocale, ksColumn = new Setting()) {
      super(enabled);
      __publicField(this, "interval", 2e3);
      __publicField(this, "locale");
      __publicField(this, "ksColumn");
      __publicField(this, "filters");
      __publicField(this, "resources");
      __publicField(this, "states");
      this.filters = filters;
      this.resources = resources;
      this.states = states;
      this.locale = new SettingOptions(language, [
        { label: "Deutsch", value: "de-DE" },
        { label: "English", value: "en-US" },
        { label: "עִברִית", value: "he-IL" },
        { label: "中文", value: "zh-CN" }
      ]);
      this.ksColumn = ksColumn;
    }
    load(settings, retainMetaBehavior = false) {
      if (isNil(settings)) {
        return;
      }
      super.load(settings);
      if (!retainMetaBehavior) {
        this.interval = settings.interval ?? this.interval;
        this.states.load(settings.states);
        this.locale.load(settings.locale);
        this.ksColumn.load(settings.ksColumn);
      }
      this.filters.load(settings.filters);
      this.resources.load(settings.resources);
    }
  }
  const i18nData = { "de-DE": deDE, "en-US": enUS$1, "he-IL": heIL, "zh-CN": zhCN$1 };
  class Engine {
    constructor(host, gameLanguage) {
      __publicField(this, "_i18nData");
      __publicField(this, "_isLoaded", false);
      __publicField(this, "_host");
      __publicField(this, "settings");
      __publicField(this, "bonfireManager");
      __publicField(this, "religionManager");
      __publicField(this, "scienceManager");
      __publicField(this, "spaceManager");
      __publicField(this, "timeControlManager");
      __publicField(this, "timeManager");
      __publicField(this, "tradeManager");
      __publicField(this, "villageManager");
      __publicField(this, "workshopManager");
      __publicField(this, "_activitySummary");
      __publicField(this, "_timeoutMainLoop");
      this.settings = new EngineSettings();
      this._i18nData = i18nData;
      this.setLanguage(gameLanguage, false);
      this._host = host;
      this._activitySummary = new ActivitySummary(this._host);
      this.workshopManager = new WorkshopManager(this._host);
      this.bonfireManager = new BonfireManager(this._host, this.workshopManager);
      this.religionManager = new ReligionManager(
        this._host,
        this.bonfireManager,
        this.workshopManager
      );
      this.scienceManager = new ScienceManager(this._host, this.workshopManager);
      this.spaceManager = new SpaceManager(this._host, this.workshopManager);
      this.timeControlManager = new TimeControlManager(
        this._host,
        this.bonfireManager,
        this.religionManager,
        this.spaceManager,
        this.workshopManager
      );
      this.timeManager = new TimeManager(this._host, this.workshopManager);
      this.tradeManager = new TradeManager(this._host, this.workshopManager);
      this.villageManager = new VillageManager(this._host, this.workshopManager);
    }
    get isLoaded() {
      return this._isLoaded;
    }
    isLanguageSupported(language) {
      return Object.keys(this._i18nData).some((locale) => locale.startsWith(`${language}-`));
    }
    isLocaleSupported(locale) {
      return locale in this._i18nData;
    }
    localeSupportsFirstLetterSplits(locale = this.settings.locale.selected) {
      return locale !== "zh-CN";
    }
    localeForLanguage(language) {
      return Object.keys(this._i18nData).find(
        (locale) => locale.startsWith(`${language}-`)
      );
    }
    setLanguage(language, rebuildUI = true) {
      const previousLocale = this.settings.locale.selected;
      if (!this.isLanguageSupported(language)) {
        cwarn(
          `Requested language '${language}' is not available. Falling back to '${FallbackLocale}'.`
        );
        this.settings.locale.selected = FallbackLocale;
      } else {
        const locale = mustExist(this.localeForLanguage(language));
        cinfo(`Selecting language '${locale}'.`);
        this.settings.locale.selected = locale;
      }
      if (previousLocale !== this.settings.locale.selected && rebuildUI) {
        this._host.rebuildUi();
      }
    }
    setLocale(locale, rebuildUI = true) {
      const previousLocale = this.settings.locale.selected;
      if (!this.isLocaleSupported(locale)) {
        cwarn(
          `Requested language '${locale}' is not available. Falling back to '${FallbackLocale}'.`
        );
        this.settings.locale.selected = FallbackLocale;
      } else {
        cinfo(`Selecting language '${locale}'.`);
        this.settings.locale.selected = locale;
      }
      if (previousLocale !== this.settings.locale.selected && rebuildUI) {
        this._host.rebuildUi();
      }
    }
    stateLoad(settings, retainMetaBehavior = false) {
      this._isLoaded = true;
      this.stop(false);
      const version = ksVersion();
      if (settings.v !== version) {
        cwarn(
          `Attempting to load engine state with version tag '${settings.v}' when engine is at version '${version}'!`
        );
      }
      const attemptLoad = (loader, errorMessage) => {
        try {
          loader();
        } catch (error) {
          cerror(`Failed load of ${errorMessage} settings.`, error);
        }
      };
      attemptLoad(() => {
        this.settings.load(settings.engine, retainMetaBehavior);
      }, "engine");
      attemptLoad(() => {
        this.bonfireManager.settings.load(settings.bonfire);
      }, "bonfire");
      attemptLoad(() => {
        this.religionManager.settings.load(settings.religion);
      }, "religion");
      attemptLoad(() => {
        this.scienceManager.settings.load(settings.science);
      }, "science");
      attemptLoad(() => {
        this.spaceManager.settings.load(settings.space);
      }, "space");
      attemptLoad(() => {
        this.timeControlManager.settings.load(settings.timeControl);
      }, "time control");
      attemptLoad(() => {
        this.timeManager.settings.load(settings.time);
      }, "time");
      attemptLoad(() => {
        this.tradeManager.settings.load(settings.trade);
      }, "trade");
      attemptLoad(() => {
        this.villageManager.settings.load(settings.village);
      }, "village");
      attemptLoad(() => {
        this.workshopManager.settings.load(settings.workshop);
      }, "workshop");
      this.setLocale(this.settings.locale.selected);
      if (this.settings.enabled) {
        this.start(false);
      } else {
        this.stop(false);
      }
    }
    static get DEFAULT_STATE() {
      return {
        v: ksVersion(),
        engine: new EngineSettings(),
        bonfire: new BonfireSettings(),
        religion: new ReligionSettings(),
        science: new ScienceSettings(),
        space: new SpaceSettings(),
        timeControl: new TimeControlSettings(),
        time: new TimeSettings(),
        trade: new TradeSettings(),
        village: new VillageSettings(),
        workshop: new WorkshopSettings()
      };
    }
    stateReset() {
      this.stateLoad(Engine.DEFAULT_STATE);
    }
    stateSerialize() {
      return {
        v: ksVersion(),
        engine: this.settings,
        bonfire: this.bonfireManager.settings,
        religion: this.religionManager.settings,
        science: this.scienceManager.settings,
        space: this.spaceManager.settings,
        timeControl: this.timeControlManager.settings,
        time: this.timeManager.settings,
        trade: this.tradeManager.settings,
        village: this.villageManager.settings,
        workshop: this.workshopManager.settings
      };
    }
    start(msg = true) {
      if (this._timeoutMainLoop) {
        return;
      }
      const loop = () => {
        const context = {
          requestGameUiRefresh: false,
          entry: (/* @__PURE__ */ new Date()).getTime(),
          exit: 0,
          measurements: {}
        };
        this._iterate(context).then(() => {
          context.exit = (/* @__PURE__ */ new Date()).getTime();
          const timeTaken = context.exit - context.entry;
          document.dispatchEvent(
            new CustomEvent("ks.reportFrame", { detail: context })
          );
          if (this._timeoutMainLoop === void 0) {
            return;
          }
          this._timeoutMainLoop = window.setTimeout(
            loop,
            Math.max(10, this._host.engine.settings.interval - timeTaken)
          );
        }).catch((error) => {
          cwarn(unknownToError(error));
        });
      };
      this._timeoutMainLoop = window.setTimeout(loop, this._host.engine.settings.interval);
      if (msg) {
        this._host.engine.imessage("status.ks.enable");
      }
    }
    stop(msg = true) {
      if (!this._timeoutMainLoop) {
        return;
      }
      clearTimeout(this._timeoutMainLoop);
      this._timeoutMainLoop = void 0;
      if (msg) {
        this._host.engine.imessage("status.ks.disable");
      }
    }
    async _iterate(context) {
      if (!this.settings.filters.disableKGLog.enabled) {
        this._maintainKGLogFilters();
      }
      let [, duration] = await measureAsync(() => this.scienceManager.tick(context));
      context.measurements.scienceManager = duration;
      [, duration] = measure(() => {
        this.bonfireManager.tick(context);
      });
      context.measurements.bonfireManager = duration;
      [, duration] = measure(() => {
        this.spaceManager.tick(context);
      });
      context.measurements.spaceManager = duration;
      [, duration] = await measureAsync(() => this.workshopManager.tick(context));
      context.measurements.workshopManager = duration;
      [, duration] = measure(() => {
        this.tradeManager.tick(context);
      });
      context.measurements.tradeManager = duration;
      [, duration] = await measureAsync(() => this.religionManager.tick(context));
      context.measurements.religionManager = duration;
      [, duration] = measure(() => {
        this.timeManager.tick(context);
      });
      context.measurements.timeManager = duration;
      [, duration] = measure(() => {
        this.villageManager.tick(context);
      });
      context.measurements.villageManager = duration;
      [, duration] = await measureAsync(() => this.timeControlManager.tick(context));
      context.measurements.timeControlManager = duration;
      [, duration] = measure(() => {
        if (context.requestGameUiRefresh) {
          this._host.game.ui.render();
        }
      });
      context.measurements.gameUiRefresh = duration;
    }
    _maintainKGLogFilters() {
      for (const filter of Object.values(this._host.game.console.filters)) {
        filter.enabled = false;
      }
      const filterCheckboxes = window.document.querySelectorAll("[id^=filter-]");
      for (const checkbox2 of filterCheckboxes) {
        checkbox2.checked = false;
      }
    }
    symbolForCycle(cycle) {
      var _a;
      return ((_a = this._host.game.calendar.cycles.find((entry) => entry.name === cycle)) == null ? void 0 : _a.uglyph) ?? "";
    }
    labelForCycle(cycle) {
      const symbol = this.symbolForCycle(cycle);
      const label2 = this._host.engine.i18n(
        `$space.planet.${cycle === "redmoon" ? "moon" : cycle}.label`
      );
      return `${symbol} ${label2}`;
    }
    labelForPlanet(planet) {
      const cycleCandidate = planet === "moon" ? "redmoon" : planet;
      const cycle = Cycles.includes(cycleCandidate) ? cycleCandidate : void 0;
      const label2 = this._host.engine.i18n(`$space.planet.${planet}.label`);
      return cycle === void 0 ? label2 : `${this.symbolForCycle(cycle)} ${label2}`;
    }
    i18n(key, args = []) {
      let value;
      if (key.startsWith("$")) {
        value = this._host.i18nEngine(key.slice(1));
      }
      value = value ?? this._i18nData[this.settings.locale.selected][key];
      const check = value;
      if (isNil(check)) {
        value = i18nData[FallbackLocale][key];
        if (!value) {
          cwarn(`i18n key '${key}' not found in default language.`);
          return `$${key}`;
        }
        cwarn(`i18n key '${key}' not found in selected language.`);
      }
      for (let argIndex = 0; argIndex < args.length; ++argIndex) {
        value = value.replace(`{${argIndex}}`, `${args[argIndex]}`);
      }
      return value;
    }
    iactivity(i18nLiteral, i18nArgs = [], logStyle) {
      const text = this.i18n(i18nLiteral, i18nArgs);
      if (logStyle) {
        const activityClass = `type_${logStyle}`;
        this._printOutput(`ks-activity ${activityClass}`, "#e65C00", text);
      } else {
        this._printOutput("ks-activity", "#e65C00", text);
      }
    }
    imessage(i18nLiteral, i18nArgs = []) {
      this._printOutput("ks-default", "#aa50fe", this.i18n(i18nLiteral, i18nArgs));
    }
    storeForSummary(name, amount = 1, section = "other") {
      this._activitySummary.storeActivity(name, amount, section);
    }
    getSummary() {
      return this._activitySummary.renderSummary();
    }
    displayActivitySummary() {
      const summary = this.getSummary();
      for (const summaryLine of summary) {
        this._printOutput("ks-summary", "#009933", summaryLine);
      }
      this.resetActivitySummary();
    }
    resetActivitySummary() {
      this._activitySummary.resetActivity();
    }
    _printOutput(cssClasses, color, ...args) {
      if (this.settings.filters.enabled) {
        for (const filterItem of Object.values(this.settings.filters.filters)) {
          if (filterItem.variant === cssClasses && !filterItem.enabled) {
            return;
          }
        }
      }
      const msg = this._host.game.msg(...args, cssClasses);
      $(msg.span).css("color", color);
      cdebug(...args);
    }
    static evaluateSubSectionTrigger(sectionTrigger, subSectionTrigger) {
      return sectionTrigger < 0 ? subSectionTrigger : subSectionTrigger < 0 ? sectionTrigger : subSectionTrigger;
    }
  }
  const Icons = {
    Bonfire: "M80-80v-183l363-491-67-90 49-35 55 75 56-75 48 35-66 90 362 491v183H80Zm400-623L140-243v103h145l195-273 195 273h145v-103L480-703ZM359-140h242L480-310 359-140Zm121-273 195 273-195-273-195 273 195-273Z",
    CheckboxCheck: "m419-321 289-289-43-43-246 246-119-119-43 43 162 162ZM120-120v-720h720v720H120Zm60-60h600v-600H180v600Zm0 0v-600 600Z",
    CheckboxUnCheck: "M120-120v-720h720v720H120Zm60-60h600v-600H180v600Z",
    Copy: "M240-200v-680h560v680H240Zm60-60h440v-560H300v560ZM120-80v-680h60v620h500v60H120Zm180-180v-560 560Z",
    Cycles: "M120-80v-740h125v-60h65v60h340v-60h65v60h125v360h-60v-110H180v430h324v60H120ZM760 0q-73 0-127.5-45.5T564-160h62q13 44 49.5 72T760-60q58 0 99-41t41-99q0-58-41-99t-99-41q-29 0-54 10.5T662-300h58v60H560v-160h60v57q27-26 63-41.5t77-15.5q83 0 141.5 58.5T960-200q0 83-58.5 141.5T760 0ZM180-630h600v-130H180v130Zm0 0v-130 130Z",
    DataUsage: "M480-80q-82 0-155-31.5T197.5-197q-54.5-54-86-127T80-479q0-158 106.5-272T451-877v102q-115 11-192 95.5T182-479q0 124 87 210.5T480-182q72 0 136-32.5T725-306l88 51q-58 83-145.5 129T480-80Zm362-229-88-49q12-31 18-61.5t6-60.5q0-116-76.5-201T511-776v-102q157 11 263 124.5T880-484q0 45-9.5 88.5T842-309Z",
    Delete: "M201-120v-630h-41v-60h188v-30h264v30h188v60h-41v630H201Zm60-60h438v-570H261v570Zm106-86h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z",
    Draft: "M160-80v-800h421l219 219v581H160Zm391-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z",
    Eco: "M213-175q-43.59-45-68.3-104Q120-338 120-400q0-73 25.5-133.5T222-645q35-35 87-59t122.5-37.5Q502-755 591-758.5t198 3.5q8 108 5.5 197.5t-16 160.75q-13.5 71.25-38 124.56Q716-218.87 680-183q-51 51-110 77T444-80q-69 0-126.5-23.5T213-175Zm103 0q25 17 58 26t69.92 9Q497-140 547-162t91-64q27-27 46-70.5t31-103Q727-459 731-534t0-165q-94-2-168.5 2.5T431-680q-57 12-98 30.5T266-604q-42 43-64 91t-22 98q0 48 20.5 100.5T251-230q53-98 127-176t157-123q-87 75-141 162.5T316-175Zm0 0Zm0 0Z",
    Edit: "M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l617-616 128 128-617 616H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z",
    ExpandCircleDown: "m480-351 173-173-43-42-130 130-130-130-43 42 173 173Zm0 271q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z",
    ExpandCircleUp: "m350-394 130-130 130 130 43-42-173-173-173 173 43 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-155.5t85.5-127q54-54.5 127-86T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 83-31.5 156t-86 127q-54.5 54-127 85.5T480-80Zm0-60q141 0 240.5-99T820-480q0-141-99.5-240.5T480-820q-142 0-241 99.5T140-480q0 142 99 241t241 99Zm0-340Z",
    Import: "M450-160v-371L330-411l-43-43 193-193 193 193-43 43-120-120v371h-60ZM160-597v-203h640v203h-60v-143H220v143h-60Z",
    Religion: "M40-120v-560q0-45.83 32.12-77.92 32.12-32.08 78-32.08T228-757.92q32 32.09 32 77.92v31l220-191 220 191v-31q0-45.83 32.12-77.92 32.12-32.08 78-32.08T888-757.92q32 32.09 32 77.92v560H530v-250H430v250H40Zm720-510h100v-49.82q0-21.18-14.32-35.68-14.33-14.5-35.5-14.5-21.18 0-35.68 14.37Q760-701.25 760-680v50Zm-660 0h100v-49.82q0-21.18-14.32-35.68-14.33-14.5-35.5-14.5-21.18 0-35.68 14.37Q100-701.25 100-680v50Zm0 450h100v-390H100v390Zm160 0h110v-250h220v250h110v-390L480-761 260-570v390Zm500 0h100v-390H760v390ZM479.94-505Q457-505 441-521.06q-16-16.06-16-39T441.06-599q16.06-16 39-16T519-598.94q16 16.06 16 39T518.94-521q-16.06 16-39 16Z",
    Reset: "M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-129h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q83 0 152-47.5T728-393h62q-29 105-115 169t-195 64Z",
    Save: "M840-683v563H120v-720h563l157 157Zm-60 27L656-780H180v600h600v-476ZM479.76-245q43.24 0 73.74-30.26 30.5-30.27 30.5-73.5 0-43.24-30.26-73.74-30.27-30.5-73.5-30.5-43.24 0-73.74 30.26-30.5 30.27-30.5 73.5 0 43.24 30.26 73.74 30.27 30.5 73.5 30.5ZM233-584h358v-143H233v143Zm-53-72v476-600 124Z",
    SaveAs: "M120-120v-720h563l157 157v117l-60 60v-150L656-780H180v600h280v60H120Zm60-660v600-600ZM520-40v-123l263-262 122 122L643-40H520Zm300-263-37-37 37 37ZM580-100h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM233-584h358v-143H233v143Zm247 339q14 0 27-3t24-10l39-40q7-11 10.5-24t3.5-27q0-43.33-30.26-73.67Q523.47-453 480.24-453q-43.24 0-73.74 30.26-30.5 30.27-30.5 73.5 0 43.24 30.33 73.74Q436.67-245 480-245Z",
    Workshop: "M768-120 517-371l57-57 251 251-57 57Zm-581 0-57-57 290-290-107-107-23 23-44-44v85l-24 24-122-122 24-24h86l-48-48 131-131q17-17 37-23t44-6q24 0 44 8.5t37 25.5L348-699l48 48-24 24 104 104 122-122q-8-13-12.5-30t-4.5-36q0-53 38.5-91.5T711-841q15 0 25.5 3t17.5 8l-85 85 75 75 85-85q5 8 8.5 19.5T841-709q0 53-38.5 91.5T711-579q-18 0-31-2.5t-24-7.5L187-120Z",
    Resources: "M120-40v-880h60v80h600v-80h60v880h-60v-80H180v80h-60Zm60-469h110v-160h220v160h270v-271H180v271Zm0 329h270v-160h220v160h110v-269H180v269Zm170-329h100v-100H350v100Zm160 329h100v-100H510v100ZM350-509h100-100Zm160 329h100-100Z",
    Seasons: "M306-394q-17 0-28.5-11.5T266-434q0-17 11.5-28.5T306-474q17 0 28.5 11.5T346-434q0 17-11.5 28.5T306-394Zm177 0q-17 0-28.5-11.5T443-434q0-17 11.5-28.5T483-474q17 0 28.5 11.5T523-434q0 17-11.5 28.5T483-394Zm170 0q-17 0-28.5-11.5T613-434q0-17 11.5-28.5T653-474q17 0 28.5 11.5T693-434q0 17-11.5 28.5T653-394ZM120-80v-740h125v-60h65v60h340v-60h65v60h125v740H120Zm60-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z",
    Settings: "m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z",
    Space: "m187-551 106 45q18-36 38.5-71t43.5-67l-79-16-109 109Zm154 81 133 133q57-26 107-59t81-64q81-81 119-166t41-192q-107 3-192 41T464-658q-31 31-64 81t-59 107Zm229-96q-20-20-20-49.5t20-49.5q20-20 49.5-20t49.5 20q20 20 20 49.5T669-566q-20 20-49.5 20T570-566Zm-15 383 109-109-16-79q-32 23-67 43.5T510-289l45 106Zm326-694q9 136-34 248T705-418l-2 2-2 2 22 110q3 15-1.5 29T706-250L535-78l-85-198-170-170-198-85 172-171q11-11 25-15.5t29-1.5l110 22q1-1 2-1.5t2-1.5q99-99 211-142.5T881-877ZM149-325q35-35 85.5-35.5T320-326q35 35 34.5 85.5T319-155q-26 26-80.5 43T75-80q15-109 31.5-164t42.5-81Zm42 43q-14 15-25 47t-19 82q50-8 82-19t47-25q19-17 19.5-42.5T278-284q-19-18-44.5-17.5T191-282Z",
    State: "M820-240v-480h60v480h-60Zm-340 1-43-42 169-169H80v-60h526L438-679l42-42 241 241-241 241Z",
    Summary: "M279-621h60v-60h-60v60Zm0 171h60v-60h-60v60Zm0 171h60v-60h-60v60ZM120-120v-720h522l198 198v522H120Zm60-60h600v-429H609v-171H180v600Zm0-600v171.43V-780v600-600Z",
    Sync: "M167-160v-60h130l-15-12q-64-51-93-111t-29-134q0-106 62.5-190.5T387-784v62q-75 29-121 96.5T220-477q0 63 23.5 109.5T307-287l30 21v-124h60v230H167Zm407-15v-63q76-29 121-96.5T740-483q0-48-23.5-97.5T655-668l-29-26v124h-60v-230h230v60H665l15 14q60 56 90 120t30 123q0 106-62 191T574-175Z",
    Time: "m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z",
    Trigger: "m393-165 279-335H492l36-286-253 366h154l-36 255Zm-73 85 40-280H160l360-520h80l-40 320h240L400-80h-80Zm154-396Z"
  };
  const iconButton = "_iconButton_q7zpt_17";
  const inactive = "_inactive_q7zpt_29";
  const ineffective = "_ineffective_q7zpt_37";
  const button = "_button_q7zpt_43";
  const readonly$1 = "_readonly_q7zpt_67";
  const buttonIcon = "_buttonIcon_q7zpt_72";
  const alignRight = "_alignRight_q7zpt_77";
  const large = "_large_q7zpt_81";
  const bordered = "_bordered_q7zpt_85";
  const headAction = "_headAction_q7zpt_97";
  const lastHeadAction = "_lastHeadAction_q7zpt_100";
  const consumeButton = "_consumeButton_q7zpt_104";
  const stockButton = "_stockButton_q7zpt_107";
  const stylesButton = {
    iconButton,
    inactive,
    ineffective,
    button,
    readonly: readonly$1,
    buttonIcon,
    alignRight,
    large,
    bordered,
    headAction,
    lastHeadAction,
    consumeButton,
    stockButton
  };
  class UiComponent extends EventTarget {
    constructor(host, options) {
      super();
      __publicField(this, "_host");
      __publicField(this, "_options");
      __publicField(this, "children", /* @__PURE__ */ new Set());
      __publicField(this, "_onClick");
      __publicField(this, "_onRefresh");
      this._host = host;
      this._options = options ?? {};
      this._onClick = options == null ? void 0 : options.onClick;
      this._onRefresh = options == null ? void 0 : options.onRefresh;
    }
    click() {
      var _a;
      (_a = this._onClick) == null ? void 0 : _a.call(this, this);
    }
    refreshUi() {
      var _a;
      (_a = this._onRefresh) == null ? void 0 : _a.call(this, this);
      for (const child of this.children) {
        try {
          child.refreshUi();
        } catch (error) {
          cerror("Error while refreshing child component!", error);
        }
      }
    }
    addChild(child) {
      this.children.add(child);
      this.element.append(child.element);
    }
    addChildren(children) {
      for (const child of children ?? []) {
        this.addChild(child);
      }
    }
    removeChild(child) {
      if (!this.children.has(child)) {
        return;
      }
      child.element.remove();
      this.children.delete(child);
    }
    removeChildren(children) {
      for (const child of children) {
        this.removeChild(child);
      }
    }
  }
  class Button extends UiComponent {
    constructor(host, label2, pathData = null, options) {
      super(host, { ...options, children: [], classes: [] });
      __publicField(this, "_iconElement");
      __publicField(this, "element");
      __publicField(this, "readOnly");
      __publicField(this, "inactive");
      __publicField(this, "ineffective");
      this.element = $("<div/>", { title: options == null ? void 0 : options.title }).addClass(stylesButton.button).text(label2);
      if ((options == null ? void 0 : options.border) !== false) {
        this.element.addClass(stylesButton.bordered);
      }
      if ((options == null ? void 0 : options.alignment) === "right") {
        this.element.addClass(stylesButton.alignRight);
      }
      if (pathData !== null) {
        this._iconElement = $(
          `<svg class="${stylesButton.buttonIcon}" style="width: 18px; height: 18px;" viewBox="0 -960 960 960" fill="currentColor"><path d="${pathData}"/></svg>`
        );
        if ((options == null ? void 0 : options.alignment) === "right") {
          this.element.append(this._iconElement);
        } else {
          this.element.prepend(this._iconElement);
        }
      }
      for (const className of (options == null ? void 0 : options.classes) ?? []) {
        this.element.addClass(className);
      }
      this.element.on("click", () => {
        if (this.readOnly) {
          return;
        }
        this.click();
      });
      this.addChildren(options == null ? void 0 : options.children);
      this.readOnly = (options == null ? void 0 : options.readOnly) ?? false;
      this.inactive = (options == null ? void 0 : options.inactive) ?? false;
      this.ineffective = false;
    }
    updateLabel(label2) {
      this.element.text(label2);
      if (this._iconElement !== void 0) {
        if (this._options.alignment === "right") {
          this.element.append(this._iconElement);
        } else {
          this.element.prepend(this._iconElement);
        }
      }
    }
    updateTitle(title) {
      this.element.prop("title", title);
    }
    click() {
      if (this.readOnly) {
        return;
      }
      super.click();
    }
    refreshUi() {
      super.refreshUi();
      if (this.readOnly) {
        this.element.addClass(stylesButton.readonly);
      } else {
        this.element.removeClass(stylesButton.readonly);
      }
      if (this.inactive) {
        this.element.addClass(stylesButton.inactive);
      } else {
        this.element.removeClass(stylesButton.inactive);
      }
      if (this.ineffective) {
        this.element.addClass(stylesButton.ineffective);
      } else {
        this.element.removeClass(stylesButton.ineffective);
      }
    }
  }
  class Container extends UiComponent {
    constructor(host, options) {
      super(host, { ...options, children: [], classes: [] });
      __publicField(this, "element");
      this.element = $("<div/>");
      for (const className of (options == null ? void 0 : options.classes) ?? []) {
        this.element.addClass(className);
      }
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  const delimiter = "_delimiter_16hnh_1";
  const stylesDelimiter = {
    delimiter
  };
  class Delimiter extends UiComponent {
    constructor(host) {
      super(host, {});
      __publicField(this, "element");
      const element = $("<div/>").addClass(stylesDelimiter.delimiter);
      this.element = element;
    }
  }
  const dialog = "_dialog_b4vj0_1";
  const close = "_close_b4vj0_7";
  const styles$c = {
    dialog,
    close
  };
  const explainer = "_explainer_121s0_1";
  const styles$b = {
    explainer
  };
  const header = "_header_19ql8_1";
  const styles$a = {
    header
  };
  class HeaderListItem extends UiComponent {
    constructor(host, text, options) {
      super(host, options);
      __publicField(this, "element");
      const element = $("<li/>", { text }).addClass(styles$a.header);
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
    get elementLabel() {
      return this.element;
    }
  }
  class Input extends UiComponent {
    constructor(host, options) {
      super(host, { ...options, children: [], classes: [] });
      __publicField(this, "element");
      this.element = $('<input type="text"/>').addClass("ks-input");
      for (const className of (options == null ? void 0 : options.classes) ?? []) {
        this.element.addClass(className);
      }
      if (options == null ? void 0 : options.onChange) {
        this.element.on("change", () => {
          var _a;
          return (_a = options.onChange) == null ? void 0 : _a.call(options, this.element[0].value);
        });
      }
      if (options == null ? void 0 : options.value) {
        this.element[0].value = options.value;
      }
      if (options == null ? void 0 : options.selected) {
        this.element[0].selectionStart = 0;
        this.element[0].selectionEnd = -1;
      }
      this.element.on("keyup", (event) => {
        var _a, _b;
        switch (event.key) {
          case "Enter":
            (_a = options == null ? void 0 : options.onEnter) == null ? void 0 : _a.call(options, this.element[0].value);
            break;
          case "Escape":
            (_b = options == null ? void 0 : options.onEscape) == null ? void 0 : _b.call(options, this.element[0].value);
            break;
        }
      });
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  class Paragraph extends UiComponent {
    constructor(host, text, options) {
      super(host, { ...options, children: [], classes: [] });
      __publicField(this, "element");
      this.element = $("<p/>").text(text);
      for (const className of (options == null ? void 0 : options.classes) ?? []) {
        this.element.addClass(className);
      }
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  const toolbar = "_toolbar_1654f_1";
  const styles$9 = {
    toolbar
  };
  class Dialog extends UiComponent {
    constructor(host, options) {
      super(host, { ...options, children: [] });
      __publicField(this, "element");
      __publicField(this, "returnValue");
      this.element = $("<dialog/>").addClass("dialog").addClass("help").addClass(styles$c.dialog);
      if ((options == null ? void 0 : options.hasClose) !== false) {
        this.addChild(
          new Button(host, "close", null, {
            classes: [styles$c.close],
            onClick: () => {
              var _a;
              this.close();
              (_a = options == null ? void 0 : options.onCancel) == null ? void 0 : _a.call(options);
            }
          })
        );
      }
      this.addChildren(options == null ? void 0 : options.children);
      this.returnValue = (options == null ? void 0 : options.promptValue) ?? "";
      this.addChildren(
        coalesceArray([
          (options == null ? void 0 : options.prompt) ? new Input(host, {
            onChange: (value) => {
              this.returnValue = value;
            },
            onEnter: (value) => {
              var _a;
              this.returnValue = value;
              this.close();
              (_a = options.onConfirm) == null ? void 0 : _a.call(options, this.returnValue);
            },
            onEscape: (_value) => {
              var _a;
              this.close();
              (_a = options.onCancel) == null ? void 0 : _a.call(options);
            },
            selected: true,
            value: options.promptValue
          }) : void 0,
          ...(options == null ? void 0 : options.childrenAfterPrompt) ?? [],
          new Delimiter(host),
          new Container(host, {
            children: coalesceArray([
              new Button(host, "OK", null, {
                classes: [stylesButton.large],
                onClick: () => {
                  var _a;
                  this.close();
                  (_a = options == null ? void 0 : options.onConfirm) == null ? void 0 : _a.call(options, this.returnValue);
                }
              }),
              (options == null ? void 0 : options.hasCancel) ? new Button(host, "Cancel", null, {
                classes: [stylesButton.large],
                onClick: () => {
                  var _a;
                  this.close();
                  (_a = options.onCancel) == null ? void 0 : _a.call(options);
                }
              }) : void 0
            ]),
            classes: [styles$9.toolbar]
          })
        ])
      );
    }
    show() {
      $("#gamePageContainer").append(this.element);
      this.element[0].show();
    }
    showModal() {
      $("#gamePageContainer").append(this.element);
      this.element[0].showModal();
    }
    close() {
      this.element[0].close();
      this.element.remove();
    }
    static async prompt(host, text, title, initialValue, explainer2) {
      return new Promise((resolve) => {
        new Dialog(host, {
          children: coalesceArray([
            title ? new HeaderListItem(host, title) : void 0,
            new Paragraph(host, text)
          ]),
          childrenAfterPrompt: explainer2 ? [
            new Container(host, {
              children: [new Paragraph(host, explainer2)],
              classes: [styles$b.explainer]
            })
          ] : [],
          hasCancel: true,
          hasClose: false,
          onCancel: () => {
            resolve(void 0);
          },
          onConfirm: (result) => {
            resolve(result);
          },
          prompt: true,
          promptValue: initialValue
        }).showModal();
      });
    }
  }
  const label = "_label_1nlev_1";
  const splitter = "_splitter_1nlev_16";
  const iconLabel = "_iconLabel_1nlev_20";
  const fillSpace = "_fillSpace_1nlev_26";
  const stylesLabelListItem = {
    label,
    splitter,
    iconLabel,
    fillSpace
  };
  class ListItem extends UiComponent {
    constructor(host, options) {
      super(host, options);
      __publicField(this, "element");
      this.element = $("<li/>");
      for (const className of (options == null ? void 0 : options.classes) ?? []) {
        this.element.addClass(className);
      }
      if ((options == null ? void 0 : options.delimiter) === true) {
        this.element.addClass(stylesDelimiter.delimiter);
      }
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  const head = "_head_wr1pj_1";
  const stylesListItem = {
    head
  };
  class LabelListItem extends ListItem {
    constructor(host, label2, options) {
      super(host, options);
      __publicField(this, "head");
      __publicField(this, "elementLabel");
      this.head = new Container(host);
      this.head.element.addClass(stylesListItem.head);
      this.addChild(this.head);
      this.elementLabel = $("<label/>", {
        text: `${(options == null ? void 0 : options.upgradeIndicator) === true ? "⮤ " : ""}${label2}`
      }).addClass(stylesLabelListItem.label).addClass(stylesListItem.label).on("click", () => {
        this.click();
      });
      this.head.element.append(this.elementLabel);
      for (const child of (options == null ? void 0 : options.childrenHead) ?? []) {
        this.head.addChild(child);
      }
      if (options == null ? void 0 : options.icon) {
        const iconElement = $("<div/>", {
          html: `<svg style="width: 15px; height: 15px;" viewBox="0 -960 960 960" fill="currentColor"><path d="${options.icon}"/></svg>`
        }).addClass(stylesLabelListItem.iconLabel);
        this.elementLabel.prepend(iconElement);
      }
    }
  }
  const setting = "_setting_1ndg5_1";
  const checkbox = "_checkbox_1ndg5_6";
  const panelContent = "_panelContent_1ndg5_10";
  const hidden = "_hidden_1ndg5_17";
  const checked = "_checked_1ndg5_22";
  const expanded$1 = "_expanded_1ndg5_26";
  const readonly = "_readonly_1ndg5_34";
  const stylesSettingListItem = {
    setting,
    checkbox,
    panelContent,
    hidden,
    checked,
    expanded: expanded$1,
    readonly
  };
  const _SettingListItem = class _SettingListItem extends LabelListItem {
    constructor(host, setting2, label2, options = {}) {
      super(host, label2, { ...options, children: [] });
      __publicField(this, "setting");
      __publicField(this, "checkbox");
      __publicField(this, "readOnly");
      this.element.addClass(stylesSettingListItem.setting);
      const id = `ks-setting${__privateWrapper(_SettingListItem, _nextId)._++}`;
      const checkbox2 = $("<input/>", {
        id,
        type: "checkbox"
      }).addClass(stylesSettingListItem.checkbox);
      this.readOnly = options.readOnly ?? false;
      checkbox2.prop("disabled", this.readOnly);
      checkbox2.on("change", () => {
        var _a, _b;
        if (checkbox2.is(":checked") && !setting2.enabled) {
          setting2.enabled = true;
          (_a = options.onCheck) == null ? void 0 : _a.call(options);
          this.refreshUi();
        } else if (!checkbox2.is(":checked") && setting2.enabled) {
          setting2.enabled = false;
          (_b = options.onUnCheck) == null ? void 0 : _b.call(options);
          this.refreshUi();
        }
      });
      this.elementLabel.before(checkbox2);
      this.elementLabel.prop("for", id);
      this.checkbox = checkbox2;
      this.setting = setting2;
      this.addChildren(options.children);
    }
    check() {
      var _a, _b;
      this.setting.enabled = true;
      (_b = (_a = this._options).onCheck) == null ? void 0 : _b.call(_a);
      this.refreshUi();
    }
    uncheck() {
      var _a, _b;
      this.setting.enabled = false;
      (_b = (_a = this._options).onUnCheck) == null ? void 0 : _b.call(_a);
      this.refreshUi();
    }
    refreshUi() {
      super.refreshUi();
      if (this.setting.enabled) {
        this.element.addClass(stylesSettingListItem.checked);
      } else {
        this.element.removeClass(stylesSettingListItem.checked);
      }
      if (this.readOnly) {
        this.element.addClass(stylesSettingListItem.readonly);
      } else {
        this.element.removeClass(stylesSettingListItem.readonly);
      }
      if (!isNil(this.checkbox)) {
        this.checkbox.prop("checked", this.setting.enabled);
        this.checkbox.prop("disabled", this.readOnly);
      }
    }
  };
  _nextId = new WeakMap();
  __privateAdd(_SettingListItem, _nextId, 0);
  let SettingListItem = _SettingListItem;
  class InvalidOperationError extends AbstractError {
    constructor(message, status = 400) {
      super("ERR_OS_INVALID_OPERATION", message, status);
      this.name = "InvalidOperationError";
      if (typeof Error.captureStackTrace !== "undefined") {
        Error.captureStackTrace(this, InvalidOperationError);
      }
    }
  }
  const maxButton = "_maxButton_133h2_1";
  const styles$8 = {
    maxButton
  };
  class MaxButton extends Button {
    constructor(host, setting2, options) {
      super(host, "", null, {
        ...options,
        classes: [styles$8.maxButton, ...(options == null ? void 0 : options.classes) ?? []]
      });
      __publicField(this, "setting");
      if (isNil(options == null ? void 0 : options.onClick)) {
        throw new InvalidOperationError("Missing click handler on MaxButton.");
      }
      this.setting = setting2;
    }
  }
  class TriggerButton extends Button {
    constructor(host, setting2, _locale, options) {
      super(host, "", Icons.Trigger, options);
      __publicField(this, "behavior");
      __publicField(this, "setting");
      __publicField(this, "_onRefreshTitle");
      this._onRefreshTitle = options == null ? void 0 : options.onRefreshTitle;
      this.behavior = setting2 instanceof SettingTrigger ? "percentage" : "integer";
      if (isNil(options == null ? void 0 : options.onClick)) {
        throw new InvalidOperationError("Missing click handler on TriggerButton.");
      }
      this.setting = setting2;
    }
    refreshUi() {
      super.refreshUi();
      if (this._onRefreshTitle) {
        this._onRefreshTitle(this);
        return;
      }
      const triggerValue = this.behavior === "integer" ? this._host.renderAbsolute(this.setting.trigger, "invariant") : this._host.renderPercentage(this.setting.trigger, "invariant", true);
      this.updateTitle(this._host.engine.i18n("ui.trigger", [triggerValue]));
      this.updateLabel(triggerValue);
    }
  }
  class SettingMaxTriggerListItem extends SettingListItem {
    constructor(host, setting2, locale, label2, options) {
      super(host, setting2, label2, options);
      __publicField(this, "maxButton");
      __publicField(this, "triggerButton");
      this.maxButton = new MaxButton(host, setting2, {
        alignment: "right",
        border: false,
        classes: [stylesButton.headAction],
        onClick: (options == null ? void 0 : options.onSetMax) ? () => {
          var _a;
          return (_a = options.onSetMax) == null ? void 0 : _a.call(options, this);
        } : void 0,
        onRefresh: (options == null ? void 0 : options.onRefreshMax) ? () => {
          var _a;
          return (_a = options.onRefreshMax) == null ? void 0 : _a.call(options, this);
        } : void 0
      });
      this.triggerButton = new TriggerButton(host, setting2, locale, {
        border: false,
        classes: [stylesButton.lastHeadAction],
        onClick: (options == null ? void 0 : options.onSetTrigger) ? () => {
          var _a;
          return (_a = options.onSetTrigger) == null ? void 0 : _a.call(options, this);
        } : void 0,
        onRefreshTitle: (options == null ? void 0 : options.onRefreshTrigger) ? () => {
          var _a;
          return (_a = options.onRefreshTrigger) == null ? void 0 : _a.call(options, this);
        } : void 0
      });
      this.head.addChildren([
        new Container(host, { classes: [stylesLabelListItem.fillSpace] }),
        this.maxButton,
        this.triggerButton
      ]);
    }
    refreshUi() {
      super.refreshUi();
    }
  }
  const BuildSectionTools = {
    getBuildOption: (host, option, locale, sectionSetting, label2, sectionLabel, delimiter2 = false, upgradeIndicator = false) => {
      const onSetMax = () => {
        Dialog.prompt(
          host,
          host.engine.i18n("ui.max.prompt.absolute"),
          host.engine.i18n("ui.max.build.prompt", [
            label2,
            host.renderAbsolute(option.max, locale.selected)
          ]),
          host.renderAbsolute(option.max),
          host.engine.i18n("ui.max.build.promptExplainer")
        ).then((value) => {
          if (value === void 0) {
            return;
          }
          if (value === "" || value.startsWith("-")) {
            option.max = -1;
            return;
          }
          if (value === "0") {
            option.enabled = false;
          }
          option.max = host.parseAbsolute(value) ?? option.max;
        }).then(() => {
          element.refreshUi();
        }).catch(redirectErrorsToConsole(console));
      };
      const element = new SettingMaxTriggerListItem(host, option, locale, label2, {
        delimiter: delimiter2,
        onCheck: () => {
          host.engine.imessage("status.sub.enable", [label2]);
          if (option.max === 0) {
            onSetMax();
          }
        },
        onUnCheck: () => {
          host.engine.imessage("status.sub.disable", [label2]);
        },
        onRefresh: () => {
          element.maxButton.inactive = !option.enabled || option.max === -1;
          element.maxButton.ineffective = sectionSetting.enabled && option.enabled && option.max === 0;
          element.triggerButton.inactive = !option.enabled || option.trigger === -1;
          element.triggerButton.ineffective = sectionSetting.enabled && option.enabled && sectionSetting.trigger === -1 && option.trigger === -1;
        },
        onRefreshMax: () => {
          element.maxButton.updateLabel(host.renderAbsolute(option.max));
          element.maxButton.element[0].title = option.max < 0 ? host.engine.i18n("ui.max.build.titleInfinite", [label2]) : option.max === 0 ? host.engine.i18n("ui.max.build.titleZero", [label2]) : host.engine.i18n("ui.max.build.title", [host.renderAbsolute(option.max), label2]);
        },
        onRefreshTrigger: () => {
          element.triggerButton.element[0].title = host.engine.i18n("ui.trigger", [
            option.trigger < 0 ? sectionSetting.trigger < 0 ? host.engine.i18n("ui.trigger.build.blocked", [sectionLabel]) : `${host.renderPercentage(sectionSetting.trigger, locale.selected, true)} (${host.engine.i18n("ui.trigger.build.inherited")})` : host.renderPercentage(option.trigger, locale.selected, true)
          ]);
        },
        onSetMax,
        onSetTrigger: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("ui.trigger.prompt.percentage"),
            host.engine.i18n("ui.trigger.build.prompt", [
              label2,
              option.trigger !== -1 ? host.renderPercentage(option.trigger, locale.selected, true) : host.engine.i18n("ui.trigger.build.inherited")
            ]),
            option.trigger !== -1 ? host.renderPercentage(option.trigger) : "",
            host.engine.i18n("ui.trigger.build.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              option.trigger = -1;
              return;
            }
            option.trigger = host.parsePercentage(value);
          }).then(() => {
            element.refreshUi();
          }).catch(redirectErrorsToConsole(console));
        },
        upgradeIndicator
      });
      return element;
    }
  };
  class IconButton extends UiComponent {
    constructor(host, pathData, title, options) {
      super(host, options);
      __publicField(this, "element");
      __publicField(this, "readOnly");
      __publicField(this, "inactive");
      const element = $("<div/>", {
        html: `<svg style="width: 18px; height: 18px;" viewBox="0 -960 960 960" fill="currentColor"><path d="${pathData}"/></svg>`,
        title
      }).addClass(stylesButton.iconButton);
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
      this.readOnly = (options == null ? void 0 : options.readOnly) ?? false;
      this.inactive = (options == null ? void 0 : options.inactive) ?? false;
      this.element.on("click", () => {
        this.click();
      });
    }
    click() {
      if (this.readOnly) {
        return;
      }
      super.click();
    }
    refreshUi() {
      super.refreshUi();
      if (this.readOnly) {
        this.element.addClass(stylesButton.readonly);
      } else {
        this.element.removeClass(stylesButton.readonly);
      }
      if (this.inactive) {
        this.element.addClass(stylesButton.inactive);
      } else {
        this.element.removeClass(stylesButton.inactive);
      }
    }
  }
  const listContainer = "_listContainer_1kxbq_1";
  const itemsList = "_itemsList_1kxbq_5";
  const list = "_list_1kxbq_1";
  const listTools = "_listTools_1kxbq_9";
  const styles$7 = {
    listContainer,
    itemsList,
    list,
    listTools
  };
  class SettingsList extends UiComponent {
    constructor(host, options = {}) {
      super(host, { ...options, children: [] });
      __publicField(this, "element");
      __publicField(this, "list");
      __publicField(this, "disableAllButton");
      __publicField(this, "enableAllButton");
      __publicField(this, "resetButton");
      const toolOptions = {
        hasDisableAll: true,
        hasEnableAll: true,
        ...options
      };
      const hasTools = toolOptions.hasDisableAll || toolOptions.hasEnableAll || !isNil(toolOptions.onReset);
      const container = $("<div/>").addClass(styles$7.listContainer);
      this.list = $("<ul/>").addClass(styles$7.list).addClass(styles$7.itemsList);
      container.append(this.list);
      if (hasTools) {
        const tools = $("<div/>").addClass(styles$7.listTools);
        if (toolOptions.hasEnableAll) {
          const onEnableAll = options.onEnableAll;
          this.enableAllButton = new IconButton(
            this._host,
            Icons.CheckboxCheck,
            host.engine.i18n("ui.enable.all"),
            {
              onClick: () => {
                const event = new Event("enableAll", { cancelable: true });
                this.dispatchEvent(event);
                if (event.defaultPrevented) {
                  return;
                }
                for (const child of this.children) {
                  if (is(child, SettingListItem)) {
                    child.check();
                  }
                }
                if (!isNil(onEnableAll)) {
                  onEnableAll();
                }
                this.refreshUi();
              }
            }
          );
          tools.append(this.enableAllButton.element);
        }
        if (toolOptions.hasDisableAll) {
          const onDisableAll = options.onDisableAll;
          this.disableAllButton = new IconButton(
            this._host,
            Icons.CheckboxUnCheck,
            host.engine.i18n("ui.disable.all")
          );
          this.disableAllButton.element.on("click", () => {
            const event = new Event("disableAll", { cancelable: true });
            this.dispatchEvent(event);
            if (event.defaultPrevented) {
              return;
            }
            for (const child of this.children) {
              if (is(child, SettingListItem)) {
                child.uncheck();
              }
            }
            if (!isNil(onDisableAll)) {
              onDisableAll();
            }
            this.refreshUi();
          });
          tools.append(this.disableAllButton.element);
        }
        const onReset = toolOptions.onReset;
        if (!isNil(onReset)) {
          this.resetButton = new IconButton(this._host, Icons.Reset, host.engine.i18n("ui.reset"), {
            onClick: () => {
              onReset();
            }
          });
          tools.append(this.resetButton.element);
        }
        container.append(tools);
      }
      this.element = container;
      this.addChildren(options.children);
    }
    addChild(child) {
      this.children.add(child);
      this.list.append(child.element);
    }
  }
  const expandoButton = "_expandoButton_l1ukp_1";
  const expanded = "_expanded_l1ukp_1";
  const up = "_up_l1ukp_1";
  const down = "_down_l1ukp_4";
  const styles$6 = {
    expandoButton,
    expanded,
    up,
    down
  };
  class ExpandoButton extends UiComponent {
    constructor(host, options) {
      super(host, options);
      __publicField(this, "element");
      __publicField(this, "ineffective");
      const element = $("<div/>", {
        html: `
      <svg style="width: 18px; height: 18px;" viewBox="0 -960 960 960" fill="currentColor" class="${styles$6.down}"><path d="${Icons.ExpandCircleDown}"/></svg>
      <svg style="width: 18px; height: 18px;" viewBox="0 -960 960 960" fill="currentColor" class="${styles$6.up}"><path d="${Icons.ExpandCircleUp}"/></svg>
      `,
        title: host.engine.i18n("ui.itemsShow")
      }).addClass(stylesButton.iconButton).addClass(styles$6.expandoButton);
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
      this.ineffective = false;
    }
    setCollapsed() {
      this.element.removeClass(styles$6.expanded);
      this.element.prop("title", this._host.engine.i18n("ui.itemsShow"));
    }
    setExpanded() {
      this.element.addClass(styles$6.expanded);
      this.element.prop("title", this._host.engine.i18n("ui.itemsHide"));
    }
    refreshUi() {
      super.refreshUi();
      if (this.ineffective) {
        this.element.addClass(stylesButton.ineffective);
      } else {
        this.element.removeClass(stylesButton.ineffective);
      }
    }
  }
  class CollapsiblePanel extends UiComponent {
    constructor(host, head2, options) {
      super(host, options);
      __publicField(this, "container");
      __publicField(this, "element");
      __publicField(this, "_expando");
      __publicField(this, "_head");
      __publicField(this, "_mainChildVisible");
      __publicField(this, "parent");
      this.container = new Container(host);
      this.container.element.addClass(stylesSettingListItem.panelContent);
      this.children.add(this.container);
      this._head = head2;
      this.children.add(head2);
      const expando = new ExpandoButton(host);
      expando.element.on("click", () => {
        this.toggle();
      });
      head2.head.addChild(expando);
      head2.element.append(this.container.element);
      if (options == null ? void 0 : options.initiallyExpanded) {
        this.container.element.removeClass(stylesSettingListItem.hidden);
        expando.setExpanded();
      } else {
        this.container.element.addClass(stylesSettingListItem.hidden);
      }
      this._mainChildVisible = (options == null ? void 0 : options.initiallyExpanded) ?? false;
      this.element = head2.element;
      this.addChildren(options == null ? void 0 : options.children);
      this._expando = expando;
    }
    get expando() {
      return this._expando;
    }
    get isExpanded() {
      return this._mainChildVisible;
    }
    addChild(child) {
      this.children.add(child);
      this.container.element.append(child.element);
    }
    toggle(expand = void 0, toggleNested = false) {
      const visible = expand !== void 0 ? expand : !this._mainChildVisible;
      if (visible !== this._mainChildVisible) {
        this._mainChildVisible = visible;
        if (this._mainChildVisible) {
          this.container.refreshUi();
          this.container.element.removeClass(stylesSettingListItem.hidden);
          this._expando.setExpanded();
          this._head.element.addClass(stylesSettingListItem.expanded);
          this.dispatchEvent(new CustomEvent("panelShown"));
        } else {
          this.container.element.addClass(stylesSettingListItem.hidden);
          this._expando.setCollapsed();
          this._head.element.removeClass(stylesSettingListItem.expanded);
          this.dispatchEvent(new CustomEvent("panelHidden"));
        }
      }
      if (toggleNested) {
        const toggleChildren = (children) => {
          for (const child of children) {
            if (is(child, CollapsiblePanel)) {
              child.toggle(expand, toggleNested);
            } else {
              toggleChildren(child.children);
            }
          }
        };
        toggleChildren(this.children);
      }
    }
  }
  class SettingsPanel extends CollapsiblePanel {
    constructor(host, setting2, settingItem, options) {
      super(host, settingItem, options);
      __publicField(this, "setting");
      __publicField(this, "settingItem");
      this.settingItem = settingItem;
      this.setting = setting2;
    }
    get isExpanded() {
      return this._mainChildVisible;
    }
    get elementLabel() {
      return this._head.element;
    }
    get head() {
      return this._head;
    }
    get readOnly() {
      return true;
    }
    set readOnly(_value) {
    }
    check() {
      this.setting.enabled = true;
      this.refreshUi();
    }
    uncheck() {
      this.setting.enabled = false;
      this.refreshUi();
    }
  }
  class BuildingUpgradeSettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      const label2 = host.engine.i18n("ui.upgrade.buildings");
      super(
        host,
        settings,
        new SettingListItem(host, settings, label2, {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          }
        }),
        options
      );
      const items = [];
      for (const setting2 of Object.values(this.setting.buildings)) {
        const label22 = host.engine.i18n(`$buildings.${setting2.upgrade}.label`);
        const button2 = new SettingListItem(host, setting2, label22, {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [label22]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [label22]);
          }
        });
        items.push({ label: label22, button: button2 });
      }
      items.sort((a, b) => a.label.localeCompare(b.label));
      const itemsList2 = new SettingsList(host);
      for (const button2 of items) {
        itemsList2.addChild(button2.button);
      }
      this.addChild(itemsList2);
    }
  }
  class SettingTriggerListItem extends SettingListItem {
    constructor(host, setting2, locale, label2, options) {
      super(host, setting2, label2, options);
      __publicField(this, "triggerButton");
      this.triggerButton = new TriggerButton(host, setting2, locale, {
        alignment: "right",
        border: false,
        onClick: (options == null ? void 0 : options.onSetTrigger) ? () => {
          var _a;
          return (_a = options.onSetTrigger) == null ? void 0 : _a.call(options, this);
        } : void 0,
        onRefreshTitle: (options == null ? void 0 : options.onRefreshTrigger) ? () => {
          var _a;
          return (_a = options.onRefreshTrigger) == null ? void 0 : _a.call(options, this);
        } : void 0
      });
      this.head.addChild(new Container(host, { classes: [stylesLabelListItem.fillSpace] }));
      this.head.addChild(this.triggerButton);
    }
    refreshUi() {
      super.refreshUi();
      this.triggerButton.refreshUi();
    }
  }
  class BonfireSettingsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.build");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          },
          onRefresh: (item) => {
            item.triggerButton.inactive = !settings.enabled || settings.trigger < 0;
          },
          onRefreshTrigger: (item) => {
            item.triggerButton.element[0].title = host.engine.i18n("ui.trigger.section", [
              settings.trigger < 0 ? host.engine.i18n("ui.trigger.section.inactive") : host.renderPercentage(settings.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                settings.trigger !== -1 ? host.renderPercentage(settings.trigger, locale.selected, true) : host.engine.i18n("ui.infinity")
              ]),
              settings.trigger !== -1 ? host.renderPercentage(settings.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                settings.trigger = -1;
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        })
      );
      this.addChildren([
        new SettingsList(host, {
          children: coalesceArray(
            host.game.bld.buildingGroups.flatMap((buildingGroup) => [
              new HeaderListItem(host, buildingGroup.title),
              ...buildingGroup.buildings.flatMap(
                (building) => this._getBuildOptions(host, settings, locale, label2, building)
              ),
              buildingGroup !== host.game.bld.buildingGroups[host.game.bld.buildingGroups.length - 1] ? new Delimiter(host) : void 0
            ])
          ),
          onReset: () => {
            this.setting.load({ buildings: new BonfireSettings().buildings });
            this.refreshUi();
          }
        }),
        new SettingsList(host, {
          children: [
            new HeaderListItem(host, host.engine.i18n("ui.additional")),
            new SettingListItem(host, settings.gatherCatnip, host.engine.i18n("option.catnip"), {
              onCheck: () => {
                host.engine.imessage("status.sub.enable", [host.engine.i18n("option.catnip")]);
              },
              onUnCheck: () => {
                host.engine.imessage("status.sub.disable", [host.engine.i18n("option.catnip")]);
              }
            }),
            new SettingListItem(
              host,
              settings.turnOnSteamworks,
              host.engine.i18n("option.steamworks"),
              {
                onCheck: () => {
                  host.engine.imessage("status.sub.enable", [host.engine.i18n("option.steamworks")]);
                },
                onUnCheck: () => {
                  host.engine.imessage("status.sub.disable", [host.engine.i18n("option.steamworks")]);
                }
              }
            ),
            new SettingListItem(host, settings.turnOnMagnetos, host.engine.i18n("option.magnetos"), {
              onCheck: () => {
                host.engine.imessage("status.sub.enable", [host.engine.i18n("option.magnetos")]);
              },
              onUnCheck: () => {
                host.engine.imessage("status.sub.disable", [host.engine.i18n("option.magnetos")]);
              }
            }),
            new SettingListItem(host, settings.turnOnReactors, host.engine.i18n("option.reactors"), {
              onCheck: () => {
                host.engine.imessage("status.sub.enable", [host.engine.i18n("option.reactors")]);
              },
              onUnCheck: () => {
                host.engine.imessage("status.sub.disable", [host.engine.i18n("option.reactors")]);
              }
            }),
            new BuildingUpgradeSettingsUi(host, settings.upgradeBuildings)
          ],
          hasDisableAll: false,
          hasEnableAll: false
        })
      ]);
    }
    _getBuildOptions(host, settings, locale, sectionLabel, building) {
      var _a;
      if (building === "unicornPasture" || isNil(settings.buildings[building])) {
        return [];
      }
      const meta = host.game.bld.getBuildingExt(building).meta;
      if (!isNil(meta.stages)) {
        const name = (_a = Object.values(settings.buildings).find((item) => item.baseBuilding === building)) == null ? void 0 : _a.building;
        return [
          BuildSectionTools.getBuildOption(
            host,
            settings.buildings[building],
            locale,
            settings,
            meta.stages[0].label,
            sectionLabel
          ),
          BuildSectionTools.getBuildOption(
            host,
            settings.buildings[name],
            locale,
            settings,
            meta.stages[1].label,
            sectionLabel,
            false,
            true
          )
        ];
      }
      if (!isNil(meta.label)) {
        return [
          BuildSectionTools.getBuildOption(
            host,
            settings.buildings[building],
            locale,
            settings,
            meta.label,
            sectionLabel
          )
        ];
      }
      return [];
    }
  }
  class EngineSettingsUi extends SettingListItem {
    constructor(host, settings) {
      const label2 = ucfirst(host.engine.i18n("ui.engine"));
      super(host, settings, label2, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        onCheck: () => {
          host.engine.start(true);
        },
        onUnCheck: () => {
          host.engine.stop(true);
        }
      });
      __publicField(this, "expando");
      this.expando = new ExpandoButton(host);
      this.head.addChild(this.expando);
    }
  }
  class ButtonListItem extends ListItem {
    constructor(host, button2, options = {}) {
      super(host, { ...options, children: [] });
      __publicField(this, "button");
      this.button = button2;
      this.element.addClass(stylesListItem.head);
      this.element.append(button2.element);
      this.addChildren(options.children);
    }
    refreshUi() {
      super.refreshUi();
      this.button.refreshUi();
    }
  }
  const fieldset = "_fieldset_tfwil_1";
  const styles$5 = {
    fieldset
  };
  class Fieldset extends UiComponent {
    constructor(host, label2, options) {
      super(host, options);
      __publicField(this, "element");
      const element = $("<fieldset/>").addClass(styles$5.fieldset);
      if (options == null ? void 0 : options.delimiter) {
        element.addClass(stylesDelimiter.delimiter);
      }
      const legend = $("<legend/>").text(label2).addClass(stylesLabelListItem.label);
      element.append(legend);
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  class RadioItem extends UiComponent {
    constructor(host, setting2, option, groupKey, options) {
      super(host, options);
      __publicField(this, "setting");
      __publicField(this, "option");
      __publicField(this, "element");
      __publicField(this, "input");
      __publicField(this, "readOnly");
      const element = $("<div/>");
      element.addClass(stylesSettingListItem.setting);
      if ((options == null ? void 0 : options.delimiter) === true) {
        element.addClass(stylesDelimiter.delimiter);
      }
      const elementLabel = $("<label/>", {
        text: `${(options == null ? void 0 : options.upgradeIndicator) ? "⮤ " : ""}${option.label}`
      }).addClass(stylesLabelListItem.label);
      const input = $("<input/>", {
        name: groupKey,
        type: "radio"
      }).addClass("ks-radio");
      this.readOnly = (options == null ? void 0 : options.readOnly) ?? false;
      input.on("change", () => {
        this.setting.selected = option.value;
        if (!isNil(options == null ? void 0 : options.onCheck)) {
          options.onCheck();
        }
      });
      elementLabel.prepend(input);
      element.append(elementLabel);
      this.input = input;
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
      this.setting = setting2;
      this.option = option;
    }
    refreshUi() {
      super.refreshUi();
      this.input.prop("disabled", this.readOnly);
    }
  }
  class OptionsListItem extends UiComponent {
    constructor(host, label2, setting2, options) {
      super(host, options);
      __publicField(this, "fieldset");
      __publicField(this, "setting");
      __publicField(this, "element");
      __publicField(this, "_items");
      this.element = $("<li/>");
      this.fieldset = new Fieldset(host, label2);
      this.addChild(this.fieldset);
      this._items = new Array();
      for (const option of setting2.options) {
        this._items.push(
          new RadioItem(host, setting2, option, label2, {
            onCheck: options == null ? void 0 : options.onCheck,
            readOnly: options == null ? void 0 : options.readOnly
          })
        );
      }
      this.fieldset.addChildren(this._items);
      this.setting = setting2;
    }
    refreshUi() {
      super.refreshUi();
      for (const option of this._items) {
        if (option.option.value === this.setting.selected) {
          option.input.prop("checked", true);
          break;
        }
      }
    }
  }
  const textButton = "_textButton_1mv97_1";
  const styles$4 = {
    textButton
  };
  class TextButton extends UiComponent {
    constructor(host, label2, options) {
      super(host, options);
      __publicField(this, "element");
      __publicField(this, "readOnly");
      const element = $("<div/>").addClass(styles$4.textButton);
      if (label2 !== void 0) {
        element.text(label2);
      }
      const title = options == null ? void 0 : options.title;
      if (!isNil(title)) {
        element.prop("title", title);
      }
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
      this.readOnly = false;
      this.element.on("click", () => {
        this.click();
      });
    }
    click() {
      if (this.readOnly) {
        return;
      }
      super.click();
    }
    refreshUi() {
      super.refreshUi();
      if (this.readOnly) {
        this.element.addClass(stylesButton.readonly);
      } else {
        this.element.removeClass(stylesButton.readonly);
      }
    }
  }
  class InternalsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      super(
        host,
        settings,
        new LabelListItem(host, host.engine.i18n("ui.internals"), {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          classes: [stylesSettingListItem.checked, stylesSettingListItem.setting],
          icon: Icons.Settings
        }),
        {
          children: [
            new SettingsList(host, {
              children: [
                new ButtonListItem(
                  host,
                  new TextButton(
                    host,
                    host.engine.i18n("ui.internals.interval", [settings.interval]),
                    {
                      onClick: () => {
                        Dialog.prompt(
                          host,
                          host.engine.i18n("ui.internals.interval.prompt"),
                          host.engine.i18n("ui.internals.interval.promptTitle", [
                            host.renderAbsolute(settings.interval, locale.selected)
                          ]),
                          host.renderAbsolute(settings.interval),
                          host.engine.i18n("ui.internals.interval.promptExplainer")
                        ).then((value) => {
                          if (value === void 0 || value === "" || value.startsWith("-")) {
                            return;
                          }
                          if (value === "0") {
                            settings.enabled = false;
                          }
                          settings.interval = host.parseAbsolute(value) ?? settings.interval;
                        }).then(() => {
                          this.refreshUi();
                        }).catch(redirectErrorsToConsole(console));
                      },
                      onRefresh: (subject) => {
                        subject.element.text(
                          host.engine.i18n("ui.internals.interval", [settings.interval])
                        );
                      }
                    }
                  )
                ),
                new Delimiter(host),
                new SettingListItem(host, settings.ksColumn, host.engine.i18n("ui.ksColumn"), {
                  onCheck: () => {
                    host.rebuildUi();
                  },
                  onUnCheck: () => {
                    host.rebuildUi();
                  }
                }),
                new Delimiter(host),
                new OptionsListItem(host, host.engine.i18n("ui.language"), settings.locale, {
                  onCheck: () => {
                    host.rebuildUi();
                  }
                }),
                new Delimiter(host),
                new LabelListItem(host, `Kitten Scientists ${ksVersion("v")}`)
              ],
              hasDisableAll: false,
              hasEnableAll: false
            })
          ]
        }
      );
    }
  }
  class ExplainerListItem extends UiComponent {
    constructor(host, key, options) {
      super(host);
      __publicField(this, "element");
      const element = $("<li/>", { text: host.engine.i18n(key) }).addClass(styles$b.explainer);
      this.element = element;
      this.addChildren(options == null ? void 0 : options.children);
    }
  }
  class LogFiltersSettingsUi extends SettingsPanel {
    constructor(host, settings) {
      const label2 = host.engine.i18n("ui.filter");
      super(
        host,
        settings,
        new SettingListItem(host, settings, label2, {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          }
        })
      );
      this.addChild(
        new SettingsList(host, {
          children: [
            new SettingListItem(host, settings.disableKGLog, host.engine.i18n("filter.allKG"))
          ],
          hasDisableAll: false,
          hasEnableAll: false
        })
      );
      const listFilters = new SettingsList(host, {
        children: FilterItems.map((item) => {
          return { name: item, label: host.engine.i18n(`filter.${item}`) };
        }).sort((a, b) => a.label.localeCompare(b.label)).map(
          (item) => new SettingListItem(host, this.setting.filters[item.name], item.label, {
            onCheck: () => {
              host.engine.imessage("filter.enable", [item.label]);
            },
            onUnCheck: () => {
              host.engine.imessage("filter.disable", [item.label]);
            }
          })
        )
      });
      this.addChild(listFilters);
      this.addChild(new ExplainerListItem(host, "filter.explainer"));
    }
  }
  const active = "_active_6c09s_16";
  const styles$3 = {
    active
  };
  class ReligionSettingsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.faith");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          },
          onRefresh: (item) => {
            item.triggerButton.inactive = !settings.enabled || settings.trigger === -1;
          },
          onRefreshTrigger: (item) => {
            item.triggerButton.element[0].title = host.engine.i18n("ui.trigger.section", [
              settings.trigger < 0 ? host.engine.i18n("ui.trigger.section.inactive") : host.renderPercentage(settings.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                settings.trigger !== -1 ? host.renderPercentage(settings.trigger, locale.selected, true) : host.engine.i18n("ui.infinity")
              ]),
              settings.trigger !== -1 ? host.renderPercentage(settings.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                settings.trigger = -1;
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        })
      );
      __publicField(this, "_unicornBuildings");
      __publicField(this, "_bestUnicornBuilding");
      const unicornsArray = [...UnicornItems];
      this._unicornBuildings = new Map([
        [
          "unicornPasture",
          BuildSectionTools.getBuildOption(
            host,
            this.setting.buildings.unicornPasture,
            locale,
            this.setting,
            host.engine.i18n("$buildings.unicornPasture.label"),
            label2
          )
        ],
        ...host.game.religion.zigguratUpgrades.filter(
          (item) => unicornsArray.includes(item.name) && !isNil(this.setting.buildings[item.name])
        ).map(
          (zigguratUpgrade) => [
            zigguratUpgrade.name,
            BuildSectionTools.getBuildOption(
              host,
              this.setting.buildings[zigguratUpgrade.name],
              locale,
              this.setting,
              zigguratUpgrade.label,
              label2
            )
          ]
        )
      ]);
      this._bestUnicornBuilding = new SettingListItem(
        host,
        this.setting.bestUnicornBuilding,
        host.engine.i18n("option.faith.best.unicorn"),
        {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [
              host.engine.i18n("option.faith.best.unicorn")
            ]);
            for (const building of this._unicornBuildings.values()) {
              building.setting.enabled = true;
              building.setting.max = -1;
              building.setting.trigger = -1;
            }
            this.refreshUi();
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [
              host.engine.i18n("option.faith.best.unicorn")
            ]);
            this.refreshUi();
          },
          upgradeIndicator: true
        }
      );
      this.addChildren([
        new SettingsList(host, {
          children: [
            new HeaderListItem(host, host.engine.i18n("$religion.panel.ziggurat.label")),
            ...this._unicornBuildings.values(),
            this._bestUnicornBuilding,
            new Delimiter(host),
            ...host.game.religion.zigguratUpgrades.filter(
              (item) => !unicornsArray.includes(item.name) && !isNil(this.setting.buildings[item.name])
            ).map(
              (upgrade) => BuildSectionTools.getBuildOption(
                host,
                this.setting.buildings[upgrade.name],
                locale,
                this.setting,
                upgrade.label,
                label2
              )
            ),
            new Delimiter(host),
            new HeaderListItem(host, host.engine.i18n("$religion.panel.orderOfTheSun.label")),
            ...host.game.religion.religionUpgrades.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (upgrade) => {
                var _a;
                return BuildSectionTools.getBuildOption(
                  host,
                  this.setting.buildings[upgrade.name],
                  locale,
                  this.setting,
                  upgrade.label,
                  label2,
                  upgrade.name === ((_a = host.game.religion.religionUpgrades.at(-1)) == null ? void 0 : _a.name)
                );
              }
            ),
            new HeaderListItem(host, host.engine.i18n("$religion.panel.cryptotheology.label")),
            ...host.game.religion.transcendenceUpgrades.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (upgrade) => BuildSectionTools.getBuildOption(
                host,
                this.setting.buildings[upgrade.name],
                locale,
                this.setting,
                upgrade.label,
                label2
              )
            )
          ],
          onEnableAll: () => {
            this.refreshUi();
          },
          onDisableAll: () => {
            this.refreshUi();
          },
          onReset: () => {
            const defaults = new ReligionSettings();
            this.setting.load({
              buildings: defaults.buildings,
              bestUnicornBuilding: defaults.bestUnicornBuilding
            });
            this.refreshUi();
          }
        }),
        new SettingsList(host, {
          children: [
            new HeaderListItem(host, host.engine.i18n("ui.additional")),
            ...ReligionOptions.map((item) => {
              const label22 = host.engine.i18n(`option.faith.${item}`);
              if (item === "transcend") {
                return new SettingListItem(host, this.setting[item], label22, {
                  onCheck: () => {
                    host.engine.imessage("status.sub.enable", [label22]);
                  },
                  onUnCheck: () => {
                    host.engine.imessage("status.sub.disable", [label22]);
                  }
                });
              }
              const element = new SettingTriggerListItem(host, this.setting[item], locale, label22, {
                classes: [stylesButton.lastHeadAction],
                onCheck: () => {
                  host.engine.imessage("status.sub.enable", [label22]);
                },
                onUnCheck: () => {
                  host.engine.imessage("status.sub.disable", [label22]);
                },
                onRefresh: (element2) => {
                  element2.triggerButton.inactive = !this.setting[item].enabled || this.setting[item].trigger === -1;
                },
                onSetTrigger: () => {
                  Dialog.prompt(
                    host,
                    host.engine.i18n(
                      element.triggerButton.behavior === "integer" ? "ui.trigger.setinteger" : "ui.trigger.setpercentage",
                      [label22]
                    ),
                    host.engine.i18n("ui.trigger.build.prompt", [
                      label22,
                      element.triggerButton.behavior === "integer" ? host.renderAbsolute(this.setting[item].trigger, locale.selected) : host.renderPercentage(this.setting[item].trigger, locale.selected, true)
                    ]),
                    element.triggerButton.behavior === "integer" ? host.renderAbsolute(this.setting[item].trigger) : host.renderPercentage(this.setting[item].trigger),
                    host.engine.i18n(
                      element.triggerButton.behavior === "integer" ? "ui.trigger.setinteger.promptExplainer" : "ui.trigger.setpercentage.promptExplainer"
                    )
                  ).then((value) => {
                    if (value === void 0 || value === "" || value.startsWith("-")) {
                      return;
                    }
                    this.setting[item].trigger = (element.triggerButton.behavior === "integer" ? host.parseAbsolute(value) : host.parsePercentage(value)) ?? this.setting[item].trigger;
                  }).then(() => {
                    this.refreshUi();
                  }).catch(redirectErrorsToConsole(console));
                }
              });
              element.triggerButton.element.addClass(stylesButton.lastHeadAction);
              return element;
            })
          ],
          hasDisableAll: false,
          hasEnableAll: false
        })
      ]);
    }
    refreshUi() {
      for (const [buildingName, building] of this._unicornBuildings.entries()) {
        building.readOnly = this._bestUnicornBuilding.setting.enabled;
        building.maxButton.readOnly = this._bestUnicornBuilding.setting.enabled;
        building.triggerButton.readOnly = this._bestUnicornBuilding.setting.enabled;
        building.elementLabel.attr("data-ks-active-from", "❊");
        building.elementLabel.attr("data-ks-active-to", "✮");
        if (this.setting.bestUnicornBuilding.enabled && this.setting.bestUnicornBuildingCurrent === buildingName) {
          building.elementLabel.addClass(styles$3.active);
        } else {
          building.elementLabel.removeClass(styles$3.active);
        }
      }
      super.refreshUi();
    }
  }
  class ConsumeButton extends Button {
    constructor(host, setting2, locale, resourceName, options) {
      super(host, "", Icons.DataUsage, {
        ...options,
        onClick: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("resources.consume.prompt"),
            host.engine.i18n("resources.consume.promptTitle", [
              resourceName,
              host.renderPercentage(setting2.consume, locale.selected, true)
            ]),
            host.renderPercentage(setting2.consume),
            host.engine.i18n("resources.consume.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              return;
            }
            setting2.consume = host.parsePercentage(value);
          }).then(() => {
            this.refreshUi();
            if (options == null ? void 0 : options.onClick) {
              options.onClick(this);
            }
          }).catch(redirectErrorsToConsole(console));
        }
      });
      __publicField(this, "setting");
      __publicField(this, "resourceName");
      this.element.addClass(stylesButton.consumeButton);
      this.resourceName = resourceName;
      this.setting = setting2;
    }
    refreshUi() {
      super.refreshUi();
      const consumeValue = this._host.renderPercentage(
        this.setting.consume,
        this._host.engine.settings.locale.selected,
        true
      );
      const title = this.setting.consume === 0 ? this._host.engine.i18n("resources.consume.titleZero", [this.resourceName]) : this._host.engine.i18n("resources.consume.title", [consumeValue, this.resourceName]);
      this.updateTitle(title);
    }
  }
  class StockButton extends Button {
    constructor(host, setting2, locale, resourceName, options) {
      super(host, "", null, {
        ...options,
        onClick: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("resources.stock.prompt"),
            host.engine.i18n("resources.stock.promptTitle", [
              resourceName,
              host.renderAbsolute(setting2.stock, locale.selected)
            ]),
            host.renderAbsolute(setting2.stock),
            host.engine.i18n("resources.stock.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              setting2.stock = -1;
              return;
            }
            if (value === "0") {
              setting2.enabled = false;
            }
            setting2.stock = host.parseAbsolute(value) ?? setting2.stock;
          }).then(() => {
            this.refreshUi();
            if (options == null ? void 0 : options.onClick) {
              options.onClick(this);
            }
          }).catch(redirectErrorsToConsole(console));
        }
      });
      __publicField(this, "setting");
      __publicField(this, "resourceName");
      this.element.addClass(stylesButton.stockButton);
      this.resourceName = resourceName;
      this.setting = setting2;
    }
    refreshUi() {
      super.refreshUi();
      const stockValue = this._host.renderAbsolute(this.setting.stock);
      const title = this.setting.stock < 0 ? this._host.engine.i18n("resources.stock.titleInfinite", [this.resourceName]) : this.setting.stock === 0 ? this._host.engine.i18n("resources.stock.titleZero", [this.resourceName]) : this._host.engine.i18n("resources.stock.title", [
        this._host.renderAbsolute(this.setting.stock),
        this.resourceName
      ]);
      this.updateTitle(title);
      this.updateLabel(stockValue);
    }
  }
  class ResourcesSettingsUi extends SettingsPanel {
    constructor(host, settings, locale, options) {
      const label2 = host.engine.i18n("ui.resources");
      super(
        host,
        settings,
        new LabelListItem(host, label2, {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          classes: [stylesSettingListItem.checked, stylesSettingListItem.setting],
          icon: Icons.Resources
        }),
        options
      );
      const ignoredResources = [
        "blackcoin",
        "burnedParagon",
        "elderBox",
        "gflops",
        "hashrates",
        "kittens",
        "paragon",
        "temporalFlux",
        "wrappingPaper",
        "zebras"
      ];
      this.addChild(
        new SettingsList(host, {
          children: host.game.resPool.resources.filter(
            (item) => !ignoredResources.includes(item.name) && !isNil(this.setting.resources[item.name])
          ).sort((a, b) => a.title.localeCompare(b.title, locale.selected)).map(
            (resource) => [this.setting.resources[resource.name], ucfirst(resource.title)]
          ).map(([setting2, title]) => this._makeResourceSetting(host, setting2, locale, title))
        })
      );
    }
    _makeResourceSetting(host, option, locale, label2) {
      const element = new SettingListItem(host, option, label2, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        onCheck: () => {
          host.engine.imessage("status.resource.enable", [label2]);
        },
        onUnCheck: () => {
          host.engine.imessage("status.resource.disable", [label2]);
        }
      });
      const stockElement = new StockButton(host, option, locale, label2, {
        alignment: "right",
        border: false,
        classes: [stylesButton.headAction],
        onRefresh: () => {
          stockElement.inactive = !option.enabled || option.stock === 0;
        }
      });
      element.head.addChild(stockElement);
      const consumeElement = new ConsumeButton(host, option, locale, label2, {
        border: false,
        classes: [stylesButton.lastHeadAction],
        onRefresh: () => {
          consumeElement.inactive = !option.enabled || option.consume !== 100;
          consumeElement.ineffective = option.enabled && option.consume === 0;
        }
      });
      element.head.addChild(consumeElement);
      return element;
    }
  }
  class PolicySettingsUi extends SettingsPanel {
    constructor(host, settings, locale, sectionSetting, options) {
      const label2 = host.engine.i18n("ui.upgrade.policies");
      super(
        host,
        settings,
        new SettingListItem(host, settings, label2, {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          onCheck: () => {
            var _a;
            host.engine.imessage("status.auto.enable", [label2]);
            this.refreshUi();
            (_a = options == null ? void 0 : options.onCheck) == null ? void 0 : _a.call(options);
          },
          onUnCheck: () => {
            var _a;
            host.engine.imessage("status.auto.disable", [label2]);
            this.refreshUi();
            (_a = options == null ? void 0 : options.onUnCheck) == null ? void 0 : _a.call(options);
          },
          onRefresh: (_item) => {
            this.expando.ineffective = sectionSetting.enabled && settings.enabled && !Object.values(settings.policies).some((policy) => policy.enabled);
          }
        }),
        options
      );
      const policies = host.game.science.policies.filter(
        (policy) => !isNil(this.setting.policies[policy.name])
      );
      const items = [];
      let lastLabel = policies[0].label;
      for (const policy of policies.sort((a, b) => a.label.localeCompare(b.label, locale.selected))) {
        const option = this.setting.policies[policy.name];
        const element = new SettingListItem(host, option, policy.label, {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [policy.label]);
            this.refreshUi();
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [policy.label]);
            this.refreshUi();
          }
        });
        if (host.engine.localeSupportsFirstLetterSplits(locale.selected)) {
          if (lastLabel[0] !== policy.label[0]) {
            element.element.addClass(stylesLabelListItem.splitter);
          }
        }
        items.push(element);
        lastLabel = policy.label;
      }
      this.addChild(new SettingsList(host, { children: items }));
    }
  }
  class TechSettingsUi extends SettingsPanel {
    constructor(host, settings, locale, sectionSetting, options) {
      const label2 = host.engine.i18n("ui.upgrade.techs");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            var _a;
            host.engine.imessage("status.auto.enable", [label2]);
            this.refreshUi();
            (_a = options == null ? void 0 : options.onCheck) == null ? void 0 : _a.call(options);
          },
          onUnCheck: () => {
            var _a;
            host.engine.imessage("status.auto.disable", [label2]);
            this.refreshUi();
            (_a = options == null ? void 0 : options.onUnCheck) == null ? void 0 : _a.call(options);
          },
          onRefresh: (item) => {
            const element = item;
            element.triggerButton.inactive = !settings.enabled || settings.trigger === -1;
            element.triggerButton.ineffective = sectionSetting.enabled && settings.enabled && settings.trigger === -1 && !Object.values(settings.techs).some((tech) => tech.enabled && 0 <= tech.trigger);
            this.expando.ineffective = sectionSetting.enabled && settings.enabled && !Object.values(settings.techs).some((tech) => tech.enabled);
          },
          onRefreshTrigger: (item) => {
            item.triggerButton.element[0].title = host.engine.i18n("ui.trigger", [
              settings.trigger < 0 ? host.engine.i18n("ui.trigger.section.inactive") : host.renderPercentage(settings.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                settings.trigger !== -1 ? host.renderPercentage(settings.trigger, locale.selected, true) : host.engine.i18n("ui.infinity")
              ]),
              settings.trigger !== -1 ? host.renderPercentage(settings.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                settings.trigger = -1;
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        }),
        options
      );
      const techs = host.game.science.techs.filter((tech) => !isNil(this.setting.techs[tech.name]));
      const items = [];
      let lastLabel = techs[0].label;
      for (const tech of techs.sort((a, b) => a.label.localeCompare(b.label, locale.selected))) {
        const option = this.setting.techs[tech.name];
        const element = new SettingTriggerListItem(host, option, locale, tech.label, {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [tech.label]);
            this.refreshUi();
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [tech.label]);
            this.refreshUi();
          },
          onRefresh: () => {
            element.triggerButton.inactive = !option.enabled || option.trigger === -1;
            element.triggerButton.ineffective = sectionSetting.enabled && settings.enabled && option.enabled && settings.trigger === -1 && option.trigger === -1;
          },
          onRefreshTrigger: () => {
            element.triggerButton.element[0].title = host.engine.i18n("ui.trigger", [
              option.trigger < 0 ? settings.trigger < 0 ? host.engine.i18n("ui.trigger.section.blocked", [label2]) : `${host.renderPercentage(settings.trigger, locale.selected, true)} (${host.engine.i18n("ui.trigger.section.inherited")})` : host.renderPercentage(option.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                option.trigger !== -1 ? host.renderPercentage(option.trigger, locale.selected, true) : host.engine.i18n("ui.trigger.section.inherited")
              ]),
              option.trigger !== -1 ? host.renderPercentage(option.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                option.trigger = -1;
                return;
              }
              option.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        });
        element.triggerButton.element.addClass(stylesButton.lastHeadAction);
        if (host.engine.localeSupportsFirstLetterSplits(locale.selected)) {
          if (lastLabel[0] !== tech.label[0]) {
            element.element.addClass(stylesLabelListItem.splitter);
          }
        }
        items.push(element);
        lastLabel = tech.label;
      }
      this.addChild(new SettingsList(host, { children: items }));
    }
  }
  class ScienceSettingsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.upgrade");
      super(
        host,
        settings,
        new SettingListItem(host, settings, label2, {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
            this.refreshUi();
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
            this.refreshUi();
          },
          onRefresh: (_item) => {
            this.expando.ineffective = settings.enabled && !settings.policies.enabled && !settings.techs.enabled && !settings.observe.enabled;
          }
        })
      );
      __publicField(this, "_policiesUi");
      __publicField(this, "_techsUi");
      __publicField(this, "_observeStars");
      this._policiesUi = new PolicySettingsUi(host, settings.policies, locale, settings, {
        onCheck: () => {
          this.refreshUi();
        },
        onUnCheck: () => {
          this.refreshUi();
        }
      });
      this._techsUi = new TechSettingsUi(host, settings.techs, locale, settings, {
        onCheck: () => {
          this.refreshUi();
        },
        onUnCheck: () => {
          this.refreshUi();
        }
      });
      this._observeStars = new SettingListItem(
        host,
        this.setting.observe,
        host.engine.i18n("option.observe"),
        {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [host.engine.i18n("option.observe")]);
            this.refreshUi();
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [host.engine.i18n("option.observe")]);
            this.refreshUi();
          }
        }
      );
      const itemsList2 = new SettingsList(host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      itemsList2.addChildren([this._techsUi, this._policiesUi, this._observeStars]);
      this.addChild(itemsList2);
    }
    refreshUi() {
      super.refreshUi();
      if (this.setting.observe.enabled) {
        $("#observeButton").hide();
      } else {
        $("#observeButton").show();
      }
    }
  }
  class MissionSettingsUi extends SettingsPanel {
    constructor(host, settings, options) {
      const label2 = host.engine.i18n("ui.upgrade.missions");
      super(
        host,
        settings,
        new SettingListItem(host, settings, label2, {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          }
        }),
        options
      );
      __publicField(this, "_missions");
      this._missions = host.game.space.programs.filter((item) => !isNil(this.setting.missions[item.name])).map(
        (mission) => new SettingListItem(host, this.setting.missions[mission.name], mission.label, {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [mission.label]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [mission.label]);
          }
        })
      );
      const itemsList2 = new SettingsList(host, { children: this._missions });
      this.addChild(itemsList2);
    }
  }
  class SpaceSettingsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.space");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          },
          onRefresh: (item) => {
            item.triggerButton.inactive = !settings.enabled || settings.trigger === -1;
          },
          onRefreshTrigger: (item) => {
            item.triggerButton.element[0].title = host.engine.i18n("ui.trigger.section", [
              settings.trigger < 0 ? host.engine.i18n("ui.trigger.section.inactive") : host.renderPercentage(settings.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                settings.trigger !== -1 ? host.renderPercentage(settings.trigger, locale.selected, true) : host.engine.i18n("ui.infinity")
              ]),
              settings.trigger !== -1 ? host.renderPercentage(settings.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                settings.trigger = -1;
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        })
      );
      __publicField(this, "_missionsUi");
      this.addChild(
        new SettingsList(host, {
          children: host.game.space.planets.filter((planet) => 0 < planet.buildings.length).flatMap((planet, indexPlanet, arrayPlant) => [
            new HeaderListItem(host, host.engine.labelForPlanet(planet.name)),
            ...planet.buildings.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (building, indexBuilding, arrayBuilding) => BuildSectionTools.getBuildOption(
                host,
                this.setting.buildings[building.name],
                locale,
                this.setting,
                building.label,
                label2,
                indexPlanet < arrayPlant.length - 1 && indexBuilding === arrayBuilding.length - 1
              )
            )
          ]),
          onReset: () => {
            this.setting.load({ buildings: new SpaceSettings().buildings });
            this.refreshUi();
          }
        })
      );
      const listAddition = new SettingsList(host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      listAddition.addChild(new HeaderListItem(host, host.engine.i18n("ui.additional")));
      this._missionsUi = new MissionSettingsUi(host, this.setting.unlockMissions);
      listAddition.addChild(this._missionsUi);
      this.addChild(listAddition);
    }
  }
  const minutesInMonth = 43200;
  const minutesInDay = 1440;
  const constructFromSymbol = Symbol.for("constructDateFrom");
  function constructFrom(date, value) {
    if (typeof date === "function") return date(value);
    if (date && typeof date === "object" && constructFromSymbol in date)
      return date[constructFromSymbol](value);
    if (date instanceof Date) return new date.constructor(value);
    return new Date(value);
  }
  function constructNow(date) {
    return constructFrom(date, Date.now());
  }
  const formatDistanceLocale$3 = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  const formatDistance$4 = (token, count, options) => {
    let result;
    const tokenValue = formatDistanceLocale$3[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options == null ? void 0 : options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  };
  function buildFormatLongFn(args) {
    return (options = {}) => {
      const width = options.width ? String(options.width) : args.defaultWidth;
      const format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }
  const dateFormats$3 = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  const timeFormats$3 = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  const dateTimeFormats$3 = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  const formatLong$3 = {
    date: buildFormatLongFn({
      formats: dateFormats$3,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats$3,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats$3,
      defaultWidth: "full"
    })
  };
  const formatRelativeLocale$3 = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  const formatRelative$3 = (token, _date, _baseDate, _options2) => formatRelativeLocale$3[token];
  function buildLocalizeFn(args) {
    return (value, options) => {
      const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
      let valuesArray;
      if (context === "formatting" && args.formattingValues) {
        const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        const defaultWidth = args.defaultWidth;
        const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[width] || args.values[defaultWidth];
      }
      const index = args.argumentCallback ? args.argumentCallback(value) : value;
      return valuesArray[index];
    };
  }
  const eraValues$3 = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  const quarterValues$3 = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  const monthValues$3 = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  };
  const dayValues$3 = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  };
  const dayPeriodValues$3 = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  const formattingDayPeriodValues$3 = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  const ordinalNumber$3 = (dirtyNumber, _options2) => {
    const number = Number(dirtyNumber);
    const rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    }
    return number + "th";
  };
  const localize$3 = {
    ordinalNumber: ordinalNumber$3,
    era: buildLocalizeFn({
      values: eraValues$3,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues$3,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues$3,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues$3,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues$3,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues$3,
      defaultFormattingWidth: "wide"
    })
  };
  function buildMatchFn(args) {
    return (string, options = {}) => {
      const width = options.width;
      const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      const matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      const matchedString = matchResult[0];
      const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : findKey(parsePatterns, (pattern) => pattern.test(matchedString));
      let value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? options.valueCallback(value) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  function findKey(object, predicate) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (let key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }
  function buildMatchPatternFn(args) {
    return (string, options = {}) => {
      const matchResult = string.match(args.matchPattern);
      if (!matchResult) return null;
      const matchedString = matchResult[0];
      const parseResult = string.match(args.parsePattern);
      if (!parseResult) return null;
      let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  const matchOrdinalNumberPattern$3 = /^(\d+)(th|st|nd|rd)?/i;
  const parseOrdinalNumberPattern$3 = /\d+/i;
  const matchEraPatterns$3 = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  const parseEraPatterns$3 = {
    any: [/^b/i, /^(a|c)/i]
  };
  const matchQuarterPatterns$3 = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  const parseQuarterPatterns$3 = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  const matchMonthPatterns$3 = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  const parseMonthPatterns$3 = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
  };
  const matchDayPatterns$3 = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  const parseDayPatterns$3 = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  const matchDayPeriodPatterns$3 = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  const parseDayPeriodPatterns$3 = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  const match$3 = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern$3,
      parsePattern: parseOrdinalNumberPattern$3,
      valueCallback: (value) => parseInt(value, 10)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns$3,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns$3,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns$3,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns$3,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns$3,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns$3,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns$3,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns$3,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns$3,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns$3,
      defaultParseWidth: "any"
    })
  };
  const enUS = {
    code: "en-US",
    formatDistance: formatDistance$4,
    formatLong: formatLong$3,
    formatRelative: formatRelative$3,
    localize: localize$3,
    match: match$3,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  let defaultOptions = {};
  function getDefaultOptions() {
    return defaultOptions;
  }
  function toDate(argument, context) {
    return constructFrom(context || argument, argument);
  }
  function getTimezoneOffsetInMilliseconds(date) {
    const _date = toDate(date);
    const utcDate = new Date(
      Date.UTC(
        _date.getFullYear(),
        _date.getMonth(),
        _date.getDate(),
        _date.getHours(),
        _date.getMinutes(),
        _date.getSeconds(),
        _date.getMilliseconds()
      )
    );
    utcDate.setUTCFullYear(_date.getFullYear());
    return +date - +utcDate;
  }
  function normalizeDates(context, ...dates) {
    const normalize = constructFrom.bind(
      null,
      context || dates.find((date) => typeof date === "object")
    );
    return dates.map(normalize);
  }
  function compareAsc(dateLeft, dateRight) {
    const diff = +toDate(dateLeft) - +toDate(dateRight);
    if (diff < 0) return -1;
    else if (diff > 0) return 1;
    return diff;
  }
  function differenceInCalendarMonths(laterDate, earlierDate, options) {
    const [laterDate_, earlierDate_] = normalizeDates(
      options == null ? void 0 : options.in,
      laterDate,
      earlierDate
    );
    const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
    const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
    return yearsDiff * 12 + monthsDiff;
  }
  function endOfDay(date, options) {
    const _date = toDate(date, options == null ? void 0 : options.in);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  function endOfMonth(date, options) {
    const _date = toDate(date, options == null ? void 0 : options.in);
    const month = _date.getMonth();
    _date.setFullYear(_date.getFullYear(), month + 1, 0);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  function isLastDayOfMonth(date, options) {
    const _date = toDate(date, options == null ? void 0 : options.in);
    return +endOfDay(_date, options) === +endOfMonth(_date, options);
  }
  function differenceInMonths(laterDate, earlierDate, options) {
    const [laterDate_, workingLaterDate, earlierDate_] = normalizeDates(
      options == null ? void 0 : options.in,
      laterDate,
      laterDate,
      earlierDate
    );
    const sign = compareAsc(workingLaterDate, earlierDate_);
    const difference2 = Math.abs(
      differenceInCalendarMonths(workingLaterDate, earlierDate_)
    );
    if (difference2 < 1) return 0;
    if (workingLaterDate.getMonth() === 1 && workingLaterDate.getDate() > 27)
      workingLaterDate.setDate(30);
    workingLaterDate.setMonth(workingLaterDate.getMonth() - sign * difference2);
    let isLastMonthNotFull = compareAsc(workingLaterDate, earlierDate_) === -sign;
    if (isLastDayOfMonth(laterDate_) && difference2 === 1 && compareAsc(laterDate_, earlierDate_) === 1) {
      isLastMonthNotFull = false;
    }
    const result = sign * (difference2 - +isLastMonthNotFull);
    return result === 0 ? 0 : result;
  }
  function getRoundingMethod(method) {
    return (number) => {
      const round = method ? Math[method] : Math.trunc;
      const result = round(number);
      return result === 0 ? 0 : result;
    };
  }
  function differenceInMilliseconds(laterDate, earlierDate) {
    return +toDate(laterDate) - +toDate(earlierDate);
  }
  function differenceInSeconds(laterDate, earlierDate, options) {
    const diff = differenceInMilliseconds(laterDate, earlierDate) / 1e3;
    return getRoundingMethod(options == null ? void 0 : options.roundingMethod)(diff);
  }
  function formatDistance$3(laterDate, earlierDate, options) {
    const defaultOptions2 = getDefaultOptions();
    const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
    const minutesInAlmostTwoDays = 2520;
    const comparison = compareAsc(laterDate, earlierDate);
    if (isNaN(comparison)) throw new RangeError("Invalid time value");
    const localizeOptions = Object.assign({}, options, {
      addSuffix: options == null ? void 0 : options.addSuffix,
      comparison
    });
    const [laterDate_, earlierDate_] = normalizeDates(
      options == null ? void 0 : options.in,
      ...comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate]
    );
    const seconds = differenceInSeconds(earlierDate_, laterDate_);
    const offsetInSeconds = (getTimezoneOffsetInMilliseconds(earlierDate_) - getTimezoneOffsetInMilliseconds(laterDate_)) / 1e3;
    const minutes = Math.round((seconds - offsetInSeconds) / 60);
    let months;
    if (minutes < 2) {
      if (options == null ? void 0 : options.includeSeconds) {
        if (seconds < 5) {
          return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
        } else if (seconds < 10) {
          return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
        } else if (seconds < 20) {
          return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
        } else if (seconds < 40) {
          return locale.formatDistance("halfAMinute", 0, localizeOptions);
        } else if (seconds < 60) {
          return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
        } else {
          return locale.formatDistance("xMinutes", 1, localizeOptions);
        }
      } else {
        if (minutes === 0) {
          return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
        } else {
          return locale.formatDistance("xMinutes", minutes, localizeOptions);
        }
      }
    } else if (minutes < 45) {
      return locale.formatDistance("xMinutes", minutes, localizeOptions);
    } else if (minutes < 90) {
      return locale.formatDistance("aboutXHours", 1, localizeOptions);
    } else if (minutes < minutesInDay) {
      const hours = Math.round(minutes / 60);
      return locale.formatDistance("aboutXHours", hours, localizeOptions);
    } else if (minutes < minutesInAlmostTwoDays) {
      return locale.formatDistance("xDays", 1, localizeOptions);
    } else if (minutes < minutesInMonth) {
      const days = Math.round(minutes / minutesInDay);
      return locale.formatDistance("xDays", days, localizeOptions);
    } else if (minutes < minutesInMonth * 2) {
      months = Math.round(minutes / minutesInMonth);
      return locale.formatDistance("aboutXMonths", months, localizeOptions);
    }
    months = differenceInMonths(earlierDate_, laterDate_);
    if (months < 12) {
      const nearestMonth = Math.round(minutes / minutesInMonth);
      return locale.formatDistance("xMonths", nearestMonth, localizeOptions);
    } else {
      const monthsSinceStartOfYear = months % 12;
      const years = Math.trunc(months / 12);
      if (monthsSinceStartOfYear < 3) {
        return locale.formatDistance("aboutXYears", years, localizeOptions);
      } else if (monthsSinceStartOfYear < 9) {
        return locale.formatDistance("overXYears", years, localizeOptions);
      } else {
        return locale.formatDistance("almostXYears", years + 1, localizeOptions);
      }
    }
  }
  function formatDistanceToNow(date, options) {
    return formatDistance$3(date, constructNow(date), options);
  }
  function startOfWeek(date, options) {
    var _a, _b, _c, _d;
    const defaultOptions2 = getDefaultOptions();
    const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
    const _date = toDate(date, options == null ? void 0 : options.in);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    _date.setDate(_date.getDate() - diff);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  function isSameWeek(laterDate, earlierDate, options) {
    const [laterDate_, earlierDate_] = normalizeDates(
      options == null ? void 0 : options.in,
      laterDate,
      earlierDate
    );
    return +startOfWeek(laterDate_, options) === +startOfWeek(earlierDate_, options);
  }
  const formatDistanceLocale$2 = {
    lessThanXSeconds: {
      standalone: {
        one: "weniger als 1 Sekunde",
        other: "weniger als {{count}} Sekunden"
      },
      withPreposition: {
        one: "weniger als 1 Sekunde",
        other: "weniger als {{count}} Sekunden"
      }
    },
    xSeconds: {
      standalone: {
        one: "1 Sekunde",
        other: "{{count}} Sekunden"
      },
      withPreposition: {
        one: "1 Sekunde",
        other: "{{count}} Sekunden"
      }
    },
    halfAMinute: {
      standalone: "eine halbe Minute",
      withPreposition: "einer halben Minute"
    },
    lessThanXMinutes: {
      standalone: {
        one: "weniger als 1 Minute",
        other: "weniger als {{count}} Minuten"
      },
      withPreposition: {
        one: "weniger als 1 Minute",
        other: "weniger als {{count}} Minuten"
      }
    },
    xMinutes: {
      standalone: {
        one: "1 Minute",
        other: "{{count}} Minuten"
      },
      withPreposition: {
        one: "1 Minute",
        other: "{{count}} Minuten"
      }
    },
    aboutXHours: {
      standalone: {
        one: "etwa 1 Stunde",
        other: "etwa {{count}} Stunden"
      },
      withPreposition: {
        one: "etwa 1 Stunde",
        other: "etwa {{count}} Stunden"
      }
    },
    xHours: {
      standalone: {
        one: "1 Stunde",
        other: "{{count}} Stunden"
      },
      withPreposition: {
        one: "1 Stunde",
        other: "{{count}} Stunden"
      }
    },
    xDays: {
      standalone: {
        one: "1 Tag",
        other: "{{count}} Tage"
      },
      withPreposition: {
        one: "1 Tag",
        other: "{{count}} Tagen"
      }
    },
    aboutXWeeks: {
      standalone: {
        one: "etwa 1 Woche",
        other: "etwa {{count}} Wochen"
      },
      withPreposition: {
        one: "etwa 1 Woche",
        other: "etwa {{count}} Wochen"
      }
    },
    xWeeks: {
      standalone: {
        one: "1 Woche",
        other: "{{count}} Wochen"
      },
      withPreposition: {
        one: "1 Woche",
        other: "{{count}} Wochen"
      }
    },
    aboutXMonths: {
      standalone: {
        one: "etwa 1 Monat",
        other: "etwa {{count}} Monate"
      },
      withPreposition: {
        one: "etwa 1 Monat",
        other: "etwa {{count}} Monaten"
      }
    },
    xMonths: {
      standalone: {
        one: "1 Monat",
        other: "{{count}} Monate"
      },
      withPreposition: {
        one: "1 Monat",
        other: "{{count}} Monaten"
      }
    },
    aboutXYears: {
      standalone: {
        one: "etwa 1 Jahr",
        other: "etwa {{count}} Jahre"
      },
      withPreposition: {
        one: "etwa 1 Jahr",
        other: "etwa {{count}} Jahren"
      }
    },
    xYears: {
      standalone: {
        one: "1 Jahr",
        other: "{{count}} Jahre"
      },
      withPreposition: {
        one: "1 Jahr",
        other: "{{count}} Jahren"
      }
    },
    overXYears: {
      standalone: {
        one: "mehr als 1 Jahr",
        other: "mehr als {{count}} Jahre"
      },
      withPreposition: {
        one: "mehr als 1 Jahr",
        other: "mehr als {{count}} Jahren"
      }
    },
    almostXYears: {
      standalone: {
        one: "fast 1 Jahr",
        other: "fast {{count}} Jahre"
      },
      withPreposition: {
        one: "fast 1 Jahr",
        other: "fast {{count}} Jahren"
      }
    }
  };
  const formatDistance$2 = (token, count, options) => {
    let result;
    const tokenValue = (options == null ? void 0 : options.addSuffix) ? formatDistanceLocale$2[token].withPreposition : formatDistanceLocale$2[token].standalone;
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", String(count));
    }
    if (options == null ? void 0 : options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return "vor " + result;
      }
    }
    return result;
  };
  const dateFormats$2 = {
    full: "EEEE, do MMMM y",
    long: "do MMMM y",
    medium: "do MMM y",
    short: "dd.MM.y"
  };
  const timeFormats$2 = {
    full: "HH:mm:ss zzzz",
    long: "HH:mm:ss z",
    medium: "HH:mm:ss",
    short: "HH:mm"
  };
  const dateTimeFormats$2 = {
    full: "{{date}} 'um' {{time}}",
    long: "{{date}} 'um' {{time}}",
    medium: "{{date}} {{time}}",
    short: "{{date}} {{time}}"
  };
  const formatLong$2 = {
    date: buildFormatLongFn({
      formats: dateFormats$2,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats$2,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats$2,
      defaultWidth: "full"
    })
  };
  const formatRelativeLocale$2 = {
    lastWeek: "'letzten' eeee 'um' p",
    yesterday: "'gestern um' p",
    today: "'heute um' p",
    tomorrow: "'morgen um' p",
    nextWeek: "eeee 'um' p",
    other: "P"
  };
  const formatRelative$2 = (token, _date, _baseDate, _options2) => formatRelativeLocale$2[token];
  const eraValues$2 = {
    narrow: ["v.Chr.", "n.Chr."],
    abbreviated: ["v.Chr.", "n.Chr."],
    wide: ["vor Christus", "nach Christus"]
  };
  const quarterValues$2 = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
  };
  const monthValues$2 = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez"
    ],
    wide: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember"
    ]
  };
  const formattingMonthValues = {
    narrow: monthValues$2.narrow,
    abbreviated: [
      "Jan.",
      "Feb.",
      "März",
      "Apr.",
      "Mai",
      "Juni",
      "Juli",
      "Aug.",
      "Sep.",
      "Okt.",
      "Nov.",
      "Dez."
    ],
    wide: monthValues$2.wide
  };
  const dayValues$2 = {
    narrow: ["S", "M", "D", "M", "D", "F", "S"],
    short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
    wide: [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag"
    ]
  };
  const dayPeriodValues$2 = {
    narrow: {
      am: "vm.",
      pm: "nm.",
      midnight: "Mitternacht",
      noon: "Mittag",
      morning: "Morgen",
      afternoon: "Nachm.",
      evening: "Abend",
      night: "Nacht"
    },
    abbreviated: {
      am: "vorm.",
      pm: "nachm.",
      midnight: "Mitternacht",
      noon: "Mittag",
      morning: "Morgen",
      afternoon: "Nachmittag",
      evening: "Abend",
      night: "Nacht"
    },
    wide: {
      am: "vormittags",
      pm: "nachmittags",
      midnight: "Mitternacht",
      noon: "Mittag",
      morning: "Morgen",
      afternoon: "Nachmittag",
      evening: "Abend",
      night: "Nacht"
    }
  };
  const formattingDayPeriodValues$2 = {
    narrow: {
      am: "vm.",
      pm: "nm.",
      midnight: "Mitternacht",
      noon: "Mittag",
      morning: "morgens",
      afternoon: "nachm.",
      evening: "abends",
      night: "nachts"
    },
    abbreviated: {
      am: "vorm.",
      pm: "nachm.",
      midnight: "Mitternacht",
      noon: "Mittag",
      morning: "morgens",
      afternoon: "nachmittags",
      evening: "abends",
      night: "nachts"
    },
    wide: {
      am: "vormittags",
      pm: "nachmittags",
      midnight: "Mitternacht",
      noon: "Mittag",
      morning: "morgens",
      afternoon: "nachmittags",
      evening: "abends",
      night: "nachts"
    }
  };
  const ordinalNumber$2 = (dirtyNumber) => {
    const number = Number(dirtyNumber);
    return number + ".";
  };
  const localize$2 = {
    ordinalNumber: ordinalNumber$2,
    era: buildLocalizeFn({
      values: eraValues$2,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues$2,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues$2,
      formattingValues: formattingMonthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues$2,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues$2,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues$2,
      defaultFormattingWidth: "wide"
    })
  };
  const matchOrdinalNumberPattern$2 = /^(\d+)(\.)?/i;
  const parseOrdinalNumberPattern$2 = /\d+/i;
  const matchEraPatterns$2 = {
    narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
    abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
    wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
  };
  const parseEraPatterns$2 = {
    any: [/^v/i, /^n/i]
  };
  const matchQuarterPatterns$2 = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](\.)? Quartal/i
  };
  const parseQuarterPatterns$2 = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  const matchMonthPatterns$2 = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
    wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
  };
  const parseMonthPatterns$2 = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^j[aä]/i,
      /^f/i,
      /^mär/i,
      /^ap/i,
      /^mai/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
  };
  const matchDayPatterns$2 = {
    narrow: /^[smdmf]/i,
    short: /^(so|mo|di|mi|do|fr|sa)/i,
    abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
    wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
  };
  const parseDayPatterns$2 = {
    any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
  };
  const matchDayPeriodPatterns$2 = {
    narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
    abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
    wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
  };
  const parseDayPeriodPatterns$2 = {
    any: {
      am: /^v/i,
      pm: /^n/i,
      midnight: /^Mitte/i,
      noon: /^Mitta/i,
      morning: /morgens/i,
      afternoon: /nachmittags/i,
      evening: /abends/i,
      night: /nachts/i
    }
  };
  const match$2 = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern$2,
      parsePattern: parseOrdinalNumberPattern$2,
      valueCallback: (value) => parseInt(value)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns$2,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns$2,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns$2,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns$2,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns$2,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns$2,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns$2,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns$2,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns$2,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPeriodPatterns$2,
      defaultParseWidth: "any"
    })
  };
  const de = {
    code: "de",
    formatDistance: formatDistance$2,
    formatLong: formatLong$2,
    formatRelative: formatRelative$2,
    localize: localize$2,
    match: match$2,
    options: {
      weekStartsOn: 1,
      firstWeekContainsDate: 4
    }
  };
  const formatDistanceLocale$1 = {
    lessThanXSeconds: {
      one: "פחות משנייה",
      two: "פחות משתי שניות",
      other: "פחות מ־{{count}} שניות"
    },
    xSeconds: {
      one: "שנייה",
      two: "שתי שניות",
      other: "{{count}} שניות"
    },
    halfAMinute: "חצי דקה",
    lessThanXMinutes: {
      one: "פחות מדקה",
      two: "פחות משתי דקות",
      other: "פחות מ־{{count}} דקות"
    },
    xMinutes: {
      one: "דקה",
      two: "שתי דקות",
      other: "{{count}} דקות"
    },
    aboutXHours: {
      one: "כשעה",
      two: "כשעתיים",
      other: "כ־{{count}} שעות"
    },
    xHours: {
      one: "שעה",
      two: "שעתיים",
      other: "{{count}} שעות"
    },
    xDays: {
      one: "יום",
      two: "יומיים",
      other: "{{count}} ימים"
    },
    aboutXWeeks: {
      one: "כשבוע",
      two: "כשבועיים",
      other: "כ־{{count}} שבועות"
    },
    xWeeks: {
      one: "שבוע",
      two: "שבועיים",
      other: "{{count}} שבועות"
    },
    aboutXMonths: {
      one: "כחודש",
      two: "כחודשיים",
      other: "כ־{{count}} חודשים"
    },
    xMonths: {
      one: "חודש",
      two: "חודשיים",
      other: "{{count}} חודשים"
    },
    aboutXYears: {
      one: "כשנה",
      two: "כשנתיים",
      other: "כ־{{count}} שנים"
    },
    xYears: {
      one: "שנה",
      two: "שנתיים",
      other: "{{count}} שנים"
    },
    overXYears: {
      one: "יותר משנה",
      two: "יותר משנתיים",
      other: "יותר מ־{{count}} שנים"
    },
    almostXYears: {
      one: "כמעט שנה",
      two: "כמעט שנתיים",
      other: "כמעט {{count}} שנים"
    }
  };
  const formatDistance$1 = (token, count, options) => {
    if (token === "xDays" && (options == null ? void 0 : options.addSuffix) && count <= 2) {
      if (options.comparison && options.comparison > 0) {
        return count === 1 ? "מחר" : "מחרתיים";
      }
      return count === 1 ? "אתמול" : "שלשום";
    }
    let result;
    const tokenValue = formatDistanceLocale$1[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else if (count === 2) {
      result = tokenValue.two;
    } else {
      result = tokenValue.other.replace("{{count}}", String(count));
    }
    if (options == null ? void 0 : options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "בעוד " + result;
      } else {
        return "לפני " + result;
      }
    }
    return result;
  };
  const dateFormats$1 = {
    full: "EEEE, d בMMMM y",
    long: "d בMMMM y",
    medium: "d בMMM y",
    short: "d.M.y"
  };
  const timeFormats$1 = {
    full: "H:mm:ss zzzz",
    long: "H:mm:ss z",
    medium: "H:mm:ss",
    short: "H:mm"
  };
  const dateTimeFormats$1 = {
    full: "{{date}} 'בשעה' {{time}}",
    long: "{{date}} 'בשעה' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  const formatLong$1 = {
    date: buildFormatLongFn({
      formats: dateFormats$1,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats$1,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats$1,
      defaultWidth: "full"
    })
  };
  const formatRelativeLocale$1 = {
    lastWeek: "eeee 'שעבר בשעה' p",
    yesterday: "'אתמול בשעה' p",
    today: "'היום בשעה' p",
    tomorrow: "'מחר בשעה' p",
    nextWeek: "eeee 'בשעה' p",
    other: "P"
  };
  const formatRelative$1 = (token, _date, _baseDate, _options2) => formatRelativeLocale$1[token];
  const eraValues$1 = {
    narrow: ["לפנה״ס", "לספירה"],
    abbreviated: ["לפנה״ס", "לספירה"],
    wide: ["לפני הספירה", "לספירה"]
  };
  const quarterValues$1 = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["רבעון 1", "רבעון 2", "רבעון 3", "רבעון 4"]
  };
  const monthValues$1 = {
    narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    abbreviated: [
      "ינו׳",
      "פבר׳",
      "מרץ",
      "אפר׳",
      "מאי",
      "יוני",
      "יולי",
      "אוג׳",
      "ספט׳",
      "אוק׳",
      "נוב׳",
      "דצמ׳"
    ],
    wide: [
      "ינואר",
      "פברואר",
      "מרץ",
      "אפריל",
      "מאי",
      "יוני",
      "יולי",
      "אוגוסט",
      "ספטמבר",
      "אוקטובר",
      "נובמבר",
      "דצמבר"
    ]
  };
  const dayValues$1 = {
    narrow: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
    short: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
    abbreviated: [
      "יום א׳",
      "יום ב׳",
      "יום ג׳",
      "יום ד׳",
      "יום ה׳",
      "יום ו׳",
      "שבת"
    ],
    wide: [
      "יום ראשון",
      "יום שני",
      "יום שלישי",
      "יום רביעי",
      "יום חמישי",
      "יום שישי",
      "יום שבת"
    ]
  };
  const dayPeriodValues$1 = {
    narrow: {
      am: "לפנה״צ",
      pm: "אחה״צ",
      midnight: "חצות",
      noon: "צהריים",
      morning: "בוקר",
      afternoon: "אחר הצהריים",
      evening: "ערב",
      night: "לילה"
    },
    abbreviated: {
      am: "לפנה״צ",
      pm: "אחה״צ",
      midnight: "חצות",
      noon: "צהריים",
      morning: "בוקר",
      afternoon: "אחר הצהריים",
      evening: "ערב",
      night: "לילה"
    },
    wide: {
      am: "לפנה״צ",
      pm: "אחה״צ",
      midnight: "חצות",
      noon: "צהריים",
      morning: "בוקר",
      afternoon: "אחר הצהריים",
      evening: "ערב",
      night: "לילה"
    }
  };
  const formattingDayPeriodValues$1 = {
    narrow: {
      am: "לפנה״צ",
      pm: "אחה״צ",
      midnight: "חצות",
      noon: "צהריים",
      morning: "בבוקר",
      afternoon: "בצהריים",
      evening: "בערב",
      night: "בלילה"
    },
    abbreviated: {
      am: "לפנה״צ",
      pm: "אחה״צ",
      midnight: "חצות",
      noon: "צהריים",
      morning: "בבוקר",
      afternoon: "אחר הצהריים",
      evening: "בערב",
      night: "בלילה"
    },
    wide: {
      am: "לפנה״צ",
      pm: "אחה״צ",
      midnight: "חצות",
      noon: "צהריים",
      morning: "בבוקר",
      afternoon: "אחר הצהריים",
      evening: "בערב",
      night: "בלילה"
    }
  };
  const ordinalNumber$1 = (dirtyNumber, options) => {
    const number = Number(dirtyNumber);
    if (number <= 0 || number > 10) return String(number);
    const unit = String(options == null ? void 0 : options.unit);
    const isFemale = ["year", "hour", "minute", "second"].indexOf(unit) >= 0;
    const male = [
      "ראשון",
      "שני",
      "שלישי",
      "רביעי",
      "חמישי",
      "שישי",
      "שביעי",
      "שמיני",
      "תשיעי",
      "עשירי"
    ];
    const female = [
      "ראשונה",
      "שנייה",
      "שלישית",
      "רביעית",
      "חמישית",
      "שישית",
      "שביעית",
      "שמינית",
      "תשיעית",
      "עשירית"
    ];
    const index = number - 1;
    return isFemale ? female[index] : male[index];
  };
  const localize$1 = {
    ordinalNumber: ordinalNumber$1,
    era: buildLocalizeFn({
      values: eraValues$1,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues$1,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues$1,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues$1,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues$1,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues$1,
      defaultFormattingWidth: "wide"
    })
  };
  const matchOrdinalNumberPattern$1 = /^(\d+|(ראשון|שני|שלישי|רביעי|חמישי|שישי|שביעי|שמיני|תשיעי|עשירי|ראשונה|שנייה|שלישית|רביעית|חמישית|שישית|שביעית|שמינית|תשיעית|עשירית))/i;
  const parseOrdinalNumberPattern$1 = /^(\d+|רא|שנ|של|רב|ח|שי|שב|שמ|ת|ע)/i;
  const matchEraPatterns$1 = {
    narrow: /^ל(ספירה|פנה״ס)/i,
    abbreviated: /^ל(ספירה|פנה״ס)/i,
    wide: /^ל(פני ה)?ספירה/i
  };
  const parseEraPatterns$1 = {
    any: [/^לפ/i, /^לס/i]
  };
  const matchQuarterPatterns$1 = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^רבעון [1234]/i
  };
  const parseQuarterPatterns$1 = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  const matchMonthPatterns$1 = {
    narrow: /^\d+/i,
    abbreviated: /^(ינו|פבר|מרץ|אפר|מאי|יוני|יולי|אוג|ספט|אוק|נוב|דצמ)׳?/i,
    wide: /^(ינואר|פברואר|מרץ|אפריל|מאי|יוני|יולי|אוגוסט|ספטמבר|אוקטובר|נובמבר|דצמבר)/i
  };
  const parseMonthPatterns$1 = {
    narrow: [
      /^1$/i,
      /^2/i,
      /^3/i,
      /^4/i,
      /^5/i,
      /^6/i,
      /^7/i,
      /^8/i,
      /^9/i,
      /^10/i,
      /^11/i,
      /^12/i
    ],
    any: [
      /^ינ/i,
      /^פ/i,
      /^מר/i,
      /^אפ/i,
      /^מא/i,
      /^יונ/i,
      /^יול/i,
      /^אוג/i,
      /^ס/i,
      /^אוק/i,
      /^נ/i,
      /^ד/i
    ]
  };
  const matchDayPatterns$1 = {
    narrow: /^[אבגדהוש]׳/i,
    short: /^[אבגדהוש]׳/i,
    abbreviated: /^(שבת|יום (א|ב|ג|ד|ה|ו)׳)/i,
    wide: /^יום (ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)/i
  };
  const parseDayPatterns$1 = {
    abbreviated: [/א׳$/i, /ב׳$/i, /ג׳$/i, /ד׳$/i, /ה׳$/i, /ו׳$/i, /^ש/i],
    wide: [/ן$/i, /ני$/i, /לישי$/i, /עי$/i, /מישי$/i, /שישי$/i, /ת$/i],
    any: [/^א/i, /^ב/i, /^ג/i, /^ד/i, /^ה/i, /^ו/i, /^ש/i]
  };
  const matchDayPeriodPatterns$1 = {
    any: /^(אחר ה|ב)?(חצות|צהריים|בוקר|ערב|לילה|אחה״צ|לפנה״צ)/i
  };
  const parseDayPeriodPatterns$1 = {
    any: {
      am: /^לפ/i,
      pm: /^אחה/i,
      midnight: /^ח/i,
      noon: /^צ/i,
      morning: /בוקר/i,
      afternoon: /בצ|אחר/i,
      evening: /ערב/i,
      night: /לילה/i
    }
  };
  const ordinalName = ["רא", "שנ", "של", "רב", "ח", "שי", "שב", "שמ", "ת", "ע"];
  const match$1 = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern$1,
      parsePattern: parseOrdinalNumberPattern$1,
      valueCallback: (value) => {
        const number = parseInt(value, 10);
        return isNaN(number) ? ordinalName.indexOf(value) + 1 : number;
      }
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns$1,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns$1,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns$1,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns$1,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns$1,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns$1,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns$1,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns$1,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns$1,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns$1,
      defaultParseWidth: "any"
    })
  };
  const he = {
    code: "he",
    formatDistance: formatDistance$1,
    formatLong: formatLong$1,
    formatRelative: formatRelative$1,
    localize: localize$1,
    match: match$1,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  const formatDistanceLocale = {
    lessThanXSeconds: {
      one: "不到 1 秒",
      other: "不到 {{count}} 秒"
    },
    xSeconds: {
      one: "1 秒",
      other: "{{count}} 秒"
    },
    halfAMinute: "半分钟",
    lessThanXMinutes: {
      one: "不到 1 分钟",
      other: "不到 {{count}} 分钟"
    },
    xMinutes: {
      one: "1 分钟",
      other: "{{count}} 分钟"
    },
    xHours: {
      one: "1 小时",
      other: "{{count}} 小时"
    },
    aboutXHours: {
      one: "大约 1 小时",
      other: "大约 {{count}} 小时"
    },
    xDays: {
      one: "1 天",
      other: "{{count}} 天"
    },
    aboutXWeeks: {
      one: "大约 1 个星期",
      other: "大约 {{count}} 个星期"
    },
    xWeeks: {
      one: "1 个星期",
      other: "{{count}} 个星期"
    },
    aboutXMonths: {
      one: "大约 1 个月",
      other: "大约 {{count}} 个月"
    },
    xMonths: {
      one: "1 个月",
      other: "{{count}} 个月"
    },
    aboutXYears: {
      one: "大约 1 年",
      other: "大约 {{count}} 年"
    },
    xYears: {
      one: "1 年",
      other: "{{count}} 年"
    },
    overXYears: {
      one: "超过 1 年",
      other: "超过 {{count}} 年"
    },
    almostXYears: {
      one: "将近 1 年",
      other: "将近 {{count}} 年"
    }
  };
  const formatDistance = (token, count, options) => {
    let result;
    const tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", String(count));
    }
    if (options == null ? void 0 : options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return result + "内";
      } else {
        return result + "前";
      }
    }
    return result;
  };
  const dateFormats = {
    full: "y'年'M'月'd'日' EEEE",
    long: "y'年'M'月'd'日'",
    medium: "yyyy-MM-dd",
    short: "yy-MM-dd"
  };
  const timeFormats = {
    full: "zzzz a h:mm:ss",
    long: "z a h:mm:ss",
    medium: "a h:mm:ss",
    short: "a h:mm"
  };
  const dateTimeFormats = {
    full: "{{date}} {{time}}",
    long: "{{date}} {{time}}",
    medium: "{{date}} {{time}}",
    short: "{{date}} {{time}}"
  };
  const formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };
  function checkWeek(date, baseDate, options) {
    const baseFormat = "eeee p";
    if (isSameWeek(date, baseDate, options)) {
      return baseFormat;
    } else if (date.getTime() > baseDate.getTime()) {
      return "'下个'" + baseFormat;
    }
    return "'上个'" + baseFormat;
  }
  const formatRelativeLocale = {
    lastWeek: checkWeek,
    yesterday: "'昨天' p",
    today: "'今天' p",
    tomorrow: "'明天' p",
    nextWeek: checkWeek,
    other: "PP p"
  };
  const formatRelative = (token, date, baseDate, options) => {
    const format = formatRelativeLocale[token];
    if (typeof format === "function") {
      return format(date, baseDate, options);
    }
    return format;
  };
  const eraValues = {
    narrow: ["前", "公元"],
    abbreviated: ["前", "公元"],
    wide: ["公元前", "公元"]
  };
  const quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["第一季", "第二季", "第三季", "第四季"],
    wide: ["第一季度", "第二季度", "第三季度", "第四季度"]
  };
  const monthValues = {
    narrow: [
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
      "十一",
      "十二"
    ],
    abbreviated: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    wide: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ]
  };
  const dayValues = {
    narrow: ["日", "一", "二", "三", "四", "五", "六"],
    short: ["日", "一", "二", "三", "四", "五", "六"],
    abbreviated: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  };
  const dayPeriodValues = {
    narrow: {
      am: "上",
      pm: "下",
      midnight: "凌晨",
      noon: "午",
      morning: "早",
      afternoon: "下午",
      evening: "晚",
      night: "夜"
    },
    abbreviated: {
      am: "上午",
      pm: "下午",
      midnight: "凌晨",
      noon: "中午",
      morning: "早晨",
      afternoon: "中午",
      evening: "晚上",
      night: "夜间"
    },
    wide: {
      am: "上午",
      pm: "下午",
      midnight: "凌晨",
      noon: "中午",
      morning: "早晨",
      afternoon: "中午",
      evening: "晚上",
      night: "夜间"
    }
  };
  const formattingDayPeriodValues = {
    narrow: {
      am: "上",
      pm: "下",
      midnight: "凌晨",
      noon: "午",
      morning: "早",
      afternoon: "下午",
      evening: "晚",
      night: "夜"
    },
    abbreviated: {
      am: "上午",
      pm: "下午",
      midnight: "凌晨",
      noon: "中午",
      morning: "早晨",
      afternoon: "中午",
      evening: "晚上",
      night: "夜间"
    },
    wide: {
      am: "上午",
      pm: "下午",
      midnight: "凌晨",
      noon: "中午",
      morning: "早晨",
      afternoon: "中午",
      evening: "晚上",
      night: "夜间"
    }
  };
  const ordinalNumber = (dirtyNumber, options) => {
    const number = Number(dirtyNumber);
    switch (options == null ? void 0 : options.unit) {
      case "date":
        return number.toString() + "日";
      case "hour":
        return number.toString() + "时";
      case "minute":
        return number.toString() + "分";
      case "second":
        return number.toString() + "秒";
      default:
        return "第 " + number.toString();
    }
  };
  const localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };
  const matchOrdinalNumberPattern = /^(第\s*)?\d+(日|时|分|秒)?/i;
  const parseOrdinalNumberPattern = /\d+/i;
  const matchEraPatterns = {
    narrow: /^(前)/i,
    abbreviated: /^(前)/i,
    wide: /^(公元前|公元)/i
  };
  const parseEraPatterns = {
    any: [/^(前)/i, /^(公元)/i]
  };
  const matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^第[一二三四]刻/i,
    wide: /^第[一二三四]刻钟/i
  };
  const parseQuarterPatterns = {
    any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
  };
  const matchMonthPatterns = {
    narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
    abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
    wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
  };
  const parseMonthPatterns = {
    narrow: [
      /^一/i,
      /^二/i,
      /^三/i,
      /^四/i,
      /^五/i,
      /^六/i,
      /^七/i,
      /^八/i,
      /^九/i,
      /^十(?!(一|二))/i,
      /^十一/i,
      /^十二/i
    ],
    any: [
      /^一|1/i,
      /^二|2/i,
      /^三|3/i,
      /^四|4/i,
      /^五|5/i,
      /^六|6/i,
      /^七|7/i,
      /^八|8/i,
      /^九|9/i,
      /^十(?!(一|二))|10/i,
      /^十一|11/i,
      /^十二|12/i
    ]
  };
  const matchDayPatterns = {
    narrow: /^[一二三四五六日]/i,
    short: /^[一二三四五六日]/i,
    abbreviated: /^周[一二三四五六日]/i,
    wide: /^星期[一二三四五六日]/i
  };
  const parseDayPatterns = {
    any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
  };
  const matchDayPeriodPatterns = {
    any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
  };
  const parseDayPeriodPatterns = {
    any: {
      am: /^上午?/i,
      pm: /^下午?/i,
      midnight: /^午夜/i,
      noon: /^[中正]午/i,
      morning: /^早上/i,
      afternoon: /^下午/i,
      evening: /^晚上?/i,
      night: /^凌晨/i
    }
  };
  const match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: (value) => parseInt(value, 10)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };
  const zhCN = {
    code: "zh-CN",
    formatDistance,
    formatLong,
    formatRelative,
    localize,
    match,
    options: {
      weekStartsOn: 1,
      firstWeekContainsDate: 4
    }
  };
  class SavegameLoader {
    constructor(game2) {
      __publicField(this, "_game");
      this._game = game2;
    }
    load(data) {
      return new Promise((resolve, reject) => {
        if (data === null) {
          resolve();
          return;
        }
        this._game.saveImportDropboxText(data, (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    }
    loadRaw(data) {
      const compressed = this._game.compressLZData(JSON.stringify(data));
      return this.load(compressed);
    }
  }
  class ToolbarListItem extends ListItem {
    constructor(host, buttons, options) {
      super(host, options);
      __publicField(this, "buttons");
      this.element.addClass(styles$9.toolbar);
      this.buttons = buttons;
      for (const button2 of buttons) {
        this.element.append(button2.element);
      }
    }
    refreshUi() {
      super.refreshUi();
      for (const button2 of this.buttons) {
        button2.refreshUi();
      }
    }
  }
  class StateManagementUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("state.title");
      super(
        host,
        settings,
        new LabelListItem(host, label2, {
          childrenHead: [
            new Container(host, {
              classes: [stylesLabelListItem.fillSpace]
            })
          ],
          classes: [stylesSettingListItem.checked, stylesSettingListItem.setting],
          icon: Icons.State
        })
      );
      __publicField(this, "games", new Array());
      __publicField(this, "states", new Array());
      __publicField(this, "gameList");
      __publicField(this, "stateList");
      __publicField(this, "locale");
      this.gameList = new SettingsList(host, {
        hasEnableAll: false,
        hasDisableAll: false
      });
      this.stateList = new SettingsList(host, {
        hasEnableAll: false,
        hasDisableAll: false
      });
      this.locale = locale.selected === "zh-CN" ? zhCN : locale.selected === "he-IL" ? he : locale.selected === "de-DE" ? de : enUS;
      this.addChild(
        new SettingsList(host, {
          children: [
            new SettingListItem(host, this.setting.noConfirm, host.engine.i18n("state.noConfirm")),
            new ListItem(host, { children: [new Delimiter(host)] }),
            new HeaderListItem(host, host.engine.i18n("state.local")),
            new ToolbarListItem(host, [
              new Button(host, host.engine.i18n("state.import"), Icons.Import, {
                onClick: () => {
                  this.import();
                },
                title: host.engine.i18n("state.importTitle")
              })
            ]),
            new ListItem(host, { children: [new Delimiter(host)] }),
            new HeaderListItem(host, host.engine.i18n("state.localStates")),
            new ToolbarListItem(host, [
              new Button(host, host.engine.i18n("state.store"), Icons.SaveAs, {
                onClick: () => {
                  this.storeState();
                },
                title: host.engine.i18n("state.storeState")
              }),
              new Button(host, host.engine.i18n("copy"), Icons.Copy, {
                onClick: () => {
                  this.copyState().catch(redirectErrorsToConsole(console));
                  host.engine.imessage("state.copied.stateCurrent");
                },
                title: host.engine.i18n("state.copy.stateCurrent")
              }),
              new Button(host, host.engine.i18n("state.new"), Icons.Draft, {
                onClick: () => {
                  this.storeStateFactoryDefaults();
                  host.engine.imessage("state.stored.state");
                },
                title: host.engine.i18n("state.storeFactory")
              }),
              new Button(host, host.engine.i18n("state.exportAll"), Icons.Sync, {
                onClick: () => {
                  this.exportStateAll();
                },
                title: host.engine.i18n("state.exportAllTitle")
              })
            ]),
            new ListItem(host, { children: [this.stateList] }),
            new ListItem(host, { children: [new Delimiter(host)] }),
            new HeaderListItem(host, host.engine.i18n("state.localGames")),
            new ToolbarListItem(host, [
              new Button(host, host.engine.i18n("state.store"), Icons.SaveAs, {
                onClick: () => {
                  this.storeGame();
                  host.engine.imessage("state.stored.game");
                },
                title: host.engine.i18n("state.storeGame")
              }),
              new Button(host, host.engine.i18n("copy"), Icons.Copy, {
                onClick: () => {
                  this.copyGame().catch(redirectErrorsToConsole(console));
                  host.engine.imessage("state.copied.gameCurrent");
                },
                title: host.engine.i18n("state.copy.gameCurrent")
              })
            ]),
            new ListItem(host, { children: [this.gameList] }),
            new SettingListItem(host, this.setting.compress, host.engine.i18n("state.compress"))
          ],
          hasDisableAll: false,
          hasEnableAll: false
        })
      );
      this._loadGames();
      this._loadStates();
    }
    _loadGames() {
      let index = 0;
      let game2 = localStorage.getItem(`ks.game.${index}`);
      this.games.splice(0);
      try {
        while (!isNil(game2)) {
          const gameObject = JSON.parse(game2);
          this.games.push(new Unique(gameObject));
          game2 = localStorage.getItem(`ks.game.${++index}`);
        }
      } catch (error) {
        cerror(error);
      }
    }
    _storeGames() {
      let index = 0;
      let game2 = localStorage.getItem(`ks.game.${index}`);
      while (!isNil(game2)) {
        localStorage.removeItem(`ks.game.${index}`);
        game2 = localStorage.getItem(`ks.game.${++index}`);
      }
      index = 0;
      for (const game22 of this.games) {
        localStorage.setItem(`ks.game.${index++}`, JSON.stringify(game22));
      }
    }
    _loadStates() {
      let stateIndex = 0;
      let state = localStorage.getItem(`ks.state.${stateIndex}`);
      this.states.splice(0);
      try {
        while (!isNil(state)) {
          const stateObject = JSON.parse(state);
          KittenScientists.unknownAsEngineStateOrThrow(stateObject.state);
          this.states.push(new Unique(stateObject));
          state = localStorage.getItem(`ks.state.${++stateIndex}`);
        }
      } catch (error) {
        cerror(error);
      }
    }
    _storeStates() {
      let stateIndex = 0;
      let state = localStorage.getItem(`ks.state.${stateIndex}`);
      while (!isNil(state)) {
        localStorage.removeItem(`ks.state.${stateIndex}`);
        state = localStorage.getItem(`ks.state.${++stateIndex}`);
      }
      stateIndex = 0;
      for (const state2 of this.states) {
        localStorage.setItem(`ks.state.${stateIndex++}`, JSON.stringify(state2));
      }
    }
    refreshUi() {
      super.refreshUi();
      this._refreshGameList();
      this._refreshStateList();
    }
    _refreshGameList() {
      this.gameList.removeChildren(this.gameList.children);
      this.gameList.addChildren(
        this.games.sort(
          (a, b) => new Date(a.unwrap().timestamp).getTime() - new Date(b.unwrap().timestamp).getTime()
        ).map((game2) => [game2.unwrap(), game2]).map(
          ([game2, gameSlot]) => new ButtonListItem(
            this._host,
            new TextButton(
              this._host,
              `${game2.label} (${formatDistanceToNow(new Date(game2.timestamp), {
                addSuffix: true,
                locale: this.locale
              })})`,
              {
                onClick: () => {
                  this.loadGame(game2.game).catch(redirectErrorsToConsole(console));
                  this._host.engine.imessage("state.loaded.game", [game2.label]);
                },
                title: new Date(game2.timestamp).toLocaleString()
              }
            ),
            {
              children: [
                new Container(this._host, { classes: [stylesLabelListItem.fillSpace] }),
                new IconButton(
                  this._host,
                  Icons.Save,
                  this._host.engine.i18n("state.update.game"),
                  {
                    onClick: () => {
                      this.updateGame(gameSlot, this._host.game.save());
                      this._host.engine.imessage("state.updated.game", [game2.label]);
                    }
                  }
                ),
                new IconButton(
                  this._host,
                  Icons.Edit,
                  this._host.engine.i18n("state.edit.game"),
                  {
                    onClick: () => {
                      this.storeGame(game2.game);
                      this.deleteGame(gameSlot, true);
                      this._host.engine.imessage("state.updated.game", [game2.label]);
                    }
                  }
                ),
                new IconButton(
                  this._host,
                  Icons.Copy,
                  this._host.engine.i18n("state.copy.game"),
                  {
                    onClick: () => {
                      this.copyGame(game2.game).catch(redirectErrorsToConsole(console));
                      this._host.engine.imessage("state.copied.game", [game2.label]);
                    }
                  }
                ),
                new IconButton(
                  this._host,
                  Icons.Delete,
                  this._host.engine.i18n("state.delete.game"),
                  {
                    onClick: () => {
                      this.deleteGame(gameSlot);
                      this._host.engine.imessage("state.deleted.game", [game2.label]);
                    }
                  }
                )
              ]
            }
          )
        )
      );
    }
    _refreshStateList() {
      this.stateList.removeChildren(this.stateList.children);
      this.stateList.addChildren(
        this.states.sort(
          (a, b) => new Date(a.unwrap().timestamp).getTime() - new Date(b.unwrap().timestamp).getTime()
        ).map((stateSlot) => [stateSlot.unwrap(), stateSlot]).map(
          ([state, stateSlot]) => new ButtonListItem(
            this._host,
            new TextButton(
              this._host,
              `${state.label} (${formatDistanceToNow(new Date(state.timestamp), {
                addSuffix: true,
                locale: this.locale
              })})`,
              {
                onClick: () => {
                  this.loadState(state.state);
                  this._host.engine.imessage("state.loaded.state", [state.label]);
                },
                title: new Date(state.timestamp).toLocaleString()
              }
            ),
            {
              children: [
                new Container(this._host, { classes: [stylesLabelListItem.fillSpace] }),
                new IconButton(
                  this._host,
                  Icons.Save,
                  this._host.engine.i18n("state.update.state"),
                  {
                    onClick: () => {
                      this.updateState(stateSlot, this._host.engine.stateSerialize());
                      this._host.engine.imessage("state.updated.state", [state.label]);
                    }
                  }
                ),
                new IconButton(
                  this._host,
                  Icons.Edit,
                  this._host.engine.i18n("state.edit.state"),
                  {
                    onClick: () => {
                      this.storeState(state.state);
                      this.deleteState(stateSlot, true);
                      this._host.engine.imessage("state.updated.state", [state.label]);
                    }
                  }
                ),
                new IconButton(
                  this._host,
                  Icons.Copy,
                  this._host.engine.i18n("state.copy.state"),
                  {
                    onClick: () => {
                      this.copyState(state.state).catch(redirectErrorsToConsole(console));
                      this._host.engine.imessage("state.copied.state", [state.label]);
                    }
                  }
                ),
                new IconButton(
                  this._host,
                  Icons.Delete,
                  this._host.engine.i18n("state.delete.state"),
                  {
                    onClick: () => {
                      this.deleteState(stateSlot);
                      this._host.engine.imessage("state.deleted.state", [state.label]);
                    }
                  }
                )
              ]
            }
          )
        )
      );
    }
    async copyState(state) {
      await this._host.copySettings(state, false);
    }
    async copyGame(game2) {
      const saveData = game2 ?? this._host.game.save();
      const saveDataString = JSON.stringify(saveData);
      const encodedData = this.setting.compress.enabled ? this._host.game.compressLZData(saveDataString) : saveDataString;
      await window.navigator.clipboard.writeText(encodedData);
    }
    import() {
      const input = window.prompt(this._host.engine.i18n("state.loadPrompt"));
      if (isNil(input)) {
        return;
      }
      try {
        const state = KittenScientists.decodeSettings(input);
        this.storeState(state);
        this._host.engine.imessage("state.imported.state");
        return;
      } catch (_error) {
      }
      let subjectData;
      try {
        subjectData = JSON.parse(input);
      } catch (_error) {
        const uncompressed = this._host.game.decompressLZData(input);
        subjectData = JSON.parse(uncompressed);
      }
      let stateLabel;
      if ("ks" in subjectData && !isNil(subjectData.ks)) {
        const state = subjectData.ks.state[0];
        stateLabel = this.storeState(state) ?? void 0;
        this._host.engine.imessage("state.imported.state");
        subjectData.ks = void 0;
      }
      this.storeGame(subjectData, stateLabel);
      this._host.engine.imessage("state.imported.game");
    }
    storeGame(game2, label2) {
      let gameLabel = label2;
      if (isNil(gameLabel)) {
        gameLabel = window.prompt(this._host.engine.i18n("state.storeGame.prompt")) ?? void 0;
      }
      if (isNil(gameLabel)) {
        return null;
      }
      gameLabel = (gameLabel === "" ? void 0 : gameLabel) ?? this._host.engine.i18n("state.unlabeledGame");
      gameLabel = gameLabel.substring(0, 127);
      this.games.push(
        new Unique({
          label: gameLabel,
          game: game2 ?? this._host.game.save(),
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        })
      );
      this._storeGames();
      this.refreshUi();
      return gameLabel;
    }
    storeState(state, label2) {
      let stateLabel = label2;
      if (isNil(stateLabel)) {
        stateLabel = window.prompt(this._host.engine.i18n("state.storeState.prompt")) ?? void 0;
      }
      if (isNil(stateLabel)) {
        return null;
      }
      stateLabel = (stateLabel === "" ? void 0 : stateLabel) ?? this._host.engine.i18n("state.unlabeledState");
      stateLabel = stateLabel.substring(0, 127);
      this.states.push(
        new Unique({
          label: stateLabel,
          state: state ?? this._host.engine.stateSerialize(),
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        })
      );
      this._storeStates();
      this.refreshUi();
      return stateLabel;
    }
    storeStateFactoryDefaults() {
      this.storeState(Engine.DEFAULT_STATE);
    }
    storeAutoSave(state) {
      const existing = this.states.find((state2) => state2.unwrap().label === "Auto-Save");
      if (!isNil(existing)) {
        cinfo("Updating existing Auto-Save...");
        existing.replace({
          ...existing.unwrap(),
          state,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        this._storeStates();
        this.refreshUi();
        return;
      }
      cinfo("Storing new Auto-Save...");
      this.storeState(state, "Auto-Save");
    }
    exportStateAll() {
      const statesJson = this.states.map((state) => KittenScientists.encodeSettings(state.unwrap().state, false)).join("\n");
      const a = document.createElement("a");
      const blob = new Blob([statesJson], { type: "application/x-ndjson" });
      const url = URL.createObjectURL(blob);
      a.setAttribute("href", url);
      a.setAttribute("download", `ks-local-states-${(/* @__PURE__ */ new Date()).getTime()}.ndjson`);
      a.click();
    }
    async loadGame(game2) {
      if (this._destructiveActionPrevented()) {
        return;
      }
      await new SavegameLoader(this._host.game).loadRaw(game2);
    }
    loadState(state) {
      if (this._destructiveActionPrevented()) {
        return;
      }
      this._host.engine.stateLoad(state, true);
      this._host.refreshUi();
    }
    loadAutoSave() {
      if (this._host.engine.isLoaded) {
        cinfo("Not attempting to load Auto-Save, because a state is already loaded.");
        return;
      }
      const existing = this.states.find((state) => state.unwrap().label === "Auto-Save");
      if (isNil(existing)) {
        cinfo("No Auto-Save settings found.");
        return;
      }
      cinfo("Loading Auto-Save...");
      this._host.engine.stateLoad(existing.unwrap().state, false);
    }
    updateGame(game2, newGame) {
      if (this._destructiveActionPrevented()) {
        return;
      }
      const label2 = game2.unwrap().label;
      game2.replace({
        label: label2,
        game: newGame,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      this._storeGames();
      this.refreshUi();
    }
    updateState(state, newState) {
      if (this._destructiveActionPrevented()) {
        return;
      }
      const label2 = state.unwrap().label;
      state.replace({
        label: label2,
        state: newState,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      this._storeStates();
      this.refreshUi();
    }
    deleteGame(game2, force = false) {
      if (!force && this._destructiveActionPrevented()) {
        return;
      }
      const index = this.games.indexOf(game2);
      if (index < 0) {
        return;
      }
      this.games.splice(index, 1);
      this._storeGames();
      this.refreshUi();
    }
    deleteState(state, force = false) {
      if (!force && this._destructiveActionPrevented()) {
        return;
      }
      const index = this.states.indexOf(state);
      if (index < 0) {
        return;
      }
      this.states.splice(index, 1);
      this._storeStates();
      this.refreshUi();
    }
    _destructiveActionPrevented() {
      if (!this.setting.noConfirm.enabled && !window.confirm(this._host.engine.i18n("state.confirmDestruction"))) {
        return true;
      }
      return false;
    }
  }
  class IconSettingsPanel extends CollapsiblePanel {
    constructor(host, label2, setting2, options) {
      super(
        host,
        new LabelListItem(host, label2, { childrenHead: options == null ? void 0 : options.childrenHead, icon: options == null ? void 0 : options.icon }),
        {
          initiallyExpanded: options == null ? void 0 : options.initiallyExpanded
        }
      );
      __publicField(this, "setting");
      this.setting = setting2;
    }
  }
  class ResetBonfireSettingsUi extends IconSettingsPanel {
    constructor(host, settings, locale) {
      var _a, _b;
      const label2 = host.engine.i18n("ui.build");
      super(host, label2, settings, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        icon: Icons.Bonfire
      });
      __publicField(this, "_buildings");
      this._buildings = [];
      for (const buildingGroup of host.game.bld.buildingGroups) {
        this._buildings.push(new HeaderListItem(host, buildingGroup.title));
        for (const building of buildingGroup.buildings) {
          if (building === "unicornPasture" || isNil(this.setting.buildings[building])) {
            continue;
          }
          const meta = host.game.bld.getBuildingExt(building).meta;
          if (!isNil(meta.stages)) {
            const name = (_a = Object.values(this.setting.buildings).find(
              (item) => item.baseBuilding === building
            )) == null ? void 0 : _a.building;
            this._buildings.push(
              this._getResetOption(
                host,
                this.setting.buildings[building],
                locale,
                settings,
                meta.stages[0].label
              ),
              this._getResetOption(
                host,
                this.setting.buildings[name],
                locale,
                settings,
                meta.stages[1].label,
                false,
                true
              )
            );
          } else if (!isNil(meta.label)) {
            this._buildings.push(
              this._getResetOption(
                host,
                this.setting.buildings[building],
                locale,
                settings,
                meta.label
              )
            );
          }
        }
        if (buildingGroup !== host.game.bld.buildingGroups[host.game.bld.buildingGroups.length - 1]) {
          (_b = this._buildings.at(-1)) == null ? void 0 : _b.element.addClass(stylesDelimiter.delimiter);
        }
      }
      const listBuildings = new SettingsList(host);
      listBuildings.addChildren(this._buildings);
      this.addChild(listBuildings);
    }
    _getResetOption(host, option, locale, sectionSetting, label2, delimiter2 = false, upgradeIndicator = false) {
      const element = new SettingTriggerListItem(host, option, locale, label2, {
        delimiter: delimiter2,
        onCheck: () => {
          host.engine.imessage("status.reset.check.enable", [label2]);
        },
        onUnCheck: () => {
          host.engine.imessage("status.reset.check.disable", [label2]);
        },
        onRefresh: () => {
          element.triggerButton.inactive = !option.enabled || option.trigger === -1;
          element.triggerButton.ineffective = sectionSetting.enabled && option.enabled && option.trigger === -1;
        },
        onSetTrigger: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("ui.trigger.prompt.absolute"),
            host.engine.i18n("ui.trigger.build.prompt", [
              label2,
              option.trigger !== -1 ? host.renderAbsolute(option.trigger, locale.selected) : host.engine.i18n("ui.trigger.inactive")
            ]),
            option.trigger !== -1 ? host.renderAbsolute(option.trigger) : "",
            host.engine.i18n("ui.trigger.reset.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              option.trigger = -1;
              option.enabled = false;
              return;
            }
            option.trigger = Number(value);
          }).then(() => {
            element.refreshUi();
          }).catch(redirectErrorsToConsole(console));
        },
        upgradeIndicator
      });
      element.triggerButton.element.addClass(stylesButton.lastHeadAction);
      return element;
    }
  }
  class ResetReligionSettingsUi extends IconSettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.faith");
      super(host, label2, settings, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        icon: Icons.Religion
      });
      const unicornsArray = [...UnicornItems];
      this.addChild(
        new SettingsList(host, {
          children: [
            new HeaderListItem(host, host.engine.i18n("$religion.panel.ziggurat.label")),
            this._getResetOption(
              host,
              this.setting.buildings.unicornPasture,
              locale,
              settings,
              host.engine.i18n("$buildings.unicornPasture.label")
            ),
            ...host.game.religion.zigguratUpgrades.filter(
              (item) => unicornsArray.includes(item.name) && !isNil(this.setting.buildings[item.name])
            ).map(
              (zigguratUpgrade) => this._getResetOption(
                host,
                this.setting.buildings[zigguratUpgrade.name],
                locale,
                settings,
                zigguratUpgrade.label
              )
            ),
            new Delimiter(host),
            ...host.game.religion.zigguratUpgrades.filter(
              (item) => !unicornsArray.includes(item.name) && !isNil(this.setting.buildings[item.name])
            ).map(
              (upgrade) => this._getResetOption(
                host,
                this.setting.buildings[upgrade.name],
                locale,
                settings,
                upgrade.label
              )
            ),
            new Delimiter(host),
            new HeaderListItem(host, host.engine.i18n("$religion.panel.orderOfTheSun.label")),
            ...host.game.religion.religionUpgrades.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (upgrade) => {
                var _a;
                return this._getResetOption(
                  host,
                  this.setting.buildings[upgrade.name],
                  locale,
                  settings,
                  upgrade.label,
                  upgrade.name === ((_a = host.game.religion.religionUpgrades.at(-1)) == null ? void 0 : _a.name)
                );
              }
            ),
            new HeaderListItem(host, host.engine.i18n("$religion.panel.cryptotheology.label")),
            ...host.game.religion.transcendenceUpgrades.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (upgrade) => this._getResetOption(
                host,
                this.setting.buildings[upgrade.name],
                locale,
                settings,
                upgrade.label
              )
            )
          ]
        })
      );
    }
    _getResetOption(host, option, locale, sectionSetting, label2, delimiter2 = false, upgradeIndicator = false) {
      const element = new SettingTriggerListItem(host, option, locale, label2, {
        delimiter: delimiter2,
        onCheck: () => {
          host.engine.imessage("status.reset.check.enable", [label2]);
        },
        onUnCheck: () => {
          host.engine.imessage("status.reset.check.disable", [label2]);
        },
        onRefresh: () => {
          element.triggerButton.inactive = !option.enabled || option.trigger === -1;
          element.triggerButton.ineffective = sectionSetting.enabled && option.enabled && option.trigger === -1;
        },
        onSetTrigger: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("ui.trigger.prompt.absolute"),
            host.engine.i18n("ui.trigger.build.prompt", [
              label2,
              option.trigger !== -1 ? host.renderAbsolute(option.trigger, locale.selected) : host.engine.i18n("ui.trigger.inactive")
            ]),
            option.trigger !== -1 ? host.renderAbsolute(option.trigger) : "",
            host.engine.i18n("ui.trigger.reset.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              option.trigger = -1;
              option.enabled = false;
              return;
            }
            option.trigger = Number(value);
          }).then(() => {
            element.refreshUi();
          }).catch(redirectErrorsToConsole(console));
        },
        upgradeIndicator
      });
      element.triggerButton.element.addClass(stylesButton.lastHeadAction);
      return element;
    }
  }
  class ResetResourcesSettingsUi extends IconSettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.resources");
      super(host, label2, settings, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        icon: Icons.Resources
      });
      const resources = host.game.resPool.resources;
      const items = [];
      let lastLabel = resources[0].title;
      for (const resource of [...resources].sort(
        (a, b) => a.title.localeCompare(b.title, locale.selected)
      )) {
        const option = this.setting.resources[resource.name];
        const element = new SettingTriggerListItem(host, option, locale, ucfirst(resource.title), {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [resource.title]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [resource.title]);
          },
          onRefresh: () => {
            element.triggerButton.inactive = !option.enabled || option.trigger === -1;
            element.triggerButton.ineffective = settings.enabled && option.enabled && option.trigger === -1;
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.float"),
              host.engine.i18n("ui.trigger.build.prompt", [
                resource.title,
                option.trigger !== -1 ? host.renderAbsolute(option.trigger, locale.selected) : host.engine.i18n("ui.trigger.inactive")
              ]),
              option.trigger !== -1 ? host.renderAbsolute(option.trigger) : "",
              host.engine.i18n("ui.trigger.reset.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                option.trigger = -1;
                option.enabled = false;
                return;
              }
              option.trigger = Number(value);
            }).then(() => {
              element.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        });
        element.triggerButton.element.addClass(stylesButton.lastHeadAction);
        if (host.engine.localeSupportsFirstLetterSplits(locale.selected)) {
          if (lastLabel[0] !== resource.title[0]) {
            element.element.addClass(stylesLabelListItem.splitter);
          }
        }
        items.push(element);
        lastLabel = resource.title;
      }
      this.addChild(new SettingsList(host, { children: items }));
    }
  }
  class ResetSpaceSettingsUi extends IconSettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.space");
      super(host, label2, settings, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        icon: Icons.Space
      });
      this.addChild(
        new SettingsList(host, {
          children: host.game.space.planets.filter((plant) => 0 < plant.buildings.length).flatMap((planet, indexPlanet, arrayPlant) => [
            new HeaderListItem(host, host.engine.labelForPlanet(planet.name)),
            ...planet.buildings.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (building, indexBuilding, arrayBuilding) => this._getResetOption(
                host,
                this.setting.buildings[building.name],
                locale,
                settings,
                building.label,
                indexPlanet < arrayPlant.length - 1 && indexBuilding === arrayBuilding.length - 1
              )
            )
          ])
        })
      );
    }
    _getResetOption(host, option, locale, sectionSetting, label2, delimiter2 = false, upgradeIndicator = false) {
      const element = new SettingTriggerListItem(host, option, locale, label2, {
        delimiter: delimiter2,
        onCheck: () => {
          host.engine.imessage("status.reset.check.enable", [label2]);
        },
        onUnCheck: () => {
          host.engine.imessage("status.reset.check.disable", [label2]);
        },
        onRefresh: () => {
          element.triggerButton.inactive = !option.enabled || option.trigger === -1;
          element.triggerButton.ineffective = sectionSetting.enabled && option.enabled && option.trigger === -1;
        },
        onSetTrigger: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("ui.trigger.prompt.absolute"),
            host.engine.i18n("ui.trigger.build.prompt", [
              label2,
              option.trigger !== -1 ? host.renderAbsolute(option.trigger, locale.selected) : host.engine.i18n("ui.trigger.inactive")
            ]),
            option.trigger !== -1 ? host.renderAbsolute(option.trigger) : "",
            host.engine.i18n("ui.trigger.reset.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              option.trigger = -1;
              option.enabled = false;
              return;
            }
            option.trigger = Number(value);
          }).then(() => {
            element.refreshUi();
          }).catch(redirectErrorsToConsole(console));
        },
        upgradeIndicator
      });
      element.triggerButton.element.addClass(stylesButton.lastHeadAction);
      return element;
    }
  }
  class ResetTimeSettingsUi extends IconSettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.time");
      super(host, label2, settings, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        icon: Icons.Time
      });
      this.addChild(
        new SettingsList(host, {
          children: [
            new HeaderListItem(host, host.engine.i18n("$workshop.chronoforge.label")),
            ...host.game.time.chronoforgeUpgrades.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (building) => {
                var _a;
                return this._getResetOption(
                  host,
                  this.setting.buildings[building.name],
                  locale,
                  settings,
                  building.label,
                  building.name === ((_a = host.game.time.chronoforgeUpgrades.at(-1)) == null ? void 0 : _a.name)
                );
              }
            ),
            new HeaderListItem(host, host.engine.i18n("$science.voidSpace.label")),
            ...host.game.time.voidspaceUpgrades.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (building) => this._getResetOption(
                host,
                this.setting.buildings[building.name],
                locale,
                settings,
                building.label
              )
            )
          ]
        })
      );
    }
    _getResetOption(host, option, locale, sectionSetting, label2, delimiter2 = false, upgradeIndicator = false) {
      const element = new SettingTriggerListItem(host, option, locale, label2, {
        delimiter: delimiter2,
        onCheck: () => {
          host.engine.imessage("status.reset.check.enable", [label2]);
        },
        onUnCheck: () => {
          host.engine.imessage("status.reset.check.disable", [label2]);
        },
        onRefresh: () => {
          element.triggerButton.inactive = !option.enabled || option.trigger === -1;
          element.triggerButton.ineffective = sectionSetting.enabled && option.enabled && option.trigger === -1;
        },
        onSetTrigger: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("ui.trigger.prompt.absolute"),
            host.engine.i18n("ui.trigger.build.prompt", [
              label2,
              option.trigger !== -1 ? host.renderAbsolute(option.trigger, locale.selected) : host.engine.i18n("ui.trigger.inactive")
            ]),
            option.trigger !== -1 ? host.renderAbsolute(option.trigger) : "",
            host.engine.i18n("ui.trigger.reset.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              option.trigger = -1;
              option.enabled = false;
              return;
            }
            option.trigger = Number(value);
          }).then(() => {
            element.refreshUi();
          }).catch(redirectErrorsToConsole(console));
        },
        upgradeIndicator
      });
      element.triggerButton.element.addClass(stylesButton.lastHeadAction);
      return element;
    }
  }
  class ResetUpgradesSettingsUi extends IconSettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.upgrades");
      super(host, label2, settings, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        icon: Icons.Workshop
      });
      const upgrades = host.game.workshop.upgrades.filter(
        (upgrade) => !isNil(this.setting.upgrades[upgrade.name])
      );
      const items = [];
      let lastLabel = upgrades[0].label;
      let lastElement;
      for (const upgrade of upgrades.sort(
        (a, b) => a.label.localeCompare(b.label, locale.selected)
      )) {
        const option = this.setting.upgrades[upgrade.name];
        const element = this._getResetOption(host, option, upgrade.label);
        if (host.engine.localeSupportsFirstLetterSplits(locale.selected)) {
          if (lastLabel[0] !== upgrade.label[0]) {
            if (!isNil(lastElement)) {
              lastElement.element.addClass(stylesDelimiter.delimiter);
            }
            element.element.addClass(stylesLabelListItem.splitter);
          }
        }
        lastElement = element;
        items.push(element);
        lastLabel = upgrade.label;
      }
      this.addChild(new SettingsList(host, { children: items }));
    }
    _getResetOption(host, option, label2, delimiter2 = false, upgradeIndicator = false) {
      return new SettingListItem(host, option, label2, {
        delimiter: delimiter2,
        onCheck: () => {
          host.engine.imessage("status.reset.check.enable", [label2]);
        },
        onUnCheck: () => {
          host.engine.imessage("status.reset.check.disable", [label2]);
        },
        upgradeIndicator
      });
    }
  }
  class ResetSettingsUi extends SettingsPanel {
    constructor(host, settings, locale, options) {
      const label2 = host.engine.i18n("option.time.reset");
      super(
        host,
        settings,
        new SettingListItem(host, settings, label2, {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          }
        }),
        options
      );
      __publicField(this, "_bonfireUi");
      __publicField(this, "_religionUi");
      __publicField(this, "_resourcesUi");
      __publicField(this, "_spaceUi");
      __publicField(this, "_timeUi");
      __publicField(this, "_upgradesUi");
      const list2 = new SettingsList(host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      this._bonfireUi = new ResetBonfireSettingsUi(host, this.setting.bonfire, locale);
      this._religionUi = new ResetReligionSettingsUi(host, this.setting.religion, locale);
      this._resourcesUi = new ResetResourcesSettingsUi(host, this.setting.resources, locale);
      this._spaceUi = new ResetSpaceSettingsUi(host, this.setting.space, locale);
      this._timeUi = new ResetTimeSettingsUi(host, this.setting.time, locale);
      this._upgradesUi = new ResetUpgradesSettingsUi(host, this.setting.upgrades, locale);
      list2.addChildren([
        this._bonfireUi,
        this._religionUi,
        this._resourcesUi,
        this._spaceUi,
        this._timeUi,
        this._upgradesUi
      ]);
      this.addChild(list2);
    }
  }
  class CyclesList extends SettingsList {
    constructor(host, setting2, options) {
      super(host, options);
      __publicField(this, "setting");
      this.setting = setting2;
      this.addEventListener("enableAll", () => {
        for (const child of this.children) {
          child.check();
        }
        this.refreshUi();
      });
      this.addEventListener("disableAll", () => {
        for (const child of this.children) {
          child.uncheck();
        }
        this.refreshUi();
      });
      this.addChildren([
        this._makeCycle("charon", this.setting.charon, options),
        this._makeCycle("umbra", this.setting.umbra, options),
        this._makeCycle("yarn", this.setting.yarn, options),
        this._makeCycle("helios", this.setting.helios, options),
        this._makeCycle("cath", this.setting.cath, options),
        this._makeCycle("redmoon", this.setting.redmoon, options),
        this._makeCycle("dune", this.setting.dune, options),
        this._makeCycle("piscine", this.setting.piscine, options),
        this._makeCycle("terminus", this.setting.terminus, options),
        this._makeCycle("kairo", this.setting.kairo, options)
      ]);
    }
    _makeCycle(cycle, setting2, handler) {
      const label2 = this._host.engine.labelForCycle(cycle);
      return new SettingListItem(this._host, setting2, label2, {
        onCheck: () => {
          var _a;
          return (_a = handler == null ? void 0 : handler.onCheck) == null ? void 0 : _a.call(handler, label2, setting2);
        },
        onUnCheck: () => {
          var _a;
          return (_a = handler == null ? void 0 : handler.onUnCheck) == null ? void 0 : _a.call(handler, label2, setting2);
        }
      });
    }
  }
  class TimeSkipHeatSettingsUi extends SettingsPanel {
    constructor(host, settings, locale, sectionSetting, sectionParentSetting, options) {
      const label2 = host.engine.i18n("option.time.activeHeatTransfer");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
            settings.activeHeatTransferStatus.enabled = false;
          },
          onRefresh: (item) => {
            item.triggerButton.inactive = !settings.enabled;
            item.triggerButton.ineffective = sectionParentSetting.enabled && sectionSetting.enabled && settings.enabled && settings.trigger === -1;
            this.expando.ineffective = sectionParentSetting.enabled && sectionSetting.enabled && settings.enabled && !Object.values(settings.cycles).some((cycle) => cycle.enabled);
            if (settings.activeHeatTransferStatus.enabled) {
              this.head.elementLabel.attr("data-ks-active-from", "◎");
              this.head.elementLabel.attr("data-ks-active-to", "◎");
              this.head.elementLabel.addClass(styles$3.active);
            } else {
              this.head.elementLabel.removeClass(styles$3.active);
            }
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.activeHeatTransfer.prompt"),
              host.engine.i18n("ui.trigger.activeHeatTransfer.promptTitle", [
                host.renderPercentage(settings.trigger, locale.selected, true)
              ]),
              host.renderPercentage(settings.trigger),
              host.engine.i18n("ui.trigger.activeHeatTransfer.promptExplainer")
            ).then((value) => {
              if (value === void 0 || value === "" || value.startsWith("-")) {
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        }),
        options
      );
      this.addChild(
        new SettingsList(host, {
          classes: [stylesSettingListItem.checked, stylesSettingListItem.setting],
          children: [
            new CyclesList(host, this.setting.cycles, {
              onCheck: (label22) => {
                host.engine.imessage("time.heatTransfer.cycle.enable", [label22]);
                this.refreshUi();
              },
              onUnCheck: (label22) => {
                host.engine.imessage("time.heatTransfer.cycle.disable", [label22]);
                this.refreshUi();
              }
            })
          ],
          hasDisableAll: false,
          hasEnableAll: false
        })
      );
    }
  }
  class SeasonsList extends SettingsList {
    constructor(host, setting2, options) {
      super(host, options);
      __publicField(this, "setting");
      __publicField(this, "spring");
      __publicField(this, "summer");
      __publicField(this, "autumn");
      __publicField(this, "winter");
      this.setting = setting2;
      this.addEventListener("enableAll", () => {
        this.autumn.check();
        this.spring.check();
        this.summer.check();
        this.winter.check();
        this.refreshUi();
      });
      this.addEventListener("disableAll", () => {
        this.autumn.uncheck();
        this.spring.uncheck();
        this.summer.uncheck();
        this.winter.uncheck();
        this.refreshUi();
      });
      this.spring = this._makeSeason(
        this._host.engine.i18n("$calendar.season.spring"),
        this.setting.spring,
        options
      );
      this.summer = this._makeSeason(
        this._host.engine.i18n("$calendar.season.summer"),
        this.setting.summer,
        options
      );
      this.autumn = this._makeSeason(
        this._host.engine.i18n("$calendar.season.autumn"),
        this.setting.autumn,
        options
      );
      this.winter = this._makeSeason(
        this._host.engine.i18n("$calendar.season.winter"),
        this.setting.winter,
        options
      );
      this.addChildren([this.spring, this.summer, this.autumn, this.winter]);
    }
    _makeSeason(label2, setting2, handler) {
      return new SettingListItem(this._host, setting2, label2, {
        onCheck: () => {
          var _a;
          return (_a = handler == null ? void 0 : handler.onCheck) == null ? void 0 : _a.call(handler, label2, setting2);
        },
        onUnCheck: () => {
          var _a;
          return (_a = handler == null ? void 0 : handler.onUnCheck) == null ? void 0 : _a.call(handler, label2, setting2);
        }
      });
    }
  }
  class TimeSkipSettingsUi extends SettingsPanel {
    constructor(host, settings, locale, sectionSetting, options) {
      const label2 = host.engine.i18n("option.time.skip");
      super(
        host,
        settings,
        new SettingMaxTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
            this.refreshUi();
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
            this.refreshUi();
          },
          onRefresh: (item) => {
            const element = item;
            element.maxButton.inactive = !settings.enabled || settings.max === -1;
            element.triggerButton.inactive = !settings.enabled || settings.trigger === -1;
            element.maxButton.ineffective = sectionSetting.enabled && settings.enabled && settings.max === 0;
            this._cycles.expando.ineffective = sectionSetting.enabled && settings.enabled && !Object.values(settings.cycles).some((cycle) => cycle.enabled);
            this._seasons.expando.ineffective = sectionSetting.enabled && settings.enabled && !Object.values(settings.seasons).some((season) => season.enabled);
          },
          onRefreshMax: (item) => {
            item.maxButton.updateLabel(host.renderAbsolute(settings.max));
            item.maxButton.element[0].title = settings.max < 0 ? host.engine.i18n("ui.max.timeSkip.titleInfinite", [label2]) : settings.max === 0 ? host.engine.i18n("ui.max.timeSkip.titleZero", [label2]) : host.engine.i18n("ui.max.timeSkip.title", [
              host.renderAbsolute(settings.max),
              label2
            ]);
          },
          onRefreshTrigger: (item) => {
            item.triggerButton.element[0].title = host.engine.i18n("ui.trigger", [
              settings.trigger < 0 ? host.engine.i18n("ui.trigger.section.inactive") : `${host.renderFloat(settings.trigger, locale.selected)} TC`
            ]);
          },
          onSetMax: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.max.timeSkip.prompt"),
              host.engine.i18n("ui.max.timeSkip.promptTitle", [
                host.renderAbsolute(settings.max, locale.selected)
              ]),
              host.renderAbsolute(settings.max),
              host.engine.i18n("ui.max.timeSkip.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                settings.max = -1;
                return;
              }
              if (value === "0") {
                settings.enabled = false;
              }
              settings.max = host.parseAbsolute(value) ?? settings.max;
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.timeSkip.prompt"),
              host.engine.i18n("ui.trigger.timeSkip.promptTitle", [
                host.renderAbsolute(settings.trigger, locale.selected)
              ]),
              host.renderAbsolute(settings.trigger),
              host.engine.i18n("ui.trigger.timeSkip.promptExplainer")
            ).then((value) => {
              if (value === void 0 || value === "" || value.startsWith("-")) {
                return;
              }
              settings.trigger = host.parseAbsolute(value) ?? settings.trigger;
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        }),
        options
      );
      __publicField(this, "_cycles");
      __publicField(this, "_seasons");
      __publicField(this, "_activeHeatTransferUI");
      this.settingItem.triggerButton.element.removeClass(stylesButton.lastHeadAction);
      this._cycles = new CollapsiblePanel(
        host,
        new LabelListItem(host, ucfirst(host.engine.i18n("ui.cycles")), {
          classes: [stylesSettingListItem.checked, stylesSettingListItem.setting],
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          icon: Icons.Cycles
        }),
        {
          children: [
            new CyclesList(host, this.setting.cycles, {
              onCheck: (label22) => {
                host.engine.imessage("time.skip.cycle.enable", [label22]);
                this.refreshUi();
              },
              onUnCheck: (label22) => {
                host.engine.imessage("time.skip.cycle.disable", [label22]);
                this.refreshUi();
              }
            })
          ]
        }
      );
      this._seasons = new CollapsiblePanel(
        host,
        new LabelListItem(host, ucfirst(host.engine.i18n("trade.seasons")), {
          classes: [stylesSettingListItem.checked, stylesSettingListItem.setting],
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          icon: Icons.Seasons
        }),
        {
          children: [
            new SeasonsList(host, this.setting.seasons, {
              onCheck: (label22) => {
                host.engine.imessage("time.skip.season.enable", [label22]);
                this.refreshUi();
              },
              onUnCheck: (label22) => {
                host.engine.imessage("time.skip.season.disable", [label22]);
                this.refreshUi();
              }
            })
          ]
        }
      );
      this._activeHeatTransferUI = new TimeSkipHeatSettingsUi(
        host,
        this.setting.activeHeatTransfer,
        locale,
        settings,
        sectionSetting
      );
      this.addChild(
        new SettingsList(host, {
          children: [
            this._cycles,
            this._seasons,
            new SettingListItem(
              host,
              this.setting.ignoreOverheat,
              host.engine.i18n("option.time.skip.ignoreOverheat")
            ),
            this._activeHeatTransferUI
          ],
          hasDisableAll: false,
          hasEnableAll: false
        })
      );
    }
  }
  class TimeControlSettingsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.timeCtrl");
      super(
        host,
        settings,
        new SettingListItem(host, settings, label2, {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
            this.refreshUi();
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
            this.refreshUi();
          }
        })
      );
      __publicField(this, "_items");
      __publicField(this, "_accelerateTime");
      __publicField(this, "_timeSkipUi");
      __publicField(this, "_resetUi");
      const list2 = new SettingsList(host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      const accelerateLabel = host.engine.i18n("option.accelerate");
      this._accelerateTime = new SettingTriggerListItem(
        host,
        this.setting.accelerateTime,
        locale,
        accelerateLabel,
        {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [accelerateLabel]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [accelerateLabel]);
          },
          onRefresh: () => {
            this._accelerateTime.triggerButton.inactive = !this.setting.accelerateTime.enabled;
            this._accelerateTime.triggerButton.ineffective = this.setting.enabled && this.setting.accelerateTime.enabled && this.setting.accelerateTime.trigger === -1;
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.accelerateTime.prompt"),
              host.engine.i18n("ui.trigger.accelerateTime.promptTitle", [
                host.renderPercentage(this.setting.accelerateTime.trigger, locale.selected, true)
              ]),
              host.renderPercentage(this.setting.accelerateTime.trigger),
              host.engine.i18n("ui.trigger.accelerateTime.promptExplainer")
            ).then((value) => {
              if (value === void 0 || value === "" || value.startsWith("-")) {
                return;
              }
              this.setting.accelerateTime.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        }
      );
      this._accelerateTime.triggerButton.element.addClass(stylesButton.lastHeadAction);
      this._timeSkipUi = new TimeSkipSettingsUi(host, this.setting.timeSkip, locale, settings);
      this._resetUi = new ResetSettingsUi(host, this.setting.reset, locale);
      this._items = [this._accelerateTime, this._timeSkipUi, this._resetUi];
      list2.addChildren(this._items);
      this.addChild(list2);
    }
  }
  class TimeSettingsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.time");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          },
          onRefresh: (item) => {
            item.triggerButton.inactive = !settings.enabled || settings.trigger === -1;
          },
          onRefreshTrigger: (item) => {
            item.triggerButton.element[0].title = host.engine.i18n("ui.trigger.section", [
              settings.trigger < 0 ? host.engine.i18n("ui.trigger.section.inactive") : host.renderPercentage(settings.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                settings.trigger !== -1 ? host.renderPercentage(settings.trigger, locale.selected, true) : host.engine.i18n("ui.infinity")
              ]),
              settings.trigger !== -1 ? host.renderPercentage(settings.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                settings.trigger = -1;
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        })
      );
      this.addChildren([
        new SettingsList(host, {
          children: [
            new HeaderListItem(host, host.engine.i18n("$workshop.chronoforge.label")),
            ...host.game.time.chronoforgeUpgrades.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (building) => {
                var _a;
                return BuildSectionTools.getBuildOption(
                  host,
                  this.setting.buildings[building.name],
                  locale,
                  this.setting,
                  building.label,
                  label2,
                  building.name === ((_a = host.game.time.chronoforgeUpgrades.at(-1)) == null ? void 0 : _a.name)
                );
              }
            ),
            new HeaderListItem(host, host.engine.i18n("$science.voidSpace.label")),
            ...host.game.time.voidspaceUpgrades.filter((item) => !isNil(this.setting.buildings[item.name])).map(
              (building) => BuildSectionTools.getBuildOption(
                host,
                this.setting.buildings[building.name],
                locale,
                this.setting,
                building.label,
                label2
              )
            )
          ]
        }),
        new SettingsList(host, {
          children: [
            new HeaderListItem(host, host.engine.i18n("ui.additional")),
            new SettingListItem(
              host,
              this.setting.fixCryochambers,
              host.engine.i18n("option.fix.cry"),
              {
                onCheck: () => {
                  host.engine.imessage("status.sub.enable", [host.engine.i18n("option.fix.cry")]);
                },
                onUnCheck: () => {
                  host.engine.imessage("status.sub.disable", [host.engine.i18n("option.fix.cry")]);
                }
              }
            )
          ],
          hasDisableAll: false,
          hasEnableAll: false
        })
      ]);
    }
  }
  class SettingMaxListItem extends SettingListItem {
    constructor(host, setting2, label2, options) {
      super(host, setting2, label2, options);
      __publicField(this, "maxButton");
      this.maxButton = new MaxButton(host, setting2, {
        border: false,
        onClick: (options == null ? void 0 : options.onSetMax) ? () => {
          var _a;
          return (_a = options.onSetMax) == null ? void 0 : _a.call(options, this);
        } : void 0,
        onRefresh: (options == null ? void 0 : options.onRefreshMax) ? () => {
          var _a;
          return (_a = options.onRefreshMax) == null ? void 0 : _a.call(options, this);
        } : void 0
      });
      this.head.addChildren([
        new Container(host, { classes: [stylesLabelListItem.fillSpace] }),
        this.maxButton
      ]);
    }
    refreshUi() {
      super.refreshUi();
      this.maxButton.refreshUi();
    }
  }
  class EmbassySettingsUi extends SettingsPanel {
    constructor(host, settings, locale, options) {
      const label2 = host.engine.i18n("option.embassies");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          },
          onRefresh: (item) => {
            item.triggerButton.inactive = !settings.enabled || settings.trigger === -1;
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.embassies.prompt"),
              host.engine.i18n("ui.trigger.embassies.promptTitle", [
                host.renderPercentage(settings.trigger, locale.selected, true)
              ]),
              host.renderPercentage(settings.trigger),
              host.engine.i18n("ui.trigger.embassies.promptExplainer")
            ).then((value) => {
              if (value === void 0 || value === "" || value.startsWith("-")) {
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        }),
        options
      );
      const listRaces = new SettingsList(host, {
        children: host.game.diplomacy.races.filter((item) => !isNil(this.setting.races[item.name])).map(
          (races) => this._makeEmbassySetting(
            host,
            this.setting.races[races.name],
            locale.selected,
            settings,
            races.title
          )
        )
      });
      this.addChild(listRaces);
    }
    _makeEmbassySetting(host, option, locale, sectionSetting, label2) {
      const onSetMax = () => {
        Dialog.prompt(
          host,
          host.engine.i18n("ui.max.prompt.absolute"),
          host.engine.i18n("ui.max.build.prompt", [label2, host.renderAbsolute(option.max, locale)]),
          host.renderAbsolute(option.max),
          host.engine.i18n("ui.max.build.promptExplainer")
        ).then((value) => {
          if (value === void 0) {
            return;
          }
          if (value === "" || value.startsWith("-")) {
            option.max = -1;
            return;
          }
          if (value === "0") {
            option.enabled = false;
          }
          option.max = host.parseAbsolute(value) ?? option.max;
        }).then(() => {
          this.refreshUi();
        }).catch(redirectErrorsToConsole(console));
      };
      const element = new SettingMaxListItem(host, option, label2, {
        onCheck: () => {
          host.engine.imessage("status.sub.enable", [label2]);
          if (option.max === 0) {
            onSetMax();
          }
        },
        onUnCheck: () => {
          host.engine.imessage("status.sub.disable", [label2]);
        },
        onRefresh: () => {
          element.maxButton.inactive = !option.enabled || option.max === -1;
          element.maxButton.ineffective = sectionSetting.enabled && option.enabled && option.max === 0;
        },
        onRefreshMax: () => {
          element.maxButton.updateLabel(host.renderAbsolute(option.max));
          element.maxButton.element[0].title = option.max < 0 ? host.engine.i18n("ui.max.embassy.titleInfinite", [label2]) : option.max === 0 ? host.engine.i18n("ui.max.embassy.titleZero", [label2]) : host.engine.i18n("ui.max.embassy.title", [host.renderAbsolute(option.max), label2]);
        },
        onSetMax
      });
      element.maxButton.element.addClass(stylesButton.lastHeadAction);
      return element;
    }
  }
  class LimitedButton extends Button {
    constructor(host, setting2, options) {
      super(host, "", Icons.Eco, { ...options, border: false, classes: [] });
      __publicField(this, "setting");
      this.setting = setting2;
      this.element.on("click", () => {
        var _a, _b;
        this.setting.limited = !this.setting.limited;
        if (this.setting.limited) {
          (_a = options == null ? void 0 : options.onLimitedCheck) == null ? void 0 : _a.call(options);
        } else {
          (_b = options == null ? void 0 : options.onLimitedUnCheck) == null ? void 0 : _b.call(options);
        }
        this.refreshUi();
      });
      for (const className of (options == null ? void 0 : options.classes) ?? []) {
        this.element.addClass(className);
      }
    }
    refreshUi() {
      super.refreshUi();
      this.updateTitle(
        this._host.engine.i18n(this.setting.limited ? "ui.limited.on" : "ui.limited.off")
      );
      if (this.setting.limited && !this.inactive) {
        this.element.removeClass(stylesButton.inactive);
      } else {
        this.element.addClass(stylesButton.inactive);
      }
    }
  }
  class SettingLimitedListItem extends SettingListItem {
    constructor(host, setting2, label2, options) {
      super(host, setting2, label2, options);
      __publicField(this, "limitedButton");
      this.limitedButton = new LimitedButton(host, setting2, {
        ...options
      });
      this.head.addChildren([
        new Container(host, { classes: [stylesLabelListItem.fillSpace] }),
        this.limitedButton
      ]);
    }
    refreshUi() {
      super.refreshUi();
      this.limitedButton.refreshUi();
    }
  }
  class SettingLimitedTriggerListItem extends SettingLimitedListItem {
    constructor(host, setting2, locale, label2, options) {
      super(host, setting2, label2, options);
      __publicField(this, "triggerButton");
      this.triggerButton = new TriggerButton(host, setting2, locale, {
        border: false,
        onClick: (options == null ? void 0 : options.onSetTrigger) ? () => {
          var _a;
          return (_a = options.onSetTrigger) == null ? void 0 : _a.call(options, this);
        } : void 0,
        onRefreshTitle: (options == null ? void 0 : options.onRefreshTrigger) ? () => {
          var _a;
          return (_a = options.onRefreshTrigger) == null ? void 0 : _a.call(options, this);
        } : void 0
      });
      this.head.addChild(this.triggerButton);
    }
    refreshUi() {
      super.refreshUi();
      this.triggerButton.refreshUi();
    }
  }
  const buyButton = "_buyButton_10eul_1";
  const styles$2 = {
    buyButton
  };
  class BuyButton extends TextButton {
    constructor(host, setting2, locale, handler = {}) {
      super(host, void 0, {
        onClick: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("blackcoin.buy.prompt"),
            host.engine.i18n("blackcoin.buy.promptTitle", [
              host.renderAbsolute(setting2.buy, locale.selected)
            ]),
            host.renderAbsolute(setting2.buy),
            host.engine.i18n("blackcoin.buy.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              setting2.buy = -1;
              return;
            }
            setting2.buy = host.parseAbsolute(value) ?? setting2.buy;
          }).then(() => {
            this.refreshUi();
            if (handler.onClick) {
              handler.onClick();
            }
          }).catch(redirectErrorsToConsole(console));
        }
      });
      __publicField(this, "setting");
      this.element.addClass(styles$2.buyButton);
      this.setting = setting2;
    }
    refreshUi() {
      super.refreshUi();
      this.element.prop(
        "title",
        this._host.engine.i18n("blackcoin.buy.title", [this._host.renderAbsolute(this.setting.buy)])
      );
      this.element.text(
        this._host.engine.i18n("blackcoin.buy", [this._host.renderAbsolute(this.setting.buy)])
      );
    }
  }
  const sellButton = "_sellButton_1tmvd_1";
  const styles$1 = {
    sellButton
  };
  class SellButton extends TextButton {
    constructor(host, setting2, locale, handler = {}) {
      super(host, void 0, {
        onClick: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("blackcoin.sell.prompt"),
            host.engine.i18n("blackcoin.sell.promptTitle", [
              host.renderAbsolute(setting2.sell, locale.selected)
            ]),
            host.renderAbsolute(setting2.sell),
            host.engine.i18n("blackcoin.sell.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              setting2.sell = -1;
              return;
            }
            setting2.sell = host.parseAbsolute(value) ?? setting2.sell;
          }).then(() => {
            this.refreshUi();
            if (handler.onClick) {
              handler.onClick();
            }
          }).catch(redirectErrorsToConsole(console));
        }
      });
      __publicField(this, "setting");
      this.element.addClass(styles$1.sellButton);
      this.setting = setting2;
    }
    refreshUi() {
      super.refreshUi();
      this.element.prop(
        "title",
        this._host.engine.i18n("blackcoin.sell.title", [
          this._host.renderAbsolute(this.setting.sell)
        ])
      );
      this.element.text(
        this._host.engine.i18n("blackcoin.sell", [this._host.renderAbsolute(this.setting.sell)])
      );
    }
  }
  class TradeSettingsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.trade");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          },
          onRefresh: (item) => {
            item.triggerButton.inactive = !settings.enabled || settings.trigger === -1;
          },
          onRefreshTrigger: (item) => {
            item.triggerButton.element[0].title = host.engine.i18n("ui.trigger.section", [
              settings.trigger < 0 ? host.engine.i18n("ui.trigger.section.inactive") : host.renderPercentage(settings.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                settings.trigger !== -1 ? host.renderPercentage(settings.trigger, locale.selected, true) : host.engine.i18n("ui.infinity")
              ]),
              settings.trigger !== -1 ? host.renderPercentage(settings.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                settings.trigger = -1;
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        })
      );
      const listRaces = new SettingsList(host, {
        children: host.game.diplomacy.races.filter((item) => !isNil(this.setting.races[item.name])).map(
          (races) => {
            var _a;
            return this._getTradeOption(
              host,
              this.setting.races[races.name],
              locale,
              settings,
              races.title,
              label2,
              races.name === ((_a = host.game.diplomacy.races.at(-2)) == null ? void 0 : _a.name)
            );
          }
        ),
        hasDisableAll: false,
        hasEnableAll: false
      });
      listRaces.addChild(
        new SettingListItem(host, this.setting.feedLeviathans, host.engine.i18n("option.autofeed"), {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [host.engine.i18n("option.autofeed")]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [host.engine.i18n("option.autofeed")]);
          }
        })
      );
      listRaces.addChild(
        new SettingsPanel(
          host,
          this.setting.tradeBlackcoin,
          new SettingTriggerListItem(
            host,
            this.setting.tradeBlackcoin,
            locale,
            host.engine.i18n("option.crypto"),
            {
              onCheck: () => {
                host.engine.imessage("status.sub.enable", [host.engine.i18n("option.crypto")]);
              },
              onUnCheck: () => {
                host.engine.imessage("status.sub.disable", [host.engine.i18n("option.crypto")]);
              },
              onRefresh: (item) => {
                item.triggerButton.inactive = !this.setting.tradeBlackcoin.enabled || this.setting.tradeBlackcoin.trigger === -1;
              },
              onSetTrigger: () => {
                Dialog.prompt(
                  host,
                  host.engine.i18n("ui.trigger.crypto.promptTitle"),
                  host.engine.i18n("ui.trigger.crypto.prompt", [
                    host.renderAbsolute(this.setting.tradeBlackcoin.trigger, locale.selected)
                  ]),
                  host.renderAbsolute(this.setting.tradeBlackcoin.trigger),
                  host.engine.i18n("ui.trigger.crypto.promptExplainer")
                ).then((value) => {
                  if (value === void 0 || value === "" || value.startsWith("-")) {
                    return;
                  }
                  this.setting.tradeBlackcoin.trigger = host.parseAbsolute(value) ?? this.setting.tradeBlackcoin.trigger;
                }).then(() => {
                  this.refreshUi();
                }).catch(redirectErrorsToConsole(console));
              }
            }
          ),
          {
            children: [
              new BuyButton(host, this.setting.tradeBlackcoin, locale),
              new SellButton(host, this.setting.tradeBlackcoin, locale)
            ]
          }
        )
      );
      this.addChild(listRaces);
      const listAddition = new SettingsList(host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      listAddition.addChild(new HeaderListItem(host, host.engine.i18n("ui.additional")));
      listAddition.addChild(new EmbassySettingsUi(host, this.setting.buildEmbassies, locale));
      listAddition.addChild(
        new SettingListItem(host, this.setting.unlockRaces, host.engine.i18n("ui.upgrade.races"), {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [host.engine.i18n("ui.upgrade.races")]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [host.engine.i18n("ui.upgrade.races")]);
          }
        })
      );
      this.addChild(listAddition);
    }
    _getTradeOption(host, option, locale, sectionSetting, label2, sectionLabel, delimiter2 = false, upgradeIndicator = false) {
      const element = new SettingLimitedTriggerListItem(host, option, locale, label2, {
        onCheck: () => {
          host.engine.imessage("status.sub.enable", [label2]);
        },
        onUnCheck: () => {
          host.engine.imessage("status.sub.disable", [label2]);
        },
        onLimitedCheck: () => {
          host.engine.imessage("trade.limited", [label2]);
        },
        onLimitedUnCheck: () => {
          host.engine.imessage("trade.unlimited", [label2]);
        },
        onRefresh: () => {
          element.limitedButton.inactive = !option.enabled || !option.limited;
          element.triggerButton.inactive = !option.enabled || option.trigger === -1;
          element.triggerButton.ineffective = sectionSetting.enabled && option.enabled && sectionSetting.trigger === -1 && option.trigger === -1;
          panel.expando.ineffective = sectionSetting.enabled && option.enabled && !option.seasons.autumn.enabled && !option.seasons.spring.enabled && !option.seasons.summer.enabled && !option.seasons.winter.enabled;
        },
        onRefreshTrigger: () => {
          element.triggerButton.element[0].title = host.engine.i18n("ui.trigger", [
            option.trigger < 0 ? sectionSetting.trigger < 0 ? host.engine.i18n("ui.trigger.section.blocked", [sectionLabel]) : `${host.renderPercentage(sectionSetting.trigger, locale.selected, true)} (${host.engine.i18n("ui.trigger.section.inherited")})` : host.renderPercentage(option.trigger, locale.selected, true)
          ]);
        },
        onSetTrigger: () => {
          Dialog.prompt(
            host,
            host.engine.i18n("ui.trigger.prompt.percentage"),
            host.engine.i18n("ui.trigger.section.prompt", [
              label2,
              option.trigger !== -1 ? host.renderPercentage(option.trigger, locale.selected, true) : host.engine.i18n("ui.trigger.section.inherited")
            ]),
            option.trigger !== -1 ? host.renderPercentage(option.trigger) : "",
            host.engine.i18n("ui.trigger.section.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              option.trigger = -1;
              return;
            }
            option.trigger = host.parsePercentage(value);
          }).then(() => {
            element.refreshUi();
          }).catch(redirectErrorsToConsole(console));
        },
        delimiter: delimiter2,
        upgradeIndicator
      });
      const panel = new SettingsPanel(host, option, element);
      const seasons = new SeasonsList(host, option.seasons, {
        onCheck: (label22) => {
          host.engine.imessage("trade.season.enable", [ucfirst(label22), label22]);
          element.refreshUi();
        },
        onUnCheck: (label22) => {
          host.engine.imessage("trade.season.disable", [ucfirst(label22), label22]);
          element.refreshUi();
        }
      });
      panel.addChild(seasons);
      return panel;
    }
  }
  const spacer = "_spacer_o1key_43";
  const ui = "_ui_o1key_48";
  const showActivity = "_showActivity_o1key_65";
  const styles = {
    spacer,
    ui,
    showActivity
  };
  class VillageSettingsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.distribute");
      super(
        host,
        settings,
        new SettingListItem(host, settings, label2, {
          childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          }
        })
      );
      __publicField(this, "_hunt");
      __publicField(this, "_festivals");
      __publicField(this, "_promoteKittens");
      __publicField(this, "_promoteLeader");
      __publicField(this, "_electLeader");
      const listJobs = new SettingsList(host, {
        children: host.game.village.jobs.filter((item) => !isNil(this.setting.jobs[item.name])).map(
          (job) => this._getDistributeOption(
            host,
            this.setting.jobs[job.name],
            locale.selected,
            settings,
            job.title
          )
        )
      });
      this.addChild(listJobs);
      const listAddition = new SettingsList(host, {
        hasDisableAll: false,
        hasEnableAll: false
      });
      listAddition.addChild(new HeaderListItem(host, host.engine.i18n("ui.additional")));
      this._hunt = new SettingTriggerListItem(
        host,
        this.setting.hunt,
        locale,
        host.engine.i18n("option.hunt"),
        {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [host.engine.i18n("option.hunt")]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [host.engine.i18n("option.hunt")]);
          },
          onRefresh: () => {
            this._hunt.triggerButton.inactive = !this.setting.hunt.enabled;
            this._hunt.triggerButton.ineffective = this.setting.enabled && this.setting.hunt.enabled && this.setting.hunt.trigger === -1;
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.hunt.prompt", [
                host.renderPercentage(this.setting.hunt.trigger, locale.selected, true)
              ]),
              host.renderPercentage(this.setting.hunt.trigger),
              host.engine.i18n("ui.trigger.hunt.promptExplainer")
            ).then((value) => {
              if (value === void 0 || value === "" || value.startsWith("-")) {
                return;
              }
              this.setting.hunt.trigger = host.parsePercentage(value);
            }).then(() => {
              this._hunt.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        }
      );
      this._hunt.triggerButton.element.addClass(stylesButton.lastHeadAction);
      listAddition.addChild(this._hunt);
      this._festivals = new SettingListItem(
        host,
        this.setting.holdFestivals,
        host.engine.i18n("option.festival"),
        {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [host.engine.i18n("option.festival")]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [host.engine.i18n("option.festival")]);
          }
        }
      );
      listAddition.addChild(this._festivals);
      this._promoteKittens = new SettingTriggerListItem(
        host,
        this.setting.promoteKittens,
        locale,
        host.engine.i18n("option.promotekittens"),
        {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [host.engine.i18n("option.promotekittens")]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [host.engine.i18n("option.promotekittens")]);
          },
          onRefresh: () => {
            this._promoteKittens.triggerButton.inactive = !this.setting.promoteKittens.enabled;
            this._promoteKittens.triggerButton.ineffective = this.setting.enabled && this.setting.promoteKittens.enabled && this.setting.promoteKittens.trigger === -1;
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.promoteKittens.promptTitle"),
              host.engine.i18n("ui.trigger.promoteKittens.prompt", [
                host.renderPercentage(this.setting.promoteKittens.trigger, locale.selected, true)
              ]),
              host.renderPercentage(this.setting.promoteKittens.trigger),
              host.engine.i18n("ui.trigger.promoteKittens.promptExplainer")
            ).then((value) => {
              if (value === void 0 || value === "" || value.startsWith("-")) {
                return;
              }
              this.setting.promoteKittens.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        }
      );
      this._promoteKittens.triggerButton.element.addClass(stylesButton.lastHeadAction);
      listAddition.addChild(this._promoteKittens);
      this._promoteLeader = new SettingListItem(
        host,
        this.setting.promoteLeader,
        host.engine.i18n("option.promote"),
        {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [host.engine.i18n("option.promote")]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [host.engine.i18n("option.promote")]);
          }
        }
      );
      listAddition.addChild(this._promoteLeader);
      for (const option of this.setting.electLeader.job.options) {
        if (option.value === "any") {
          option.label = host.engine.i18n("option.elect.job.any");
        } else {
          option.label = host.engine.i18n(`$village.job.${option.value}`);
        }
      }
      for (const option of this.setting.electLeader.trait.options) {
        option.label = host.engine.i18n(`$village.trait.${option.value}`);
      }
      this._electLeader = new SettingListItem(
        host,
        this.setting.electLeader,
        host.engine.i18n("option.elect"),
        {
          children: [
            new OptionsListItem(
              host,
              host.engine.i18n("option.elect.job"),
              this.setting.electLeader.job
            ),
            new OptionsListItem(
              host,
              host.engine.i18n("option.elect.trait"),
              this.setting.electLeader.trait
            )
          ],
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [host.engine.i18n("option.elect")]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [host.engine.i18n("option.elect")]);
          }
        }
      );
      listAddition.addChild(this._electLeader);
      this.addChild(listAddition);
    }
    _getDistributeOption(host, option, locale, sectionSetting, label2, delimiter2 = false) {
      const onSetMax = () => {
        Dialog.prompt(
          host,
          host.engine.i18n("ui.max.distribute.prompt", [label2]),
          host.engine.i18n("ui.max.distribute.promptTitle", [
            label2,
            host.renderAbsolute(option.max, locale)
          ]),
          host.renderAbsolute(option.max),
          host.engine.i18n("ui.max.distribute.promptExplainer")
        ).then((value) => {
          if (value === void 0) {
            return;
          }
          if (value === "" || value.startsWith("-")) {
            option.max = -1;
            return;
          }
          if (value === "0") {
            option.enabled = false;
          }
          option.max = host.parseAbsolute(value) ?? option.max;
        }).then(() => {
          this.refreshUi();
        }).catch(redirectErrorsToConsole(console));
      };
      const element = new SettingMaxListItem(host, option, label2, {
        childrenHead: [new Container(host, { classes: [stylesLabelListItem.fillSpace] })],
        delimiter: delimiter2,
        onCheck: () => {
          host.engine.imessage("status.sub.enable", [label2]);
          if (option.max === 0) {
            onSetMax();
          }
        },
        onUnCheck: () => {
          host.engine.imessage("status.sub.disable", [label2]);
        },
        onRefresh: () => {
          element.maxButton.inactive = !option.enabled || option.max === -1;
          element.maxButton.ineffective = sectionSetting.enabled && option.enabled && option.max === 0;
        },
        onRefreshMax: () => {
          element.maxButton.updateLabel(host.renderAbsolute(option.max));
          element.maxButton.element[0].title = option.max < 0 ? host.engine.i18n("ui.max.distribute.titleInfinite", [label2]) : option.max === 0 ? host.engine.i18n("ui.max.distribute.titleZero", [label2]) : host.engine.i18n("ui.max.distribute.title", [
            host.renderAbsolute(option.max),
            label2
          ]);
        },
        onSetMax
      });
      element.maxButton.element.addClass(stylesButton.lastHeadAction);
      return element;
    }
  }
  class UpgradeSettingsUi extends SettingsPanel {
    constructor(host, settings, locale, options) {
      const label2 = host.engine.i18n("ui.upgrade.upgrades");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          },
          onRefresh: (item) => {
            item.triggerButton.inactive = !settings.enabled || settings.trigger === -1;
          },
          onRefreshTrigger: (item) => {
            item.triggerButton.element[0].title = host.engine.i18n("ui.trigger", [
              settings.trigger === -1 ? host.engine.i18n("ui.trigger.section.inactive") : host.renderPercentage(settings.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                settings.trigger !== -1 ? host.renderPercentage(settings.trigger, locale.selected, true) : host.engine.i18n("ui.infinity")
              ]),
              settings.trigger !== -1 ? host.renderPercentage(settings.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                settings.trigger = -1;
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        }),
        options
      );
      const upgrades = host.game.workshop.upgrades.filter(
        (upgrade) => !isNil(this.setting.upgrades[upgrade.name])
      );
      const items = [];
      let lastLabel = upgrades[0].label;
      let lastElement;
      for (const upgrade of upgrades.sort(
        (a, b) => a.label.localeCompare(b.label, locale.selected)
      )) {
        const option = this.setting.upgrades[upgrade.name];
        const element = new SettingTriggerListItem(host, option, locale, upgrade.label, {
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [upgrade.label]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [upgrade.label]);
          },
          onRefresh: () => {
            element.triggerButton.inactive = !option.enabled || option.trigger === -1;
            element.triggerButton.ineffective = settings.enabled && option.enabled && settings.trigger === -1 && option.trigger === -1;
          },
          onRefreshTrigger: () => {
            element.triggerButton.element[0].title = host.engine.i18n("ui.trigger", [
              option.trigger < 0 ? settings.trigger < 0 ? host.engine.i18n("ui.trigger.build.blocked", [label2]) : `${host.renderPercentage(settings.trigger, locale.selected, true)} (${host.engine.i18n("ui.trigger.section.inherited")})` : host.renderPercentage(option.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                option.trigger !== -1 ? host.renderPercentage(option.trigger, locale.selected, true) : host.engine.i18n("ui.trigger.section.inherited")
              ]),
              option.trigger !== -1 ? host.renderPercentage(option.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                option.trigger = -1;
                return;
              }
              option.trigger = host.parsePercentage(value);
            }).then(() => {
              element.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        });
        element.triggerButton.element.addClass(stylesButton.lastHeadAction);
        if (host.engine.localeSupportsFirstLetterSplits(locale.selected)) {
          if (lastLabel[0] !== upgrade.label[0]) {
            if (!isNil(lastElement)) {
              lastElement.element.addClass(stylesDelimiter.delimiter);
            }
            element.element.addClass(stylesLabelListItem.splitter);
          }
        }
        lastElement = element;
        items.push(element);
        lastLabel = upgrade.label;
      }
      this.addChild(new SettingsList(host, { children: items }));
    }
  }
  class WorkshopCraftListItem extends SettingListItem {
    constructor(host, setting2, locale, label2, options) {
      super(host, setting2, label2, options);
      __publicField(this, "limitedButton");
      __publicField(this, "maxButton");
      __publicField(this, "triggerButton");
      this.limitedButton = new LimitedButton(host, setting2, {
        ...options,
        classes: [stylesListItem.headAction]
      });
      this.maxButton = new MaxButton(host, setting2, {
        alignment: "right",
        border: false,
        classes: [stylesButton.headAction],
        onClick: (options == null ? void 0 : options.onSetMax) ? () => {
          var _a;
          return (_a = options.onSetMax) == null ? void 0 : _a.call(options, this);
        } : void 0,
        onRefresh: (options == null ? void 0 : options.onRefreshMax) ? () => {
          var _a;
          return (_a = options.onRefreshMax) == null ? void 0 : _a.call(options, this);
        } : void 0
      });
      this.triggerButton = new TriggerButton(host, setting2, locale, {
        border: false,
        classes: [stylesButton.lastHeadAction],
        onClick: (options == null ? void 0 : options.onSetTrigger) ? () => {
          var _a;
          return (_a = options.onSetTrigger) == null ? void 0 : _a.call(options, this);
        } : void 0,
        onRefreshTitle: (options == null ? void 0 : options.onRefreshTrigger) ? () => {
          var _a;
          return (_a = options.onRefreshTrigger) == null ? void 0 : _a.call(options, this);
        } : void 0
      });
      this.head.addChildren([
        new Container(host, { classes: [stylesLabelListItem.fillSpace] }),
        this.limitedButton,
        this.maxButton,
        this.triggerButton
      ]);
    }
    refreshUi() {
      super.refreshUi();
      this.limitedButton.refreshUi();
      this.maxButton.refreshUi();
      this.triggerButton.refreshUi();
    }
  }
  class WorkshopSettingsUi extends SettingsPanel {
    constructor(host, settings, locale) {
      const label2 = host.engine.i18n("ui.craft");
      super(
        host,
        settings,
        new SettingTriggerListItem(host, settings, locale, label2, {
          onCheck: () => {
            host.engine.imessage("status.auto.enable", [label2]);
          },
          onUnCheck: () => {
            host.engine.imessage("status.auto.disable", [label2]);
          },
          onRefresh: (item) => {
            item.triggerButton.inactive = !settings.enabled || settings.trigger === -1;
          },
          onRefreshTrigger: (item) => {
            item.triggerButton.element[0].title = host.engine.i18n("ui.trigger.section", [
              settings.trigger < 0 ? host.engine.i18n("ui.trigger.section.inactive") : host.renderPercentage(settings.trigger, locale.selected, true)
            ]);
          },
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label2,
                settings.trigger !== -1 ? host.renderPercentage(settings.trigger, locale.selected, true) : host.engine.i18n("ui.infinity")
              ]),
              settings.trigger !== -1 ? host.renderPercentage(settings.trigger) : "",
              host.engine.i18n("ui.trigger.section.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                settings.trigger = -1;
                return;
              }
              settings.trigger = host.parsePercentage(value);
            }).then(() => {
              this.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        })
      );
      __publicField(this, "_crafts");
      let excludeCraftsArray = [];
      if (!game.challenges.getChallenge("ironWill").active) {
        this.setting.resources.bloodstone.enabled = false;
        this.setting.resources.tMythril.enabled = false;
        excludeCraftsArray = ["bloodstone", "tMythril"];
      }
      const preparedCrafts = host.game.workshop.crafts.filter(
        (item) => !excludeCraftsArray.includes(item.name) && !isNil(this.setting.resources[item.name])
      ).map((resource) => [this.setting.resources[resource.name], ucfirst(resource.label)]);
      this._crafts = [];
      for (const [option, label22] of preparedCrafts) {
        const onSetMax = () => {
          Dialog.prompt(
            host,
            host.engine.i18n("ui.max.craft.prompt", [label22]),
            host.engine.i18n("ui.max.craft.promptTitle", [
              label22,
              host.renderAbsolute(option.max, locale.selected)
            ]),
            host.renderAbsolute(option.max),
            host.engine.i18n("ui.max.craft.promptExplainer")
          ).then((value) => {
            if (value === void 0) {
              return;
            }
            if (value === "" || value.startsWith("-")) {
              option.max = -1;
              return;
            }
            if (value === "0") {
              option.enabled = false;
            }
            option.max = host.parseAbsolute(value) ?? option.max;
          }).then(() => {
            this.refreshUi();
          }).catch(redirectErrorsToConsole(console));
        };
        const element = new WorkshopCraftListItem(host, option, locale, label22, {
          delimiter: option.resource === "kerosene" || option.resource === "blueprint",
          onCheck: () => {
            host.engine.imessage("status.sub.enable", [label22]);
            if (option.max === 0) {
              onSetMax();
            }
          },
          onUnCheck: () => {
            host.engine.imessage("status.sub.disable", [label22]);
          },
          onLimitedCheck: () => {
            host.engine.imessage("craft.limited", [label22]);
          },
          onLimitedUnCheck: () => {
            host.engine.imessage("craft.unlimited", [label22]);
          },
          onRefresh: () => {
            element.limitedButton.inactive = !option.enabled || !option.limited;
            element.maxButton.inactive = !option.enabled || option.max === -1;
            element.maxButton.ineffective = settings.enabled && option.enabled && option.max === 0;
            element.triggerButton.inactive = !option.enabled || option.trigger === -1;
            element.triggerButton.ineffective = settings.enabled && option.enabled && settings.trigger === -1 && option.trigger === -1;
          },
          onRefreshMax: () => {
            element.maxButton.updateLabel(host.renderAbsolute(option.max));
            element.maxButton.element[0].title = option.max < 0 ? host.engine.i18n("ui.max.craft.titleInfinite", [label22]) : option.max === 0 ? host.engine.i18n("ui.max.craft.titleZero", [label22]) : host.engine.i18n("ui.max.craft.title", [host.renderAbsolute(option.max), label22]);
          },
          onRefreshTrigger: () => {
            element.triggerButton.element[0].title = host.engine.i18n("ui.trigger", [
              option.trigger < 0 ? settings.trigger < 0 ? host.engine.i18n("ui.trigger.build.blocked", [label22]) : `${host.renderPercentage(settings.trigger, locale.selected, true)} (${host.engine.i18n("ui.trigger.build.inherited")})` : host.renderPercentage(option.trigger, locale.selected, true)
            ]);
          },
          onSetMax,
          onSetTrigger: () => {
            Dialog.prompt(
              host,
              host.engine.i18n("ui.trigger.prompt.percentage"),
              host.engine.i18n("ui.trigger.section.prompt", [
                label22,
                option.trigger !== -1 ? host.renderPercentage(option.trigger, locale.selected, true) : host.engine.i18n("ui.trigger.build.inherited")
              ]),
              option.trigger !== -1 ? host.renderPercentage(option.trigger) : "",
              host.engine.i18n("ui.trigger.build.promptExplainer")
            ).then((value) => {
              if (value === void 0) {
                return;
              }
              if (value === "" || value.startsWith("-")) {
                option.trigger = -1;
                return;
              }
              option.trigger = host.parsePercentage(value);
            }).then(() => {
              element.refreshUi();
            }).catch(redirectErrorsToConsole(console));
          }
        });
        this._crafts.push(element);
        if (option.resource === "ship") {
          this._crafts.push(
            new SettingListItem(
              host,
              this.setting.shipOverride,
              host.engine.i18n("option.shipOverride"),
              {
                onCheck: () => {
                  host.engine.imessage("status.sub.enable", [
                    host.engine.i18n("option.shipOverride")
                  ]);
                },
                onUnCheck: () => {
                  host.engine.imessage("status.sub.disable", [
                    host.engine.i18n("option.shipOverride")
                  ]);
                },
                upgradeIndicator: true
              }
            )
          );
        }
      }
      const listCrafts = new SettingsList(host, {
        children: this._crafts,
        onReset: () => {
          this.setting.load({ resources: new WorkshopSettings().resources });
          this.refreshUi();
        }
      });
      this.addChild(listCrafts);
      this.addChild(
        new SettingsList(host, {
          children: [new UpgradeSettingsUi(host, this.setting.unlockUpgrades, locale)],
          hasDisableAll: false,
          hasEnableAll: false
        })
      );
    }
  }
  class UserInterface extends UiComponent {
    constructor(host) {
      super(host);
      __publicField(this, "element");
      __publicField(this, "showActivity");
      __publicField(this, "_engineUi");
      __publicField(this, "_sections");
      __publicField(this, "stateManagementUi");
      const engine = host.engine;
      this._engineUi = new EngineSettingsUi(host, engine.settings);
      this.stateManagementUi = new StateManagementUi(
        host,
        engine.settings.states,
        engine.settings.locale
      );
      this._sections = [
        new BonfireSettingsUi(host, engine.bonfireManager.settings, engine.settings.locale),
        new VillageSettingsUi(host, engine.villageManager.settings, engine.settings.locale),
        new ScienceSettingsUi(host, engine.scienceManager.settings, engine.settings.locale),
        new WorkshopSettingsUi(host, engine.workshopManager.settings, engine.settings.locale),
        new ResourcesSettingsUi(host, engine.settings.resources, engine.settings.locale),
        new TradeSettingsUi(host, engine.tradeManager.settings, engine.settings.locale),
        new ReligionSettingsUi(host, engine.religionManager.settings, engine.settings.locale),
        new SpaceSettingsUi(host, engine.spaceManager.settings, engine.settings.locale),
        new TimeSettingsUi(host, engine.timeManager.settings, engine.settings.locale),
        new TimeControlSettingsUi(host, engine.timeControlManager.settings, engine.settings.locale),
        new LogFiltersSettingsUi(host, engine.settings.filters),
        this.stateManagementUi,
        new InternalsUi(host, engine.settings, engine.settings.locale)
      ];
      const ks = $("<div/>").addClass(styles.ui);
      const optionsListElement = $("<ul/>");
      optionsListElement.append(this._engineUi.element);
      for (const section of this._sections) {
        optionsListElement.append(section.element);
      }
      ks.append(optionsListElement);
      const expando = this._engineUi.expando;
      let sectionsVisible = false;
      expando.element.on("click", () => {
        sectionsVisible = !sectionsVisible;
        for (const section of this._sections) {
          section.toggle(sectionsVisible, true);
        }
      });
      let panelsOpen = 0;
      for (const section of this._sections) {
        section.addEventListener("panelHidden", () => {
          --panelsOpen;
          if (panelsOpen === 0) {
            sectionsVisible = false;
          }
          if (!sectionsVisible) {
            expando.setCollapsed();
          }
        });
        section.addEventListener("panelShown", () => {
          ++panelsOpen;
          sectionsVisible = true;
          expando.setExpanded();
        });
      }
      this.showActivity = $("<span/>", {
        html: `<svg style="width: 18px; height: 18px;" viewBox="0 -960 960 960" fill="currentColor"><path d="${Icons.Summary}"/></svg>`,
        title: host.engine.i18n("summary.show")
      }).addClass(styles.showActivity);
      this.showActivity.on("click", () => {
        host.engine.displayActivitySummary();
      });
      $("#clearLog").prepend(this.showActivity);
      if (engine.settings.ksColumn.enabled) {
        $("#rightColumn").after(
          `<div id="ksColumn" class="column"><span class="${styles.spacer}"></span></div>`
        );
      } else {
        $("#ksColumn").remove();
      }
      const right = $(engine.settings.ksColumn.enabled ? "#ksColumn" : "#rightColumn");
      if (right.length === 0) {
        const optionsPageContent = $("#optionsPage .full-screen-position .page .page-content");
        if (optionsPageContent.length === 0) {
          cwarn("Unable to find right column to inject UI into. Running headless.");
        } else {
          optionsPageContent.append(ks);
          ks.attr("style", "border-top:1px solid grey; padding:15px");
        }
      } else {
        right.prepend(ks);
      }
      this.element = ks;
    }
    destroy() {
      this.showActivity.remove();
      this.element.remove();
    }
    refreshUi() {
      this._engineUi.refreshUi();
      for (const section of this._sections) {
        section.refreshUi();
      }
    }
  }
  const ksVersion = (prefix = "") => {
    if (isNil("2.0.0-henry")) {
      throw Error("Build error: RELEASE_VERSION is not defined.");
    }
    return `${prefix}${"2.0.0-henry"}`;
  };
  class KittenScientists {
    constructor(game2, i18nEngine, gameLanguage = "en", engineState) {
      __publicField(this, "game");
      __publicField(this, "i18nEngine");
      __publicField(this, "_userInterface");
      __publicField(this, "engine");
      __publicField(this, "_gameBeforeSaveHandle");
      __publicField(this, "_serverLoadHandle");
      __publicField(this, "_saveManager", {
        load: (saveData) => {
          cinfo("Looking for Kitten Scientists engine state in save data...");
          const state = UserScriptLoader.tryEngineStateFromSaveData("ks", saveData);
          if (!state) {
            cinfo("The Kittens Game save data did not contain a script state.");
            return;
          }
          cinfo("Found Kitten Scientists engine state in save data.");
          this.engine.stateLoad(state);
          this.refreshUi();
        },
        resetState: () => null,
        save: (_saveData) => {
        }
      });
      var _a;
      cinfo(`Kitten Scientists ${ksVersion("v")} constructed. Checking for previous instances...`);
      if ("kittenScientists" in UserScriptLoader.window) {
        cwarn("Detected existing KS instance. Trying to unload it...");
        (_a = UserScriptLoader.window.kittenScientists) == null ? void 0 : _a.unload();
      }
      cinfo(`You are on the '${String("fixed")}' release channel.`);
      this.game = game2;
      this.i18nEngine = i18nEngine;
      try {
        this.engine = new Engine(this, gameLanguage);
        this._userInterface = this._constructUi();
      } catch (error) {
        cerror("Failed to construct core components.", error);
        throw error;
      }
      if (!isNil(engineState)) {
        this.setSettings(engineState);
      }
    }
    _constructUi() {
      const ui2 = new UserInterface(this);
      ui2.stateManagementUi.loadAutoSave();
      ui2.refreshUi();
      return ui2;
    }
    rebuildUi() {
      this._userInterface.destroy();
      this._userInterface = this._constructUi();
    }
    validateGame() {
      ScienceSettings.validateGame(this.game, this.engine.scienceManager.settings);
      SpaceSettings.validateGame(this.game, this.engine.spaceManager.settings);
      WorkshopSettings.validateGame(this.game, this.engine.workshopManager.settings);
    }
    unload() {
      cwarn("Unloading Kitten Scientists...");
      this.engine.stop();
      this._userInterface.destroy();
      $("#ks-styles").remove();
      if (this._gameBeforeSaveHandle !== void 0) {
        UserScriptLoader.window.dojo.unsubscribe(this._gameBeforeSaveHandle);
        this._gameBeforeSaveHandle = void 0;
      }
      if (this._serverLoadHandle !== void 0) {
        UserScriptLoader.window.dojo.unsubscribe(this._serverLoadHandle);
        this._gameBeforeSaveHandle = void 0;
      }
      const managerIndex = this.game.managers.indexOf(this._saveManager);
      if (-1 < managerIndex) {
        this.game.managers.splice(managerIndex, 1);
      }
      window.kittenScientists = void 0;
      cwarn("Kitten Scientists have been unloaded!");
    }
    run() {
      this.game.console.maxMessages = 1e3;
      this.refreshUi();
      if (this.engine.settings.enabled) {
        this.engine.start(true);
      }
      this.engine.imessage("status.ks.init");
      this.runUpdateCheck().catch(redirectErrorsToConsole(console));
      if (this._gameBeforeSaveHandle !== void 0) {
        UserScriptLoader.window.dojo.unsubscribe(this._gameBeforeSaveHandle);
        this._gameBeforeSaveHandle = void 0;
      }
      this._gameBeforeSaveHandle = UserScriptLoader.window.dojo.subscribe(
        "game/beforesave",
        (saveData) => {
          cinfo("Injecting Kitten Scientists engine state into save data...");
          const state = this.getSettings();
          saveData.ks = { state: [state] };
          this._userInterface.stateManagementUi.storeAutoSave(state);
          document.dispatchEvent(
            new CustomEvent("ks.reportSavegame", { detail: saveData })
          );
        }
      );
      if (this._serverLoadHandle !== void 0) {
        UserScriptLoader.window.dojo.unsubscribe(this._serverLoadHandle);
        this._gameBeforeSaveHandle = void 0;
      }
      this._serverLoadHandle = UserScriptLoader.window.dojo.subscribe(
        "server/load",
        (saveData) => {
          const state = UserScriptLoader.tryEngineStateFromSaveData("ks", saveData);
          if (!state) {
            cinfo(
              "The Kittens Game save data did not contain a script state. Trying to load Auto-Save settings..."
            );
            return;
          }
          cinfo("Found! Loading settings...");
          this.engine.stateLoad(state);
        }
      );
    }
    async runUpdateCheck() {
      {
        cdebug("No update check on 'fixed' release channel.");
        return;
      }
    }
    refreshUi() {
      this._userInterface.refreshUi();
    }
    parseFloat(value) {
      if (value === null || value === "") {
        return null;
      }
      const hasSuffix = /[KMGTP]$/i.test(value);
      const baseValue = value.substring(0, value.length - (hasSuffix ? 1 : 0));
      let numericValue = value.includes("e") || hasSuffix ? Number.parseFloat(baseValue) : Number.parseInt(baseValue);
      if (hasSuffix) {
        const suffix = value.substring(value.length - 1).toUpperCase();
        numericValue = numericValue * 1e3 ** ["", "K", "M", "G", "T", "P"].indexOf(suffix);
      }
      if (numericValue === Number.POSITIVE_INFINITY || numericValue < 0) {
        numericValue = -1;
      }
      return numericValue;
    }
    parseAbsolute(value) {
      const floatValue = this.parseFloat(value);
      return floatValue !== null ? Math.round(floatValue) : null;
    }
    parsePercentage(value) {
      const cleanedValue = value.trim().replace(/%$/, "");
      return Math.max(0, Math.min(1, Number.parseFloat(cleanedValue) / 100));
    }
    renderAbsolute(value, locale = "invariant") {
      if (value < 0 || value === Number.POSITIVE_INFINITY) {
        return "∞";
      }
      return locale !== "invariant" && Math.floor(Math.log10(value)) < 9 ? new Intl.NumberFormat(locale, { style: "decimal", maximumFractionDigits: 0 }).format(value) : this.game.getDisplayValueExt(value, false, false);
    }
    renderPercentage(value, locale = "invariant", withUnit) {
      if (value < 0 || value === Number.POSITIVE_INFINITY) {
        return "∞";
      }
      return locale !== "invariant" ? new Intl.NumberFormat(locale, { style: "percent" }).format(value) : `${this.game.getDisplayValueExt(value * 100, false, false)}${withUnit ? "%" : ""}`;
    }
    renderFloat(value, locale = "invariant") {
      if (value < 0 || value === Number.POSITIVE_INFINITY) {
        return "∞";
      }
      return locale !== "invariant" ? new Intl.NumberFormat(locale, { style: "decimal" }).format(value) : this.game.getDisplayValueExt(value, false, false);
    }
    static encodeSettings(settings, compress = true) {
      const settingsString = JSON.stringify(settings);
      return compress ? window.LZString.compressToBase64(settingsString) : settingsString;
    }
    static decodeSettings(compressedSettings) {
      try {
        const naiveParse = JSON.parse(compressedSettings);
        return KittenScientists.unknownAsEngineStateOrThrow(naiveParse);
      } catch (_error) {
      }
      const settingsString = window.LZString.decompressFromBase64(compressedSettings);
      const parsed = JSON.parse(settingsString);
      return KittenScientists.unknownAsEngineStateOrThrow(parsed);
    }
    getSettings() {
      return this.engine.stateSerialize();
    }
    getSettingsAsJson() {
      return JSON.stringify(this.getSettings());
    }
    setSettings(settings) {
      cinfo("Loading engine state...");
      this.engine.stateLoad(settings);
      if (settings.engine.ksColumn.enabled) {
        this.rebuildUi();
      } else {
        this._userInterface.refreshUi();
      }
    }
    importSettingsFromString(encodedSettings) {
      const settings = KittenScientists.decodeSettings(encodedSettings);
      this.setSettings(settings);
    }
    async copySettings(settings = this.getSettings(), compress = true) {
      const encodedSettings = KittenScientists.encodeSettings(settings, compress);
      await window.navigator.clipboard.writeText(encodedSettings);
    }
    static unknownAsEngineStateOrThrow(subject) {
      const v = subject.v;
      if (!isNil(v) && typeof v === "string") {
        if (v.startsWith("2")) {
          return subject;
        }
      }
      throw new Error("Not a valid engine state.");
    }
    installSaveManager() {
      cinfo("Installing save game manager...");
      this.game.managers.push(this._saveManager);
    }
  }
  (async () => {
    const userScript = await new UserScriptLoader().waitForGame(KittenScientists, "ks");
    window.kittenScientists = userScript;
    userScript.validateGame();
    userScript.run();
  })().catch(cerror);
});
(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.id = "ks-styles";
      elementStyle.appendChild(document.createTextNode('@keyframes _hail-rainbow_q7zpt_1 {\n  0%,\n  100% {\n    color: red;\n    text-shadow: 0 0 10px red;\n  }\n  33% {\n    color: #888;\n    text-shadow: 0 0 10px yellow;\n  }\n  66% {\n    color: white;\n    text-shadow: 0 0 10px black;\n  }\n}\n\n._iconButton_q7zpt_17 {\n  cursor: pointer;\n  display: block;\n  padding-right: 3px;\n  line-height: 0;\n  opacity: 0.8;\n  transition: 0.3s;\n\n  &:hover {\n    opacity: 1;\n  }\n\n  &._inactive_q7zpt_29 {\n    opacity: 0.4;\n\n    &:hover {\n      opacity: 0.6;\n    }\n  }\n\n  &._ineffective_q7zpt_37 {\n    color: red;\n    animation: _hail-rainbow_q7zpt_1 5s linear infinite;\n  }\n}\n\n._button_q7zpt_43 {\n  align-items: end;\n  cursor: pointer;\n  display: flex;\n  opacity: 0.8;\n  transition: 0.3s;\n\n  &:hover {\n    opacity: 1;\n  }\n\n  &._inactive_q7zpt_29 {\n    opacity: 0.4;\n\n    &:hover {\n      opacity: 0.6;\n    }\n  }\n\n  &._ineffective_q7zpt_37 {\n    color: red;\n    animation: _hail-rainbow_q7zpt_1 5s linear infinite;\n  }\n\n  &._readonly_q7zpt_67 {\n    cursor: default;\n    pointer-events: none;\n  }\n\n  ._buttonIcon_q7zpt_72 {\n    margin: 0 2px 0 0;\n    vertical-align: sub;\n  }\n\n  &._alignRight_q7zpt_77 {\n    justify-content: end;\n  }\n\n  &._large_q7zpt_81 {\n    padding: 5px 10px;\n  }\n\n  &._bordered_q7zpt_85 {\n    border: 1px solid rgba(180, 180, 180, 0.2);\n\n    &:not(._large_q7zpt_81) {\n      padding: 0 2px;\n    }\n\n    &:hover {\n      border: 1px solid rgba(180, 180, 180, 1);\n    }\n  }\n\n  &._headAction_q7zpt_97 {\n    min-width: 50px;\n  }\n  &._lastHeadAction_q7zpt_100 {\n    padding-right: 20px;\n  }\n\n  &._consumeButton_q7zpt_104 {\n    border: 1px solid transparent;\n  }\n  &._stockButton_q7zpt_107 {\n    border: 1px solid transparent;\n  }\n}\n\n._button_q7zpt_43:not(._bordered_q7zpt_85) + ._button_q7zpt_43:not(._bordered_q7zpt_85):before {\n  content: "";\n  display: inline-block;\n  height: 1em;\n  border-left: 1px solid transparent;\n}\n._button_q7zpt_43:not(._bordered_q7zpt_85):not(._inactive_q7zpt_29)._alignRight_q7zpt_77 + ._button_q7zpt_43:not(._bordered_q7zpt_85):not(._inactive_q7zpt_29):before {\n  content: "";\n  display: inline-block;\n  height: 1em;\n  border-left: 1px solid rgba(180, 180, 180, 0.4);\n}\n._delimiter_16hnh_1 {\n  margin-bottom: 10px;\n}\n#gamePageContainer .dialog.help._dialog_b4vj0_1 {\n  display: flex;\n  flex-direction: column;\n  height: fit-content !important;\n  box-shadow: none !important;\n\n  ._close_b4vj0_7 {\n    position: absolute;\n    top: 10px;\n    right: 15px;\n  }\n}\n._explainer_121s0_1 {\n  color: #888;\n  display: inline-block;\n  min-width: 100px;\n  user-select: none;\n  padding: 4px;\n  user-select: none;\n  white-space: break-spaces;\n}\n._explainer_121s0_1 p {\n  margin: 0;\n}\n._header_19ql8_1 {\n  display: block;\n  margin-bottom: 3px;\n  min-width: 100px;\n\n  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);\n\n  font-weight: bold;\n  user-select: none;\n}\n._toolbar_1654f_1 {\n  display: flex;\n  flex-direction: row;\n\n  padding: 0 0 2px 0;\n  margin: 0 0 3px 0;\n}\n._toolbar_1654f_1 > * {\n  margin: 0 3px 0 0;\n}\n._label_1nlev_1 {\n  align-content: center;\n  display: inline-block;\n  flex: 0 1 fit-content;\n  opacity: 0.8;\n\n  white-space: nowrap;\n\n  transition: 0.3s;\n\n  &:hover {\n    opacity: 1;\n  }\n}\n\n._splitter_1nlev_16 ._label_1nlev_1::first-letter {\n  font-weight: bold;\n}\n\n._iconLabel_1nlev_20 {\n  display: inline-block;\n  margin-right: 4px;\n  margin-left: 2px;\n  vertical-align: middle;\n}\n._fillSpace_1nlev_26 {\n  flex: 1;\n}\n._head_wr1pj_1 {\n  display: flex;\n  align-items: stretch;\n  flex-direction: row;\n  justify-content: flex-start;\n  width: 100%;\n\n  transition: 0.3s;\n\n  > ._headFlexItem_wr1pj_10 {\n    flex: 1;\n    margin-right: 8px;\n  }\n}\n._setting_1ndg5_1 {\n  border-bottom: 1px solid transparent;\n\n  transition: border-bottom 0.3s;\n\n  ._checkbox_1ndg5_6 {\n    margin: 1px 5px 2px 2px;\n  }\n\n  ._panelContent_1ndg5_10 {\n    border-left: 1px dashed grey;\n    padding-left: 16px;\n    margin-left: 8px;\n    margin-top: 1px;\n    opacity: 0.5;\n\n    &._hidden_1ndg5_17 {\n      display: none;\n    }\n  }\n\n  &._checked_1ndg5_22 > ._panelContent_1ndg5_10 {\n    opacity: 1;\n  }\n\n  &._expanded_1ndg5_26 {\n    margin-bottom: 10px;\n  }\n\n  &:not(._expanded_1ndg5_26):hover {\n    border-bottom: 1px dashed rgba(160, 160, 160, 0.2);\n  }\n\n  &._readonly_1ndg5_34 {\n    cursor: default;\n    pointer-events: none;\n  }\n}\n._maxButton_133h2_1 {\n  padding-right: 5px;\n  padding-top: 2px;\n}\n._listContainer_1kxbq_1 {\n  margin-bottom: 4px;\n}\n\n._itemsList_1kxbq_5 {\n  user-select: none;\n}\n\n._list_1kxbq_1 ~ ._listTools_1kxbq_9 {\n  border-top: 1px dotted rgba(128, 128, 128, 0.3);\n  margin-left: 0px;\n  padding-top: 2px;\n}\n._list_1kxbq_1 ~ ._listTools_1kxbq_9 * {\n  display: inline-block;\n}\n._expandoButton_l1ukp_1:not(._expanded_l1ukp_1) ._up_l1ukp_1 {\n  display: none;\n}\n._expandoButton_l1ukp_1:not(._expanded_l1ukp_1) ._down_l1ukp_4 {\n  opacity: 0.6;\n\n  &:hover {\n    opacity: 1;\n  }\n}\n._expandoButton_l1ukp_1._expanded_l1ukp_1 ._down_l1ukp_4 {\n  display: none;\n}\n._fieldset_tfwil_1 {\n  border-bottom: none;\n  border-right: none;\n  border-top: none;\n}\n._textButton_1mv97_1 {\n  display: inline-block;\n  white-space: nowrap;\n  opacity: 0.8;\n\n  cursor: pointer;\n  user-select: none;\n}\n._textButton_1mv97_1:hover {\n  opacity: 1;\n}\n@keyframes _scale_6c09s_1 {\n  0% {\n    scale: 0.5;\n    opacity: 0;\n  }\n  50% {\n    scale: 1;\n    opacity: 1;\n  }\n  100% {\n    scale: 2;\n    opacity: 0;\n  }\n}\n\n._active_6c09s_16 {\n  text-shadow: rgba(128, 128, 128, 0.8) 0 0 15px;\n  position: relative;\n\n  &::after,\n  &::before {\n    display: inline-block;\n    width: 1em;\n    height: 100%;\n    position: absolute;\n    right: -1.5em;\n    scale: 0;\n    text-align: center;\n    transform-origin: center;\n  }\n\n  &::after {\n    content: attr(data-ks-active-from);\n    animation: _scale_6c09s_1 8s linear infinite;\n  }\n\n  &::before {\n    content: attr(data-ks-active-to);\n    animation: _scale_6c09s_1 8s linear infinite;\n    animation-delay: 4s;\n  }\n}\n._buyButton_10eul_1 {\n  display: inline-block;\n  padding-right: 10px;\n  min-width: 86px;\n}\n._sellButton_1tmvd_1 {\n  display: inline-block;\n  padding-right: 10px;\n  min-width: 86px;\n}\n#ksColumn {\n  min-width: 250px;\n  max-width: 440px;\n  vertical-align: top;\n  padding-left: 8px;\n  top: 20px;\n  position: relative;\n  overflow-y: auto;\n}\n#footerLinks {\n  display: flex;\n  flex-direction: column;\n  position: fixed;\n  text-align: right;\n  line-height: 0;\n  right: -5px !important;\n  margin-bottom: 1em;\n\n  a {\n    line-height: 1;\n    padding-right: 10px;\n    opacity: 0.5;\n    transition: 0.3s;\n    text-decoration: none;\n    text-transform: lowercase;\n\n    &:hover {\n      opacity: 1;\n    }\n  }\n}\n#crowdjet-expand-container {\n  position: fixed !important;\n  bottom: 10px !important;\n  right: -10px !important;\n  opacity: 0.5;\n\n  &:hover {\n    opacity: 1;\n  }\n}\n\n._spacer_o1key_43 {\n  display: block;\n  margin-bottom: 100px;\n}\n\n._ui_o1key_48 {\n  margin: 5px 0 10px 0;\n  padding-right: 10px;\n\n  ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n  }\n\n  /* Rules needed to enable stock warning. */\n  #_toggle-list-resources_o1key_1 ._stockWarn_o1key_59 *,\n  #_toggle-reset-list-resources_o1key_1 ._stockWarn_o1key_59 * {\n    color: #dd1e00;\n  }\n}\n\n._showActivity_o1key_65 {\n  cursor: pointer;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n/* Ensure the right column gets a scrollbar, when our content extends it too far down. */\n#game #rightColumn {\n  overflow-y: auto;\n\n  /* Fix some double-scrollbar issues in the right column, when KS is loaded. */\n  #rightTabLog {\n    overflow-y: visible;\n\n    #gameLog {\n      height: auto;\n      min-height: auto;\n      overflow-y: visible;\n    }\n  }\n}\n\n#game .res-row .res-cell.ks-stock-above {\n  color: green;\n}\n#game .res-row .res-cell.ks-stock-below {\n  color: red;\n}\n\n/* Opinionated change to hide building group selection. */\n.bldTopContainer > a {\n  display: none !important;\n}\n.bldTopContainer > span {\n  display: none !important;\n}'));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
