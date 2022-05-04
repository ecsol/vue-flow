/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
