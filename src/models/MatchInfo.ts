import RelationModel from "models/RelationModel";

type MatchInfo = {
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
