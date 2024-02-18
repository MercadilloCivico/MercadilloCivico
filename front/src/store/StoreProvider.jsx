import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './index';

export default function CustomStore({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

CustomStore.propTypes = {
  children: PropTypes.node.isRequired,
};
