import { useFela } from "react-fela";

import { HeaderWrapper, HeaderTitle } from "./Header.styles";

function Header() {
  const { css } = useFela();

  return (
    <header className={css(HeaderWrapper)}>
      <h1 className={css(HeaderTitle)}>todos</h1>
    </header>
  );
}

export default Header;
