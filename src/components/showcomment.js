import React from 'react';

class ShowComment extends React.Component {

    state = {
        
    }

    formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleString();
    }

    render () {
        let {commentlist} = this.props;

        return (
            <>
            <div className='comment--list-box'>
                {
                    commentlist && commentlist.length > 0 &&
                    commentlist.map((item,index) => {
                        if(this.props.blogId === item.ID) {
                            return(
                                <div className="commentlist lists-item" key={item.COMMENT.ID}>
                                    <div className='commentlist-users'>{item.USERS}</div>
                                    <div className='commentlist-comment'>{item.COMMENT}</div>
                                    <div className='commentlist-date'>{this.formatDate(item.COMMENT_AT.date)}</div>
                                </div>
                            )
                        }
                    }

                    )
                }
            </div>
            </>
        )
    }
}

export default ShowComment;