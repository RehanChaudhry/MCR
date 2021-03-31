import React, { FC } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { StyleSheet, View } from "react-native";

import { SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import TagList from "ui/components/molecules/tag_list/TagList";
import Strings from "config/Strings";

type Props = {};
export type Interest = {
  id: string;
  titleTag: string;
};

const InterestsTagsList: FC<Props> = () => {
  const hobbies: Interest[] = [
    {
      id: "1",
      titleTag: "Music"
    },
    {
      id: "2",
      titleTag: "Exotic Places"
    },
    {
      id: "3",
      titleTag: "Movies"
    }
  ];
  const clubs: Interest[] = [];
  const living: Interest[] = [];
  const movies: Interest[] = [
    {
      id: "1",
      titleTag: "The Queen’s Gambit"
    },
    {
      id: "2",
      titleTag: "The Last Dance"
    }
  ];
  const music: Interest[] = [
    {
      id: "1",
      titleTag: "Rock & Dance"
    },
    {
      id: "2",
      titleTag: "Nirvana"
    },
    {
      id: "3",
      titleTag: "Brenda Lee"
    },
    {
      id: "4",
      titleTag: "Morgan Wallen"
    },
    {
      id: "5",
      titleTag: "Rob Zombie"
    }
  ];
  const books: Interest[] = [];
  const games: Interest[] = [];
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <HeadingWithText
          headingText={Strings.profile.interests.heading}
          text={""}
          headingFontWeight={"semi-bold"}
        />
        <TagList
          labelTitle={Strings.profile.dropDownTitle.hobbies}
          data={hobbies}
        />
        <View style={styles.spacer} />
        <TagList
          labelTitle={Strings.profile.dropDownTitle.memberShip}
          data={clubs}
        />
        <View style={styles.spacer} />
        <TagList
          labelTitle={"Living Learning Communities"}
          data={living}
        />
        <View style={styles.spacer} />
        <TagList
          labelTitle={Strings.profile.dropDownTitle.movies}
          data={movies}
        />
        <View style={styles.spacer} />
        <TagList
          labelTitle={Strings.profile.dropDownTitle.music}
          data={music}
        />
        <View style={styles.spacer} />
        <TagList
          labelTitle={Strings.profile.dropDownTitle.books}
          data={books}
        />
        <View style={styles.spacer} />
        <TagList
          labelTitle={Strings.profile.dropDownTitle.games}
          data={games}
        />
      </View>
    </CardView>
  );
};
const styles = StyleSheet.create({
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingVertical: SPACE.lg
  },
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
  },
  spacer: {
    marginTop: SPACE.sm
  }
});
export default InterestsTagsList;
