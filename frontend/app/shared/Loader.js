import { h } from 'preact';
import { css } from 'glamor';

const loaderContainer = css({
  width: '100%',
  display: 'inline-block',
  margin: '20px 0'
});

const Loader = ({ loading, error, width, color, style }) => (
  <div {...loaderContainer} style={style}>
    <div style={{ width: (width || 70) + 'px', margin: '0 auto' }}>
      {error
        ? 'An error occurred'
        : loading
            ? <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 38 38"
                stroke={color || '#000'}
              >
                <g fill="none" fill-rule="evenodd">
                  <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                    <path
                      d="M36 18c0-9.94-8.06-18-18-18"
                      transform="rotate(306 18 18)"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                </g>
              </svg>
            : ''}
    </div>
  </div>
);

export default Loader;
