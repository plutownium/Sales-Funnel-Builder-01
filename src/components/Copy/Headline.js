import React from "react";

import { connect } from "react-redux";

import Div from "./Div";

const headline = (props) => {
    return (
        <Div>
            {props.customText ? <h1>{props.customText}</h1> : <h1>Headline</h1>}
            {props.pg === 1 ? (
                <div>
                    <button onClick={props.moveUp}>Move Section Up</button>
                    <button onClick={props.moveDown}>Move Section Down</button>
                    <button onClick={props.del}>Delete Section</button>
                </div>
            ) : null}
        </Div>
    );
};

const mapStateToProps = (state) => {
    return {
        comp: state.components,
        pg: state.currentPage,
    };
};

export default connect(mapStateToProps)(headline);
