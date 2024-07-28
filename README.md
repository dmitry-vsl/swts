# SWTS: Service-Worker TypeScript Transpiler

SWTS allows you to develop front-end applications in TypeScript without the need to install Node.js or bundlers. All you need is a plain web server. The transpilation is seamlessly performed within a service worker in the user's browser. #nobuild

## Is it suitable for production?

No, SWTS is intended only for development. It adds a 2.5 MB service worker and offloads the transpiling process to the user's web browser, which is not ideal for non-toy websites.

## Does it perform type-checking?

No, it only transpiles JavaScript. Use your IDE for type-checking.

## How to use

Simply download the file containing the service worker and place it in the root directory of your website. You can do this with the following command:

```
curl https://raw.githubusercontent.com/dmitry-vsl/swts/main/service-worker.js > my_site/service-worker.js
```

Then, add the service worker to your HTML file:

```html
<script>
  navigator.serviceWorker.register('/service-worker.js');
</script>
```

Now, you can use TypeScript files just like regular JavaScript files. For example, create an HTML file with the following content:

```html
<head>
  <title>SWTS "Hello, world!" Example</title>

  <script>
    navigator.serviceWorker.register('/service-worker.js');
  </script>

  <script src='./hello.ts'></script>
</head>
```

And add a `./hello.ts` file:

```typescript
function hello(message: string): void {
  document.write(`<span style='font-size: 5em'>${message}</span>`);
}

hello('Hello, world!');
```

If it doesn't work on the first try, refresh the page - the service worker may not have been installed yet.

You can try it yourself [here](https://dmitry-vsl.github.io/swts/examples/hello.html)

## Does it support ES modules?

Absolutely! See an example [here](https://dmitry-vsl.github.io/swts/examples/modules.html)

## TODO
This project is a quick prototype. The following features are missing:
- Lookup for `tsconfig.json` and load configuration
- Generate source maps
- Cache transpiled javascript
