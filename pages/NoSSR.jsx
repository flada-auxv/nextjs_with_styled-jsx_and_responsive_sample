import Link from 'next/link'
import dynamic from'next/dynamic';
import { ProvideMediaMatchers } from 'react-media-match';

// SSR をオプション等で disable する術がないので動的にコンポーネントをimportする API を使って CSR を強制する
const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Hello'),
  { ssr: false }
);

const NoSSR = props => {
  return (
    <div>
      <h1>NoSSR</h1>
      <ProvideMediaMatchers>
        <DynamicComponentWithNoSSR />
      </ProvideMediaMatchers>
      <Link href="/"><a>go to WithSSR</a></Link>
    </div>
  )
}

// getInitialProps を用意しないと Next.js のデフォルト動作で pre-rendered なページとして処理してしまうので
NoSSR.getInitialProps = async () => {
  return {foo: 'foo'};
};

export default NoSSR;
