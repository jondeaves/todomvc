import { createRenderer } from "fela";

import multipleSelectors from "fela-plugin-multiple-selectors";
import namedKeys from "fela-plugin-named-keys";
import prefixer from "fela-plugin-prefixer";
import unit from "fela-plugin-unit";

const namedKeysPlugin = namedKeys({
  desktop: "@media (min-width: 1024px)",
  tablet: "@media (min-width: 768px)",
  supportsFlex: "@supports (display: flex)",
  supportsGrid: "@supports (display: grid)",
});

const renderer = createRenderer({
  plugins: [multipleSelectors(), namedKeysPlugin, prefixer(), unit()],
});

export { renderer };
