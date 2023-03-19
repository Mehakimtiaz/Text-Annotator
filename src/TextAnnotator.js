// import React from "react";
// import { TokenAnnotator } from "react-text-annotate";

// const TAG_COLORS = {
//   ORG: "#00ffa2",
//   PERSON: "#84d2ff",
//   HARD: "RED",
//   CUSTOM: 'YELLOW'
// };

// const Card = ({ children }) => (
//   <div
//     style={{
//       boxShadow: "0 2px 4px rgba(0,0,0,.1)",
//       margin: 6,
//       minWidth: 1000,
//       maxWidth: 1000,
//       padding: 16
//     }}
//   >
//     {children}
//   </div>
// );

// class TextAnnotator extends React.Component {
//   state = {
//     value: [
//       {
//         start: 5,
//         end: 20,
//         tag: "PERSON"
//       },
//       { start: 15, end: 20, tag: "PERSON" },
//       { start: 71, end: 75, tag: "DATE" }
//     ],
//     tag: "PERSON",
//     selectedText: '',
//     showEditPopup: false,
//     text: ''
//   };

//   handleChange = (value) => {
//     this.setState({ value });
//   };

//   handleTagChange = (e) => {
//     this.setState({ tag: e.target.value });
//   };

//   handleInputChange = (e) => {
//     this.setState({ text: e.target.value });
//   };
//   handleSelectedInputChange = (e) => {
//     this.setState({ selectedText: e.target.value });
//   };

//   handleMouseOut = (event) => {
//     this.setState({ showEditPopup: false });
//     event.target.removeEventListener('mouseout', this.handleMouseOut);
//   };

//   handleMouseOver = (e) => {
//     const text = window.getSelection().toString();
//     console.log("e inside mouse over", e)
//     if (text) {
//       this.setState({
//         selectedText: text
//       });
//       this.setState({ showEditPopup: true });
//       e.target.addEventListener('mouseout', this.handleMouseOut);
//     }
//   };

//   handleEdit = (e) => {
//     console.log('Edit clicked', e);
//   }
//   render() {
//     return (
//       <div div style = {
//         {
//           padding: 24,
//           fontFamily: "IBM Plex Sans"
//         }
//       } >
//         <div style = {
//           {
//             display: "flex",
//             marginBottom: 24
//           }
//         } >
//           <Card>
//             <h4>Text Annotator</h4>
//                <textarea value = {
//                  this.state.text
//                }
//                onChange = {
//                  this.handleInputChange
//                }
//                style = {
//                  {
//                    display: "flex",
//                    marginBottom: 15,
//                    width: 500,
//                    maxWidth: 500,
//                    height: "100px"
//                  }
//                }
//                />
//             <select select onChange = {
//               this.handleTagChange
//             }
//             value = {
//               this.state.tag
//             }
//             style = {
//               {
//                 display: "flex",
//                 marginBottom: 15
//               }
//             } >
//               <option value="ORG">ORG</option>
//               <option value="PERSON">PERSON</option>
//               <option value="HARD">HARD SKILL</option>
//             </select>
//             <TokenAnnotator
//               style={{
//                 fontFamily: "IBM Plex Sans",
//                 minWidth: 1000,
//                 maxWidth: 1000,
//                 lineHeight: 1.5
//               }}
//               tokens={ this.state.text.split(" ")}
//               value={ this.state.value }
//               onChange={this.handleChange}
//               onMouseOver={this.handleMouseOver}
//               getSpan={(span) => ({
//                 ...span,
//                 tag: this.state.tag,
//                 color: TAG_COLORS[this.state.tag]
//               })}
//             />
//             { this.state.showEditPopup &&
//             <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', 
//                    backgroundColor: 'white', border: '1px solid black', padding: '10px' }}>

//               <textarea value = {
//                 this.state.selectedText
//               }
//               onChange={ this.handleSelectedInputChange }
//               style = {{
//                   display: "block",
//                   marginBottom: 15,
//                   width: 300,
//                   height: "100px"
//                 }}
//               />
//               <button onClick={this.handleEdit}>Edit</button>
//               <p>{this.state.selectedText}</p>
//             </div>
//           }
//           </Card>
//         </div>

//         <Card>
//           <h4>Current Value</h4>
//           <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
//         </Card>
//       </div>
//     );
//   }
// }

// export default (TextAnnotator);


import React, { Component } from 'react';

const Card = ({ children }) => (
  <div
    style={{
      boxShadow: "0 2px 4px rgba(0,0,0,.1)",
      backgroundColor: "#84d2ff",
      margin: 6,
      minWidth: 1000,
      maxWidth: 1000,
      padding: 16
    }}
  >
    {children}
  </div>
);

class EditPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textAnnotation: props.text,
      x: props.x,
      y: props.y
    }
  }
  handleAnnotatedData = (e) => {
    this.setState({ textAnnotation : e.target.value })
    this.props.onChildData(this.state.textAnnotation);
  }
  handleUpdatedAnnotation = (e) => {
    console.log('inside button click', e)
  }
  render() {
    const style = {
      position: 'absolute',
      left: this.state.x + 20 + 'px',
      top: this.state.y + 20 + 'px',
    };
    return ( 
      <div className = "edit-popup" style = { style } >
        <textarea type="text" value={ this.state.textAnnotation } onChange={ this.handleAnnotatedData }/> 
        <button onClick={this.handleUpdatedAnnotation }> Save </button> 
      </div>
    );
  }
}

class TextAnnotator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedText: '',
      popupPosition: {
        x: 0,
        y: 0
      },
    };
    this.pRef = React.createRef();
  }
  handleChildData = (data) => {
    this.setState({ selectedText: data });
  }
  handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    this.setState({
      selectedText
    });

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const boundingRect = range.getBoundingClientRect();
      const parentBoundingRect = this.pRef.current.getBoundingClientRect();

      const highlight = document.createElement('span');
      highlight.style.backgroundColor = 'yellow';
      highlight.appendChild(range.extractContents());
      range.insertNode(highlight);

      const x = boundingRect.left - parentBoundingRect.left;
      const y = boundingRect.top - parentBoundingRect.top + boundingRect.height;
      this.setState({
        popupPosition: {
          x,
          y
        }
      });
    }
  };

  render() {
    const {
      selectedText,
      popupPosition
    } = this.state;

    return ( 
    <div>
      <p 
        ref = { this.pRef }
        onMouseUp = { this.handleTextSelect } 
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec vitae ullamcorper nunc.Suspendisse potenti.
        Aenean dictum elit eu felis convallis, at consequat purus pharetra.
        Quisque ac ante odio Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec vitae ullamcorper nunc.Suspendisse potenti.
        Aenean dictum elit eu felis convallis, at consequat purus pharetra.
        Quisque ac ante odio Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec vitae ullamcorper nunc.Suspendisse potenti.
        Aenean dictum elit eu felis convallis, at consequat purus pharetra.
        Quisque ac ante odio Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec vitae ullamcorper nunc.Suspendisse potenti.
        Aenean dictum elit eu felis convallis, at consequat purus pharetra.
        Quisque ac ante odio. 
       </p> { selectedText && ( 
          <EditPopup 
            onChildData={this.handleChildData}
            text = { selectedText }
            x = { popupPosition.x }
            y = { popupPosition.y }
          />
        )
      }
      
      <Card>
        <h4>Current Selected Value</h4>
        <p>{ this.state.selectedText }</p>
      </Card>
      </div>
    );
  }
}
export default TextAnnotator;