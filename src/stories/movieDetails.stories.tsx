import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
    title: "Movie Details Page/MovieDetails",
    component: MovieDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
      ],
} satisfies Meta<typeof MovieDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        movie: SampleMovie,
        trailerVideo: {
            id: "66b57b08402939255ad7c119",
            iso_639_1: "en",
            iso_3166_1: "US",
            key: "u69y5Ie519M",
            name: "Announce Trailer",
            official: true,
            published_at: "2024-08-08T13:59:26.000Z",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
        },
    }
};
Basic.storyName = "Default";