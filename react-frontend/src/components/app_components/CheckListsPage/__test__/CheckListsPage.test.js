import React from "react";
import { render, screen } from "@testing-library/react";

import CheckListsPage from "../CheckListsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders checkLists page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CheckListsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("checkLists-datatable")).toBeInTheDocument();
    expect(screen.getByRole("checkLists-add-button")).toBeInTheDocument();
});
