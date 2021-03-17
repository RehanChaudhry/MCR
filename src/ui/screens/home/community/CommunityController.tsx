import { CommunityData } from "models/api_responses/CommunityResponseModel";
import React, { FC } from "react";
import { CommunityView } from "ui/screens/home/community/CommunityView";

type Props = {};

const data: CommunityData[] = [
  {
    id: "1",
    profileImageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Phoenix Walker",
    time: "2 hours ago",
    text:
      "In the spirit of Ohio University's Mental Health Day break, I've decided to abstain from playing Super Smash Bros Ultimate today. Take care of yourself everyone! Sparkling heartSparkling heartSparkling heart ❤❤❤",
    likeCount: 20,
    commentCount: 5
  },
  {
    id: "2",
    profileImageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Zane Mayes",
    time: "3 hours ago",
    text:
      "First day at college, Ohio university. Thank you so much for watching",
    videoUrl: "https://www.youtube.com/watch?v=zWh3CShX_do",
    likeCount: 20,
    commentCount: 5
  },
  {
    id: "3",
    profileImageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Jasmine Lambert",
    time: "3 hours ago",
    text:
      "OHIO’s beloved Rufus has undergone many makeovers since 1804, and did you know that he used to be accompanied by the Bobkitten?! Check out this iconic transformation from 1977 to now 😸 ",
    images: [
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?tree"
    ],
    likeCount: 20,
    commentCount: 5
  },
  {
    id: "4",
    profileImageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Jasmine Lambert",
    time: "3 hours ago",
    text:
      "OHIO’s beloved Rufus has undergone many makeovers since 1804, and did you know that he used to be accompanied by the Bobkitten?! Check out this iconic transformation from 1977 to now 😸 ",
    images: ["https://source.unsplash.com/1024x768/?nature"],
    likeCount: 20,
    commentCount: 5
  },
  {
    id: "5",
    profileImageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "Jaweria Siddiqui",
    time: "3 hours ago",
    text:
      "OHIO’s beloved Rufus has undergone many makeovers since 1804, and did you know that he used to be accompanied by the Bobkitten?! Check out this iconic transformation from 1977 to now 😸 ",
    likeCount: 20,
    commentCount: 5,
    metaDataUrl: "https://www.youtube.com/watch?v=Kmiw4FYTg2U"
  }
  // {
  //   id: "3",
  //   profileImageUrl:
  //     "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //   name: "Zane Mayes",
  //   time: "3 hours ago",
  //   videoUrl: "https://www.youtube.com/watch?v=zWh3CShX_do",
  //   likeCount: 20,
  //   commentCount: 5
  // }
];

const CommunityController: FC<Props> = () => {
  return <CommunityView data={data} shouldShowProgressBar={false} />;
};

export default CommunityController;
