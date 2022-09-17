import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import Navbar from "./../Components/Navbar/Navbar";
import Main from "./../pages/Main";
import Game from "../Components/Game/Game";
import axios from "axios";
import api from "../api";
import {describe, expect, it} from "@jest/globals";
jest.mock("axios");
let wrapped;

//Source: https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/
describe("getExperimentById", () => {
  describe("when API call is successful", () => {
    it("should return the experiment with corresponding id", async () => {
      const id = "6303960b156d8e69b815bcff";
      const expected = {
        _id: "6303960b156d8e69b815bcff",
        name: "New experiment!",
        game_id: "1",
        created_at: "2022-08-22T14:43:23.841Z",
        updated_at: "2022-08-22T14:43:23.841Z",
        __v: 0,
      };

      axios.get.mockResolvedValueOnce(id);
      const result = await api.getExperimentById(id);
      //confirm that the request was sent to the correct endpoint
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_NODE_ENV}/api/experiment/${id}`
      );
      //expect the correct result to be returned
      expect(result).toEqual(expected);
    });
  });
});

// beforeEach(() => {
//   wrapped = shallow(<Main />);
// });
// it("shows a navbar", () => {
//   expect(wrapped.find(Game).length).toEqual(1);
// });
