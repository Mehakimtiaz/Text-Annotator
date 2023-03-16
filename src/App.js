import React from 'react';
// import TextEditor from './TextEditor';
// import Annotation from './Annotation';

import TextAnnotator from './TextAnnotator';

const App = () => {
  // const annotations = [
  //   {
  //     start: 10,
  //     end: 20,
  //     text: 'This is the first annotation',
  //   },
  //   {
  //     start: 30,
  //     end: 40,
  //     text: 'This is the second annotation',
  //   },
  // ];

  return (
    <div>
      {/* <TextEditor />
      {annotations.map((annotation, index) => (
        <Annotation
          key={index}
          text={`Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed vitae semper augue. Morbi n
          ec lorem at velit lacinia fringilla. Suspendisse potenti. ${annotation.text}`}
          annotation={annotation.text}
        />
      ))} */}
      <TextAnnotator />
    </div>
  );
};

export default App;
