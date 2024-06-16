import { renderers } from './renderers.mjs';
import { manifest } from './manifest_BoNEUby8.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_h3cWSH79.mjs');
const _page1 = () => import('./chunks/cart_BSrIFVHt.mjs');
const _page2 = () => import('./chunks/_handle__0KnUnLTA.mjs');
const _page3 = () => import('./chunks/index_CeqTzhN4.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/cart.astro", _page1],
    ["src/pages/shop/[handle].astro", _page2],
    ["src/pages/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "b117df5c-42a7-4c63-9085-af19ff449595"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
