import "@testing-library/jest-dom";

import {
    render,
    screen,
    fireEvent,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import PaintingDetails from "./PaintingDetails";

import { getPaintingById } from "../api/paintingApi";

const mockNavigate = jest.fn();

jest.mock("../api/paintingApi", () => ({
    getPaintingById: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "painting-1" }),
}));

const mockedGetPaintingById =
    getPaintingById as jest.MockedFunction<typeof getPaintingById>;

const painting = {
    _id: "painting-1",
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    year: 1503,
    medium: "Oil on poplar",
    description:
        "A famous Renaissance portrait.\n\nThe painting is known for its mysterious expression.",
    imageUrls: ["mona-lisa.jpg"],
    tags: ["Renaissance", "portrait"],
    categories: [],
    relatedPaintings: [
        {
            _id: "painting-2",
            title: "Vitruvian Man",
            imageUrls: ["vitruvian-man.jpg"],
            score: 0.95,
        },
        {
            _id: "painting-3",
            title: "The Last Supper",
            imageUrls: ["last-supper.jpg"],
            score: 0.9,
        },
        {
            _id: "painting-4",
            title: "Lady with an Ermine",
            imageUrls: ["lady-with-an-ermine.jpg"],
            score: 0.85,
        },
    ],
};

const renderPaintingDetails = () =>
    render(
        <MemoryRouter>
            <PaintingDetails />
        </MemoryRouter>
    );

describe("PaintingDetails", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        mockedGetPaintingById.mockResolvedValue(
            painting as any
        );
    });

    describe("Loading", () => {
        it("shows the loading state while the painting is being fetched", () => {
            mockedGetPaintingById.mockImplementation(
                () => new Promise(() => { })
            );

            renderPaintingDetails();

            expect(
                screen.getByText("Loading...")
            ).toBeInTheDocument();
        });
    });

    describe("Painting information", () => {
        it("renders the painting details after loading", async () => {
            renderPaintingDetails();

            expect(
                await screen.findByRole("heading", {
                    name: "Mona Lisa",
                })
            ).toBeInTheDocument();

            expect(
                screen.getByText("Leonardo da Vinci")
            ).toBeInTheDocument();

            expect(
                screen.getByText("1503")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Oil on poplar")
            ).toBeInTheDocument();

            expect(
                screen.getByText(
                    /A famous Renaissance portrait\./
                )
            ).toBeInTheDocument();
        });

        it("renders the main painting image", async () => {
            renderPaintingDetails();

            const images = await screen.findAllByRole("img");

            expect(images[0]).toHaveAttribute(
                "src",
                "mona-lisa.jpg"
            );
        });

        it("renders the full description", async () => {
            renderPaintingDetails();

            expect(
                await screen.findByText(
                    /A famous Renaissance portrait\./
                )
            ).toHaveTextContent(
                "A famous Renaissance portrait."
            );

            expect(
                screen.getByText(
                    /The painting is known for its mysterious expression\./
                )
            ).toBeInTheDocument();
        });
    });

    describe("Related works", () => {
        it("renders related paintings", async () => {
            renderPaintingDetails();

            expect(
                await screen.findByText("Vitruvian Man")
            ).toBeInTheDocument();

            expect(
                screen.getByText("The Last Supper")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Lady with an Ermine")
            ).toBeInTheDocument();
        });

        it("shows a message when there are no related paintings", async () => {
            mockedGetPaintingById.mockResolvedValue({
                ...painting,
                relatedPaintings: [],
            } as any);

            renderPaintingDetails();

            expect(
                await screen.findByText(
                    "No related paintings yet"
                )
            ).toBeInTheDocument();
        });

        it("limits related paintings to six items", async () => {
            const relatedPaintings = Array.from(
                { length: 7 },
                (_, index) => ({
                    _id: `related-${index + 1}`,
                    title: `Related Painting ${index + 1}`,
                    imageUrls: [
                        `related-${index + 1}.jpg`,
                    ],
                    score: 1 - index * 0.05,
                })
            );

            mockedGetPaintingById.mockResolvedValue({
                ...painting,
                relatedPaintings,
            } as any);

            renderPaintingDetails();

            expect(
                await screen.findByText("Related Painting 6")
            ).toBeInTheDocument();

            expect(
                screen.queryByText("Related Painting 7")
            ).not.toBeInTheDocument();
        });

        it("sorts related paintings by score", async () => {
            const relatedPaintings = [
                {
                    _id: "low",
                    title: "Low Score Painting",
                    imageUrls: ["low.jpg"],
                    score: 0.2,
                },
                {
                    _id: "high",
                    title: "High Score Painting",
                    imageUrls: ["high.jpg"],
                    score: 0.9,
                },
                {
                    _id: "medium",
                    title: "Medium Score Painting",
                    imageUrls: ["medium.jpg"],
                    score: 0.6,
                },
            ];

            mockedGetPaintingById.mockResolvedValue({
                ...painting,
                relatedPaintings,
            } as any);

            renderPaintingDetails();

            const high =
                await screen.findByText(
                    "High Score Painting"
                );

            const medium =
                screen.getByText("Medium Score Painting");

            const low =
                screen.getByText("Low Score Painting");

            expect(
                high.compareDocumentPosition(medium) &
                Node.DOCUMENT_POSITION_FOLLOWING
            ).toBeTruthy();

            expect(
                medium.compareDocumentPosition(low) &
                Node.DOCUMENT_POSITION_FOLLOWING
            ).toBeTruthy();
        });

        it("navigates to a related painting when clicked", async () => {
            renderPaintingDetails();

            const relatedPainting =
                await screen.findByText("Vitruvian Man");

            fireEvent.click(relatedPainting);

            expect(mockNavigate).toHaveBeenCalledWith(
                "/painting/painting-2"
            );
        });
    });

    describe("Navigation", () => {
        it("navigates back when Back to Gallery is clicked", async () => {
            renderPaintingDetails();

            await screen.findByRole("heading", {
                name: "Mona Lisa",
            });

            fireEvent.click(
                screen.getByText("← Back to Gallery")
            );

            expect(mockNavigate).toHaveBeenCalledWith(-1);
        });
    });

    describe("Not found state", () => {
        it("shows the not found message when the API returns null", async () => {
            mockedGetPaintingById.mockResolvedValue(
                null as any
            );

            renderPaintingDetails();

            expect(
                await screen.findByText(
                    "Painting not found"
                )
            ).toBeInTheDocument();
        });
    });

    describe("API", () => {
        it("requests the painting using the route id", async () => {
            renderPaintingDetails();

            await screen.findByRole("heading", {
                name: "Mona Lisa",
            });

            expect(
                mockedGetPaintingById
            ).toHaveBeenCalledWith("painting-1");
        });
    });
});