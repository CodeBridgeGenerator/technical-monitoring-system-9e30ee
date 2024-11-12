import React from "react";
import { render, screen } from "@testing-library/react";

import CheckListsEditDialogComponent from "../CheckListsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders checkLists edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CheckListsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("checkLists-edit-dialog-component")).toBeInTheDocument();
});
