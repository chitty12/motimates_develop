import React from 'react';

export default function TeamPercentage() {
    return (
        <div className="content-grid-box">
            <div className="percentage-div">
                <div className="title4">Team 달성률</div>
                <div className="progress-img-flex">
                    <div className="progress-bar-div">
                        <div className="profile-img-div-flex">
                            <img
                                src="/asset/images/user.svg"
                                alt="프로필 이미지"
                                className="profile-img"
                            />
                            <img
                                src="/asset/images/user.svg"
                                alt="프로필 이미지"
                                className="profile-img"
                            />
                            <img
                                src="/asset/images/user.svg"
                                alt="프로필 이미지"
                                className="profile-img"
                            />
                        </div>
                        <div className="progress-bar-flex">
                            <div>
                                <div className="progress-div">
                                    <div className="my-progress">
                                        <div className="my-bar-one"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="progress-div">
                                    <div className="my-progress">
                                        <div className="my-bar-two"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="progress-div">
                                    <div className="my-progress">
                                        <div className="my-bar-two"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="team-progress-img-div-flex">
                        <img
                            src="/asset/images/rab1.svg"
                            alt="동물 이미지"
                            className="my-progress-img"
                        />
                        <div className="title5">근손실방지</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
