import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';

const Index = () => (
  <Layout title="Home">
    <h2 className="title is-2">Authentication with Next.js and RESTful login token</h2>
    <img src="/static/nextjs.jpg" />
    <p>A proof of concept app, demonstrating the authentication of Next.js application using a token from the RESTful module.</p>
  </Layout>
);


Index.getInitialProps = function(ctx) {
  initialize(ctx);
};


export default withRedux(initStore)(Index);
