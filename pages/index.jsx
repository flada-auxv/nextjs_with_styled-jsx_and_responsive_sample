import MobileDetect from 'mobile-detect';
import Link from 'next/link';
import { MediaServerRender, ProvideMediaMatchers } from 'react-media-match';

import Hello from '../components/Hello';

const SSR = props => {
  const predicate = (ua) => {
    // SSR されるときは CSS メディアクエリが利用できないので ua を元に推測して SSR する
    // hydrated 指定がされているので、CSR でメディアクエリとの齟齬が生じていれば全体の DOM ツリーを再構築するため
    // CSR 時には空文字列を返して CSS メディアクエリを元に判断させるようにする
    const md = new MobileDetect(ua);
    const isMobile = md.mobile() !== null;
    console.log(`UA => ${isMobile ? 'mobile' : 'desktop'}`);
    return isMobile ? 'mobile' : 'desktop';
  };

  return (
    <div>
      <h1>WithSSR</h1>
      <div>
        <h2>Using MediaServerRender</h2>
        <MediaServerRender predicted={predicate(props.userAgent)} hydrated>
          <Hello />
        </MediaServerRender>
      </div>
      <div>
        <h2>Not using MediaServerRender</h2>
        <ProvideMediaMatchers>
          <Hello />
        </ProvideMediaMatchers>
      </div>
      <Link href="/NoSSR"><a>go to NoSSR</a></Link>
    </div>
  )
}

SSR.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
}

export default SSR;
