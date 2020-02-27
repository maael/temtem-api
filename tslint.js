module.exports = {
  linterOptions: {
    exclude: ["node_modules", "dist", "coverage", "dev"]
  },
  rules: {
    /**
     * Enforces function overloads to be consecutive
     */
    "adjacent-overload-signatures": true,
    /**
     * Bans specific types from bening used. Does not
     * ban the corresponding runtime objects from being
     * used.
     */
    "ban-types": [
      true,
      [
        ["Object", "Avoid using the `Object` type. Did you mean `object`?"],
        [
          "Function",
          "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
        ],
        ["Boolean", "Avoid using the `Boolean` type. Did you mean `boolean`?"],
        ["Number", "Avoid using the `Number` type. Did you mean `number`?"],
        ["String", "Avoid using the `String` type. Did you mean `string`?"],
        ["Symbol", "Avoid using the `Symbol` type. Did you mean `symbol`?"]
      ]
    ],
    /**
     * Disallows internal `module`
     */
    "no-internal-module": true,
    /**
     * Disallows reassigning function parameters
     */
    "no-parameter-reassignment": true,
    /**
     * Disallows `/// <reference path=>` imports
     * (use ES6-style imports instead)
     */
    "no-reference": true,
    /**
     * Warns if a type assertion does not change
     * the type of an expression
     */
    "no-unnecessary-type-assertion": true,
    /**
     * Recommends a ‘for-of’ loop over a standard ‘for’ loop
     * if the index is only used to access the array being
     * iterated.
     */
    "prefer-for-of": true,
    /**
     * Requires any function or method that returns a promise
     * to be marked async.
     */
    "promise-function-async": true,
    /**
     * Warns for any two overloads that could be unified into
     * one by using a union or an optional/rest parameter.
     */
    "unified-signatures": true,
    /**
     * Warns for an awaited value that is not a Promise.
     */
    "await-promise": true,
    /**
     * Disallows the comma operator to be used.
     */
    "ban-comma-operator": true,
    /**
     * Disallows bitwise operators.
     */
    "no-bitwise": true,
    /**
     * Disallows any type of assignment in conditionals.
     */
    "no-conditional-assignment": true,
    /**
     * Bans the use of console.log and console.dir.
     * It's fine to use these while debugging, but they
     * should not be committed.
     */
    "no-console": [true, "log", "dir"],
    /**
     * Disallows access to the constructors of `String`,
     * `Number`, and `Boolean`.
     *
     * Disallows constructor use such as `new Number(foo)`
     * but does not disallow `Number(foo)`.
     */
    "no-construct": true,
    /**
     * Disallows `debugger;` statements.
     *
     * These are fine to use in development, but should not
     * be committed.
     */
    "no-debugger": true,
    /**
     * Warns if `super()` appears twice in a constructor.
     */
    "no-duplicate-super": true,
    /**
     * Prevents duplicate cases in switch statements.
     */
    "no-duplicate-switch-case": true,
    /**
     * Disallows duplicate variable declarations in
     * the same block scope.
     */
    "no-duplicate-variable": true,
    /**
     * Disallows empty blocks.
     *
     * Blocks with a comment inside are not considered empty.
     */
    "no-empty": true,
    /**
     * Disallows `eval` function invocations.
     */
    "no-eval": true,
    /**
     * Promises returned by functions must be handled
     * appropriately.
     *
     * Unhandled Promises can cause unexpected behavior,
     * such as resolving at unexpected times.
     */
    "no-floating-promises": true,
    /**
     * Disallows iterating over an array with a for-in loop.
     */
    "no-for-in-array": true,
    /**
     * Disallows importing modules that are not listed as
     * dependency in the project’s package.json
     *
     * Disallows importing transient dependencies and modules
     * installed above your package’s root directory.
     */
    "no-implicit-dependencies": [true, "dev", "optional"],
    /**
     * Warns on use of `${` in non-template strings.
     */
    "no-invalid-template-strings": true,
    /**
     * Disallows using the `this` keyword outside of classes.
     */
    "no-invalid-this": true,
    /**
     * Warns on apparent attempts to define constructors for
     * interfaces or new for classes.
     */
    "no-misused-new": true,
    /**
     * Forbids an object literal to appear in a type assertion
     * expression. Casting to `any` is still allowed.
     *
     * Disabled because it prevents using the new `as const` syntax
     */
    "no-object-literal-type-assertion": false,
    /**
     * Disallows shadowing variable declarations.
     */
    "no-shadowed-variable": true,
    /**
     * Forbids array literals to contain missing elements.
     */
    "no-sparse-arrays": true,
    /**
     * Forbids unnecessary string literal property access.
     * Allows `obj["prop-erty"]` (can’t be a regular property
     * access). Disallows `obj["property"]` (should be
     * `obj.property`).
     */
    "no-string-literal": true,
    /**
     * Disallows falling through case statements.
     */
    "no-switch-case-fall-through": true,
    /**
     * Disallows unnecessary references to `this`.
     *
     * Use arrow functions instead.
     */
    "no-this-assignment": true,
    /**
     * Warns when a method is used outside of a
     * method call.
     *
     * Use arrow function properties instead.
     */
    "no-unbound-method": [true, "ignore-static"],
    /**
     * Disallows classes that are not strictly necessary.
     */
    "no-unnecessary-class": true,
    /**
     * Disallows control flow statements, such as `return`,
     * `continue`, `break` and `throw` in finally blocks.
     */
    "no-unsafe-finally": true,
    /**
     * Disallows unused expression statements.
     *
     * Unused expressions are expression statements which are
     * not assignments or function calls (and thus usually no-ops).
     *
     * We allow `e && e.preventDefault();` as a short hand for
     * `if (e) e.preventDefault();`
     */
    "no-unused-expression": [true, "allow-fast-null-checks"],
    /**
     * Disallows usage of the `var` keyword.
     *
     * Use `let` or `const` instead.
     */
    "no-var-keyword": true,
    /**
     * Requires expressions of type void to
     * appear in statement position.
     */
    "no-void-expression": [true, "ignore-arrow-function-shorthand"],
    /**
     * Requires the radix parameter to be
     * specified when calling `parseInt`.
     */
    radix: true,
    /**
     * When adding two variables, operands must both
     * be of type number or of type string.
     */
    "restrict-plus-operands": true,
    /**
     * Warns for type predicates that are always true
     * or always false. Works for ‘typeof’ comparisons
     * to constants (e.g. ‘typeof foo === “string”’),
     * and equality comparison to ‘null’/’undefined’.
     * (TypeScript won’t let you compare ‘1 === 2’,
     * but it has an exception for ‘1 === undefined’.)
     * Does not yet work for ‘instanceof’. Does not
     * warn for ‘if (x.y)’ where ‘x.y’ is always truthy.
     * For that, see strict-boolean-expressions.
     *
     * This rule requires strictNullChecks to work properly.
     */
    "strict-type-predicates": true,
    /**
     * Requires `===` and `!==` in place of `==` and `!=`
     *
     * Also allows `== null` and `!= null` as a shorthand
     * for `x === null || x === undefined` and `x !== null || x !== undefined`
     */
    "triple-equals": [true, "allow-null-check"],
    /**
     * Enforces use of the isNaN() function to check for
     * NaN references instead of a comparison to the NaN
     * constant.
     */
    "use-isnan": true,
    /**
     * Warns when deprecated APIs are used.
     *
     * Any usage of an identifier with the `[at]deprecated` JSDoc
     * annotation will trigger a warning. See:
     * http://usejsdoc.org/tags-deprecated.html
     */
    deprecation: true,
    /**
     * Disallows multiple import statements from the same module.
     */
    "no-duplicate-imports": true,
    /**
     * Disallows mergeable namespaces in the same file.
     */
    "no-mergeable-namespace": true,
    /**
     * Requires that variable declarations use `const` instead of
     * `let` and `var` if possible.
     *
     * If a variable is only assigned to once when it is declared,
     * it should be declared using `const`
     */
    "prefer-const": true,
    /**
     * Requires that private variables are marked as `readonly`
     * if they’re never modified outside of the constructor.
     *
     * If a private variable is only assigned to in the constructor,
     * it should be declared as `readonly`.
     */
    "prefer-readonly": true,
    /**
     * An interface or literal type with just a call signature can
     * be written as a function type.
     */
    "callable-types": true,
    /**
     * Enforces PascalCased class and interface names.
     */
    "class-name": true,
    /**
     * Enforces UTF-8 file encoding.
     */
    encoding: true,
    /**
     * Enforces basic whitespace formatting rules for
     * JSDoc comments.
     */
    "jsdoc-format": true,
    /**
     * Requires the use of `as Type` for type assertions instead of `<Type>`.
     */
    "no-angle-bracket-type-assertion": true,
    /**
     * Disallows parameter properties in class constructors.
     */
    "no-parameter-properties": true,
    /**
     * Forbids JSDoc which duplicates TypeScript functionality.
     */
    "no-redundant-jsdoc": true,
    /**
     * Don’t <reference types="foo" /> if you import foo anyway.
     */
    "no-reference-import": true,
    /**
     * Forbids a ‘var’/’let’ statement or destructuring initializer
     * to be initialized to ‘undefined’.
     */
    "no-unnecessary-initializer": true,
    /**
     * Disallows multiple variable definitions in the same declaration statement.
     */
    "one-variable-per-declaration": true,
    /**
     * Prefer while loops instead of for loops
     * without an initializer and incrementor.
     */
    "prefer-while": true,
    /**
     * Prefer `return;` in void functions and
     * `return undefined;` in value-returning
     * functions.
     */
    "return-undefined": true,
    /**
     * Checks whether the final clause of a
     * `switch` statement ends in `break;`.
     */
    "switch-final-break": [true, "always"],
    /**
     * Disallows variable names like `any`, `Number`, `string` etc.
     */
    "variable-name": [true, "ban-keywords"]
  }
};
