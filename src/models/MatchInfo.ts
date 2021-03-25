import ProfileMatch from "models/ProfileMatch";

type MatchInfo = {
  id: number;
  name?: string;
  profilePicture?: string;
  classLevel?: string;
  major?: string;
  shortIntro?: string;
  profileCompletePercentage?: number;
  isRoommateMatchingOpen?: boolean;
  roommateMatchingDeadline?: Date;
  maxRoommateCount?: number;
  matchingCriteria?: {
    gender?: string;
    majors?: string;
  };
  roommates?: ProfileMatch[];
};

export default MatchInfo;
