import React from 'react';

export default function GroupContentFooter({ commentCount }: any) {
    return (
        <div className="post-list-header">
            <div className="post-list-footer"></div>
            <div className="post-list-footer">
                <img
                    className="img-comment"
                    src="/asset/icons/comment.svg"
                    alt="comment"
                />
                {/* [추후] 댓글 수 데이터 추가 */}
                <div>댓글 수 {commentCount}</div>
            </div>
        </div>
    );
}
