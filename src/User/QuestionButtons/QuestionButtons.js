import React from 'react'
import { Button } from 'reactstrap'


class QuestionButtons extends React.Component {
    state = {
        question: []
    }
    componentWillReceiveProps = (nextProps) => {
        if (this.state.question !== nextProps.question) {
            this.setState({
                question: nextProps.question
            })
        }
    }
    onClickHandler = (i) => {
        this.props.onJumpQuestion(i)
    }
    render() {
        let list = this.state.question.map((qid, i) => {
            return <Button color={(qid.status === true) ? "success" : "secondary"} key={i} onClick={this.onClickHandler.bind(this, i)}>{i + 1}</Button>
        })
        return (
            <div>
                {list}
            </div>
        )

    }
}
export default QuestionButtons