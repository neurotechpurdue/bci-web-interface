import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import Navbar from "./../Components/Navbar/Navbar";
import Main from "./../pages/Main";
import Game from "../Components/Game/Game";

let wrapped;

beforeEach(()=> {
  wrapped = shallow(<Main />);

});
it("shows a navbar", () => {
  expect(wrapped.find(Game).length).toEqual(1);
});
