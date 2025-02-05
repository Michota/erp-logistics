export default {
  presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest",
  },
};
