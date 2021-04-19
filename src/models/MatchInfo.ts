import RelationModel from "models/RelationModel";

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
  roommates?: RelationModel[];
};

export default MatchInfo;
