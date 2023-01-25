import { useFela } from "react-fela";

import { HeaderWrapper } from "./Header.styles";

function Header() {
  const { css } = useFela();

  return (
    <header className={css(HeaderWrapper)}>
      <h1>Todo MVC React</h1>
    </header>
  );
}

export default Header;
