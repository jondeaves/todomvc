import { useFela } from "react-fela";

import { FooterWrapper } from "./Footer.styles";

function Footer() {
  const { css } = useFela();

  return (
    <footer className={css(FooterWrapper)}>
      <p className="small">Built in React with a NestJS + SQLite back-end</p>
    </footer>
  );
}

export default Footer;
