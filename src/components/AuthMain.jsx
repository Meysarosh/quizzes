import { PropTypes } from 'prop-types';

export function AuthMain({ children }) {
  return <main>{children}</main>;
}

AuthMain.propTypes = {
  children: PropTypes.string
};
