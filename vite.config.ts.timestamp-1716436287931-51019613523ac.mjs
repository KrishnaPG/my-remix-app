// vite.config.ts
import { vitePlugin as remix } from "file:///Volumes/scratchPad/repos/my-remix-app/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig } from "file:///Volumes/scratchPad/repos/my-remix-app/node_modules/vite/dist/node/index.js";
import { flatRoutes } from "file:///Volumes/scratchPad/repos/my-remix-app/node_modules/remix-flat-routes/dist/index.js";
import { remixDevTools } from "file:///Volumes/scratchPad/repos/my-remix-app/node_modules/remix-development-tools/dist/index.js";
import tsconfigPaths from "file:///Volumes/scratchPad/repos/my-remix-app/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    target: "ES2022"
  },
  plugins: [
    remixDevTools(),
    remix({
      serverModuleFormat: "esm",
      ignoredRouteFiles: ["**/.*"],
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes);
      }
    }),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVm9sdW1lcy9zY3JhdGNoUGFkL3JlcG9zL215LXJlbWl4LWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1ZvbHVtZXMvc2NyYXRjaFBhZC9yZXBvcy9teS1yZW1peC1hcHAvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1ZvbHVtZXMvc2NyYXRjaFBhZC9yZXBvcy9teS1yZW1peC1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSAnQHJlbWl4LXJ1bi9kZXYnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgZmxhdFJvdXRlcyB9IGZyb20gJ3JlbWl4LWZsYXQtcm91dGVzJ1xuaW1wb3J0IHsgcmVtaXhEZXZUb29scyB9IGZyb20gJ3JlbWl4LWRldmVsb3BtZW50LXRvb2xzJ1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdFUzIwMjInLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVtaXhEZXZUb29scygpLFxuICAgIHJlbWl4KHtcbiAgICAgIHNlcnZlck1vZHVsZUZvcm1hdDogJ2VzbScsXG4gICAgICBpZ25vcmVkUm91dGVGaWxlczogWycqKi8uKiddLFxuICAgICAgcm91dGVzOiBhc3luYyAoZGVmaW5lUm91dGVzKSA9PiB7XG4gICAgICAgIHJldHVybiBmbGF0Um91dGVzKCdyb3V0ZXMnLCBkZWZpbmVSb3V0ZXMpXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9TLFNBQVMsY0FBYyxhQUFhO0FBQ3hVLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxjQUFjO0FBQUEsSUFDZCxNQUFNO0FBQUEsTUFDSixvQkFBb0I7QUFBQSxNQUNwQixtQkFBbUIsQ0FBQyxPQUFPO0FBQUEsTUFDM0IsUUFBUSxPQUFPLGlCQUFpQjtBQUM5QixlQUFPLFdBQVcsVUFBVSxZQUFZO0FBQUEsTUFDMUM7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
