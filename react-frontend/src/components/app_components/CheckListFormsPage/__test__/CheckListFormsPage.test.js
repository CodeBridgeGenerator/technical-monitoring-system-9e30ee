import React from "react";
import { render, screen } from "@testing-library/react";

import CheckListFormsPage from "../CheckListFormsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders checkListForms page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CheckListFormsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("checkListForms-datatable")).toBeInTheDocument();
    expect(screen.getByRole("checkListForms-add-button")).toBeInTheDocument();
});
