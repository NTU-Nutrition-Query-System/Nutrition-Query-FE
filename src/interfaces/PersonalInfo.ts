export interface PersonalInfo{
    name: string;
    schoolName: string;
    age: number;
    weight: number;
    height: number;
}

export interface PersonalInfoWithTime extends PersonalInfo{
    time: string;
}