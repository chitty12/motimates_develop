//=== 공통되는 타입 ===

export interface LeaderInfoType {
    uSeq: number;
    uName: string;
    uImg: string;
    uCharImg: string;
}

// group 상세페이지 (GET)
export interface GroupDetailType {
    grInformation: string;
    groupCategory: string;
    groupCoverImg: string;
    groupDday: number;
    groupMaxMember: number;
    groupMember: [];
    groupMission: [];
    groupName: string;
    isJoin: boolean;
    isLeader: boolean;
    result: boolean;
    nowScoreUserInfo: [];
    totalScoreUserInfo: [];
    leaderInfo: LeaderInfoType;
    memberArray: [];
}

export interface GroupMissionsType {
    createdAt: string;
    gSeq: number;
    isExpired: null;
    mContent: string;
    mLevel: number;
    mSeq: number;
    mTitle: string;
    updatedAt: string;
}

// 게시글
export interface BoardType {
    gbSeq: number;
    gbTitle: string;
    gbContent: string;
    gbIsDone: null | string; // null: 공지, 자유   "y": 미션
    gbCategory: string;
    createdAt: string;
    updatedAt: string;
}

export interface GroupMission {
    missionList: [];
    expiredMissionList: [];
    Dday: number;
    uSeq: number;
    gName: string;
    uEmail: string;
    uName: string;
}

// Redux 스토어의 전체 타입 정의
export interface RootStateType {
    dummyGroup: GroupStateType;
    user: UserStateType;
    mission: MissionStateType;
    page: PageStateType;
}

export interface UserStateType {
    uSeq: number;
    uEmail: string;
    uName: string;
    uImg: string;
    uCharImg: string;
    uDesc: string;
    uCategory1: string;
    uCategory2: string;
    uCategory3: string;
}

// Redux 스토어에서 가져오는 'group' 슬라이스의 상태 타입 정의
export interface GroupStateType {
    gSeq: number;
    gName: string;
    gDesc: string;
    gDday: string;
    gMaxMem: number;
    gCategory: string;
    gCoverImg: string;
    missionArray: MissionType[];
}

export interface MissionType {
    // mSeq: number;
    mTitle: string;
    mContent: string;
    mLevel: number;
}

export interface MissionStateType {
    id: number;
    mTitle: string;
    mContent: string;
    mLevel: number | string;
    completed: boolean;
    map: any; // [any] 일단 임의로 any 박아놓을게요 ,,,
}

export type MissionListType = MissionStateType[];

export interface PageStateType {
    name: string;
}
