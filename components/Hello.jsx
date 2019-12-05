import { ProvideMediaMatchers, MediaServerRender, useMedia } from 'react-media-match';
import css from 'styled-jsx/css';

// component の外で css 関数を使って定義する必要がある
// https://github.com/zeit/styled-jsx#external-css-and-styles-outside-of-the-component
const mobileStyles = css`
  .root p {
    color: red;
  }
`;
const desktopStyles = css`
  .root p {
    color: blue;
  }
`;

const Hello = props => {
  const styles = useMedia({
    mobile: mobileStyles,
    desktop: desktopStyles
  });
  const word = useMedia({
    mobile: "hello mobile",
    desktop: "hello desktop"
  });

  return (
    <div className="root">
      {console.log(`hello! from ${typeof(window) === 'undefined' ? 'Server' : 'Client'}`)}
      <p>what color?</p>
      <p>{word}</p>
      <style jsx>{styles}</style>
    </div>
  )
}

export default Hello;
