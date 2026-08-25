import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import Gallery from "./Gallery";
import { useGalleryData } from "../hooks/useGalleryData";

jest.mock("../hooks/useGalleryData");

jest.mock("../components/Navbar", () => () => (
    <nav aria-label="Main navigation">Navbar</nav>
));

const mockedUseGalleryData = useGalleryData as jest.Mock;

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

const mockPaintings = [
    {
        _id: "painting-1",
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        imageUrls: ["mona-lisa.jpg"],
    },
    {
        _id: "painting-2",
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        imageUrls: ["starry-night.jpg"],
    },
];

const mockCategories = [
    {
        name: "Renaissance",
        slug: "renaissance",
    },
    {
        name: "Post-Impressionism",
        slug: "post-impressionism",
    },
];

const defaultGalleryData = {
    paintings: mockPaintings,
    categories: mockCategories,
    loading: false,
    error: null,
};

const renderGallery = () =>
    render(
        <MemoryRouter>
            <Gallery />
        </MemoryRouter>
    );

beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockedUseGalleryData.mockReturnValue(defaultGalleryData);
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

describe("Gallery", () => {
    describe("Rendering", () => {
        it("renders the gallery heading and description", () => {
            renderGallery();

            expect(
                screen.getByRole("heading", { name: "Gallery" })
            ).toBeInTheDocument();

            expect(
                screen.getByText(
                    "Explore timeless masterpieces from artists around the world."
                )
            ).toBeInTheDocument();
        });

        it("renders the search input", () => {
            renderGallery();

            expect(
                screen.getByPlaceholderText("Search paintings...")
            ).toBeInTheDocument();
        });

        it("renders the available category filters", () => {
            renderGallery();

            expect(screen.getByText("All")).toBeInTheDocument();
            expect(screen.getByText("Renaissance")).toBeInTheDocument();
            expect(
                screen.getByText("Post-Impressionism")
            ).toBeInTheDocument();
        });

        it("renders the paintings returned by the hook", () => {
            renderGallery();

            expect(screen.getByText("Mona Lisa")).toBeInTheDocument();
            expect(
                screen.getByText("Leonardo da Vinci")
            ).toBeInTheDocument();

            expect(
                screen.getByText("The Starry Night")
            ).toBeInTheDocument();
            expect(
                screen.getByText("Vincent van Gogh")
            ).toBeInTheDocument();
        });
    });

    describe("Loading and error states", () => {
        it("shows the loading state", () => {
            mockedUseGalleryData.mockReturnValue({
                paintings: [],
                categories: [],
                loading: true,
                error: null,
            });

            renderGallery();

            expect(
                screen.getByText("Loading gallery...")
            ).toBeInTheDocument();
        });

        it("shows the error state", () => {
            mockedUseGalleryData.mockReturnValue({
                paintings: [],
                categories: [],
                loading: false,
                error: "Failed to load gallery",
            });

            renderGallery();

            expect(
                screen.getByText("Failed to load gallery")
            ).toBeInTheDocument();
        });
    });

    describe("Category filters", () => {
        it("starts with the 'all' filter", () => {
            renderGallery();

            expect(mockedUseGalleryData).toHaveBeenCalledWith(
                "all",
                ""
            );
        });

        it("changes the active category when a filter is clicked", () => {
            renderGallery();

            fireEvent.click(
                screen.getByText("Renaissance")
            );

            expect(mockedUseGalleryData).toHaveBeenLastCalledWith(
                "renaissance",
                ""
            );
        });

        it("can switch between category filters", () => {
            renderGallery();

            fireEvent.click(
                screen.getByText("Renaissance")
            );

            expect(mockedUseGalleryData).toHaveBeenLastCalledWith(
                "renaissance",
                ""
            );

            fireEvent.click(
                screen.getByText("Post-Impressionism")
            );

            expect(mockedUseGalleryData).toHaveBeenLastCalledWith(
                "post-impressionism",
                ""
            );

            fireEvent.click(screen.getByText("All"));

            expect(mockedUseGalleryData).toHaveBeenLastCalledWith(
                "all",
                ""
            );
        });
    });

    describe("Search", () => {
        it("updates the search input immediately", () => {
            renderGallery();

            const searchInput = screen.getByPlaceholderText(
                "Search paintings..."
            );

            fireEvent.change(searchInput, {
                target: { value: "Mona" },
            });

            expect(searchInput).toHaveValue("Mona");
        });

        it("waits for the debounce before updating the hook search parameter", () => {
            renderGallery();

            const searchInput = screen.getByPlaceholderText(
                "Search paintings..."
            );

            fireEvent.change(searchInput, {
                target: { value: "Mona" },
            });

            expect(mockedUseGalleryData).toHaveBeenLastCalledWith(
                "all",
                ""
            );

            act(() => {
                jest.advanceTimersByTime(350);
            });

            expect(mockedUseGalleryData).toHaveBeenLastCalledWith(
                "all",
                "Mona"
            );
        });

        it("resets the debounce when the user continues typing", () => {
            renderGallery();

            const searchInput = screen.getByPlaceholderText(
                "Search paintings..."
            );

            fireEvent.change(searchInput, {
                target: { value: "Mo" },
            });

            act(() => {
                jest.advanceTimersByTime(200);
            });

            fireEvent.change(searchInput, {
                target: { value: "Mona" },
            });

            act(() => {
                jest.advanceTimersByTime(200);
            });

            expect(mockedUseGalleryData).toHaveBeenLastCalledWith(
                "all",
                ""
            );

            act(() => {
                jest.advanceTimersByTime(150);
            });

            expect(mockedUseGalleryData).toHaveBeenLastCalledWith(
                "all",
                "Mona"
            );
        });

        it("highlights matching text in the painting title", () => {
            mockedUseGalleryData.mockReturnValue({
                paintings: [mockPaintings[0]],
                categories: mockCategories,
                loading: false,
                error: null,
            });

            renderGallery();

            const searchInput = screen.getByPlaceholderText(
                "Search paintings..."
            );

            fireEvent.change(searchInput, {
                target: { value: "Mona" },
            });

            act(() => {
                jest.advanceTimersByTime(350);
            });

            const highlightedText = screen.getByText("Mona");

            expect(highlightedText).toBeInTheDocument();
            expect(highlightedText.tagName).toBe("SPAN");
        });
    });

    describe("Navigation", () => {
        it("navigates to the painting details page when a painting is clicked", () => {
            renderGallery();

            fireEvent.click(
                screen.getByText("Mona Lisa")
            );

            expect(mockNavigate).toHaveBeenCalledWith(
                "/painting/painting-1"
            );
        });

        it("navigates to the correct painting", () => {
            renderGallery();

            fireEvent.click(
                screen.getByText("The Starry Night")
            );

            expect(mockNavigate).toHaveBeenCalledWith(
                "/painting/painting-2"
            );
        });
    });
});