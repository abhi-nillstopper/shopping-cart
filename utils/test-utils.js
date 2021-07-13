const rtl = require("@testing-library/react");

const customRender = (ui, options) =>
  rtl.render(ui, {
    myDefaultOption: "something",
    ...options,
  });

module.exports = {
  ...rtl,
  render: customRender,
};
