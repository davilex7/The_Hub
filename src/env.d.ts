/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
