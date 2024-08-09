import React from 'react';

class ImageSwitch extends React.Component {
    state = {
        currentImg: 2,
        Imgs: [
            'https://mia.vn/media/uploads/tin-tuc/thuong-hieu-uniqlo-1-1690560607.jpg',
            'https://images.squarespace-cdn.com/content/v1/591205cdbf629aee5553a0fe/1496353828992-2MV5NYW9H6P02AZYLRXY/mujibanner.jpg',
            'https://baothainguyen.vn/file/e7837c027f6ecd14017ffa4e5f2a0e34/052024/aaa_20240517191434.jpg'
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