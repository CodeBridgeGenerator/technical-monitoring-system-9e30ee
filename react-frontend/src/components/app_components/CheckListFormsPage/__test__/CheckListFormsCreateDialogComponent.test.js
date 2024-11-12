import React from "react";
import { render, screen } from "@testing-library/react";

import CheckListFormsCreateDialogComponent from "../CheckListFormsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders checkListForms create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CheckListFormsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("checkListForms-create-dialog-component")).toBeInTheDocument();
});
