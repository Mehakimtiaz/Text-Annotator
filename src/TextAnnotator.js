import React from "react";
import { TokenAnnotator } from "react-text-annotate";

const TEXT =
  "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously. “I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said Thrun, now the co-founder and CEO of online higher education startup Udacity, in an interview with Recode earlier this week. A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.";
const TAG_COLORS = {
  ORG: "#00ffa2",
  PERSON: "#84d2ff",
  HARD: "RED"
};

const Card = ({ children }) => (
  <div
    style={{
      boxShadow: "0 2px 4px rgba(0,0,0,.1)",
      margin: 6,
      maxWidth: 500,
      padding: 16
    }}
  >
    {children}
  </div>
);

class TextAnnotator extends React.Component {
  state = {
    value: [
      {
        start: 5,
        end: 20,
        tag: "PERSON"
      },
      { start: 15, end: 20, tag: "PERSON" },
      { start: 71, end: 75, tag: "DATE" }
    ],
    tag: "PERSON"
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  handleTagChange = (e) => {
    this.setState({ tag: e.target.value });
  };

  render() {
    return (
      <div style={{ padding: 24, fontFamily: "IBM Plex Sans" }}>
        <div style={{ display: "flex", marginBottom: 24 }}>
          <Card>
            <h4>Default</h4>
            <select onChange={this.handleTagChange} value={this.state.tag}>
              <option value="ORG">ORG</option>
              <option value="PERSON">PERSON</option>
              <option value="HARD">HARD SKILL</option>
            </select>
            <TokenAnnotator
              style={{
                fontFamily: "IBM Plex Sans",
                maxWidth: 500,
                lineHeight: 1.5
              }}
              tokens={TEXT.split(" ")}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={(span) => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag]
              })}
            />
          </Card>
        </div>

        <Card>
          <h4>Current Value</h4>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </Card>
      </div>
    );
  }
}

export default (TextAnnotator);


