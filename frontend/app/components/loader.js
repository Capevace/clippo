import { h } from 'preact';

const Loader = ({ loading, error, label }) => (
  <div>
    {error ? 'An error occurred' : loading ? label ? label : 'Loading...' : ''}
  </div>
);

export default Loader;
