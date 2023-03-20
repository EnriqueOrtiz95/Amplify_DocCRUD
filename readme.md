## AMPLIFY CONSIDERATIONS WITH VITEJS

In your index.html file, add the following script tag:

```
<script>
    window.global = window;
    window.process = {
    env: { DEBUG: undefined },
    };
    var exports = {};
</script>
```

## 2. In your vite.config.js file, replace all this code there:

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    input: {
      app: "./index.html", // default
    },
    chunkSizeWarningLimit: 1600,
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
});
```

## 3. THIS IS A NOTE: If you are deplying your project to a github project, make sure to have all of these files ignored in your .gitignore file to protect your backend from being pushed to your repo:

```
amplify/\#current-cloud-backend
amplify/.config/local-*
amplify/logs
amplify/mock-data
amplify/mock-api-resources
amplify/backend/amplify-meta.json
amplify/backend/.temp
build/
dist/
node_modules/
aws-exports.js
awsconfiguration.json
amplifyconfiguration.json
amplifyconfiguration.dart
amplify-build-config.json
amplify-gradle-config.json
amplifytools.xcconfig
.secret-*
**.sample
```