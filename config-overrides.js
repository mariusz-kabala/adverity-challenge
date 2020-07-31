module.exports = function override(config) {
  config.module.rules.push({
    test: /\.worker\.ts$/,
    use: [
      "workerize-loader",
      {
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.workers.json",
        },
      },
    ],
  });

  return config;
};
