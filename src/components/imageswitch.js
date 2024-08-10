import React from 'react';
import img2 from '../assets/img/img2.jpg';
import img3 from '../assets/img/img3.jpg';

class ImageSwitch extends React.Component {
    state = {
        currentImg: 1,
        Imgs: [
            img2,
            img3
        ]
    }

    imgSwitchNext = (event) => {
        event.preventDefault();
        let index = (this.state.currentImg + 1) % this.state.Imgs.length;
        this.setState(
            {
                currentImg: index
            }
        )
    }

    imgSwitchPrev = (event) => {
        event.preventDefault();
        let index = (this.state.currentImg - 1 + this.state.Imgs.length) % this.state.Imgs.length
        this.setState(
            {
                currentImg: index
            }
        )
    }

    render(){
        return(
            <div className='news-img'>
                <button onClick={(e) => this.imgSwitchNext(e)} className='switchbtn left'>Back</button>
                <img src={this.state.Imgs[this.state.currentImg]} className='imgs'/>
                <button onClick={(e) => this.imgSwitchPrev(e)} className='switchbtn right'>Next</button>
            </div>
        )
    }
}

export default ImageSwitch;