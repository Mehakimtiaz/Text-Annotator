import React from 'react';
import { Tooltip, withStyles } from '@material-ui/core';

const styles = {
  annotation: {
    backgroundColor: 'yellow',
    cursor: 'pointer',
  },
};

const Annotation = ({ classes, text, annotation }) => {
  const handleAnnotationClick = () => {
    alert(annotation);
  };

  return (
    <Tooltip title={annotation}>
      <span className={classes.annotation} onClick={handleAnnotationClick}>
        {text}
      </span>
    </Tooltip>
  );
};

export default withStyles(styles)(Annotation);
