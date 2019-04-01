import React from "react";
import icons from "glyphicons";

export class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }

    onClickClose() {
        var inx = parseInt(this.props.item.index);
        var i = parseInt(this.props.index);
        this.props.deleteTask(inx, i);
    }

    onClickDone() {
        var inx = parseInt(this.props.item.index);
        var i = parseInt(this.props.index);

        this.props.doneTask(inx, i);
    }

    render() {
        var doneClass = this.props.item.done;

        return (
            <li className="list-group-item" data-key={this.props.item.index}
                style={{textDecoration: doneClass ? "line-through" : ""}}>
                <div>
                    <button className="btn btn-default" aria-hidden="false"
                            onClick={this.onClickDone}>{icons.ok}</button>
                    {this.props.item.value} ({this.props.item.createDate} | {this.props.item.endDate})
                    <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
                    <div className="col-md-12 description-field">{this.props.item.description}</div>
                </div>
            </li>
        )
    }

}

