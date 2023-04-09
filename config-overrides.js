const SassRuleRewire = require("react-app-rewire-sass-rule");
const path = require("path");
const rewireAliases = require("react-app-rewire-aliases");

module.exports = function override(config, env) {
  require("react-app-rewire-postcss")(config, {
    plugins: (loader) => [require("postcss-rtl")()],
  });

  config = rewireAliases.aliasesOptions({
    "@src": path.resolve(__dirname, "src"),
    "@Assets": path.resolve(__dirname, "src/assets"),
    "@Components": path.resolve(__dirname, "src/@core/components"),
    "@Constants": path.resolve(__dirname, "src/constants"),
    "@Helper": path.resolve(__dirname, "src/helper"),
    "@Hooks": path.resolve(__dirname, "src/utility/hooks"),
    "@Layouts": path.resolve(__dirname, "src/@core/layouts"),
    "@Store": path.resolve(__dirname, "src/redux"),
    "@Styles": path.resolve(__dirname, "src/@core/scss"),
    "@Utils": path.resolve(__dirname, "src/utility/Utils"),
    "@Configs": path.resolve(__dirname, "src/configs"),
    "@Views": path.resolve(__dirname, "src/views"),
    "@Services": path.resolve(__dirname, "src/services"),

  })(config, env);

  config = new SassRuleRewire()
    .withRuleOptions({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              includePaths: ["node_modules", "src/assets"],
            },
          },
        },
      ],
    })
    .rewire(config, env);
  return config;
};
