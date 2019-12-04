import css from 'styled-jsx/css';
import { MediaServerRender, useMedia } from 'react-media-match';
import MobileDetect from 'mobile-detect';

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

const Hoge = props => {
  const predicate = (ua) => {
    if (typeof window === 'undefined') {
      // SSR されるときは CSS メディアクエリが利用できないので ua を元に推測して SSR する
      // hydrated 指定がされているので、CSR でメディアクエリとの齟齬が生じていれば全体の DOM ツリーを再構築する
      const md = new MobileDetect(ua);
      return md.mobile() !== null ? "mobile" : "desktop";
    } else {
      // 空文字列を返すと CSS のメディアクエリから判断しようとする
      return "";
    }
  };

  return (
    <div>
      <h1>Hoge</h1>
      <MediaServerRender predicted={predicate(props.userAgent)} hydrated>
        <p>what color?</p>
        <Fuga />
      </MediaServerRender>
    </div>
  )
}

const Fuga = props => {
  const styles = useMedia({
    mobile: mobileStyles, // ここで css`.root { color: red; }` のように書くことはできない
    desktop: desktopStyles
  });

  return (
    <div className="root">
      <h1>Fuga</h1>
      <p>what color?</p>
      <style jsx>{styles}</style>
    </div>
  )
}

Hoge.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default Hoge;
