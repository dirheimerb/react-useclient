(function (exports, fs, path, util) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(
            n,
            k,
            d.get
              ? d
              : {
                  enumerable: true,
                  get: function () {
                    return e[k];
                  },
                },
          );
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }

  var fs__namespace = /*#__PURE__*/ _interopNamespace(fs);
  var path__namespace = /*#__PURE__*/ _interopNamespace(path);

  // src/index.ts

  // src/config/addclient.json
  var addclient_default = {
    directoryPath: 'src',
  };

  // src/config/index.ts
  var config_default = addclient_default;

  // src/index.ts
  var readdir2 = util.promisify(fs__namespace.readdir);
  var { directoryPath: configDirectoryPath } = config_default;
  var addUseClient = async (filePath) => {
    try {
      const data = await fs__namespace.readFileSync(filePath, 'utf8');
      if (!data.startsWith("'use client';")) {
        await fs__namespace.writeFileSync(
          filePath,
          "'use client';\n" + data,
          'utf8',
        );
        console.log(`'use client'; added to ${filePath}`);
      } else {
        console.log(`'use client'; already exists in ${filePath}`);
      }
    } catch (error) {
      throw new Error(`Error processing file ${filePath}: ${error}`);
    }
  };
  var processDirectory = async (directoryPath) => {
    try {
      const dirents = await readdir2(directoryPath, { withFileTypes: true });
      for (const dirent of dirents) {
        const fullPath = path__namespace.join(directoryPath, dirent.name);
        if (dirent.isDirectory()) {
          await processDirectory(fullPath);
        } else if (
          (dirent.isFile() && path__namespace.extname(fullPath) === '.ts') ||
          path__namespace.extname(fullPath) === '.tsx'
        ) {
          await addUseClient(fullPath);
        }
      }
    } catch (error) {
      throw new Error(`Error processing directory ${directoryPath}: ${error}`);
    }
  };
  function ReactUseClient() {
    const directoryPath = path__namespace.join(__dirname, configDirectoryPath);
    processDirectory(directoryPath);
  }

  exports.addUseClient = addUseClient;
  exports.default = ReactUseClient;
  exports.processDirectory = processDirectory;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
})({}, fs, path, util);
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.global.js.map
