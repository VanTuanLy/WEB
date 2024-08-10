import React from "react";

class ShowDescribe extends React.Component {

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
                <button onClick={(e) => this.handleChangeCheck(e)} className='lists-item hideshow-content--btn'>Hide describe</button>
                <div className='lists-group--item'>{this.props.describe}</div>
            </>
            :
            <>
                <button onClick={(e) => this.handleChangeCheck(e)} className='lists-item hideshow-content--btn'>Show describe</button>
            </>
        )
    }
}

export default ShowDescribe;