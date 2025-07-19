export interface PersonalInfo{
    name: string;
    schoolName: string;
    gender: number; // 0 for female, 1 for male
    age: number;
    weight: number;
    height: number;
    activityFactor: number;
}

export interface PersonalInfoWithTime extends PersonalInfo{
    time: string;
}