import renderer from "react-test-renderer";
import React from "react";
import { QuestionItem } from "../QuestionItem";
import Question from "models/Question";

it("Renders snapshot as expected", () => {
  // given
  const question: Question = {
    id: 1,
    sectionId: 1,
    title: `When do you normally go to bed?`,
    minOption: "Lights out at 10!",
    maxOption: "Usually late, after 1 AM",
    createdAt: "2021-03-15T07:18:24.000Z",
    updatedAt: "2021-03-15T07:18:24.000Z",
    key: () => "key"
  };
  const myCallback = jest.fn();
  const tree = renderer
    .create(
      <QuestionItem
        question={question}
        minValue={0}
        maxValue={10}
        initialValuesBottomSlider={[0, 54]}
        style={{ marginHorizontal: 15 }}
        callback={myCallback}
        preferenceInitialValue={false}
      />
    )
    .toJSON();

  // then
  expect(tree).toMatchSnapshot();
});
