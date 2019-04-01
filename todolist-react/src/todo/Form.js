import React from "react";

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.refs.itemName.focus();
    }

    onSubmit(event) {
        event.preventDefault();
        debugger;
        var newItemValue = this.refs.itemName.value;
        var endDate = this.refs.itemEndDate.value;
        var description = this.refs.itemDescription.value;

        if (newItemValue) {
            this.props.addTask(newItemValue, endDate, description);
            this.refs.form.reset();
        } else {
            alert("Please insert value for todo name!");
        }

    }

    render() {
        return (
            <div className="col-md-5">
                <form ref="form" onSubmit={this.onSubmit} className="form taskForm">
                    <div className="col-md-12">
                        <input type="text" ref="itemName" className="form-control" placeholder="Add a new todo..."/>
                    </div>
                    <div className="col-md-12">
                        <input type="date" ref="itemEndDate" className="form-control"/>
                    </div>

                    <div className="col-md-12">
                        <textarea ref="itemDescription" className="form-control" placeholder="Description"/>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}
