import React from 'react';
import ContentLoader from 'react-content-loader';

const TableLoader = props => (
  <ContentLoader
    viewBox="0 0 400 500"
    height={500}
    width={1600}
    backgroundColor="transparent"
    {...props}
  >
    <circle cx="200" cy="300" r="10" />
    <circle cx="250" cy="300" r="10" />
    <circle cx="300" cy="300" r="10" />
  </ContentLoader>
);

export default TableLoader;
