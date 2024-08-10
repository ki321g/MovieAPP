import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
// import { action } from "@storybook/addon-actions";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";


const meta = {
  title: 'Home Page/MovieCard',
  component: MovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
} satisfies Meta<typeof MovieCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (movie ) => <AddToFavouritesIcon {...movie} />,
    movie: SampleMovie,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    // movie: sampleNoPoster,
    movie: { ...sampleNoPoster, poster_path: "" },
    action: (movie ) => <AddToFavouritesIcon {...movie} />,
  }
};
Exceptional.storyName = "Exception";