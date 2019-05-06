import React from "react";
import {InputText} from '../../node_modules/primereact/inputtext';
import {InputTextarea} from '../../node_modules/primereact/inputtextarea';
import {Calendar} from '../../node_modules/primereact/calendar';
import {Button} from "../../node_modules/primereact/button";
import {Fieldset} from '../../node_modules/primereact/fieldset';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);

        this.state = {
            name: '',
            date: null,
            description: ''
        };
    }

    componentDidMount() {
        // this.refs.itemName.focus();
    }

    onSubmit(event) {
        event.preventDefault();
        debugger;
        // var newItemValue = this.refs.itemName.value;
        // var endDate = this.refs.itemEndDate.value;
        // var description = this.refs.itemDescription.value;
        var newItemValue = this.state.name;
        var endDate = this.state.date;
        var description = this.state.description;

        if (newItemValue) {
            this.props.addTask(newItemValue, endDate, description);
            this.clearForm();
            // this.refs.form.reset();
        } else {
            alert("Please insert value for todo!");
        }
    }

    clearForm() {
        this.setState({name: ''});
        this.setState({date: null});
        this.setState({description: ''});
    }

    render() {
        return (
            <div className="col-md-4" style={{"float": "left"}}>
                <form ref="form" onSubmit={this.onSubmit} className="">
                    <Fieldset legend="Todo List" toggleable={true}>
                        <div className="col-md-12">
                            {/*<input type="text" ref="itemName" className="form-control" placeholder="Add a new todo..."/>*/}
                            <span className="p-float-label">
                            <InputText id="in" className="col-md-12" value={this.state.name}
                                       onChange={(e) => this.setState({name: e.target.value})}
                                       tooltip="Name of your todo" tooltipOptions={{"position": "left"}}/>
                            <label htmlFor="in">Name</label>
                        </span>
                        </div>
                        <div className="col-md-12">
                            {/*<input type="date" ref="itemEndDate" className="form-control"/>*/}
                            <Calendar value={this.state.date} dateFormat="dd/mm/yy" inputClassName="col-md-12"
                                      showIcon={true} style={{"width": "100%"}} inputStyle={{"marginRight": "-32px"}}
                                      tooltip="End Date" onChange={(e) => this.setState({date: e.value})}
                                      tooltipOptions={{"position": "left"}} np/>
                        </div>

                        {/*<div className="col-md-12">*/}
                        {/*<textarea ref="itemDescription" className="form-control" placeholder="Description"/>*/}
                        {/*</div>*/}
                        <div className="col-md-12">
                            <InputTextarea rows={5} autoResize={true} value={this.state.description}
                                           onChange={(e) => this.setState({description: e.target.value})}
                                           tooltip="Description" tooltipOptions={{"position": "left"}} style={{width: "inherit"}} />
                        </div>
                        <div className="col-md-12" style={{"textAlign": "center"}}>
                            {/*<button type="submit" className="btn btn-primary" ><Icon type="plus"/> Add</button>*/}
                            <Button type="submit" label="Add" icon="pi pi-plus"/>
                        </div>
                    </Fieldset>
                </form>
            </div>
        );
    }
}
