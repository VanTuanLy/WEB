import React from "react";

class ShowContent extends React.Component {

    state = {
        check: false
    }

    handleChangeCheck = (event) => {
        event.preventDefault();
        this.setState (
            {
                check: !this.state.check
            }
        )
    }

    render () {
        return (
            this.state.check ? 
            <>
                <button onClick={(e) => this.handleChangeCheck(e)} className='lists-item hideshow-content--btn'>Hide content</button>
                <div className='lists-item'>{this.props.content}</div>
            </>
            :
            <>
                <button onClick={(e) => this.handleChangeCheck(e)} className='lists-item hideshow-content--btn'>Show content</button>
            </>
        )
    }
}

export default ShowContent;