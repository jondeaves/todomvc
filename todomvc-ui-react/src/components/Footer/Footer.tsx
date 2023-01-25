import { useFela } from "react-fela";

import { FooterWrapper } from "./Footer.styles";

function Footer() {
  const { css } = useFela();

  return (
    <footer className={css(FooterWrapper)}>
      <p>
        <small>Built in React with a NestJS + SQLite back-end</small>
      </p>
    </footer>
  );
}

export default Footer;
