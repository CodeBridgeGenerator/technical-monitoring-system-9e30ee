import React from "react";
import { render, screen } from "@testing-library/react";

import BreakDownTicketsPage from "../BreakDownTicketsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders breakDownTickets page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BreakDownTicketsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("breakDownTickets-datatable")).toBeInTheDocument();
    expect(screen.getByRole("breakDownTickets-add-button")).toBeInTheDocument();
});
