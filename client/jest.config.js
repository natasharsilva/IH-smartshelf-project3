//Dealing with css files since Jest interprested everything as Javascript
module.exports = {

    "jest": {
      testEnvironment: "jest-environment-jsdom",
      moduleNameMapper: {
        '\\.css$': require.resolve('./src/__tests__/style-mock')
      }
    }
}