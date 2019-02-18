import React, {Component} from 'react';
import axios from 'axios';


class Debts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: null,
        };
    }

    async componentDidMount() {
        const questions = (await axios.get('http://192.168.33.10:8081/')).data;
        this.setState({
            questions,
        });
        
    }

    getBgColor(is_borrow) {
        if (is_borrow) return '#b32400';
        return 'default';

    }

    async close(id) {
        this.setState({
            disabled: true,
        });

        alert('Let`s close ' + id);

        await axios.post('http://192.168.33.10:8081/close', {
            id: id,
        });

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.questions === null && <p>Loading questions...</p>}
                    {
                        this.state.questions && this.state.questions.map(question => (
                            <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">

                                <div className="card text-white bg-success mb-3">
                                    <div className="card-header"
                                         style={{backgroundColor: this.getBgColor(question.is_borrow)}}>
                                        Person: {question.person_id}
                                        <button type="button" className="float-lg-right btn btn-dark" onClick={() => {
                                            this.close(question.id)
                                        }}>Close
                                        </button>
                                    </div>
                                    <div className="card-body"
                                         style={{backgroundColor: this.getBgColor(question.is_borrow)}}>
                                        <h4 className="card-title">{question.sum}</h4>
                                        <p className="card-text">{question.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Debts;