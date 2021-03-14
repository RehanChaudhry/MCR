import renderer from "react-test-renderer";
import React from "react";
import { RangeSlider } from "../RangeSlider";

it("Renders snapshot as expected", () => {
  // given
  const myCallback = jest.fn();
  const tree = renderer
    .create(
      <RangeSlider
        question="When do you normally go to bed.?"
        minValue={0}
        maxValue={100}
        initialValuesBottomSlider={[0, 54]}
        style={{ marginHorizontal: 15 }}
        callback={myCallback}
        preferenceInitialValue={false}
        labelLeft="Lights out at 10!"
        labelRight="Usually late, after 1 AM"
      />
    )
    .toJSON();

  // then
  expect(tree).toMatchSnapshot();
});
